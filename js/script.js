var placaNum;
var hoje = new Date();
var numColunas;
var qtdeItensDB = localStorage.length / 9;
var tabelaDados;
var defini = ["num", "placa", "dia", "mes", "ano", "hora", "minuto", "pago", "saiu"];


function geraTicket(plac) {
  placaNum = plac.toUpperCase();
  var num = getRandomInt();
  qtdeItensDB = localStorage.length / 9;
  //var existe = procurar(tabelaDados, placaNum);
  var busca = buscaPlacaDB(placaNum);
  // alert(busca);

  if (placaNum == "" || placaNum == null){
    alert("Favor digitar uma placa válida!");
    document.getElementById("num_Placa").value = "";
    document.getElementById("num_Placa").focus;
  }else if( qtdeItensDB === 0){
    //var 0 = new Map(Object.entries(localStorage));
    localStorage.setItem(0 + '.' + defini.indexOf('num') + '.' + defini[0], num);
    localStorage.setItem(0 + '.' + defini.indexOf('placa') + '.' + defini[1], placaNum);
    localStorage.setItem(0 + '.' + defini.indexOf('dia') + '.' + defini[2], hoje.getDate());
    localStorage.setItem(0 + '.' + defini.indexOf('mes') + '.' + defini[3], hoje.getMonth()+1);
    localStorage.setItem(0 + '.' + defini.indexOf('ano') + '.' + defini[4], hoje.getFullYear());
    localStorage.setItem(0 + '.' + defini.indexOf('hora') + '.' + defini[5], hoje.getHours());
    localStorage.setItem(0 + '.' + defini.indexOf('minuto') + '.' + defini[6], hoje.getMinutes());
    localStorage.setItem(0 + '.' + defini.indexOf('pago') + '.' + defini[7], "N");
    localStorage.setItem(0 + '.' + defini.indexOf('saiu') + '.' + defini[8], "N");
    alert('Ticket gerado com sucesso: ' + num);
    document.getElementById("num_Placa").value = "";
    //alert(localStorage.getItem(0 + '.' + defini.indexOf('num') + '.' + defini[0]));
    window.location.replace("../caixa_gerenc/gerenciamento.html");
  }else if (busca == true){
    alert("Placa já se encontra cadastrada no sistema.");
    // alert("Placa digita: " + placaNum);
    // alert(num);
    placaNum = "";
    num = "";
    document.getElementById("num_Placa").value = "";
    document.getElementById("num_Placa").focus;
  }else{
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('num') + '.' + defini[0], num);
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('placa') + '.' + defini[1], placaNum);
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('dia') + '.' + defini[2], hoje.getDate());
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('mes') + '.' + defini[3], hoje.getMonth() + 1);
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('ano') + '.' + defini[4], hoje.getFullYear());
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('hora') + '.' + defini[5], hoje.getHours());
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('minuto') + '.' + defini[6], hoje.getMinutes());
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('pago') + '.' + defini[7], "N");
    localStorage.setItem(qtdeItensDB + '.' + defini.indexOf('saiu') + '.' + defini[8], "N");
    alert('Ticket gerado com sucesso, Ticket Nº: ' + num);
    document.getElementById("num_Placa").value = "";
    //alert(localStorage.getItem(qtdeItensDB + '.' + defini.indexOf('num') + '.' + defini[0]));
    qtdeItensDB = localStorage.length / 9;
    window.location.replace("../caixa_gerenc/gerenciamento.html");


  }
  
  
}

function buscaPlacaDB(placa){
  qtdeItensDB = localStorage.length / 9;
  for(i=0; i < qtdeItensDB; i++){
    if (localStorage.getItem(i + "." + defini.indexOf('placa') + "." + defini[1]) == placa ){
      //alert("Achou");
      return true;
      break;
    }
  }
  return false;

}


function atualizaTabelaNaoPago(){
  var tabela = window.document.getElementById("tableTicketNaoPago");
  var rows = tabela.getElementsByTagName("tr");
  var linhas = tabela.rows.length;
  var novoLength = 0;
  qtdeItensDB = localStorage.length / 9;
  if (linhas == 0) {
    numColunas = 8;
  } else {
    numColunas = tabela.rows[linhas - 1].cells.length;
  }
  
  for(h=0; h <= qtdeItensDB; h++){
    if (localStorage.getItem(h + "." + 0 + "." + defini[0]) === null){
      novoLength = novoLength + 1;  
    }
  }
  //alert(novoLength);
  novoLength = novoLength + qtdeItensDB;
  //alert(novoLength);

  if (localStorage.length == 0 ){
    alert("Sem tickets cadastrados no sistema, favor dar entrada no ticket primeiro!!!");
  }else{
    for(i=0; i <= novoLength; i++){
      var novaLinha = tabela.insertRow(i);      
      var teste = localStorage.getItem(i + "." + 0 + "." + defini[0]);
      //alert(teste);
      if (localStorage.getItem(i + "." + 0 + "." + defini[0]) === null){
          continue;
      }else if(localStorage.getItem(i + "." + 7 + "." + defini[7]) == "N"){  
        for(j=0; j < defini.length; j++){
          
          //console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
          //Insere uma nova célula
          newCell = novaLinha.insertCell(j);
          // Insere um conteúdo na coluna
          newCell.innerHTML = localStorage.getItem(i + "." + j + "." + defini[j]);        
        }
        var celula10 = novaLinha.insertCell(9);
        var celula11 = novaLinha.insertCell(10);
        celula10.innerHTML = "<button onClick='pagarTicketTable(this)'>Pagar</button>";
        celula11.innerHTML = "<button onClick='removerLinhaTabelaNaoPagos(this)'>Excluir</button>";
      }
    }
  }

}

function atualizaTabelaPago(){
  var tabela = document.getElementById("tableTicketPago");
  var rows = tabela.getElementsByTagName("tr");
  var linhas = tabela.rows.length;
  var novoLength = 0;
  qtdeItensDB = localStorage.length / 9;
  if (linhas == 0) {
    numColunas = 8;
  } else {
    numColunas = tabela.rows[linhas - 1].cells.length;
  }
  
  for(h=0; h <= qtdeItensDB; h++){
    if (localStorage.getItem(h + "." + 0 + "." + defini[0]) === null){
      novoLength = novoLength + 1;  
    }
  }
  //alert(novoLength);
  novoLength = novoLength + qtdeItensDB;
  //alert(novoLength);

  if (localStorage.length == 0 ){
    alert("Sem tickets cadastrados no sistema, favor dar entrada no ticket primeiro!!!");
  }else{
    for(i=0; i < novoLength; i++){
      var novaLinha = tabela.insertRow(i);
      if(localStorage.getItem(i + "." + 7 + "." + defini[7]) == "S"){
        
        for(j=0; j < defini.length; j++){
          console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
          //Insere uma nova célula
          newCell = novaLinha.insertCell(j);
          // Insere um conteúdo na coluna
          newCell.innerHTML = localStorage.getItem(i + "." + j + "." + defini[j]);        
        }
        var celula10 = novaLinha.insertCell(9);
        var celula11 = novaLinha.insertCell(10);
        celula10.innerHTML = "<a href='../caixa_saida/saida.html'><button>Sair</button></a>";
        celula11.innerHTML = "<button onClick='removerLinhaTabelaNaoPagos(this)'>Excluir</button>";
      }
    }
  }

}

function atualizaTabelaPagoNaoSaiu(){
  var tabela = document.getElementById("tableTicketPago");
  var rows = tabela.getElementsByTagName("tr");
  var linhas = tabela.rows.length;
  var novoLength = 0;
  qtdeItensDB = localStorage.length / 9;
  if (linhas == 0) {
    numColunas = 8;
  } else {
    numColunas = tabela.rows[linhas - 1].cells.length;
  }
  
  for(h=0; h <= qtdeItensDB; h++){
    if (localStorage.getItem(h + "." + 0 + "." + defini[0]) === null){
      novoLength = novoLength + 1;  
    }
  }
  //alert(novoLength);
  novoLength = novoLength + qtdeItensDB;
  //alert(novoLength);


  if (localStorage.length == 0 ){
    alert("Sem tickets cadastrados no sistema, favor dar entrada no ticket primeiro!!!");
  }else{
    for(i=0; i < novoLength; i++){
      var novaLinha = tabela.insertRow(i);
      if(localStorage.getItem(i + "." + 7 + "." + defini[7]) === "S" && localStorage.getItem(i + "." + 8 + "." + defini[8]) === "N"){
       
        for(j=0; j < defini.length; j++){
          console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
          //Insere uma nova célula
          newCell = novaLinha.insertCell(j);
          // Insere um conteúdo na coluna
          newCell.innerHTML = localStorage.getItem(i + "." + j + "." + defini[j]);        
        }
        var celula10 = novaLinha.insertCell(9);
        var celula11 = novaLinha.insertCell(10);
        celula10.innerHTML = "<a href='../caixa_saida/saida.html'><button>Sair</button></a>";
        celula11.innerHTML = "<button onClick='removerLinhaTabelaNaoPagos(this)'>Excluir</button>";
      }
    }
  }

}


function getRandomInt(min=0, max=1000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function voltar() {
    window.location.replace("../index.html");
}

function load_home(){
    document.getElementById("content").innerHTML='<object type="type/html" data="home.html" ></object>';
}

function removerLinhaTabelaNaoPagos(linha1) {
  var i = linha1.parentNode.parentNode.rowIndex - 1;
  alert(i);
  for(j=0; j < defini.length; j++){
    console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
    localStorage.removeItem(i + "." + j + "." + defini[j]);       
  }
  document.getElementById("tableTicketNaoPago").deleteRow(i);
  window.location.reload();
  // atualizaTabelaPagoNaoSaiu();

  
}

function pagarTicketTable(linha){
  var i = linha.parentNode.parentNode.rowIndex - 1;
  var plac = document.getElementById("dados[0]");
  if (plac !== null){
    var tab = document.getElementById("tableTicketNaoPago");
    var linTab = tab.rows.length;
    var cell = tab.rows[i].cells[0];

    for(j=0; j < defini.length; j++){
      //console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
      //localStorage.removeItem(i + "." + j + "." + defini[j]);       
      var dados = document.getElementById("dados["+j+"]");
      //console.log(dados);
      dados.innerHTML = localStorage.getItem(i + "." + j + "." + defini[j]);
    }
    
    //console.log(tab.rowIndex(0));
    //console.log(cell.innerText);
    
    //plac.innerHTML = "Teste";

  }else{
    window.location.href = "../caixa_pag/pagamento.html";
  }
}

function pagarTicket(){
  var nTicket = window.document.getElementById("dados[0]").innerText;
  var nTicket1 = window.document.getElementById("ticket");
  //alert(nTicket);
  if(nTicket === "" || null){
    alert("Favor digitar um número de ticket para a pesquisa");
    window.document.getElementById("ticket").focus();
  }else{
    //alert("Vai Pagar");
    var qtdeItensDB = localStorage.length / 9;
    var buscaTick = buscaTicket(nTicket);
    if (buscaTick === true){
      //alert(confirm("Confirma?"));
      if (confirm("Confirma o pagamento do ticket?")){
        for(i=0; i < qtdeItensDB; i++){
          if (localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]) == nTicket){
            //var novaLinha = tabela.insertRow(i);
            //for(j=0; j < defini.length; j++){
              //console.log(localStorage.getItem(i + "." + 0 + "." + defini[j]));
              // var num = localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]);
              // var placa = localStorage.getItem(i + "." + defini.indexOf('placa') + "." + defini[1]);
              // var dia = localStorage.getItem(i + "." + defini.indexOf('dia') + "." + defini[2]);
              // var mes = localStorage.getItem(i + "." + defini.indexOf('mes') + "." + defini[3]);
              // var ano = localStorage.getItem(i + "." + defini.indexOf('ano') + "." + defini[4]);
              // var hora = localStorage.getItem(i + "." + defini.indexOf('hora') + "." + defini[5]);
              // var minuto = localStorage.getItem(i + "." + defini.indexOf('minuto') + "." + defini[6]);
              localStorage.setItem(i + "." + defini.indexOf('pago') + "." + defini[7], "S");
              // var saiu = localStorage.getItem(i + "." + defini.indexOf('saiu') + "." + defini[8]);
              //var resul = [num, placa, dia, mes, ano, hora, minuto, pago, saiu];
              //plac.innerHTML = placa;
              // for(j=0; j <resul.length; j++){
              //   document.getElementById("dados["+j+"]").innerHTML = resul[j];
              // }
              window.location.reload();
  
          }
        }
      }else{
        for(j=0; j < 9; j++){
          window.document.getElementById("dados["+j+"]").innerText = "";
        }
        window.document.getElementById("ticket").value = "";
        window.document.getElementById("ticket").focus();
      }
      

    }
  
  }
}

function buscarTicket(){
  var tick = document.getElementById("ticket").value;
  var plac = document.getElementById("dados[1]");
  //alert(tick);

  if (tick === "" || null){
    alert("Por favor digite um número de ticket válido");
    window.document.getElementById("ticket").focus();
  }else{
    qtdeItensDB = localStorage.length / 9;
    var busca = buscaTicket(tick);
    if (busca === true){
      for(i=0; i < qtdeItensDB; i++){
        if (localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]) == tick){
          //var novaLinha = tabela.insertRow(i);
          //for(j=0; j < defini.length; j++){
            //console.log(localStorage.getItem(i + "." + 0 + "." + defini[j]));
            var num = localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]);
            var placa = localStorage.getItem(i + "." + defini.indexOf('placa') + "." + defini[1]);
            var dia = localStorage.getItem(i + "." + defini.indexOf('dia') + "." + defini[2]);
            var mes = localStorage.getItem(i + "." + defini.indexOf('mes') + "." + defini[3]);
            var ano = localStorage.getItem(i + "." + defini.indexOf('ano') + "." + defini[4]);
            var hora = localStorage.getItem(i + "." + defini.indexOf('hora') + "." + defini[5]);
            var minuto = localStorage.getItem(i + "." + defini.indexOf('minuto') + "." + defini[6]);
            var pago = localStorage.getItem(i + "." + defini.indexOf('pago') + "." + defini[7]);
            var saiu = localStorage.getItem(i + "." + defini.indexOf('saiu') + "." + defini[8]);
            var resul = [num, placa, dia, mes, ano, hora, minuto, pago, saiu];
            //plac.innerHTML = placa;
            for(j=0; j <resul.length; j++){
              document.getElementById("dados["+j+"]").innerHTML = resul[j];
            }
            

        }
      }
      //alert(busca);
    }else{
      alert("Ticket não encontrado no sistema, favor conferir o número digitado.");
      window.document.getElementById("ticket").value = "";
      window.document.getElementById("ticket").focus();
      window.document.getElementById("placa").innerText = "";
      
    }
    
  } 
}

function buscaTicket(tick){
  qtdeItensDB = localStorage.length / 9;
  for(i=0; i < qtdeItensDB; i++){
    if (localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]) == tick){
      //alert("Achou");
      
      
      //alert(resul);
      return true;
      break;
    }
  }
  return false;

}


function saida(linha){
  //var i = linha.parentNode.parentNode.rowIndex - 1;
  var tabela = window.document.getElementById("tableTicketPago");
  //var nTicket = tabela.rows[i].cells[0].innerText;
  var qtdeItensDB = localStorage.length / 9;
  var numTicket = window.document.getElementById("codTicket").value;
  var buscaTick = buscaTicket(numTicket);
  alert(buscaTick);
  if (buscaTick === true){
    //if (confirm("Confirma o pagamento do ticket?")){
    for(i=0; i < qtdeItensDB; i++){
      if (localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]) == numTicket){
        //var novaLinha = tabela.insertRow(i);
        //for(j=0; j < defini.length; j++){
          //console.log(localStorage.getItem(i + "." + 0 + "." + defini[j]));
          // var num = localStorage.getItem(i + "." + defini.indexOf('num') + "." + defini[0]);
          // var placa = localStorage.getItem(i + "." + defini.indexOf('placa') + "." + defini[1]);
          // var dia = localStorage.getItem(i + "." + defini.indexOf('dia') + "." + defini[2]);
          // var mes = localStorage.getItem(i + "." + defini.indexOf('mes') + "." + defini[3]);
          // var ano = localStorage.getItem(i + "." + defini.indexOf('ano') + "." + defini[4]);
          // var hora = localStorage.getItem(i + "." + defini.indexOf('hora') + "." + defini[5]);
          // var minuto = localStorage.getItem(i + "." + defini.indexOf('minuto') + "." + defini[6]);
          localStorage.setItem(i + "." + defini.indexOf('saiu') + "." + defini[8], "S");
          // var saiu = localStorage.getItem(i + "." + defini.indexOf('saiu') + "." + defini[8]);
          //var resul = [num, placa, dia, mes, ano, hora, minuto, pago, saiu];
          //plac.innerHTML = placa;
          // for(j=0; j <resul.length; j++){
          //   document.getElementById("dados["+j+"]").innerHTML = resul[j];
          // }
          window.location.reload();

      }
    }
    //   }else{
    //     for(j=0; j < 9; j++){
    //       window.document.getElementById("dados["+j+"]").innerText = "";
    //     }
    //     window.document.getElementById("ticket").value = "";
    //     window.document.getElementById("ticket").focus();
    //   }
  }
}