//const { response } = require("express");

//const status = require("status")

//const { DATE } = require("oracledb");
//const { isDate } = require("util/types");

//const status = require("status");

function buscaVeiculo () {
	let codigo = document.getElementById('ticket').value
	let url = `http://localhost:5000/Veiculos/${codigo}`

	axios.get(url)
	.then(response => {
		preencherDados(response.data);
	})
	.catch(error  =>  {
		if (error.response) {
			const msg = new Comunicado (error.response.data.codigo, 
										error.response.data.mensagem, 
										error.response.data.descricao);
			alert(msg.get());
		}	
	})

	const preencherDados = (veiculos) =>{
		window.document.getElementById("dados[0]").textContent = veiculos.codigo;
		window.document.getElementById("dados[1]").textContent = veiculos.placa;
		window.document.getElementById("dados[2]").textContent = veiculos.dataentrada;
		window.document.getElementById("dados[3]").textContent = veiculos.status;;
			//console.log(dados);
		veiculos.map(veiculo => {
			//alert(veiculo.status)
			// if (veiculo.status === 10)
			// {
			// 	const listaVeiculo = document.createElement('li');
			// 	listaVeiculo.innerHTML = `Codigo: ${veiculo.codigo} - Placa: ${veiculo.placa} - Data de Entrada: ${veiculo.dataentrada}`;
			// 	ulVeiculos.appendChild(listaVeiculo);
			// 	//alert("TICKET LIBERADOS")
		})
	}

	event.preventDefault()
}

function pagarVeiculosNaPag() {
	let codigo = window.document.getElementById("dados[0]").textContent;
	let placa = window.document.getElementById("dados[1]").textContent;
	let st = window.document.getElementById("dados[3]").textContent;
	let pesq = window.document.getElementById("ticket");
	let url = `http://localhost:5000/Veiculos/${codigo}`;
	let url1 = `http://localhost:5000/Veiculos/`;
	let status = 0;
	if(st == "Aberto")
	{
		status = 1;
	}else if(st == "Pago")
	{
		status = 2;
	}else
	{
		status = 10;
	}
	
	if (codigo != undefined || codigo != 0 || codigo != null || codigo != "")
	{
		
		let objVeiculo = { codigo: parseInt(codigo), placa: placa, status: status};
		axios.put(url1,objVeiculo)
		.then(response => {
			//pagarTicket(response.data);	
			if (response.data){
				const msg = new Comunicado (response.data.codigo, 
											response.data.mensagem, 
											response.data.descricao);
				alert(msg.descricao + '\nTicket pago com sucesso!!!!');
				// console.log(msg.get());
				//console.log(response.data);
				location.reload();
			}
		})
		.catch(error  =>  {
			if (error.response) {
				const msg = new Comunicado (error.response.data.codigo, 
											error.response.data.mensagem, 
											error.response.data.descricao);
				alert(msg.get());
			}	
		})
	}else {
		alert("Você deve entrar com o código do ticket para a pesquisa");
		pesq.value = "";
		pesq.focus();
	}
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
  let placa = plac.toUpperCase();
  let codigo = getRandomInt();
  //alert('Ticket gerado com sucesso, Ticket Nr.: ' + codigo);
   
  if (codigo !== "" && placa !== "") 
  {
		let objVeiculo = { codigo: parseInt(codigo), placa: placa, dataentrada: '', datasaida: ''};
		let url = `http://localhost:5000/Veiculos/`

		axios.post(url, objVeiculo)
		.then(response => {
			if (response.data) {
				const msg = new Comunicado (response.data.codigo, 
											response.data.mensagem, 
											response.data.descricao);
				alert(msg.get() + '\nTicket gerado com sucesso, Ticket Nr.: ' + codigo);
				
			}
			//alert('Ticket gerado com sucesso, Ticket Nr.: ' + codigo);
			window.location.replace("../caixa_gerenc/gerenciamento.html");
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
			let v=0;
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				//alert(veiculos[i].status);
				if(veiculos[i].status == 1)
				{

					var novaLinha = tabela.insertRow(v);
					v++;

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
				
			}
			//up.innerHTML = toString(Date);
		}else
		{
			alert("Nenhum registro encontrado no banco de dados.")
		}
	}
}

function atualizaTabelaPago () {
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
			let v=0;
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				// alert(veiculos[i].status);
				if(veiculos[i].status == 2)
				{

					var novaLinha = tabela.insertRow(v);
					v++;

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
							newCell.innerHTML = "<button onClick='sairTicketTable(this)'>Sair</button>";						
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

function atualizaTabelaSaiu () {
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
			let v=0;
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				// alert(veiculos[i].status);
				if(veiculos[i].status == 10)
				{

					var novaLinha = tabela.insertRow(v);
					v++;

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
							newCell.innerHTML = teste[i]["datasaida"];;						
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
			let v=0;
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				if(teste[i]["status"] == 1)
				{
					var novaLinha = tabela.insertRow(v);
					v++;
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
			let v=0;
			//var defini = [codigo, placa, dataentrada, status];
			for(i=0; i < novoLength; i++)
			{
				if(teste[i]["status"] == 2)
				{
					var novaLinha = tabela.insertRow(v);
					v++;
					for(j=0; j<5; j++)
					{
						newCell = novaLinha.insertCell(j);
						if(j==0)
						{
							newCell.innerHTML = teste[i]["codigo"];
						}
						else if(j==1)
						{
							newCell.innerHTML = teste[i]["placa"];
						}
						else if(j==2)
						{
							newCell.innerHTML = teste[i]["dataentrada"];
						}
						// else if(j==3)
						// {
						// 	newCell.innerHTML = teste[i]["datasaida"];
						// }
						else if(j==3)
						{
							newCell.innerHTML = teste[i]["status"];
						}
						else if(j==4)
						{
							newCell.innerHTML = "<button onClick='sairVeiculoNaPag(this)'>Sair</button>";
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
	//alert(tabela.rows[lin].cells.length);
	for(j=0; j <taman ; j++){
		//console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
		//localStorage.removeItem(i + "." + j + "." + defini[j]);       
		let dados = document.getElementById("dados["+j+"]");
		//console.log(dados);
		if(tabela.rows[i].cells[j].firstChild.nodeValue == null)
		{

		}else{
			dados.innerHTML = tabela.rows[i].cells[j].firstChild.nodeValue;
		}
		
	}
}


function sairTicketTable(linha){
	var tabela = window.document.getElementById("tableTicketPago");
	let i = linha.parentNode.parentNode.rowIndex - 1;
	let lin = linha.parentNode.parentNode.rowIndex - 1;
	let cod_cell = tabela.rows[lin].cells[0].firstChild.nodeValue;
	//let plac = document.getElementById("dados[0]");
	let taman = tabela.rows[lin].cells.length;
	//alert(tabela.rows[lin].cells.length);
	for(j=0; j <taman ; j++){
		//console.log(localStorage.getItem(i + "." + j + "." + defini[j]));
		//localStorage.removeItem(i + "." + j + "." + defini[j]);       
		let dados = document.getElementById("dados["+j+"]");
		//console.log(dados);
		if(tabela.rows[i].cells[j].firstChild.nodeValue == null)
		{

		}else{
			dados.innerHTML = tabela.rows[i].cells[j].firstChild.nodeValue;
		}
		
	}
}

function sairVeiculoNaPag(linha){
	var tabela = window.document.getElementById("tableTicketPago");
	let lin = linha.parentNode.parentNode.rowIndex - 1;
	let pesq = window.document.getElementById("ticket");
	//let cod_cell = tabela.rows[lin].cells[0].firstChild.nodeValue;
	//alert(cod_cell);
	let codigo = tabela.rows[lin].cells[0].firstChild.nodeValue;
	let placa = tabela.rows[lin].cells[1].firstChild.nodeValue;
	let status = tabela.rows[lin].cells[3].firstChild.nodeValue;
	let url = `http://localhost:5000/Veiculos/${codigo}`;
	let url1 = `http://localhost:5000/Veiculos/`;
	//let status = 0;
	// alert(status);
	// if(st == "Aberto")
	// {
	// 	status = 1;
	// }else if(st == "Pago")
	// {
	// 	status = 2;
	// }else
	// {
	// 	status = 10;
	// }
	
	if (codigo != undefined || codigo != 0 || codigo != null || codigo != "")
	{
		
		let objVeiculo = { codigo: parseInt(codigo), placa: placa, status: status};
		axios.put(url1,objVeiculo)
		.then(response => {
			//pagarTicket(response.data);	
			if (response.data){
				const msg = new Comunicado (response.data.codigo, 
											response.data.mensagem, 
											response.data.descricao);
				alert(msg.descricao + '\nTicket pago com sucesso!!!!');
				// console.log(msg.get());
				//console.log(response.data);
				location.reload();
			}
		})
		.catch(error  =>  {
			if (error.response) {
				const msg = new Comunicado (error.response.data.codigo, 
											error.response.data.mensagem, 
											error.response.data.descricao);
				alert(msg.get());
			}	
		})
	}else {
		alert("Você deve entrar com o código do ticket para a pesquisa");
		pesq.value = "";
		pesq.focus();
	}
	event.preventDefault()
	
	
	
}

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



