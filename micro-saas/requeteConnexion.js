function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://yourdomain.com/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            Swal.fire({
                title: 'Connexion réussie',
                text: 'Vous êtes maintenant connecté.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            closeLoginForm();
            document.getElementById('login-button').style.display = 'none';
            document.getElementById('signup-button').style.display = 'none';
            document.getElementById('logout-button').style.display = 'block';
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Erreur',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}
