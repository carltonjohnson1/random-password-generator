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

async function copyToClipboard() {
    const textToCopy = passwordField.value || "";
    if (!textToCopy) return false;

    // Try modern clipboard API first
    try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
    } catch (err) {
        // Fallback for non-secure contexts or older browsers
        try {
            passwordField.select();
            passwordField.setSelectionRange(0, textToCopy.length);
            const success = document.execCommand("copy");
            window.getSelection && window.getSelection().removeAllRanges();
            return success;
        } catch (_) {
            return false;
        }
    }
}

function showCopiedUI(success) {
    if (!success) return;
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied";
    copied.classList.add("show");
    setTimeout(() => {
        copied.classList.remove("show");
        copyBtn.textContent = originalText;
    }, 1200);
}

copyBtn.onclick = async () => {
    const success = await copyToClipboard();
    showCopiedUI(success);
};

// Also allow clicking the toast itself to copy, per the requested id
copied.onclick = async () => {
    const success = await copyToClipboard();
    showCopiedUI(success);
};