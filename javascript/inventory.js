document.addEventListener('DOMContentLoaded', () => {  
    loadInventory();  
    document.getElementById('addInventoryForm').addEventListener('submit', addInventory);  
    document.getElementById('updateInventoryBtn').addEventListener('click', updateInventory);  
});  

function loadInventory() {  
    fetch('http://localhost:3000/inventory')  
        .then(response => response.json())  
        .then(data => {  
            const inventoryTableBody = document.getElementById('inventoryTable').querySelector('tbody');  
            inventoryTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos 
            
            data.data.products.forEach(item => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${item.id}</td>  
                    <td>${item.product_name}</td>  
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>  
                `;  
                inventoryTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error loading inventory:', error));  
}  

function addInventory(event) {  
    event.preventDefault();  
    const productName = document.getElementById('productName').value;  
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;  

    fetch('http://localhost:3000/inventory', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ productName: productName, quantity: quantity, price: price })  
    })  
    .then(response => response.json())  
    .then(data => {  
        console.log(data.message); // Mensaje de éxito  
        loadInventory(); // Recargar inventario  
    })  
    .catch(error => console.error('Error adding inventory:', error));  
}  

function updateInventory() {  
    const id = document.getElementById('updateInventory').value;
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    fetch(`http://localhost:3000/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: productName, quantity: quantity, price: price })
    }) // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const inventoryTableBody = document.getElementById('inventoryTable').querySelector('tbody');
            loadInventory();  
        })  
        .catch(error => console.error('Error searching inventory:', error));  
}