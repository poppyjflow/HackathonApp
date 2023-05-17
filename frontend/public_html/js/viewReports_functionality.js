function registerHandlers(){
    document.getElementById("backButton").addEventListener("click", goBack);
}

function goBack(){
    console.log("all is good");
    window.location.href = "http://localhost:3000/home.html";
}

document.addEventListener("DOMContentLoaded", registerHandlers);