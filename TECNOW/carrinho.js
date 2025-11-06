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

// Remove o produto com efeito de fade-out
function removerProduto(event) {
  const botao = event.target;
  const produto = botao.closest('.produto-sacola');
  produto.classList.add('fade-out');

  // Espera a animação terminar antes de remover
  setTimeout(() => {
    produto.remove();
    atualizarTotal();
  }, 300);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  atualizarTotal();

  // Atualiza total ao alterar quantidade
  document.querySelectorAll('.produto-quantidade input').forEach(input => {
    input.addEventListener('input', atualizarTotal);
  });

  // Remove produto
  document.querySelectorAll('.botao-remover').forEach(botao => {
    botao.addEventListener('click', removerProduto);
  });
});
