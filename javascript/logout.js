document.getElementById('logoutButton').addEventListener('click', function() {  
    fetch('https://192.168.77.64:3000/logout', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
    })  
    .then(response => response.json())  
    .then(data => {  
        console.log(data.message); // 'Logout successful'  
        localStorage.removeItem('authToken'); // Limpia el token si lo estás usando  
        window.location.href = '../login.html'; // Redirige al usuario  
    })  
    .catch(error => console.error('Error:', error));  
});