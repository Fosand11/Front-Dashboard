document.addEventListener('DOMContentLoaded', () => {  
    loadUsers();  
});  

function loadUsers() {  
    fetch('http://localhost:3000/users') // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const usersTableBody = document.getElementById('usersTable').querySelector('tbody');  
            usersTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

            data.forEach(user => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${user.id}</td>  
                    <td>${user.username}</td>  
                    <td>${user.email}</td>  
                    <td>${user.role}</td>  
                `;  
                usersTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error loading users:', error));  
}