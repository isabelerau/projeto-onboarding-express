const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const clientes = {
  content: [
    {
      codigo: 1,
      nome: 'Jéssica Lívia Carvalho',
      cpf: '36262988505',
      dataNasc: '06/01/2005',
      email: 'jessica_carvalho@controtel.com.br',
      ativo: 'S',
      itensConsumo: [
        {
          descricao: 'Moscow mule',
          quantidade: 2,
          vlUnitario: 35.5
        }
      ]
    },
    {
      codigo: 2,
      nome: 'Eliane Maya dos Santos',
      cpf: '37854163855',
      dataNasc: '04/01/1983',
      email: 'eliane_dossantos@proxion.com.br',
      ativo: 'S',
      itensConsumo: [
        {
          descricao: 'Moscow mule',
          quantidade: 2,
          vlUnitario: 35.5
        }
      ]
    },
    {
      codigo: 3,
      nome: 'Diego Lucca Ferreira',
      cpf: '21327208601',
      dataNasc: '03/01/1964',
      email: 'diego.lucca.ferreira@mesquita.not.br',
      ativo: 'S',
      itensConsumo: [
        {
          descricao: 'Moscow mule',
          quantidade: 2,
          vlUnitario: 35.5
        }
      ]
    },
    {
      codigo: 4,
      nome: 'Giovanni Enzo Moraes',
      cpf: '34088970772',
      dataNasc: '01/01/1944',
      email: 'giovanni_moraes@sabereler.com.br',
      ativo: 'S',
      itensConsumo: [
        {
          descricao: 'Moscow mule',
          quantidade: 2,
          vlUnitario: 35.5
        }
      ]
    },
    {
      codigo: 5,
      nome: 'Simone Alícia Lima',
      cpf: '50843951621',
      dataNasc: '01/01/2003',
      email: 'simone_alicia_lima@fanger.com.br',
      ativo: 'S',
      itensConsumo: [
        {
          descricao: 'Moscow mule',
          quantidade: 2,
          vlUnitario: 35.5
        }
      ]
    },
    {
      codigo: 6,
      nome: 'Raquel Luana Caldeira',
      cpf: '85798659135',
      dataNasc: '04/01/1997',
      email: 'raquel-caldeira78@smbcontabil.com.br',
      ativo: 'N',
      itensConsumo: [
        {
          descricao: 'Moscow mule',
          quantidade: 2,
          vlUnitario: 35.5
        }
      ]
    },
    {
      codigo: 7,
      nome: 'Isabella Luana Pietra Gomes',
      cpf: '38003265827',
      dataNasc: '02/01/1979',
      email: 'isabella-gomes93@mtic.net.br',
      ativo: 'N',
      itensConsumo: null
    },
    {
      codigo: 8,
      nome: 'Carlos Eduardo Matheus César da Cunha',
      cpf: '39502794079',
      dataNasc: '03/01/1984',
      email: 'carloseduardodacunha@unitau.com.br',
      ativo: 'N',
      itensConsumo: null
    },
    {
      codigo: 9,
      nome: 'Thomas Mateus Cavalcanti',
      cpf: '95711024825',
      dataNasc: '04/01/1964',
      email: 'thomasmateuscavalcanti@morada.com.br',
      ativo: 'N',
      itensConsumo: []
    },
    {
      codigo: 10,
      nome: 'Analu Priscila Giovanna Peixoto',
      cpf: '80699477050',
      dataNasc: '03/01/1962',
      email: 'analupriscilapeixoto@tedde.com.br',
      ativo: 'S',
      itensConsumo: []
    },
    {
      codigo: 11,
      nome: 'Jéssica Ester Isabel da Paz',
      cpf: '28587149911',
      dataNasc: '04/01/1955',
      email: 'jessicaesterdapaz@projetti.com',
      ativo: 'S',
      itensConsumo: []
    },
    {
      codigo: 12,
      nome: 'Fernando Geraldo Samuel da Silva',
      cpf: '83125247039',
      dataNasc: '04/01/1975',
      email: 'fernandogeraldodasilva@superativacoop.com.br',
      ativo: 'S',
      itensConsumo: []
    },
    {
      codigo: 13,
      nome: 'Luiz Gustavo Victor Souza',
      cpf: '94596582025',
      dataNasc: '05/01/1960',
      email: 'luiz-souza93@msn.com',
      ativo: 'S',
      itensConsumo: []
    },
    {
      codigo: 14,
      nome: 'Samuel Henrique Monteiro',
      cpf: '44269729066',
      dataNasc: '03/01/1987',
      email: 'samuel-monteiro85@wsiconsultores.com.br',
      ativo: 'S',
      itensConsumo: []
    },
    {
      codigo: 15,
      nome: 'Ruan Levi Renan Bernardes',
      cpf: '62176000137',
      dataNasc: '07/01/2005',
      email: 'ruan_bernardes@bernardino.co',
      ativo: 'S',
      itensConsumo: []
    },
  ]
};

const listaSimNao = {
  SIM: {
    flag: "S",
    value: true,
  },
  NAO: {
    flag: "N",
    value: false,
  },
};

const paginator = (items, page, per_page) => {
  offset = (page - 1) * per_page;

  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page);
  
  const clientesPagination = {
    content: paginatedItems,
    pageable: {
      pageNumber: page,
      pageSize: per_page,
      },
    totalPages: total_pages,
    totalElements: items.length,
  }
  return clientesPagination;
}

const transformString = (param) => {
  const removerAcentuacao = param.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return removerAcentuacao.toLocaleLowerCase();
} 

app.get('/buscar-clientes', (request, response) => {
  const { nome, page, size } = request.query;
   const array = clientes.content;
   let results;
   let arrayRes = [];
 
   let pagina = page ?? 1;
   let tamanho = size ?? 5;
 
   if (nome) {
     array.filter((cliente) => {
       cli = transformString(cliente.nome)
       n = transformString(nome);
       if (cli.includes(n)) {
         arrayRes.push(cliente)
       }
     })  
       
     results = paginator(arrayRes, pagina, tamanho);
   } else {
     results = paginator(clientes.content, pagina, tamanho);
   }
 
   return response.json(results)
  })

app.get('/buscar-clientes-filtro-composto', (request, response) => {
  //Se quiser utilizar o ativo/inativo no filtro
  const { nome, ativo, page, size } = request.query;
  const array = clientes.content;
  let results;
  let arrayRes = [];

  let pagina = page ?? 0;
  let tamanho = size ?? 5;

  const status = ativo ? listaSimNao.SIM.flag : listaSimNao.NAO.flag;

  if (nome) {
    array.filter((cliente) => {
      cli = transformString(cliente.nome)
      n = transformString(nome);
      if (cli.includes(n) && cliente.ativo === status) {
        arrayRes.push(cliente)
      }
    })
      
    console.log("arrayRes ", arrayRes);
    results = paginator(arrayRes, pagina, tamanho);
  } else {
    array.filter((cliente) => {
      if (cliente.ativo === status) {
        arrayRes.push(cliente)
      }
    })
    results = paginator(arrayRes, pagina, tamanho);
  }

  return response.json(results)
})

app.get('/buscar-clientes-codigo-situacao', (request, response) => {
  const { codigo, ativo, page, size } = request.query;
  const array = clientes.content;
  let results;
  let arrayRes = [];

  let pagina = page ?? 0;
  let tamanho = size ?? 5;

  const status = ativo ? listaSimNao.SIM.flag : listaSimNao.NAO.flag;

  if (codigo) {
  array.filter((cliente) => {
    if (codigo == cliente.codigo && status == cliente.ativo) {
      arrayRes.push(cliente)
    }
  })

    results = paginator(arrayRes, pagina, tamanho);
  } else {
    array.filter((cliente) => {
      if (cliente.ativo == status) {
        arrayRes.push(cliente)
      }
    })
    results = paginator(arrayRes, pagina, tamanho);
  }

  return response.json(results)
})

app.get('/detalhes-cliente/:codigo', (request, response) => {
  const { codigo } = request.params;
 console.log("codigo ", codigo);


  const array = clientes.content;
  const cliente = array.find((obj) => obj.codigo == codigo);

  response.json(cliente);
})

app.delete('/excluir/:codigo', (request, response) => {
  const { codigo } = request.params;

  const array = clientes.content;
  const objetoIndex = array.findIndex((obj) => obj.codigo == codigo);

  if (objetoIndex < 0) {
    return response.status(400).json({error: 'Esse objeto não existe'})
  }

  array.splice(objetoIndex, 1);

  return response.status(200).send();
});

app.post('/adicionar-cliente', (request, response) => {
  const { nome, cpf, dataNasc, ativo } = request.body;

  const array = clientes.content;
  const codigo = array.length + 1;
  
  const cliente = {codigo, nome, cpf, dataNasc, ativo };

  array.push(cliente);

  response.status(200).send();
});

app.put('/editar-cliente/:codigo', (request, response) => {
  console.log("request.params ", request.params);
  console.log("request.body ", request.body);
  const { codigo } = request.params;
  const { nome, cpf, dataNasc, ativo } = request.body;

  const array = clientes.content;
  const index = array.findIndex((obj) => obj.codigo == codigo);

  if (index < 0) {
    return response.status(400).json({error: 'Esse cliente não existe'})
  }
  
  const cliente = { codigo, nome, cpf, dataNasc, ativo };

  array[index] = cliente;

  response.json(cliente);
});

app.listen(3333, () => {
  console.log('Backend started');

});


