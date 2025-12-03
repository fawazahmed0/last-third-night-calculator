const martialURL = "https://NoorMatch.pages.dev"

function getRadioHTML(legend = "", name, type, radios, required = true) {
    let radiosTextArr = []
    for (let radio of radios) {
        radiosTextArr.push(`
                <div class="form-check ms-3">
                <input class="form-check-input" type="${type}" name="${name}" id="${radio.id}" value="${radio.value}" ${required ? "required" : ""}>
                <label class="form-check-label" for="${radio.id}">
                 ${radio.label}
                </label>
                </div>  
                `)
    }

    return `<div class="bg-white mb-3 p-3"><fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">${legend}</legend>
            ${radiosTextArr.join("")}
        </fieldset></div>`
}

function getInputHTML(tag, label, info = "", attributes = {}) {
    return `<div class="mb-3 p-3 bg-white">
            <label for="${attributes.id}" class="form-label">${label}</label>
            <${tag} class="form-control" ${Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ")}></${tag}>
            <div class="form-text">${info}</div>
        </div>`
}

async function submitForm(obj) {
    let form = document.getElementById("myform");
    if (!form.reportValidity() && localStorage['command'] != 'delete') return;

    if (document.body.contains(document.querySelector("#feedback"))) {
        form.remove()
        document.querySelector("#mycontainer").insertAdjacentHTML('afterbegin', `<h3 class="p-3">Thank you for your feedback</h3>`);
        return
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    form.remove()

    // Don't show invitation again, as form is already submitted
    localStorage.setItem('thirdNightInvitationResponse', 'never')

    if (data['marital'] == "married") {
        document.querySelector("#mycontainer").insertAdjacentHTML('afterbegin', `<h3 class="p-3">Thank you for your submission! It's been a great journey, but our service is officially closed.</h3>`);
        return
    }

    showSpinningWheel("#mycontainer", 'beforeend');

    data['email'] = normalizeEmail(data['email'])

    let { uuidBase64, dataBase64Key, wrapBase64Key, dataCryptoKey, wrapCryptoKey } = await getKeys(data['email'], data['password'])

    // Remove unwanted fields
    delete data['marital'];
    delete data['password'];

    data['command'] = localStorage['command'] || 'create';

    if (['update', 'delete'].includes(data['command'])) {
        data['uuid_old'] = localStorage['uuid'];
        data['dataKey_old'] = localStorage['dataKey']
        data['wrapKey_old'] = localStorage['wrapKey']
    }

    data['uuid'] = uuidBase64;
    data['dataKey'] = dataBase64Key
    data['wrapKey'] = wrapBase64Key

    data['href'] = window.location.href;

    const randomIV = crypto.getRandomValues(new Uint8Array(12));
    let encryptedData = await encryptData(globalThis.commonCryptoKey, randomIV, JSON.stringify(data));
    let newData = {
        iv: randomIV.toBase64(),
        data: encryptedData
    };

    await fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSdK34FNXND7FtxC0qJwW-mpuZYLbymiowQow-28t5HlK4TfCA/formResponse", {
        body: `ifq&entry.91771275=${encodeURIComponent(JSON.stringify(newData))}&submit=Submit`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        mode: "no-cors"
    }).catch(console.error)

    removeSpinningWheel()

    if (['update', 'delete'].includes(data['command'])) {
        document.querySelector("#mycontainer").insertAdjacentHTML('afterbegin', `<h3 class="p-3">Thank you! Your profile will be ${data['command']}d within 24 hours.</h3>`);
    } else {
        document.querySelector("#mycontainer").insertAdjacentHTML('afterbegin', `<h3 class="p-3">Thank you! Your profile will be created within 24 hours.</h3>
                <h3 class="p-3">View profiles here: <a href="${martialURL}" target="_blank">${martialURL.replace("https://", "")}</a> — Please save this link for future use.</h3>`);
    }
}


async function ready() {
    showSpinningWheel("#mycontainer", 'beforeend');
    await initializeGlobalVariables()
    const form = document.getElementById("myform");
    let formFields, htmlText;
    if ((localStorage.getItem('thirdNightInvitationEligible') && localStorage.getItem('thirdNightInvitationResponse') !== 'never') || ['update', 'delete'].includes(localStorage['command'])) {
        formFields = await fetch(`${martialURL}/questions.json`).then(res => res.json())
        htmlText = `<h3 class="m-3">Personal Profile</h3>`;
        document.title = "Personal Profile Form";
    }
    else {
        formFields = await fetch("feedback.json").then(res => res.json())
        htmlText = `<h3 class="m-3">Feedback Form</h3>`;
    }



    for (let field of formFields) {
        if (field.type === "radio" || field.type === "checkbox")
            htmlText += getRadioHTML(field.legend, field.name, field.type, field.radios, field.required);
        else
            htmlText += getInputHTML(field.tag, field.label, field.info, field.attributes);
    }
    htmlText += `<button id="submit" type="submit" class="btn btn-primary mb-3" onclick="submitForm(this); return false;">Submit</button>`
    removeSpinningWheel()
    form.insertAdjacentHTML('afterbegin', htmlText);

    if (localStorage['command'] == 'update') {
        document.querySelector("#email").value = localStorage['email'] || '';
        document.querySelector("#religiousness").value = localStorage['religiousness'] || '';
    }


}



document.addEventListener("DOMContentLoaded", ready);

