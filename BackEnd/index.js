/* CÓDIGOS PARA STATUS DO TICKET
    1 - Aberto;
    2 - Pago;
    3 - Liberado;
    10 - Encerrado, já passou pela cancela. */


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
			'Placa NVARCHAR2(10) NOT NULL, DataEntrada DATE NOT NULL, Status NUMBER(3))';//,ValorPago NUMBER(50)
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
		
		const sql1 = "INSERT INTO Veiculos (Codigo,Placa,DataEntrada, Status) "+
		"VALUES (:0,:1,sysdate,1)";   // 1 - ABERTO - ACABOU DE SER CRIADO RECEBE STATUS ABERTO.
		const dados = [veiculo.codigo,veiculo.placa];
		console.log(sql1, dados);
		await conexao.execute(sql1,dados);
		
		const sql2 = 'COMMIT';
		await conexao.execute(sql2);	
	}	

	/*
	this.update = async function (codigo)
	{
			const conexao = await this.bd.getConexao();
			
			const sql1 = "UPDATE CODIGO,PLACA "
			"VALUES (:0,:1,sysdate,10)";   // 10 - LIBERADO
			const dados = [veiculo.codigo,veiculo.placa];
			console.log(sql1, dados);
			await conexao.execute(sql1,dados);
			
			const sql2 = 'COMMIT';
			await conexao.execute(sql2);	
	
	  }**/
	
	this.recupereTodos = async function ()
	{
		const conexao = await this.bd.getConexao();
		
		const sql = "SELECT Codigo,Placa,TO_CHAR(DataEntrada, 'YYYY-MM-DD HH24:MI:SS'),Status "+
		            "FROM Veiculos";
		console.log(sql);
		let ret;
		ret =  await conexao.execute(sql);

		return ret.rows;
	}
		
	this.recupereUm = async function (codigo)
	{
		const conexao = await this.bd.getConexao();
		
		const sql = "SELECT Codigo,Placa,TO_CHAR(DataEntrada, 'YYYY-MM-DD HH24:MI:SS'), Status "+
		            "FROM Veiculos WHERE Codigo=:0";
		const dados = [codigo];
		ret =  await conexao.execute(sql,dados);
		
		return ret.rows;
	}

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
    
    const veiculo = new Veiculo (req.body.codigo,req.body.placa,req.body.dataentrada,"");

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
    if (req.body.codigo || req.body.placa)
    {
        const erro1 = new Comunicado ('DdI','Dados incompletos',
		                  'Não foram informados todos os dados do veículo');
        return res.status(422).json(erro1);
    }
    
    const veiculo = new Veiculo (req.body.codigo,req.body.placa,req.body.dataentrada,"");

    try
    {
        await  global.veiculos.inclua(veiculo);
        const  sucesso = new Comunicado ('IBS','Atualizacao bem sucedida',
		                  'O veículo foi incluído com sucesso');
        return res.status(201).json(sucesso);
	}
	catch (erro)
	{
		
		const  erro2 = new Comunicado ('LJE','Atualizacao ja feita',
		                  'Já foi fita a atualizacao');
        return res.status(409).json(erro2);
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
	console.log(rec.length);

	if (rec.length == 0)
	{
		return res.status(200).json([]);
	}
	else
	{
		const ret=[];
		for (i=0;i<rec.length;i++)
        {
            ret.push (new Veiculo (rec[i][0],rec[i][1],rec[i][2],rec[i][3]));
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
		ret = new Veiculo (ret[0],ret[1],ret[2],ret[3]);
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
    app.use(express.json());   // faz com que o express consiga processar JSON
    app.use(middleWareGlobal); // app.use cria o middleware global

    app.post  ('/veiculos'        , inclusao); 
	app.put   ('/veiculos'         , atualizar);
    app.get   ('/veiculos'        , recuperacaoDeTodos);
    app.get   ('/veiculos/:codigo', recuperacaoDeUm);

    console.log ('Servidor ativo na porta 3000...');
    app.listen(3000);
}

ativacaoDoServidor();