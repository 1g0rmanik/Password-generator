
const range = document.getElementById("range");
const currentValue = document.getElementById("currentValue");
const pass = document.getElementById("password");
const numbersOnly = document.getElementById("numbers");
const symbolsOnly = document.getElementById("symbols");
const lettersOnly = document.getElementById("letters");

function evaluatePasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#^]/.test(password)) score++;

    return score;
}
function updateStrengthMeter(password) {
    const strengthIndicator = document.getElementById("strength-indicator");
    const strengthText = document.getElementById("strength-text");
    const strength = evaluatePasswordStrength(password);

    let width = "20%";
    let color = "red";
    let text = "Weak";

    if (strength === 2) {
        width = "40%";
        color = "orange";
        text = "Medium";
    } else if (strength === 3 || strength === 4) {
        width = "60%";
        color = "yellow";
        text = "Good";
    } else if (strength === 5) {
        width = "100%";
        color = "green";
        text = "Strong";
    }

    strengthIndicator.style.width = width;
    strengthIndicator.style.backgroundColor = color;
    strengthText.textContent = text;
}

function generateRandomString(length = 8) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    if (numbersOnly.checked) {
        characters = "0123456789";
    }
    if (lettersOnly.checked) {
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    if (symbolsOnly.checked) {
        characters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }
    if (numbersOnly.checked && lettersOnly.checked) {
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
    if (symbolsOnly.checked && lettersOnly.checked) {
        characters = "!@#$%^&*()_+~`|}{[]:;?><,./-=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    if (numbersOnly.checked && symbolsOnly.checked) {
        characters = "0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }
    if (numbersOnly.checked && lettersOnly.checked && symbolsOnly.checked) {
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function updateValue() {
    currentValue.textContent = range.value;
    const password = generateRandomString(parseInt(range.value));
    pass.textContent = password;
    updateStrengthMeter(password);
}


function copyText() {
    const text = pass.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Текст скопійовано: " + text);
    }).catch((err) => {
        console.error("Помилка копіювання", err);
    });
}

range.addEventListener("input", updateValue);
numbersOnly.addEventListener("change", updateValue);
lettersOnly.addEventListener("change", updateValue);
symbolsOnly.addEventListener("change", updateValue);

updateValue();