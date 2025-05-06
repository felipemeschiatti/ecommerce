// Dados dos produtos com mais detalhes
const productData = {
    'camisa-corinthians-2025': {
        name: 'Camisa I Corinthains 2025 - Masculino',
        price: 'R$300.00',
        image: 'images/camisa branca.webp',
        description: 'Vista as cores do Timão com a nova camisa oficial 2025. Tecido respirável e design exclusivo.',
        raw_price: 300.00,
        brand: 'Nike',
        sizes: 'P, M, G, GG',
        color: 'Branco'
    },
    'tenis-jordan-1': {
        name: 'Tenis nike Jordan 1 - Masculino',
        price: 'R$900.00',
        image: 'images/jordan 1.webp',
        description: 'O Nike Air Jordan 1 é um ícone no mundo dos sneakers. Conforto e estilo em um só produto.',
        raw_price: 900.00,
        brand: 'Nike',
        sizes: '39, 40, 41, 42, 43',
        color: 'Vermelho/Preto/Branco'
    },
    'camiseta-adidas-treino': {
        name: 'Camiseta adidas treino - Feminino',
        price: 'R$140.00',
        image: 'images/camisa feminina.jpg',
        description: 'Camiseta leve e respirável da Adidas, ideal para treinos e atividades físicas.',
        raw_price: 140.00,
        brand: 'Adidas',
        sizes: 'PP, P, M, G',
        color: 'Preto'
    },
    'tenis-olympikus-corrida': {
        name: 'Tênis Olympikus corrida - Feminino',
        price: 'R$220.00',
        image: 'images/tenisFeminino.jpg',
        description: 'Tênis Olympikus projetado para corrida, oferecendo amortecimento e conforto.',
        raw_price: 220.00,
        brand: 'Olympikus',
        sizes: '35, 36, 37, 38, 39',
        color: 'Rosa/Cinza'
    },
    'blusa-lakers': {
        name: 'Blusa Los Angeles Lakers - Masculino',
        price: 'R$400.00',
        image: 'images/blusa.jpg',
        description: 'Mostre seu apoio aos Lakers com esta blusa estilosa e confortável.',
        raw_price: 400.00,
        brand: 'Nike',
        sizes: 'M, G, GG, XG',
        color: 'Roxo/Amarelo'
    }
};

let currentProductId = null;
let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    currentProductId = params.get('id');
    currentProduct = productData[currentProductId];

    if (currentProduct) {
        // Linhas para definir src e alt da imagem principal
        document.getElementById('product-image-main').src = currentProduct.image;
        document.getElementById('product-image-main').alt = currentProduct.name;

        // Preenche título, preço, descrição
        document.getElementById('product-title').textContent = currentProduct.name;
        document.getElementById('product-price').textContent = currentProduct.price;
        document.getElementById('product-description-content').textContent = currentProduct.description;
        document.title = `${currentProduct.name} - Felipe Esportes`;

        // Preenche meta informações (marca, tamanho, cor)
        document.getElementById('product-brand').textContent = currentProduct.brand || 'N/A';
        document.getElementById('product-sizes').textContent = currentProduct.sizes || 'N/A';
        document.getElementById('product-color').textContent = currentProduct.color || 'N/A';

        // Adicionar Event Listener ao botão "Adicionar ao Carrinho"
        const addToCartButton = document.querySelector('.add-to-cart-btn');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', handleAddToCart);
        }

    } else {
        // Produto não encontrado
        document.getElementById('product-title').textContent = 'Produto não encontrado';
        document.getElementById('product-price').textContent = '';
        document.getElementById('product-description-content').textContent = 'O produto que você está procurando não existe ou não está mais disponível.';
        document.getElementById('product-image-main').style.display = 'none';
        // Limpa meta informações se produto não encontrado
        document.getElementById('product-brand').textContent = '-';
        document.getElementById('product-sizes').textContent = '-';
        document.getElementById('product-color').textContent = '-';
    }
});

function handleAddToCart() {
    if (!currentProduct || !currentProductId) return;

    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value, 10);

    if (isNaN(quantity) || quantity < 1) {
        alert('Por favor, insira uma quantidade válida.');
        return;
    }

    // 1. Obter carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};

    // 2. Verificar se o produto já existe
    if (cart[currentProductId]) {
        // Se existe, atualiza a quantidade
        cart[currentProductId].quantity += quantity;
    } else {
        // Se não existe, adiciona o novo produto
        cart[currentProductId] = {
            id: currentProductId,
            name: currentProduct.name,
            price: currentProduct.raw_price,
            priceFormatted: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity
        };
    }

    // 3. Salvar carrinho atualizado no localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    // 4. Feedback
    alert(`${quantity} x ${currentProduct.name} adicionado(s) ao carrinho!`);
}
