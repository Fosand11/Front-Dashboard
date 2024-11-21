document.addEventListener('DOMContentLoaded', async () => {
    const registerForm = document.getElementById('registerForm');

    // Función para validar que la contraseña sea robusta
    const isPasswordStrong = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    // Función para validar el formato del correo electrónico
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const submitButton = registerForm.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Deshabilitar el botón para prevenir clics adicionales
    
        // Obtener valores del formulario
        const formData = Object.fromEntries(new FormData(registerForm));
        const { email, password } = formData;

        // Validar el formato del correo electrónico
        if (!isValidEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            submitButton.disabled = false;
            return;
        }

        // Validar la robustez de la contraseña
        if (!isPasswordStrong(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.');
            submitButton.disabled = false;
            return;
        }

        try {
            const response = await fetch('https://192.168.77.64:3000/register', {
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
            alert('Ocurrió un error. Por favor, intenta de nuevo.');
        } finally {
            submitButton.disabled = false; // Rehabilitar el botón al finalizar
        }        
    });
});
