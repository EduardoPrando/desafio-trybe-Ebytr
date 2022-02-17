 Bem-vindos ao To-Do Trybe EbyTr

## Contexto

---

Esse projeto foi desenvolvido no curso na Trybe para empresa fictícia [`EbyTr`](www.betrybe.com).

A proposta era desenvolver uma aplicação backend e frontend de uma lista de tarefas.

Os detalhes fornecidos para a aplicação foram:

#Visualizar a lista de tarefas;
##Esta lista deve ser ordenável por ordem alfabética, data de criação ou por status;
###Inserir uma nova tarefa na lista;
##Remover uma tarefa da lista;
##Atualizar uma tarefa da lista;
##A tarefa deve possuir um status editável: pendente, em andamento ou pronto;

---

---

## Como instalar

Pre-requisitos para rodar o projeto: 
- mongoDB
- NPM

Copie o ssh do projeto `git@github.com:EduardoPrando/desafio-trybe-Ebytr.git`

* Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

  * `git clone git@github.com:EduardoPrando/desafio-trybe-Ebytr.git`
  * `cd desafio-trybe-Ebytr/back-end`
  * `npm install`
  * `npm start`

  A aplicação está configurada para rodar na porta local 3000. Caso deseje utilizar outra porta utilize o arquivo `.env.example` para trocar para a porta desejada. Após a alteração renomeie o arquivo para `.env`

---

## Modo de desenvolvimento

---

O projeto foi desenvolvido utilizando TDD, inicialmente com testes integração, e posteriormente foi implementado um teste unitários.

---

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica, Mocha/Chai para a criação dos teste unitários e de integração.

---

## Cobertura de teste

A atual cobertura de testes é de: 
- `97.53%` das linhas;