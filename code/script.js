function getPartNight(fajrhour, fajrmin, magribhour, magribmin) {
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
    return [halfNight, twothirdNight]

}

window.setPartNight = function () {
    if (document.querySelector('#fajrtime').value != '' && document.querySelector('#magribtime').value != '') {
        let [halfNight, twothirdNight] = getPartNight(...document.querySelector('#fajrtime').value.split(':'), ...document.querySelector('#magribtime').value.split(':'))
        document.querySelector('#placeholder').innerText = "Mid Night Begins At: " + halfNight.toLocaleString('default', { hour: 'numeric', minute: 'numeric' }) +
            "\nLast Third Night Begins At: " + twothirdNight.toLocaleString('default', { hour: 'numeric', minute: 'numeric' })
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


            setPartNight()


        })




}

// Register Service worker for Add to Home Screen option to work
if ('serviceWorker' in navigator) { navigator.serviceWorker.register(new URL('service-worker.js', import.meta.url)) }

function ready() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })



}

document.addEventListener("DOMContentLoaded", ready);

import * as SolarCalc from 'solar-calc'
