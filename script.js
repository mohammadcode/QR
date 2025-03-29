document.addEventListener('DOMContentLoaded', function() {
const qrForm = document.getElementById('qrForm');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const qrResult = document.getElementById('qrResult');
const qrTitle = document.getElementById('qrTitle');
const qrCode = document.getElementById('qrCode');
const downloadBtn = document.getElementById('downloadBtn');
qrForm.addEventListener('submit', function(e) {
e.preventDefault();
if (!titleInput.value.trim()) {
      showError(titleInput, 'لطفاً عنوان را وارد کنید');
      return;
}

if (!isValidUrl(urlInput.value)) {
      showError(urlInput, 'لطفاً یک لینک معتبر وارد کنید');
      return;
}
generateQRCode(titleInput.value, urlInput.value);
});
function generateQRCode(title, url) {
qrCode.innerHTML = '';
qrTitle.textContent = title;
new QRCode(qrCode, {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
});
qrResult.classList.remove('hidden');
qrResult.scrollIntoView({ behavior: 'smooth' });
}
function isValidUrl(string) {
try {
      new URL(string);
      return true;
} catch (_) {
      return false;
}
}
function showError(input, message) {
const formGroup = input.parentElement;
const errorDisplay = formGroup.querySelector('.input-hint');

errorDisplay.textContent = message;
errorDisplay.style.color = 'var(--error-color)';
input.style.borderColor = 'var(--error-color)';

input.addEventListener('input', function() {
      errorDisplay.textContent = 'لطفاً یک آدرس معتبر وارد کنید';
      errorDisplay.style.color = 'var(--light-text)';
      input.style.borderColor = '#e9ecef';
}, { once: true });
}
downloadBtn.addEventListener('click', function() {
const canvas = qrCode.querySelector('canvas');
if (!canvas) return;

const link = document.createElement('a');
link.download = `QRCode-${titleInput.value}.png`;
link.href = canvas.toDataURL('image/png');
link.click();
});

urlInput.addEventListener('input', function() {
if (this.value && !isValidUrl(this.value)) {
      this.setCustomValidity('لطفاً یک آدرس معتبر وارد کنید');
} else {
      this.setCustomValidity('');
}
});
});