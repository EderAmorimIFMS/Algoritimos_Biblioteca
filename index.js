// Ao carregar a página, renderiza os livros existentes
document.addEventListener('DOMContentLoaded', function() {
    
function baixarBiblioteca() {
    let biblioteca = localStorage.getItem("biblioteca");
    return biblioteca ? JSON.parse(biblioteca) : [];
};

let livros = baixarBiblioteca();

function renderizar() {
    const container = document.getElementById("container");
    container.innerHTML = ''; 
    let livros = baixarBiblioteca();

    livros.forEach(item => {
        let status = item.status ? 'Disponível' : 'Emprestado';
        let cardHTML = `
            <div class="card">
                <p class="titulo">${item.titulo}</p>
                <p class="texto">${item.autor}</p>
                <p class="texto">${item.ano}</p>
                <p class="texto">Status: ${status}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
};

function promptFunc(parametro) {
    return prompt(`Digite o ${parametro} do livro:`);
};

function adicionarLivro(titulo, autor, ano) {
    if (titulo && autor && ano) {
        let livro = {
            titulo: titulo,
            autor: autor,
            ano: ano,
            status: true 
        };
        livros.push(livro);
        localStorage.setItem('biblioteca', JSON.stringify(livros));
        renderizar();
    } else {
        alert('Por favor, preencha todos os campos.');
        addLivro();
    };
};

//funcão onclick
function addLivro() { 
    let titulo, autor, ano;
    titulo = promptFunc('titulo');
    autor = promptFunc('autor');
    ano = promptFunc('ano de publicação');

    adicionarLivro(titulo, autor, ano);
};

// func onclick
function removerLivro() {
    let titulo = promptFunc('título');
    let indice = buscarLivro(titulo);

    if (indice !== -1) {
        livros.splice(indice);
        localStorage.setItem('biblioteca', JSON.stringify(livros));
        alert(`Livro ${titulo} removido!`);
        renderizar();
    } else {
        alert(`Erro: Livro ${titulo} não encontrado.`);
    };
};

//funcão onclick
function emprestarLivro() {
    let titulo = promptFunc('título');
    let livros = baixarBiblioteca();
    let indice = buscarLivro(titulo);

    if (indice !== -1) {
        if (livros[indice].status) {
            livros[indice].status = false;
            localStorage.setItem('biblioteca', JSON.stringify(livros));
            alert(`Livro "${titulo}" emprestado!`);
            renderizar();
        } else {
            alert(`Livro ${titulo} já está emprestado!`);
        }
    } else {
        alert(`Erro: Livro ${titulo} não encontrado.`);
    };
};

//funcão onclick
function devolverLivro() {
    let titulo = promptFunc('título');
    let indice = buscarLivro(titulo);

    if (indice !== -1) {
        if (!livros[indice].status) {
            livros[indice].status = true;
            localStorage.setItem('biblioteca', JSON.stringify(livros));
            alert(`Livro ${titulo} devolvido!`);
            renderizar();
        } else {
            alert(`Livro ${titulo} já está na biblioteca.`);
        }
    } else {
        alert(`Erro: Livro ${titulo} não encontrado.`);
    };
};

function buscarLivro(titulo) {
    let livros = baixarBiblioteca();
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].titulo.toLowerCase() === titulo.toLowerCase()) {
            return i;
        };
    };
    return -1;
};

// Adiciona event onclick aos botões
document.getElementById("btn-adicionar").addEventListener("click", addLivro);
document.getElementById("btn-remover").addEventListener("click", removerLivro);
document.getElementById("btn-emprestar").addEventListener("click", emprestarLivro);
document.getElementById("btn-devolver").addEventListener("click", devolverLivro);

renderizar();
});
