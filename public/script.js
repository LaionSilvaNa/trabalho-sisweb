const USERS = { user: "ufba123" }; // Usuário pré-definido

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

document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const input = document.getElementById("numericInput").value;
    
    if (!/^[0-9]+$/.test(input)) {
        document.getElementById("responseMessage").innerText = "Erro: Apenas números são permitidos.";
        return;
    }
    
    fetch("/submit", { // Agora usamos "/submit", pois o servidor já hospeda os arquivos
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero: parseInt(input) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").innerText = data.message;
    })
    .catch(error => {
        document.getElementById("responseMessage").innerText = "Erro ao enviar os dados.";
    });
});

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const displayImage = document.getElementById("displayImage");
        displayImage.src = reader.result;
        displayImage.style.display = "block";
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Verifica se está na página inicial e se o usuário está autenticado
if (window.location.pathname.includes("home.html")) {
    checkAuth();
}

function saveText() {
    const textInput = document.getElementById("textInput");
    const messageList = document.getElementById("messageList");

    if (textInput.value.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = textInput.value;
        messageList.appendChild(listItem);
        
        textInput.value = ""; // Limpa o campo de entrada após o envio
    }
}

document.getElementById("fetchInfo").addEventListener("click", function() {
    fetch("/info")
        .then(response => response.json())
        .then(data => {
            document.getElementById("serviceName").innerText = data.service;
            document.getElementById("serviceVersion").innerText = data.version;
            document.getElementById("serviceStatus").innerText = data.status;
        })
        .catch(error => {
            console.error("Erro ao buscar informações do servidor:", error);
        });
});
