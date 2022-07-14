let nomeUsuario = document.getElementById("nome")
let sobrenomeUsuario = document.getElementById("sobrenome")
let dataNascimento = document.getElementById("dataNascimento")
let emailUsuario = document.getElementById("email")
let contatoUsuario = document.getElementById("contato")
let telefoneUsuario = document.getElementById("telefone")
let cargoUsuario = document.getElementById("cargo")
let listaDeUsuarios = document.getElementById("lista-de-alunos")

const selecionados = document.getElementById("cargoOption")
const btnPesquisar = document.getElementById("btn")
const btnCadastrar = document.getElementById("register-button")
const totalCadastros = document.getElementById("total-alunos")

btnCadastrar.addEventListener("click", criarPessoaUsuario)
btnPesquisar.addEventListener("click", mostrarUsuariosSelecionados)

let pessoas = []
let usuarios = []
let numeroDeCadastros = 0

class Pessoa {
    constructor(nome, sobrenome, data, email, contato, telefone, cargo){
        this.nome = nome
        this.sobrenome = sobrenome
        this.data = data
        this.email = email
        this.contato = contato
        this.telefone = telefone
        this.cargo = cargo
    }

}

class Usuario {
    constructor(nome, sobrenome, email, cargo){
        this.nome = nome
        this.sobrenome = sobrenome
        this.email = email
        this.cargo = cargo
    }
}


function criarPessoaUsuario (event){
    event.preventDefault()
    if(calcularIdade(dataNascimento.value) < 18){
        alert("VOCÊ PRECISA TER MAIS DE 18 ANOS PARA SE CADASTRAR EM NOSSO SITE!")
    }
    else if(pessoas.some(pessoa => pessoa.email == emailUsuario.value)== true){
        alert("E-MAIL JÁ CADASTRADO!")
    }else{
    let novaPessoa = new Pessoa (nomeUsuario.value, sobrenomeUsuario.value, dataNascimento.value, emailUsuario.value, contatoUsuario.value, telefoneUsuario.value, cargoUsuario.value)

    pessoas.push(novaPessoa)
    numeroDeCadastros ++
    totalCadastros.innerHTML = `${numeroDeCadastros}`

    criarUsuario(nomeUsuario.value, sobrenomeUsuario.value, emailUsuario.value, cargoUsuario.value)
    listaDeUsuarios.innerHTML = ""
    mostrarUsuarios()

    nomeUsuario.value = ""
    sobrenomeUsuario.value = "" 
    dataNascimento.value = "" 
    emailUsuario.value = "" 
    contatoUsuario.value = ""
    telefoneUsuario.value = "" 
    cargoUsuario.value = "Aluno"
    }
}

function criarUsuario (nome, sobrenome, email, cargo){
    let novoUsuario = new Usuario (nome, sobrenome, email, cargo)
    usuarios.push(novoUsuario)
}

function mostrarUsuarios(){ 
    usuarios.forEach((usuario) => {
        let itemLista = document.createElement("li")
        itemLista.innerHTML = `${usuario.nome} ${usuario.sobrenome} ${usuario.email} ${usuario.cargo}`
        listaDeUsuarios.append(itemLista)

    })
}

function mostrarUsuariosSelecionados(){
    listaDeUsuarios.innerHTML = ""
    if(selecionados.value == "Todos"){
        listaDeUsuarios.innerHTML = ""
        mostrarUsuarios()
    }else{
        listaDeUsuarios.innerHTML = ""
        usuarios.filter((usuario) => {
          if(usuario.cargo == selecionados.value){
            let itemLista = document.createElement("li")
            itemLista.innerHTML = `${usuario.nome} ${usuario.sobrenome} ${usuario.email} ${usuario.cargo}`
            listaDeUsuarios.append(itemLista)
          }
        })
    }
}

function calcularIdade(dataDeNascimento){
    let dataHoje = new Date()
    let anoAtual = dataHoje.getFullYear()
    let mesAtual = dataHoje.getMonth() + 1
    let diaAtual = dataHoje.getDate()
    let dataDividida = dataDeNascimento.split("-")
    let diaNascimento = dataDividida[2]
    let mesNascimento = dataDividida[1]
    let anoNascimento = dataDividida[0]

    let idade = anoAtual - anoNascimento

    if(mesAtual < mesNascimento){
        idade--
    }else if(mesAtual == mesNascimento){
        if(diaAtual < diaNascimento){
            idade--
        }
    }
    return idade
}