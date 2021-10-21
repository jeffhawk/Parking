var fields = document.querySelectorAll(".text-b input");
var btn = document.querySelector(".btn");
var btn1 = document.querySelector("btn1");
var user = "";


function check(){
    if(fields[0].value != "" && fields[1].value != "")
        btn.disabled = false;
    else
        btn.disabled = true;
}

function teste() {
    if(fields[0].value == "Jeff" && fields[1].value == "1234"){
        window.user = ""+fields[0].value;
        
        window.alert("Seja bem vindo, " + window.user);
        window.alert("Você será redirecionado" );
        
        document.getElementById("email").value = "";
        document.getElementById("email").focus();
        document.getElementById("senha").value = "";
        window.location.replace("pag.html");

    }else if(fields[0].value == "" && fields[1].value == ""){
        window.alert("Os campos não podem ser em branco");
    }else{
        window.alert("Usuário ou senha inválidos!");
    }
}

document.querySelector(".show-password").addEventListener("click", 
function () {
    if(this.classList[2] == "fa-eye-slash"){
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
        fields[1].type = "text";
    }else{
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
        fields[1].type = "password";
    }
})

function voltar() {
    alert("Usuário logado: " + window.user);
    window.location.replace("/index.html");
}

/*document.getElementById("email").value = "";
document.getElementById("email").focus();
document.getElementById("senha").value = "";*/



function inicia(){
    var test = document.ge

  
}


window.addEventListener("load", inicia);
fields[0].addEventListener("keyup", check);
fields[1].addEventListener("keyup", check);
btn.addEventListener("click", teste);
btn1.addEventListener("click", voltar);


