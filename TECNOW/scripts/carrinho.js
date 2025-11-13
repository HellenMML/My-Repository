const API_URL = "http://localhost:3000/carrinho";

// Carrega produtos do banco
async function carregarCarrinho() {
  const response = await fetch(API_URL);
  const produtos = await response.json();

  const container = document.querySelector(".sacola");
  const lista = document.createElement("section");
  lista.classList.add("sacola-lista");
  lista.innerHTML = "";

  produtos.forEach(prod => {
    const item = document.createElement("article");
    item.classList.add("produto-sacola");
    item.innerHTML = `
      <img src="images/tv.jpg" alt="${prod.nome}" />
      <div class="produto-info">
        <h3>${prod.nome}</h3>
        <p>Produto ID: ${prod.id}</p>
        <span class="produto-preco">R$ ${Number(prod.preco).toFixed(2)}</span>
      </div>
      <div class="produto-quantidade">
        <input type="number" min="1" value="${prod.quantidade}" data-id="${prod.id}">
      </div>
      <button class="botao-remover" data-id="${prod.id}">Remover</button>
    `;
    lista.appendChild(item);
  });

  // Substitui o conteúdo atual
  const antigas = document.querySelectorAll(".sacola-lista");
  antigas.forEach(e => e.remove());
  container.insertBefore(lista, document.querySelector(".resumo-compra"));

  adicionarEventos();
  atualizarTotal();
}

// Atualiza o total do carrinho
function atualizarTotal() {
  const produtos = document.querySelectorAll('.produto-sacola');
  let total = 0;

  produtos.forEach(produto => {
    const precoEl = produto.querySelector('.produto-preco');
    const qtdEl = produto.querySelector('input[type="number"]');
    const preco = parseFloat(precoEl.textContent.replace('R$', '').replace(',', '.'));
    const qtd = parseInt(qtdEl.value);
    total += preco * qtd;
  });

  document.getElementById('valor-total').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
}

// Remover produto do banco
async function removerProduto(event) {
  const id = event.target.getAttribute("data-id");
  await fetch(`${API_URL}/remove/${id}`, { method: "DELETE" });
  carregarCarrinho();
}

// Atualizar quantidade (opcional)
async function atualizarQuantidade(event) {
  const id = event.target.getAttribute("data-id");
  const novaQtd = event.target.value;
  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produto_id: id, quantidade: Number(novaQtd) })
  });
  atualizarTotal();
}

// Adiciona eventos
function adicionarEventos() {
  document.querySelectorAll('.botao-remover').forEach(botao => {
    botao.addEventListener('click', removerProduto);
  });
  document.querySelectorAll('.produto-quantidade input').forEach(input => {
    input.addEventListener('input', atualizarQuantidade);
  });
}

// Inicializa
document.addEventListener('DOMContentLoaded', carregarCarrinho);
