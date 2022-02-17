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


O projeto foi desenvolvido utilizando TDD, inicialmente com testes integração, e posteriormente foi implementado um teste unitários.

---

### Tecnologias


Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica, Mocha/Chai para a criação dos teste unitários e de integração.

---

## Cobertura de teste

A atual cobertura de testes é de: 
- `97.53%` das linhas;

![image test](https://github.com/EduardoPrando/desafio-trybe-Ebytr/blob/main/back-end/public/testcoverage.png)
---

## Próximos passos

* Implementação de todas as rotas
* Implementação de 100% dos testes
* Deplay no Heroku
* Implementação de transmissão de dados `in real time` através do SocketIO

---

