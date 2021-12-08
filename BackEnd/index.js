function BD ()
{
	process.env.ORA_SDTZ = 'UTC-3'; // garante horário de Brasília
	
	this.getConexao = async function ()
	{
		if (global.conexao)
			return global.conexao;

        const oracledb = require('oracledb');
        const dbConfig = require('./dbconfig.js');

        
        try
        {
		    global.conexao = await oracledb.getConnection(dbConfig);
		}
		catch (erro)
		{
			console.log ('Não foi possível estabelecer conexão com o BD!');
			process.exit(1);
		}

		return global.conexao;
	}

	this.estrutureSe = async function ()
	{
		try
		{
			const conexao = await this.getConexao();
			const sql     = 'CREATE TABLE Veiculos (Codigo NUMBER(10) PRIMARY KEY, '+
			'Placa NVARCHAR2(10) NOT NULL, DataEntrada DATE NOT NULL, DataSaida DATE, Status NUMBER(3))';//,ValorPago NUMBER(50)
			await conexao.execute(sql);
		}
		catch (erro)
		{} // se a já existe, ignora e toca em frente
	}
}

function Veiculos (bd)
{
	this.bd = bd;
	
	this.inclua = async function (veiculo)
	{
		const conexao = await this.bd.getConexao();
		
		const sql1 = "INSERT INTO Veiculos (Codigo,Placa,DataEntrada,DataSaida, Status) "+
		"VALUES (:0,:1,sysdate,'',1)";   // 1 - ABERTO;
		const dados = [veiculo.codigo,veiculo.placa];
		// console.log(sql1, dados);
		await conexao.execute(sql1,dados);
		
		const sql2 = 'COMMIT';
		await conexao.execute(sql2);	
	}	

	
	this.update = async function (veiculo)
	{
		const conexao = await this.bd.getConexao();
		//console.log(veiculo.status);
		
		if (veiculo.status == 1)
		{
			// console.log("é para atualizar - Pagar");
			const sql1 = "UPDATE Veiculos SET Status = 2 WHERE Codigo='"+veiculo.codigo+"'"   // 2 - PAGO/LIBERADO
			const dados = [veiculo.codigo,veiculo.placa];
			//console.log(sql1, dados);
			await conexao.execute(sql1);
			const sql2 = 'COMMIT';
			await conexao.execute(sql2);
		}
		else if(veiculo.status == 2)
		{
			console.log("é para atualizar - Sair");
			// dat = Date();
			//console.log(veiculo.placa);
			const sql3 = "UPDATE Veiculos SET DataSaida=systimestamp, Status=10 WHERE Codigo='"+veiculo.codigo+"'"   // 10 - SAIU/ENCERROU
			const dados = [veiculo.codigo,veiculo.placa];
			//console.log(sql1, dados);
			await conexao.execute(sql3);
			const sql4 = 'COMMIT';
			await conexao.execute(sql4);
		}
		// }else
		// {
		// 	console.log("Veículo já saiu do estacionamento!!");
		// 	//return msg = ("Veículo já saiu do estacionamento!!");
		// }
			
			
	}
	
	this.recupereTodos = async function ()
	{
		const conexao = await this.bd.getConexao();
		
		const sql = "SELECT Codigo,Placa,TO_CHAR(DataEntrada, 'YYYY-MM-DD HH24:MI:SS'),TO_CHAR(DataSaida, 'YYYY-MM-DD HH24:MI:SS'),Status "+
		            "FROM Veiculos";
		// console.log(sql);
		let ret;
		ret =  await conexao.execute(sql);
		// console.log('teste');
		// console.log(typeof ret);
		// console.log(ret.rows.length);
		//console.log(ret.rows);
		
		return ret.rows;
	}
		
	this.recupereUm = async function (codigo)
	{
		const conexao = await this.bd.getConexao();
		
		const sql = "SELECT Codigo,Placa,TO_CHAR(DataEntrada, 'YYYY-MM-DD HH24:MI:SS'),TO_CHAR(DataSaida, 'YYYY-MM-DD HH24:MI:SS'), Status "+
		            "FROM Veiculos WHERE Codigo=:0";
		const dados = [codigo];
		ret =  await conexao.execute(sql,dados);
		console.log(ret.rows);
		return ret.rows;
	}

	this.recupereAbertos = async function ()
	{
		const conexao = await this.bd.getConexao();
		
		const sql = "SELECT Codigo,Placa,TO_CHAR(DataEntrada, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(DataSaida, 'YYYY-MM-DD HH24:MI:SS'), Status "+
		            "FROM Veiculos WHERE Status=1";
		
		ret =  await conexao.execute(sql);
		
		return ret.rows;
	}

}

function Veiculo (codigo,placa,dataentrada,datasaida,status)
{
	    this.codigo = codigo;
	    this.placa   = placa;
	    this.dataentrada  = dataentrada;
		this.datasaida  = datasaida;
		this.status = status;
}

function Comunicado (codigo,mensagem,descricao)
{
	this.codigo    = codigo;
	this.mensagem  = mensagem;
	this.descricao = descricao;
}

function middleWareGlobal (req, res, next)
{
    console.time('Requisição'); // marca o início da requisição
    console.log('Método: '+req.method+'; URL: '+req.url); // retorna qual o método e url foi chamada

    next(); // função que chama as próximas ações

    console.log('Finalizou'); // será chamado após a requisição ser concluída

    console.timeEnd('Requisição'); // marca o fim da requisição
}

// para a rota de CREATE
async function inclusao (req, res)
{
    if (!req.body.codigo || !req.body.placa)
    {
        const erro1 = new Comunicado ('DdI','Dados incompletos',
		                  'Não foram informados todos os dados do veículo');
        return res.status(422).json(erro1);
    }
    
    const veiculo = new Veiculo (req.body.codigo,req.body.placa,req.body.dataentrada,"","");

    try
    {
        await  global.veiculos.inclua(veiculo);
        const  sucesso = new Comunicado ('IBS','Inclusão bem sucedida',
		                  'O veículo foi incluído com sucesso');
        return res.status(201).json(sucesso);
	}
	catch (erro)
	{
		
		const  erro2 = new Comunicado ('LJE','Veículo existente',
		                  'Já há veículo cadastrado com o código informado');
        return res.status(409).json(erro2);
    }
}

async function atualizar (req, res)
{
	//console.log(req.body.codigo);
    if (!req.body.codigo || !req.body.placa)
    {
        const erro1 = new Comunicado ('DdI','Dados incompletos',
		                   'Não foram informados todos os dados do veículo');
        return res.status(422).json(erro1);
		
    }else
	{    
		const veiculo = new Veiculo (req.body.codigo,req.body.placa,req.body.dataentrada,req.body.datasaida,req.body.status);
		try
		{
			await  global.veiculos.update(veiculo);
			//console.log(veiculo.codigo);
			const  sucesso = new Comunicado ('IBS','Atualizacao bem sucedida',
							'O veículo saiu do estacionamento com sucesso');
			//console.log(veiculo.codigo);
			return res.status(201).json(sucesso);
		}
		catch (erro)
		{
			console.log(erro);		
			const  erro2 = new Comunicado ('LJE','Atualizacao ja feita',
							'Já foi feita a atualizacao');
			return res.status(409).json(erro2);
		}
	}
}


// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (req.body.codigo || req.body.placa || req.body.dataentrada)
    {
        const erro = new Comunicado ('JSP','JSON sem propósito',
		             'Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro);
    }
	
    let rec;
	try
	{
	    rec = await global.veiculos.recupereTodos();
	}    
    catch(erro)
    {}
	//console.log(rec.length);

	if (rec.length == 0)
	{
		return res.status(200).json([]);
	}
	else
	{
		
		const ret=[];
		for (i=0;i<rec.length;i++)
		{
			ret.push (new Veiculo (rec[i][0],rec[i][1],rec[i][2],rec[i][3],rec[i][4]));
		} 
		return res.status(200).json(ret);
	}
} 

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    if (req.body.codigo || req.body.placa || req.body.dataentrada)
    {
        const erro1 = new Comunicado ('JSP','JSON sem propósito',
		                  'Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro1);
    }

    const codigo = req.params.codigo;
    
    let ret;
	try
	{
	    ret = await global.veiculos.recupereUm(codigo);
	}    
    catch(erro)
    {}

	if (ret.length==0)
	{
		const erro2 = new Comunicado ('LNE','Veículo inexistente',
		                  'Não há veículo cadastrado com o código informado');
		return res.status(404).json(erro2);
	}
	else
	{
		ret = ret[0];
		ret = new Veiculo (ret[0],ret[1],ret[2],ret[3],ret[4]);
		return res.status(200).json(ret);
	}
}
async function ativacaoDoServidor ()
{
    const bd = new BD ();
	await bd.estrutureSe();
    global.veiculos = new Veiculos (bd);

    const express = require('express');
    const app     = express();
	const cors    = require('cors')
    
    app.use(express.json());   // faz com que o express consiga processar JSON
	app.use(cors()) //habilitando cors na nossa aplicacao (adicionar essa lib como um middleware da nossa API - todas as requisições passarão antes por essa biblioteca).
    app.use(middleWareGlobal); // app.use cria o middleware global

    app.post  ('/veiculos'        , inclusao); 
	app.put   ('/veiculos'         , atualizar);
    app.get   ('/veiculos'        , recuperacaoDeTodos);
    app.get   ('/veiculos/:codigo', recuperacaoDeUm);

    console.log ('Servidor ativo na porta 5000...');
    app.listen(5000);
}

ativacaoDoServidor();
