function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

async function handleSubmit(event, type) {
    event.preventDefault();

    const email = document.getElementById(`${type}-email`).value;
    const password = document.getElementById(`${type}-password`).value;

    const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, type }),
    });

    const result = await response.json();

    if (response.ok) {
        alert(result.message);
        window.location.href = '/main.html';  // Redirect to main page
    } else {
        alert(result.error);
    }
}

