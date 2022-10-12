const express = require('express');

const server = express();

server.use(express.json());

const empregados = [
  {
    nome: 'Caroline Oliveira',
    funcao: 'Product Owner',
    salario: 7200,
  },
  {
    nome: 'João Paulo Faggioni',
    funcao: 'Chefe de seção',
    salario: 5000,
  },
  {
    nome: 'Bruna de Oliveira',
    funcao: 'Dona do lar',
    salario: 0,
  },
  {
    nome: 'Lucas Silva',
    funcao: 'Representante Comercial',
    salario: 4500,
  },
  {
    nome: 'Gicela Márcia',
    funcao: 'Empresária',
    salario: 1000,
  }
];

server.get("/", (req, res) => {
  let empregado = "";
  empregados.forEach((value, index) => {
    empregado += `<tr>
      <td>${index}</td>
      <td>${value.nome}</td>
      <td>${value.funcao}</td>
      <td>${value.salario}</td>
    </tr>`;
  });

  return res.send(`<!DOCTYPE html>
  <html>
    <body>
      <title>T1 - PS</title>
      <h1 style="text-align: center;"> Trabalho - Programação Script</h1>
      <h3 style="text-align: center;"> Segue abaixo a lista de funcionários cadastrados (<i class="metodo">Método findAll</i>):</h3>
      <table class="tabela-empregados">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Função</th>
          <th>Salário</th>
        </tr>
        ${empregado}
      </table>
      <style>
        .tabela-empregados {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        .tabela-empregados td, .tabela-empregados th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        .tabela-empregados tr:nth-child(even) {
          background-color: #dddddd;
        }
        .metodo {
          color: #ff0000;
        }
      </style>
    </body>
  </html> `);
});

server.get("/:id", (req, res) => {
  const index = req.params.id;

  return res.send(`<!DOCTYPE html>
  <html>
    <body style="text-align: center">
      <title>T1 - PS</title>
      <h1 style="text-align: center;"> Trabalho - Programação Script</h1>
      <h3 style="text-align: center;"> Segue abaixo o usuário específico a ser filtrado (<i class="metodo">Método find</i>):</h3>
      <table class="tabela-empregados">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Função</th>
          <th>Salário</th>
        </tr>
        <tr>
          <td>${index}</td>
          <td>${empregados[index].nome}</td>
          <td>${empregados[index].funcao}</td>
          <td>${empregados[index].salario}</td>
        </tr>
      </table>
      <style>
        .tabela-empregados {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        .tabela-empregados td, .tabela-empregados th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        .tabela-empregados tr:nth-child(even) {
          background-color: #dddddd;
        }
        .metodo {
          color: #ff0000;
        }
      </style>
    </body>
  </html> `);
});

server.post("/", (req, res) => {
  const empregado = req.body;
  empregados.push(empregado);

  return res.json(empregados)
});

server.put("/:id", (req, res) => {
  const index = req.params.id;
  const empregado = req.body;

  empregados[index] = empregado;

  return res.json(empregados);
});

server.patch("/:id", (req, res) => {
  const index = req.params.id;
  const empregado = req.body;

  Object.keys(empregado).forEach(indexE => empregados[index][indexE] = empregado[indexE]);

  return res.json(empregados);
})

server.delete("/:id", (req, res) => {
  const index = req.params.id;

  empregados.splice(index, 1);

  return res.json(empregados);
});

server.listen(process.env.PORT || 3000);