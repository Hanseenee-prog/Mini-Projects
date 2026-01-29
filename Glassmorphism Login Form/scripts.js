const loginForm = document.querySelector('.form-container');
const inputs = document.querySelectorAll('.input-box input');
const toggleBtn = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password-input');

toggleBtn.addEventListener('click', () => {
    const isPassword = (passwordInput.type === 'password');
    passwordInput.type = isPassword ? 'text' : 'password';

    if (isPassword) {
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
});

loginForm.addEventListener('submit', (e) => {
    inputs.forEach(input => {
        if (!input.value.trim()) {
            e.preventDefault();
            input.classList.add('input-error');
            
            // Remove the class after animation finishes so it can be re-triggered
            setTimeout(() => {
                input.classList.remove('input-error');
            }, 500);
        }
    });
});