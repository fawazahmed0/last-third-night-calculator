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

window.setPartNightAndHijri = function () {
    if (document.querySelector('#fajrtime').value != '' && document.querySelector('#magribtime').value != '') {
        let [halfNight, twothirdNight, hijriDate] = getPartNightAndHijri(...document.querySelector('#fajrtime').value.split(':'), ...document.querySelector('#magribtime').value.split(':'))

        document.querySelector('#lastthird').innerText = twothirdNight.toLocaleString('default', { hour: 'numeric', minute: 'numeric' })
        document.querySelector('#midnight').innerText = halfNight.toLocaleString('default', { hour: 'numeric', minute: 'numeric' }) 
        
        let dateoffset = parseInt(document.querySelector('#dateoffset').value || '0')
        document.querySelector('#datepencil').removeAttribute("hidden") 
        hijriDate.setDate(hijriDate.getDate() + dateoffset)
        let hijriString = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric',day: 'numeric',calendar:'islamic'}).format(hijriDate)
        let hijriArr = hijriString.split(' ')[0].split('/')
        document.querySelector('#hijridate').innerText =  hijriArr[1]+ ' ' + IslamicMonths[hijriArr[0]-1]   + ' ' + hijriArr[2] + ' AH'
        Cookies.set('dateoffset', dateoffset, { expires: 36500 })
        // new Intl.DateTimeFormat(['islamic','islamic-tbla','islamic-umalqura','islamic-rgsa','islamic-civil'].map(e=>'en-u-ca-'+e),{dateStyle:'long' }).format(hijriDate)
        }
}

window.autoDetectWithCoords = function () {
    if ('geolocation' in navigator)
        navigator.geolocation.getCurrentPosition(pos => {
            var solar = new SolarCalc(new Date(), pos.coords.latitude, pos.coords.longitude);
            let fajrDate = solar.astronomicalDawn;
            let magribDate = solar.sunset;

            document.querySelector('#fajrtime').value = fajrDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: false })
            document.querySelector('#magribtime').value = magribDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: false })

            setPartNightAndHijri()


        })




}

// Register Service worker for Add to Home Screen option to work
if ('serviceWorker' in navigator) { navigator.serviceWorker.register(new URL('service-worker.js', import.meta.url)) }

function ready() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    document.querySelector('#dateoffset').value = Cookies.get('dateoffset') || '0'


}


import * as SolarCalc from 'solar-calc'
import Cookies from 'js-cookie'
var IslamicMonths = ["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]
document.addEventListener("DOMContentLoaded", ready);
