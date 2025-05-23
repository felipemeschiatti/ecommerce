const cartContainer = document.getElementById('cart-items-container');
const itemCountDisplay = document.getElementById('cart-item-count-display');
const subtotalDisplay = document.getElementById('cart-subtotal-display');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryShipping = document.getElementById('summary-shipping');
const summaryTax = document.getElementById('summary-tax');
const summaryTotal = document.getElementById('summary-total');

// Função para formatar moeda (simples)
function formatCurrency(value) {
    return `R$${value.toFixed(2).replace('.', ',')}`;
}

// Função para renderizar o carrinho
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
    cartContainer.innerHTML = ''; // Limpa o conteúdo atual
    let subtotal = 0;
    let itemCount = 0;

    // Verifica se o carrinho está vazio
    if (Object.keys(cart).length === 0) {
        itemCountDisplay.textContent = 'Seu carrinho está vazio.';
        cartContainer.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum item no carrinho.</td></tr>';
        subtotalDisplay.textContent = formatCurrency(0);
        summarySubtotal.textContent = formatCurrency(0);
        updateSummaryTotal(0); // Atualiza total geral
        return; // Sai da função se o carrinho estiver vazio
    }

    // Itera sobre os itens do carrinho e cria as linhas da tabela
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemCount += item.quantity;

        const row = document.createElement('tr');
        row.classList.add('cart-item');
        row.innerHTML = `
            <td class="product-details">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                <span class="product-name">${item.name}</span>
            </td>
            <td class="quantity">
                <input type="number" value="${item.quantity}" min="1" data-product-id="${productId}" class="form-control-sm quantity-input" style="width: 70px;">
            </td>
            <td class="unit-price">${item.priceFormatted}</td>
            <td class="total-price">${formatCurrency(itemTotal)}</td>
            <td class="remove-item">
                <button class="btn btn-danger btn-sm remove-btn" data-product-id="${productId}">🗑️</button>
            </td>
        `;
        cartContainer.appendChild(row);
    }

    // Atualiza contagem e totais
    itemCountDisplay.textContent = `Você tem ${itemCount} item(s) no seu carrinho.`;
    subtotalDisplay.textContent = formatCurrency(subtotal);
    summarySubtotal.textContent = formatCurrency(subtotal);
    updateSummaryTotal(subtotal); // Atualiza total geral

    // Adiciona event listeners aos novos elementos
    addEventListeners();
}

// Função para atualizar o total geral no resumo
function updateSummaryTotal(subtotal) {
    const shipping = parseFloat(summaryShipping.textContent.replace('R$', '').replace(',', '.')) || 0;
    const tax = parseFloat(summaryTax.textContent.replace('R$', '').replace(',', '.')) || 0;
    const total = subtotal + shipping + tax;
    summaryTotal.textContent = formatCurrency(total);
}

// Função para adicionar event listeners (chamada após renderizar)
function addEventListeners() {
    // Inputs de quantidade
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', handleQuantityChange);
    });
    // Botões de remover
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', handleRemoveItem);
    });
}

// Função para lidar com mudança de quantidade
function handleQuantityChange(event) {
    const input = event.target;
    const productId = input.dataset.productId;
    const newQuantity = parseInt(input.value, 10);
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};

    if (newQuantity >= 1 && cart[productId]) {
        cart[productId].quantity = newQuantity;
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart(); // Re-renderiza o carrinho
    } else if (newQuantity < 1 && cart[productId]) {
        // Se a quantidade for menor que 1, remover o item
        delete cart[productId];
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart();
    }
}

// Função para lidar com remoção de item
function handleRemoveItem(event) {
    const button = event.target.closest('.remove-btn'); // Garante pegar o botão
    if (!button) return; // Sai se não encontrou o botão
    const productId = button.dataset.productId;
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};

    if (cart[productId]) {
        delete cart[productId]; // Remove o item do objeto
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart(); // Re-renderiza o carrinho
    }
}

// Renderiza o carrinho quando a página carregar
document.addEventListener('DOMContentLoaded', renderCart);
