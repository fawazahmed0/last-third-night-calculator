const commonKey = 'sRCZJbf8ltHkmkqh/Gjqhk7tfP6L0Pq9S0dX+chXNzA='

function normalizeEmail(email) {
    if (!email.includes("@") || email.length < 3)
        throw "Invalid email address"
    let emailArr = email.trim().split("@")
    return `${emailArr.slice(0, -1).join("@")}@${emailArr.at(-1).toLowerCase()}`
}

function subsetJSON(json, keysToKeep) {
    let newjson = {}
    keysToKeep.forEach(e => newjson[e] = json[e])
    return newjson
}

async function encryptData(key, iv, data) {
    const encoder = new TextEncoder();
    const cipherText = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encoder.encode(data)
    );
    return new Uint8Array(cipherText).toBase64();
}

async function decryptData(key, iv, cipherTextBase64) {
    const decoder = new TextDecoder();
    const plainBuffer = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        Uint8Array.fromBase64(cipherTextBase64)
    );
    return decoder.decode(plainBuffer);
}

async function importBase64Key(base64String) {
    return await crypto.subtle.importKey(
        "raw",
        Uint8Array.fromBase64(base64String),
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
    );
}

// privateKeyValue can be base64 or Uint8Array or ArrayBuffer
async function getX25519Keys(privateKeyValue) {

    let pkcsKeyArray = await convertRawX25519KeyToPKCS(privateKeyValue)

    let privateKey = await crypto.subtle.importKey("pkcs8", pkcsKeyArray, { name: "X25519" }, true, ["deriveKey"])

    let jwkKey = await crypto.subtle.exportKey("jwk", privateKey)

    let { d: privateRaw, x: publicRaw } = jwkKey
    // Remove private key variables to create public key
    delete jwkKey.d;
    jwkKey.key_ops = [];
    let publicKey = await crypto.subtle.importKey("jwk", jwkKey, { name: "X25519" }, true, [])

    privateRaw = Uint8Array.fromBase64(privateRaw, { alphabet: "base64url" })
    publicRaw = Uint8Array.fromBase64(publicRaw, { alphabet: "base64url" })

    let privateBase64 = privateRaw.toBase64()
    let publicBase64 = publicRaw.toBase64()

    return { privateRaw, publicRaw, privateBase64, publicBase64, privateKey, publicKey };

}

async function convertRawX25519KeyToPKCS(privateKey, base64Options) {
    // Convert to raw if base64
    if (typeof privateKey === 'string' || privateKey instanceof String)
        privateKey = Uint8Array.fromBase64(privateKey, base64Options)

    // We use this key to know PKCS header data
    const tempKeys = await crypto.subtle.generateKey({ name: "X25519" }, true, ["deriveKey"])

    let pkcsKey = await crypto.subtle.exportKey("pkcs8", tempKeys.privateKey)
    let jwkKey = await crypto.subtle.exportKey("jwk", tempKeys.privateKey)

    let pkcsArray = new Uint8Array(pkcsKey)
    let jwkArray = Uint8Array.fromBase64(jwkKey.d, { alphabet: "base64url" })
    // Replace the private key part in the PKCS array with our private key to get PKCS format
    let pkcsString = pkcsArray.join(',').replace(jwkArray.join(','), privateKey.join(','))

    return new Uint8Array(pkcsString.split(','))
}

async function getAESKeyFromX25519(ourPrivateKey, theirPublicKey) {
    return await crypto.subtle.deriveKey({ name: "X25519", public: theirPublicKey },
        ourPrivateKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"])
}

function showSpinningWheel(selector, position) {
    if (!document.body.contains(document.querySelector('#spinningwheel'))) {
        document.querySelector(selector).insertAdjacentHTML(position, `<div  id="spinningwheel">
    <div class="text-center">
      <div class="spinner-border m-5" role="status">
      </div>
      </div>
      </div>
      `)
    }
}

function removeSpinningWheel() {
    if (document.body.contains(document.querySelector('#spinningwheel')))
        document.querySelector('#spinningwheel').remove()
}

function showModal(title, body, footer) {
    let myModal = new bootstrap.Modal(document.getElementById('modaldiv'))
    document.querySelector('#modaldiv .modal-title').innerHTML = title
    document.querySelector('#modaldiv .modal-body').innerHTML = body
    if (footer)
        document.querySelector('#modaldiv .modal-footer').innerHTML = footer
    myModal.show()
}

function showToast(title, body) {
    let myToast = new bootstrap.Toast(document.getElementById('mytoastdiv'))
    document.querySelector('#mytoastdiv strong').innerHTML = title
    document.querySelector('#mytoastdiv .toast-body').innerHTML = body
    myToast.show()
}

// Call this function after loading the module in nodejs or after domcontentloaded in ready func in browser
async function initializeGlobalVariables() {
    globalThis.commonCryptoKey = await crypto.subtle.importKey("raw", Uint8Array.fromBase64(commonKey), "AES-GCM", true, ["encrypt", "decrypt"]);
}


// Refer https://bitwarden.com/help/bitwarden-security-white-paper
async function getKeys(email, password) {

    let masterKey = await getMasterKey(password, email);
    let { data: dataCryptoKey, wrap: wrapCryptoKey } = await getDataAndWrapKeys(masterKey, ["data", "wrap"])

    let dataBase64Key = await getBase64KeyString(dataCryptoKey);
    let wrapBase64Key = await getBase64KeyString(wrapCryptoKey);

    let uuidCryptoKey = await getMasterKey(await crypto.subtle.exportKey("raw", masterKey), password)
    let uuidBase64 = await getBase64KeyString(uuidCryptoKey)

    return { uuidBase64, dataBase64Key, wrapBase64Key, dataCryptoKey, wrapCryptoKey }

}


async function getBase64KeyString(key) {
    return new Uint8Array(await crypto.subtle.exportKey("raw", key)).toBase64();
}

async function getMasterKey(password, salt) {
    const enc = new TextEncoder();
    if (isString(password))
        password = enc.encode(password);
    if (isString(salt))
        salt = enc.encode(salt);
    const masterPassword = await crypto.subtle.importKey(
        "raw",
        password,
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
    const masterKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 600_000,
            hash: "SHA-256",
        },
        masterPassword,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
    );
    return masterKey
}

async function exportImportKey(key, algorithm, extractable = true, usages) {
    const rawKey = await crypto.subtle.exportKey("raw", key);
    return await crypto.subtle.importKey("raw", rawKey, algorithm, extractable, usages);
}
// Data key to encrypt data
// Wrap key to encrypt other users data key
async function getDataAndWrapKeys(masterKey, infos) {

    masterKey = await exportImportKey(masterKey, "HKDF", false, ["deriveKey"]);
    let keyObject = {};

    for (let value of infos) {
        keyObject[value] = await crypto.subtle.deriveKey(
            {
                name: "HKDF",
                salt: new Uint8Array(),
                info: new TextEncoder().encode(value),
                hash: "SHA-256",
            },
            masterKey,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"],
        );
    }


    return keyObject

}

function isString(value) {
    return typeof value === "string" || value instanceof String;
}

async function decompressBlobToJSON(blob) {
    const ds = new DecompressionStream("gzip");
    const decompressedStream = blob.stream().pipeThrough(ds);
    return await new Response(decompressedStream).json();
}

// Recursively replace nested array
function recursiveReplaceArray(arr, jsonMap) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]))
            arr[i] = recursiveReplaceArray(arr[i], jsonMap)
        else
            arr[i] = arr[i] in jsonMap ? jsonMap[arr[i]] : arr[i]
    }
    return arr
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}



if (typeof process !== "undefined" && process.versions != null && process.versions.node != null)
    module.exports = {
        subsetJSON,
        normalizeEmail,
        encryptData,
        decryptData,
        importBase64Key,
        convertRawX25519KeyToPKCS,
        getX25519Keys,
        getAESKeyFromX25519,
        initializeGlobalVariables,
        getKeys,
        isString,
        getBase64KeyString,
        exportImportKey,
        decompressBlobToJSON,
        recursiveReplaceArray,
        getRandomInt,
    }