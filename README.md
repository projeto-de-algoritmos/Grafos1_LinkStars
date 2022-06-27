# LinkStars

**Número da Lista**: X<br>
**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 18/0015834  |  Eliseu Kadesh Rosa Assunção Júnior |
| 18/0037242  |  Rodrigo Tiago Costa Lima |

## Sobre 

A ideia do projeto mostrar a ligação *(link)* entre artistas, com base nas bandas que participaram. E para fazer isso utilizamos o algoritmo **Breadth First Search (BFS)** para gerar todas as ligações de um artista ao outro.

Ao escolher os dois artistas que deseja fazer a ligação, a aplicação mostrará um grafo com o caminho de um artista ao outro, sendo que os nós em vermelho serão os artistas e os azuis as bandas.

## Screenshots

![Link-James-Kirk](./screenshots/link-james-kirk.jpg)

**Ligação entre James Hetfield e Kirk Hemmett**

![Link-Kirk-Marty](./screenshots/link-kirk-marty.jpg)

**Ligação entre Kirk Hemmett e Marty Friedman**

![Link-NotFound](./screenshots/link-not-found.jpg)

**Ligação não encontrada**

## Instalação 

**Linguagem**: Javascript<br>
**Framework**: React.Js<br>

## Pré-requisitos:

#### Utilizando o docker

- docker >= 20.10.17
- docker-compose >= 1.29.2

#### Sem utilizar o docker

- node >= 16.13
- npm >= 8.13.0

#### Opcional

- make >= 4.2.1

## Instalação:

Clonar o repositório do projeto com o comando:
```
git clone https://github.com/projeto-de-algoritmos/Grafos1_LinkStars.git
```

É possível rodar o projeto utilizando o docker ou utilizando o npm diretamente

Primeiro entre na pasta do projeto:
```
cd link_stars/
```
Instale as dependências do projeto:
```
npm install
```
Por fim, para iniciar o projeto:
```
npm start
```

Utilizando o Docker você deve realizar os seguintes comandos:

Primeiro entre na pasta do projeto:

```
cd link_stars/
```

Realize o build da imagem e suba o container:

```
docker-compose up
```
Também é possível utilizar o Docker utilizando o Makefile caso tenha o Make instalado realizando o seguinte comando:

```
make run
```

Para remover os containers utilizando o Make, basta usar o seguinte comando:

```
make clean
```

Após a inicialização do projeto, deve-se abrir automaticamente uma página em http://localhost:3000/, e se tiver subido utilizando o docker, deve-se acessar em http://localhost/ pois o docker está conectado ao nginx, que está fazendo o redirecionamento automaticamente para a porta 3000.

## Uso 

Abrindo a aplicação, pode-se escolher 2 artistas diferentes e, caso exista alguma ligação entre eles com base nos dados da aplicação, o grafo que demonstra tal ligação, aparecerá na tela, caso não exista, um alerta informará ao usuário.




