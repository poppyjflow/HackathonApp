function registerHandlers(){
    document.getElementById("newACTButton").addEventListener("click", newACT);
    document.getElementById("backButton").addEventListener("click", goBack);
}

function newACT(){
    console.log("all is good");
    window.location.href = "http://localhost:3000/newACT.html";
}
function goBack(){
    console.log("all is good");
    window.location.href = "http://localhost:3000/home.html";
}

document.addEventListener("DOMContentLoaded", registerHandlers);