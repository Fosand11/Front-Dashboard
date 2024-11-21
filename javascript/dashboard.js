function loadDashboardData() {
    const authToken = localStorage.getItem('authToken'); // Asume que guardaste el token en localStorage

    console.log('authToken:', authToken); // Asegúrate de que el token existe

    if (!token) {
        console.error('Token not found');
        return;
    }

    fetch('http://192.168.77.64:3000/dashboard-data', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
    })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Asegúrate de que esto devuelve JSON válido
        })
        .then(data => {
            console.log('Raw response data:', data); // Asegúrate de que obtienes los datos esperados

            const dashboardData = data.data;
            console.log('Dashboard Data:', dashboardData);

            document.getElementById('totalInventory').innerText = dashboardData.totalInventory;
            document.getElementById('totalSuppliers').innerText = dashboardData.totalSuppliers;
            document.getElementById('totalUsers').innerText = dashboardData.totalUsers;
        })
        .catch(error => console.error('Error loading dashboard data:', error));
}
