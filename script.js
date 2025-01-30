const USERS = { user: "1234" }; // Usuário pré-definido

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");
    
    if (USERS[username] && USERS[username] === password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
    } else {
        message.textContent = "Usuário ou senha incorretos!";
    }
}

function checkAuth() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Verifica se está na página inicial e se o usuário está autenticado
if (window.location.pathname.includes("home.html")) {
    checkAuth();
}