// Captura el formulario por su ID
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Agrega un event listener para manejar el envío del formulario
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado de recargar la página

  // Captura los valores de los campos de entrada
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Enviar una solicitud POST usando fetch
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    // Manejo de la respuesta
    const data = await response.json();

    if (response.ok) {
      // Si la solicitud fue exitosa, guarda el token en localStorage
      localStorage.setItem('token', data.token);
      messageDiv.innerHTML = '<p style="color: green;">Inicio de sesión exitoso. Redirigiendo...</p>';
      // Redirigir al dashboard después de un breve retraso
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } else {
      // Mostrar mensaje de error si el login falla
      messageDiv.innerHTML = `<p style="color: red;">Error: ${data.message || 'Credenciales incorrectas'}</p>`;
    }
  } catch (error) {
    // Manejo de errores en la solicitud
    messageDiv.innerHTML = '<p style="color: red;">Hubo un problema con la solicitud. Inténtalo de nuevo.</p>';
    console.error('Error:', error);
  }
});
