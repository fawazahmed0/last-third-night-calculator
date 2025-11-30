function getPartNightAndHijri(fajrhour, fajrmin, magribhour, magribmin) {
    let magribDate = new Date()
    let fajrDate = new Date(magribDate)
    magribDate.setHours(magribhour)
    magribDate.setMinutes(magribmin)
    fajrDate.setHours(fajrhour)
    fajrDate.setMinutes(fajrmin)

    let diff;
    // Calculate the time from fajr to magrib and subtract it with 1 day in millis to get the time between magrib and fajr
    if (magribDate > fajrDate)
        diff = 86400000 - (magribDate - fajrDate)
    // Calculate the time from magrib to fajr as fajrDate is bigger than magribDate
    else
        diff = fajrDate - magribDate
    let twothirdNight = new Date(magribDate.getTime() + (diff * 2 / 3))
    let halfNight = new Date(magribDate.getTime() + (diff * 1 / 2))

    let todayHijri = new Date();
    // if sun has already set, then increase the date by 1 day
    if(magribDate<todayHijri)
    todayHijri.setDate(todayHijri.getDate() + 1)

    return [halfNight, twothirdNight, todayHijri]

}

globalThis.setPartNightAndHijri = function () {
    if (document.querySelector('#fajrtime').value != '' && document.querySelector('#magribtime').value != '') {
        showInvitationIfEligible()
        let [halfNight, twothirdNight, hijriDate] = getPartNightAndHijri(...document.querySelector('#fajrtime').value.split(':'), ...document.querySelector('#magribtime').value.split(':'))

        document.querySelector('#lastthird').innerText = twothirdNight.toLocaleString('default', { hour: 'numeric', minute: 'numeric' })
        document.querySelector('#midnight').innerText = halfNight.toLocaleString('default', { hour: 'numeric', minute: 'numeric' }) 
        
        let dateoffset = parseInt(document.querySelector('#dateoffset').value || '0')
        document.querySelector('#datepencil').removeAttribute("hidden") 
        hijriDate.setDate(hijriDate.getDate() + dateoffset)
        let hijriString = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric',day: 'numeric',calendar:'islamic'}).format(hijriDate)
        let hijriArr = hijriString.split(' ')[0].split('/')
        document.querySelector('#hijridate').innerText =  hijriArr[1]+ ' ' + IslamicMonths[hijriArr[0]-1]   + ' ' + hijriArr[2] + ' AH'
        let todayDay = (new Date()).getDay()
        let calendarDate = new Date()
        calendarDate.setDate(hijriArr[1])
        // zero indexed month
        calendarDate.setMonth(hijriArr[0]-1)
        while(true){
            calendarDate.setFullYear(calendarDate.getFullYear()-1)
            if(calendarDate.getDay() == todayDay)
                break
        }
        document.querySelector('#dateInput').value = calendarDate.toLocaleDateString('en-CA')
        localStorage.setItem('dateoffset', dateoffset)
        // new Intl.DateTimeFormat(['islamic','islamic-tbla','islamic-umalqura','islamic-rgsa','islamic-civil'].map(e=>'en-u-ca-'+e),{dateStyle:'long' }).format(hijriDate)
        }
}

globalThis.autoDetectWithCoords = function () {
    if ('geolocation' in navigator) {
        let autoDetectBtn = document.querySelector('#autodetectbtn')
        autoDetectBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Auto Detect`
        autoDetectBtn.disabled = true;
        navigator.geolocation.getCurrentPosition(pos => {
            var solar = new SolarCalc(new Date(), pos.coords.latitude, pos.coords.longitude);
            let fajrDate = solar.astronomicalDawn;
            let magribDate = solar.sunset;

            document.querySelector('#fajrtime').value = fajrDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: false })
            document.querySelector('#magribtime').value = magribDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: false })

            setPartNightAndHijri()

            autoDetectBtn.innerHTML = `Auto Detect`
            autoDetectBtn.disabled = false;

        }, err => { autoDetectBtn.innerHTML = `Auto Detect`; autoDetectBtn.disabled = false; })
    }

}

// Check if we should show the invitation (after 3 days of usage in last 20 days)
function showInvitationIfEligible() {
    const visits = JSON.parse(localStorage.getItem('thirdNightVisits') || '[]');

    const last20Days = new Date();
    last20Days.setDate(last20Days.getDate() - 20);

    // Filter visits in last 20 days
    const recentVisits = [...new Set(visits.filter(visit => new Date(visit) > last20Days))]

    // If user has visited 3 or more times in last 20 days
    // Don't show if dialog shown today or user has opted to never show again
    if (recentVisits.length >= 3 && localStorage.getItem('thirdNightSkipToday') !== new Date().toISOString().slice(0, 10) && localStorage.getItem('thirdNightInvitationResponse') !== 'never') {
        localStorage.setItem('thirdNightInvitationEligible', true);
        setTimeout(showInvitation, 500); // Show after 0.5 seconds
    }

    let hijriString = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', calendar: 'islamic' }).format(new Date())
    let hijriDate = new Date()
    let [hijriMonth, hijriDay] = hijriString.split('/')
    hijriDate.setMonth(hijriMonth - 1)
    hijriDate.setDate(hijriDay)
    let fromHijri = new Date()
    fromHijri.setMonth(8 - 1)
    fromHijri.setDate(20)
    let toHijri = new Date()
    toHijri.setMonth(10 - 1)
    toHijri.setDate(10)

    const isRamadan = fromHijri < hijriDate && hijriDate < toHijri

    // Record this visit
    // Don't record if this is ramadan month or 10 days before or after ramadan. Everyone is religious this time
    if (!isRamadan)
        visits.push(new Date().toISOString().slice(0, 10)); // Store only the date part
    localStorage.setItem('thirdNightVisits', JSON.stringify([...new Set(visits)]));
}

function showInvitation() {
    new bootstrap.Collapse(document.getElementById('invitationCollapse')).show();
}

globalThis.handleInvitation = function (response) {
    new bootstrap.Collapse(document.getElementById('invitationCollapse')).hide();

    // Don't show again today, if any button is pressed
    localStorage.setItem('thirdNightSkipToday', new Date().toISOString().slice(0, 10));

    switch (response) {
        case 'yes':
            window.open("form")
            break;
        case 'never':
            localStorage.setItem('thirdNightInvitationResponse', 'never');
            break;
    }
}

// Register Service worker for Add to Home Screen option to work
if ('serviceWorker' in navigator) { navigator.serviceWorker.register(new URL('service-worker.js', import.meta.url)) }

function ready() {
    let params = new URLSearchParams(document.location.search);
    if(params.get("date"))
    document.querySelector('#datecontainerspan').removeAttribute("hidden") 
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    document.querySelector('#dateoffset').value = localStorage.getItem('dateoffset') || '0'


}


import SolarCalc from 'https://cdn.jsdelivr.net/npm/@fawazahmed0/solar-calc/+esm'
var IslamicMonths = ["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]
document.addEventListener("DOMContentLoaded", ready);
