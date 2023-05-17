function registerHandlers(){
    document.getElementById("newExButton").addEventListener("click", newEx);
    document.getElementById("backButton").addEventListener("click", goBack);
}

function newEx(){
    console.log("all is good");
    window.location.href = "http://localhost:3000/newEx.html";
}
function goBack(){
    console.log("all is good");
    window.location.href = "http://localhost:3000/home.html";
}

document.addEventListener("DOMContentLoaded", registerHandlers);