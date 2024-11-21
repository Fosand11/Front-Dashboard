document.addEventListener('DOMContentLoaded', () => {  
    loadDashboardData();  
});  

function loadDashboardData() {  
    fetch('http://localhost:3000/dashboard-data') // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            document.getElementById('totalProducts').innerText = data.totalProducts;  
            document.getElementById('totalSuppliers').innerText = data.totalSuppliers;  
            document.getElementById('totalUsers').innerText = data.totalUsers;  
            loadRecentActivities(data.activities);  
        })  
        .catch(error => console.error('Error loading dashboard data:', error));  
}  

function loadRecentActivities(activities) {  
    const activitiesTableBody = document.getElementById('activitiesTable').querySelector('tbody');  
    activitiesTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

    activities.forEach(activity => {  
        const row = document.createElement('tr');  
        row.innerHTML = `  
            <td>${activity.date}</td>  
            <td>${activity.description}</td>  
            <td>${activity.user}</td>  
        `;  
        activitiesTableBody.appendChild(row);  
    });  
}