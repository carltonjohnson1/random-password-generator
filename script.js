const passwordField = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const copied = document.getElementById("copied");

function generatePassword(length = 14) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@~$%^&*()_+"
    let password = "";
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * chars.length);
        password += chars[randIndex];
    }
    return password;
}

generateBtn.onclick = () => {
    passwordField.value = generatePassword();
};

copyBtn.onclick = () => {
    navigator.clipboard.writeText(passwordField.value);
    copyBtn.textContent = "Yes";
    setTimeout(() => copyBtn.textContent = "", 1000);
    copied.classList.add("show");
    copyBtn.textContent = "Yes";
    setTimeout(() => {
        copied.classList.remove("show");
        copyBtn.textContent = "Copied";
    }, 1500);
};