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
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            cardNumber: formData.get('card-number'),
            expiration: formData.get('expiration'),
            cvv: formData.get('cvv'),
            total: cartTotal.textContent
        };

        fetch('https://github.com/berru-g/aff/tree/main/micro-saas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Merci pour votre achat!',
                    text: 'Votre commande sera livrée dans un mois.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                cartItems = [];
                updateCart();
                checkoutModal.style.display = 'none';
            } else {
                return response.json().then(error => {
                    Swal.fire({
                        title: 'Erreur',
                        text: `Quelque chose s'est mal passé: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Erreur',
                text: `Quelque chose s'est mal passé: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
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
        html: '<ul><li><b>Quand le produit est-il livré?</b></li><p>Environ un mois après la commande.</p><li><b>Pourquoi c\'est si long?</b></li><p>Car votre produit part de l\'usine de fabrication directement et que nous gérons les frais de douanes et le transport.</p><li><b>Puis-je annuler ma commande?</b></li><p>Oui jusqu\'à 24H après le paiement.</p></ul>',
        showCloseButton: true,
        showConfirmButton: true,
        customClass: {
            popup: 'custom-swal-popup',
            closeButton: 'custom-swal-close-button',
            content: 'custom-swal-content',
        }
    });
});
