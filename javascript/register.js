document.addEventListener('DOMContentLoaded', async () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const submitButton = registerForm.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Deshabilitar el botón para prevenir clics adicionales
    
        try {
            // Convertir los datos del formulario en un objeto
            const formData = Object.fromEntries(new FormData(registerForm));

            const response = await fetch('http://192.168.77.64:3000/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData),
            });
        
            if (!response.ok) {
                // Manejo explícito de errores HTTP
                const errorMessage = await response.text();
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }
        
            const data = await response.json();
            if (data.success) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Error desconocido.');
            }
        } catch (error) {
            console.error('Error durante el registro:', error);
            // alert('Ocurrió un error. Por favor, intenta de nuevo.');
        } finally {
            submitButton.disabled = false; // Rehabilitar el botón al finalizar
        }        
    });
});
