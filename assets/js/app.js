const btnEncrypted = document.getElementById('btnEncrypted');
const btnDecrypted = document.getElementById('btnDecrypted');
const inptTextArea = document.getElementById('inptTextArea');
const outptTextArea = document.getElementById('outptTextArea');
const btnCopyResult = document.getElementById('btnCopyResult');
const pre_information = document.getElementsByClassName("pre-information");
const toggleDarkMode = document.getElementById('switch-shadow');

const keysEncoded = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

document.addEventListener('DOMContentLoaded', () => {
    inptTextArea.addEventListener("input", validateText);
    btnEncrypted.addEventListener('click', encrypt);
    btnDecrypted.addEventListener('click', decrypt);
    btnCopyResult.addEventListener('click', copyResult);
    toggleDarkMode.addEventListener('click', toggleMode);
});

function encrypt() {
    if (inptTextArea.value !== "") {
        const encrypted = transformText(inptTextArea.value, keysEncoded);
        writeResult(encrypted);
    }
}

function decrypt() {
    if (inptTextArea.value !== "") {
        const decrypted = transformText(inptTextArea.value, invertObject(keysEncoded));
        writeResult(decrypted);
    }
}

function transformText(text, transformKeys) {
    return Object.keys(transformKeys).reduce((acc, key) => {
        const regex = new RegExp(key, "g");
        return acc.replace(regex, transformKeys[key]);
    }, text);
}

function invertObject(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[obj[key]] = key;
        return acc;
    }, {});
}

function writeResult(text) {
    outptTextArea.value = text;
    showOrHideTextOutput("none", "block");
}

function copyResult() {
    outptTextArea.select();
    navigator.clipboard?.writeText(outptTextArea.value) || document.execCommand("copy");
}

function validateText() {
    if (inptTextArea.value === "") {
        showOrHideTextOutput("block", "none");
        return;
    }
    const regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;
    inptTextArea.value = inptTextArea.value.replace(regex, "");
}

function showOrHideTextOutput(style1, style2) {
    for (const info of pre_information) {
        info.style.display = style1;
    }
    outptTextArea.style.display = style2;
    btnCopyResult.style.display = style2;
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}
