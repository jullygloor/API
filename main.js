async function carregarProdutos() {
  const resposta = await fetch('https://fakestoreapi.com/products');
  const produtos = await resposta.json();
  const tabela = document.getElementById('tabela-produtos');

  produtos.slice(0, 10).forEach(produto => {
    const desconto = Math.floor(Math.random() * 41) + 10; // entre 10% e 50%
    const quantidade = Math.floor(Math.random() * 5) + 1;  // entre 1 e 5
    const precoOriginal = produto.price;
    const precoComDesconto = precoOriginal * (1 - desconto / 100);
    const valorTotal = precoComDesconto * quantidade;
    const emPromocao = desconto > 30;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.id}</td>
      <td><img src="${produto.image}" width="50" height="50" alt="Imagem de ${produto.title}" class="img-thumbnail"></td>
      <td>${produto.title}</td>
      <td>${produto.category}</td>
      <td>
        <span class="text-decoration-line-through text-muted">R$ ${precoOriginal.toFixed(2)}</span><br>
        <strong class="text-success">R$ ${precoComDesconto.toFixed(2)}</strong>
      </td>
      <td>${quantidade}</td>
      <td>
        ${emPromocao ? '<span class="badge bg-danger">Promoção!</span>' : '<span class="badge bg-secondary">Normal</span>'}
      </td>
      <td><span class="badge bg-warning text-dark">${desconto}%</span></td>
      <td><strong class="text-primary">R$ ${valorTotal.toFixed(2)}</strong></td>
    `;
    tabela.appendChild(tr);
  });
}

window.onload = carregarProdutos;
