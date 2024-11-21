document.getElementById("loginForm").addEventListener("submit", function(event) {  
    event.preventDefault(); 

    const username = document.getElementById("username").value;  
    const password = document.getElementById("password").value;  

    fetch('http://localhost:3000/', { 
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json'  
        },  
        body: JSON.stringify({ email, password })  
    })  
    .then(response => {  
        if (!response.ok) {  
            throw new Error('Error en la autenticación');  
        }  
        return response.json();  
    })  
    .then(data => {  
        if (data.success) {  
            window.location.href = 'home.html'; 
        } else {  
            alert('Nombre de usuario o contraseña incorrectos');  
        }  
    })  
    .catch(error => {  
        console.error('Error:', error);  
        alert('Hubo un problema con la autenticación. Inténtalo de nuevo más tarde.');  
    });  
});