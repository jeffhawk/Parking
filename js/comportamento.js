//const { response } = require("express");

//const { DATE } = require("oracledb");
//const { isDate } = require("util/types");

//const status = require("status");

function buscaVeiculo () {
	let codigo = document.getElementById('dados[0]').value
	let url = `http://localhost:5000/Veiculos/${codigo}`

	axios.get(url)
	.then(response => {
		mostraDados (response.data)		
	})
	.catch(error  =>  {
		if (error.response) {
			const msg = new function buscaVeiculo () {
				let codigo = document.getElementById('dados[0]').value
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
			omunicado (error.response.data.codigo, 
										error.response.data.mensagem, 
										error.response.data.descricao);
			alert(msg.get());
		}	
	})

	event.preventDefault()
}

function buscaVeiculoParaPag() {
	let codigo = document.getElementById('dados[0]').value
	let url = `http://localhost:5000/Veiculos/${codigo}`

	axios.get(url)
	.then(response => {
		pagarTicket (response.data)		
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
  //alert('Ticket gerado com sucesso, Ticket Nr.: ' + codigo);
   
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
			window.location.replace("../caixa_gerenc/gerenciamento.html?"+codigo);
		})
		.catch(error  =>  {
			
			if (error.response) {
				const msg = new Comunicado (error.response.data.codigo, 
											error.response.data.mensagem, 
											error.response.data.descricao);
				alert(msg.get());
			}
		})
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
		if(novoLength != 0)
		{
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
						if(teste[i]["status"] == 1){
							newCell.innerHTML = "Aberto";
						}else if (teste[i]["status"] == 2){
							newCell.innerHTML = "Pago/Liberado";
						}else{
							newCell.innerHTML = "Encerrado";
						}
						
					}else if(j==4)
					{
						newCell.innerHTML = "<button onClick='pagarTicketTable(this)'>Pagar</button>";						
					}
					
				}
			}
			//up.innerHTML = toString(Date);
		}else
		{
			alert("Nenhum registro encontrado no banco de dados.")
		}
	}
}


function pagarTicket(dadosTic){
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

function buscaVeiculosEmAbertoNaPag() {
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
		if(novoLength != 0)
		{
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				if(teste[i]["status"] == 1)
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
							newCell.innerHTML = "Aberto";
						}
						else if(j==4)
						{
							newCell.innerHTML = "<button onClick='pagarTicketTableNaPag(this)'>Pagar</button>";
						}
					}
				}
				
			}
			//up.innerHTML = toString(Date);
		}else
		{
			alert("Nenhum registro encontrado no banco de dados.")
		}
	}
}

function buscaVeiculosPagoNaPag() {
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
		let tabela = window.document.getElementById("tableTicketPago");
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
		if(novoLength != 0)
		{
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				if(teste[i]["status"] == 2)
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
						}
						else if(j==4)
						{
							newCell.innerHTML = teste[i]["status"];
						}
					}
				}
				
			}
			//up.innerHTML = toString(Date);
		}else
		{
			alert("Nenhum registro encontrado no banco de dados.");
		}
	}
}

function pagarTicketTable(linha){
	let tabela = window.document.getElementById("tableTicketNaoPago");
	let lin = linha.parentNode.parentNode.rowIndex - 1;
	let cod_cell = tabela.rows[lin].cells[0].firstChild.nodeValue;
	//alert(cod_cell);
	localStorage.setItem('selected',cod_cell);
	window.location.href = "../caixa_pag/pagamento.html";
}

function pagarTicketTableNaPag(linha){
	var tabela = window.document.getElementById("tableTicketNaoPago");
	let i = linha.parentNode.parentNode.rowIndex - 1;
	let lin = linha.parentNode.parentNode.rowIndex - 1;
	let cod_cell = tabela.rows[lin].cells[0].firstChild.nodeValue;
	//let plac = document.getElementById("dados[0]");
	let taman = tabela.rows[lin].cells.length;
	alert(tabela.rows[lin].cells.length);
	for(j=0; j <taman ; j++){
		//console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
		//localStorage.removeItem(i + "." + j + "." + defini[j]);       
		var dados = document.getElementById("dados["+j+"]");
		//console.log(dados);
		dados.innerHTML = tabela.rows[i].cells[j].firstChild.nodeValue;
	}
}
/*


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



