
document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'RASPBERRY PI 3B+', description: '4 x 1,4 GHz, 1 Go RAM, WiFi, BT', price: 20, image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-reichelt.de%2Fbilder%2Fweb%2Fxxl_ws%2FA300%2FRASPBERRY_PI_3B_PLUS_001.png' },
        { id: 2, name: 'Produit 2', description: 'Description du produit 2', price: 30, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Produit 3', description: 'Description du produit 3', price: 40, image: 'https://via.placeholder.com/150' },
      { id: 4, name: 'RASPBERRY PI 3B+', description: '4 x 1,4 GHz, 1 Go RAM, WiFi, BT', price: 20, image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-reichelt.de%2Fbilder%2Fweb%2Fxxl_ws%2FA300%2FRASPBERRY_PI_3B_PLUS_001.png' },
      { id: 5, name: 'RASPBERRY PI 3B+', description: '4 x 1,4 GHz, 1 Go RAM, WiFi, BT', price: 20, image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-reichelt.de%2Fbilder%2Fweb%2Fxxl_ws%2FA300%2FRASPBERRY_PI_3B_PLUS_001.png' },
      { id: 6, name: 'RASPBERRY PI 3B+', description: '4 x 1,4 GHz, 1 Go RAM, WiFi, BT', price: 20, image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-reichelt.de%2Fbilder%2Fweb%2Fxxl_ws%2FA300%2FRASPBERRY_PI_3B_PLUS_001.png' }
      
    ];

    const productContainer = document.getElementById('product-container');
    const cart = document.getElementById('cart');
    const cartTotal = document.getElementById('cart-total');
    const checkoutModal = document.getElementById('checkout-modal');
    let cartItems = [];

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        `;
        productContainer.appendChild(productElement);
    });

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        cartItems.push(product);
        updateCart();
    };

    function updateCart() {
        const total = cartItems.reduce((sum, product) => sum + product.price, 0);
        cartTotal.textContent = `${total}€`;
    }

    cart.addEventListener('click', function() {
        checkoutModal.style.display = 'flex';
    });

    checkoutModal.addEventListener('click', function(event) {
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Envoyer les données à votre serveur et gérer la réponse
        Swal.fire({
            title: 'Merci pour votre achat!',
            text: 'Votre commande sera livrée dans un mois.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        checkoutModal.style.display = 'none';
    });

    function closeLoginForm() {
        document.getElementById('loginModal').style.display = 'none';
    }

    function closeSignupForm() {
        document.getElementById('signupModal').style.display = 'none';
    }
});

  

// MENU via lib sweetalert2
const FAQ = document.querySelector('.faq');

FAQ.addEventListener('click', () => {
  // Utilisation de SweetAlert pour afficher la fenêtre contextuelle
  Swal.fire({
    title: 'F.A.Q',
    html: '<ul><li><b>Quand le produit est il livré?</b></li><p>Environ un mois apres la commande.</p><li><b>Pourquoi c\'est si long?</b></li><p>Car votre produit par de l\'usine de fabrication directement et que nous gérons les frais de douanes et le transport.</p><li><b>Puis-je annuler ma commande?</b></li><p>Oui jusqu\'a 24H aprés le paiment.</p></ul>',
    showCloseButton: true,
    showConfirmButton: true,
    customClass: {
      popup: 'custom-swal-popup',
      closeButton: 'custom-swal-close-button',
      content: 'custom-swal-content',
    }
  });
});