const passwordDisplay = document.getElementById('password-display');
const lengthSlider = document.getElementById('password-length');
const lengthValue = document.getElementById('length-value');
const copyButton = document.getElementById('copy-btn');
const generateButton = document.getElementById('generate-btn');
const strengthIndicator = document.getElementById('strength-indicator');

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

generateButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        alert('Şifre kopyalandı!');
    }).catch(err => {
        alert('Şifre kopyalanamadı: ' + err);
    });
});

function generatePassword() {
    const length = parseInt(lengthSlider.value, 10);
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = '';
    if (uppercaseCheckbox.checked) charPool += upperChars;
    if (lowercaseCheckbox.checked) charPool += lowerChars;
    if (numbersCheckbox.checked) charPool += numberChars;
    if (symbolsCheckbox.checked) charPool += symbolChars;

    if (charPool === '') {
        alert('En az bir seçenek seçmelisiniz!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    passwordDisplay.value = password;
    updateStrength(charPool.length, length);
}

function updateStrength(poolSize, length) {
    const combinations = Math.pow(poolSize, length);
    const guessesPerSecond = 1e9; // 1 milyar/saniye
    const timeToCrack = combinations / guessesPerSecond;

    if (timeToCrack < 1e6) {
        strengthIndicator.textContent = 'Şifre Gücü: Zayıf';
    } else if (timeToCrack < 1e12) {
        strengthIndicator.textContent = 'Şifre Gücü: Orta';
    } else {
        strengthIndicator.textContent = 'Şifre Gücü: Güçlü';
    }
}
