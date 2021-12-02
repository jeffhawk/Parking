//const { response } = require("express");

//const { DATE } = require("oracledb");
//const { isDate } = require("util/types");

//const status = require("status");

function buscaVeiculo () {
	let codigo = document.getElementById('pesquisa').value
	let url = `http://localhost:5000/Veiculos/${codigo}`

	axios.get(url)
	.then(response => {
		mostraDados (response.data)		
	})
	.catch(error  =>  {
		if (error.response) {
			const msg = new Comunicado (error.response.data.codigo, 
										error.response.data.mensagem, 
										error.response.data.descricao);
			alert(msg.get());
		}	
	})

	event.preventDefault()
}

function mostraDados (dados, msg) {
	document.getElementById('codigo')     .innerHTML = `Código		    : ${dados.codigo}`
	document.getElementById('placa')      .innerHTML = `Placa	   	 	: ${dados.placa}`
	document.getElementById('dataentrada').innerHTML = `Data de Entrada : ${dados.dataentrada}`

	document.getElementById('codigo')     .className = ''
	document.getElementById('placa')      .className = ''
	document.getElementById('dataentrada').className = ''
	document.getElementById('mensagem')   .className = 'oculto'
}

function mostraMensagem () {
	document.getElementById('pesquisa')   .value = ''

	document.getElementById('codigo')     .className = 'oculto'
	document.getElementById('placa')      .className = 'oculto'
	document.getElementById('dataentrada').className = 'oculto'
	document.getElementById('mensagem')   .className = ''
}

function geraTicket(plac) {
  var placa = plac.toUpperCase();
  var codigo = getRandomInt();
  alert('Ticket gerado com sucesso, Ticket Nr.: ' + codigo);
   
  if (codigo !== "" && placa !== "") 
  {
		let objVeiculo = { codigo: parseInt(codigo), placa: placa, dataentrada: ''};
		let url = `http://localhost:5000/Veiculos/`

axios.post(url, objVeiculo)
		.then(response => {
			if (response.data) {
				const msg = new Comunicado (response.data.codigo, 
											response.data.mensagem, 
											response.data.descricao);
				//alert(msg.get());
				
			}
			alert('Ticket gerado com sucesso, Ticket Nr.: ' + codigo);
		})
		.catch(error  =>  {
			
			if (error.response) {
				const msg = new Comunicado (error.response.data.codigo, 
											error.response.data.mensagem, 
											error.response.data.descricao);
				alert(msg.get());
			}
		})
  }else
  {
		alert('Todos os dados precisam estar preenchidos.');
		alert("Favor digitar uma placa válida!");
		document.getElementById("num_Placa").value = "";
		document.getElementById("num_Placa").focus;
  }
}

function getRandomInt(min=0, max=1000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

/*BUSCA VEICULOS */
/***TICKET ENCERRADOS */
function buscaVeiculosEmAberto () {
	let url = `http://localhost:5000/Veiculos/`

axios.get(url)
	.then(response => {
		//console.log(response.data.length);
		criaListaDinamica(response.data);
	})
	.catch(error  =>  {
		alert(error)	
	})

	const criaListaDinamica = ( veiculos ) => {
		let tabela = window.document.getElementById("tableTicketNaoPago");
		let novoLength = 0;
		novoLength = veiculos.length;
		teste = Object.values(veiculos);
		let up = window.document.getElementById("updated");
		const ulVeiculos = document.getElementById('veiculos');
		//console.log(novoLength);
		veiculos.map(veiculo => {
			//alert(veiculo.status)
			// if (veiculo.status === 10)
			// {
			// 	const listaVeiculo = document.createElement('li');
			// 	listaVeiculo.innerHTML = `Codigo: ${veiculo.codigo} - Placa: ${veiculo.placa} - Data de Entrada: ${veiculo.dataentrada}`;
			// 	ulVeiculos.appendChild(listaVeiculo);
			// 	//alert("TICKET LIBERADOS")
		})
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				var novaLinha = tabela.insertRow(i);

				for(j=0; j<5; j++)
				{
					newCell = novaLinha.insertCell(j);
					if(j==0)
					{
						newCell.innerHTML = teste[i]["codigo"];
					}else if(j==1)
					{
						newCell.innerHTML = teste[i]["placa"];
					}else if(j==2)
					{
						newCell.innerHTML = teste[i]["dataentrada"];
					}else if(j==3)
					{
						newCell.innerHTML = teste[i]["status"];
					}else if(j==4)
					{
						newCell.innerHTML = "<button onClick='pagarTicketTable(this)'>Pagar</button>";						
					}
					
				}
			}
			//up.innerHTML = toString(Date);
	}
}

function pagarTicketTable(linha){
	let tabela = window.document.getElementById("tableTicketNaoPago");
	let i = linha.parentNode.parentNode.rowIndex - 1;
	let plac = document.getElementById("dados[0]");
	alert(linha);
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
/*
function buscaVeiculosPagos () {
	let url = `http://localhost:5000/Veiculos/`

	axios.get(url)
	.then(response => {
		criaListaDinamica(response.data)		
	})
	.catch(error  =>  {
		alert(error)	
	})

	const criaListaDinamica = ( veiculos ) => {
		var tabela = window.document.getElementById("tableTicketPago");
		var novoLength = 0;
		novoLength = veiculos.length;
		teste = Object.values(veiculos);
		const ulVeiculos = document.getElementById('veiculos')
		veiculos.map(veiculo => {
			//alert(veiculo.status)
			if (veiculo.status == 2)
			{
				const listaVeiculo = document.createElement('li')
				listaVeiculo.innerHTML = `Codigo: ${veiculo.codigo} - Placa: ${veiculo.placa} - Data de Entrada: ${veiculo.dataentrada}`
				ulVeiculos.appendChild(listaVeiculo)
				//alert("TICKET NAO LIBERADOS")
			}
		})
		for(i=0; i < novoLength; i++)
			{
				var novaLinha = tabela.insertRow(i);

				for(j=0; j<5; j++)
				{
					newCell = novaLinha.insertCell(j);
					if(j==0)
					{
						newCell.innerHTML = teste[i]["codigo"];
					}else if(j==1)
					{
						newCell.innerHTML = teste[i]["placa"];
					}else if(j==2)
					{
						newCell.innerHTML = teste[i]["dataentrada"];
					}else if(j==3)
					{
						newCell.innerHTML = teste[i]["datasaida"];
					}else if(j==4)
					{
						newCell.innerHTML = teste[i]["status"];
					}
					
				}
			}

  }
}*/

/* 
function buscaVeiculos () {
	let url = `http://localhost:5000/Veiculos/`

	axios.get(url)
	.then(response => {
		criaListaDinamica(response.data)		
	})
	.catch(error  =>  {
		alert(error)	
	})

	const criaListaDinamica = ( veiculos ) => {
		const ulVeiculos = document.getElementById('veiculos')
		veiculos.map(veiculo => {
			const listaVeiculo = document.createElement('li')
			listaVeiculo.innerHTML = `Codigo: ${veiculo.codigo} - Placa: ${veiculo.placa} - Data de Entrada: ${veiculo.dataentrada} `
			ulVeiculos.appendChild(listaVeiculo)
    })
  }
}
*/

/*** */



function Comunicado (codigo,mensagem,descricao)
{
	this.codigo    = codigo;
	this.mensagem  = mensagem;
	this.descricao = descricao;
	
	this.get = function ()
	{
		return (this.codigo   + " - " + 
		        this.mensagem + " - " +
			    this.descricao);

	}
}



