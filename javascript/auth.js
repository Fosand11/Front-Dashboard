// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('No tienes acceso a esta página. Por favor, inicia sesión.');
        window.location.href = 'login.html'; // Cambia esto al nombre de tu archivo de inicio de sesión.
    }
});
