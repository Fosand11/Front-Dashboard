document.addEventListener('DOMContentLoaded', () => {  
    loadUsers();  
});

// Función para cargar la lista de usuarios
function loadUsers() {  
    fetch('http://localhost:3000/users')  // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            console.log(data);
            if (data && data.data && Array.isArray(data.data.users)) {  // Verificar que la respuesta tenga la propiedad 'data.users' y que sea un arreglo
                const usersTableBody = document.getElementById('usersTable').querySelector('tbody');  
                usersTableBody.innerHTML = '';  // Limpiar tabla antes de agregar datos  

                data.data.users.forEach(user => {  // Acceder a 'data.data.users' que contiene los usuarios
                    const row = document.createElement('tr');  
                    row.innerHTML = `  
                        <td>${user.id}</td>  
                        <td>${user.username}</td>  
                        <td>${user.email}</td>  
                        <td>${user.role}</td>  
                        <td>
                            <button onclick="editUser(${user.id})">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>  
                    `;  
                    usersTableBody.appendChild(row);  
                });
            } else {
                console.error('No users found in the response.');
            }
        })  
        .catch(error => console.error('Error loading users:', error));  
}

// Función para eliminar un usuario
function deleteUser(id) {
    const token = localStorage.getItem('authToken'); // Asumiendo que el token está guardado en localStorage

    if (!token) {
        alert('You must be logged in to perform this action.');
        return;
    }

    fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('User deleted successfully');
            loadUsers();  // Recargar la lista de usuarios
        } else {
            alert('Failed to delete user: ' + data.message);
        }
    })
    .catch(error => console.error('Error deleting user:', error));
}

// Función para editar un usuario
function editUser(id) {
    // Primero obtener los datos del usuario
    fetch(`http://localhost:3000/users/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.user) {
                const user = data.user;
                // Mostrar el formulario con los valores actuales del usuario
                document.getElementById('editUserId').value = user.id;
                document.getElementById('editUsername').value = user.username;
                document.getElementById('editEmail').value = user.email;
                document.getElementById('editRole').value = user.role;
                // Mostrar el modal de edición
                document.getElementById('editUserModal').style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

// Función para guardar los cambios de un usuario
function saveUserChanges() {
    const id = document.getElementById('editUserId').value;
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const role = document.getElementById('editRole').value;
    
    const token = localStorage.getItem('authToken');

    fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            role
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('User updated successfully');
            loadUsers();
            // Ocultar modal de edición
            document.getElementById('editUserModal').style.display = 'none';
        } else {
            alert('Failed to update user: ' + data.message);
        }
    })
    .catch(error => console.error('Error updating user:', error));
}
