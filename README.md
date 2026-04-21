# Teste Técnico - Reddop

Este repositório reúne as soluções desenvolvidas para o teste técnico do processo seletivo da **Reddop**.

## Estrutura do Repositório

- `1-SecondLargest`: Exercício 1 (C# / Console)
- `2-StudentGrades`: Exercício 2 (C# / Console)
- `3-TodoList`: Exercício 3 (Angular / Frontend)
- `4-ProductCatalog`: Exercício 4 (Backend + Frontend)

## Enunciados dos Exercícios

### 1 - Segundo maior número distinto

```
Escreva uma função em qualquer linguagem (se possível C#) que:
  Recebe uma lista de números.
  Retorna o segundo maior número distinto.
  Se não houver, retorne null.
Exemplo:
Input: [3, 2, 1, 5, 5, 4] → Output: 4 (pois o maior é 5, e o segundo maior é 4).

* Não é necessário frontend. Retorno pode ser via terminal.
```

### 2 - Situação de alunos por nota

```
escreva um programa em qualquer linguagem que receberá como input uma lista de alunos e uma lista de notas. O programa deverá:
a) exibir o nome e a situação de cada aluno:
  * nota >= 7: Aprovado
  * nota >= 5 e < 7: Recuperação
  * nota < 5: Reprovado
b) mostrar a quantidade de aprovados,  quantidade de recuperação e  quantidade de reprovados.

Exemplo:
Entrada:
nomes = ["Ana", "Bruno", "Carlos", "Diana"]
notas = [8, 4, 7, 6]

Saída:
Ana -> Aprovada
Bruno -> Reprovado
Carlos -> Aprovado
Diana -> Recuperação

Aprovados: 2
Recuperação: 1
Reprovados: 1

* O nome do método é de sua escolha
* O formato/tipagem dos inputs é de sua escolha
* O formato/estilização da saída é de sua escolha
* As validações são de sua escolha.
* Não é necessário frontend. Retorno pode ser via terminal.
```

### 3 - Aplicação de lista de tarefas

```
Crie uma aplicação com as seguintes funcionalidades:
  * Cadastrar uma tarefa (com título, descrição, data de vencimento e status)
  * Alterar o status da tarefa (Pendente, Em Andamento, Concluída)
  * Listar tarefas ordenadas (decrescente) por data de vencimento

* Pode ser somente frontend.
```

### 4 - Catálogo de produtos e categorias

```
[EXERCICIO OPCIONAL] Desenvolva uma aplicação (backend + frontend) em qualquer linguagem para cadastrar produtos e suas respectivas categorias. Um produto pertence a uma única categoria. Crie endpoints para:
  * Cadastrar categoria
  * Cadastrar produto
  * Listar todos os produtos com o nome da categoria associada
  * Buscar produto por ID
  * Deletar uma categoria (só permitir caso não haja produtos associados)
```

## Como Executar Cada Projeto

### 1-SecondLargest

```bash
cd 1-SecondLargest
dotnet run
```

### 2-StudentGrades

```bash
cd 2-StudentGrades
dotnet run
```

### 3-TodoList

```bash
cd 3-TodoList
npm install
ng serve
```

Acesse: `http://localhost:4200`

### 4-ProductCatalog

Executar backend e frontend em terminais separados.

Backend:

```bash
cd 4-ProductCatalog/Backend
dotnet run
```

Frontend:

```bash
cd 4-ProductCatalog/Frontend
npm install
ng serve
```

Acesse o frontend em: `http://localhost:4200`

## Observação Final

Cada pasta possui seu próprio README com detalhes específicos de implementação e execução.
