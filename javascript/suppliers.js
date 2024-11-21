document.addEventListener('DOMContentLoaded', () => {  
    loadSuppliers();  
    document.getElementById('addSupplierForm').addEventListener('submit', addSupplier);  
    document.getElementById('searchSupplierBtn').addEventListener('click', searchSupplier);  
});  

function loadSuppliers() {  
    fetch('https://192.168.77.64:3000/suppliers')   
        .then(response => response.json())  
        .then(data => {  
            const suppliersTableBody = document.getElementById('suppliersTable').querySelector('tbody');  
            suppliersTableBody.innerHTML = '';  

            console.log(data);

            data.data.suppliers.forEach(supplier => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${supplier.id}</td>  
                    <td>${supplier.company_name}</td> 
                `;  
                suppliersTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error loading suppliers:', error));  
}  

function addSupplier(event) {  
    event.preventDefault();  
    const companyName = document.getElementById('companyName').value;

    fetch('https://192.168.77.64:3000/suppliers', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
        body: JSON.stringify({ companyName: companyName })  
    })  
    .then(response => response.json())  
    .then(data => {  
        console.log(data.message); // Mensaje de éxito  
        loadSuppliers(); // Recargar proveedores  
    })  
    .catch(error => console.error('Error adding supplier:', error));  
}  

function searchSupplier() {  
    const searchName = document.getElementById('searchSupplier').value;  

    fetch(`https://192.168.77.64:3000/suppliers?name=${searchName}`) // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const suppliersTableBody = document.getElementById('suppliersTable').querySelector('tbody');  
            suppliersTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

            data.forEach(supplier => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${supplier.id}</td>  
                    <td>${supplier.companyName}</td>  
                `;  
                suppliersTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error searching supplier:', error));  
}