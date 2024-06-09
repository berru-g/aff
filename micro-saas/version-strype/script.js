// script.js
const products = [
    {
        id: 1,
        name: "RASPBERRY PI 3B+",
        price: 40,
        description: " 4 x 1,4 GHz, 1 Go RAM, WiFi, BT",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-reichelt.de%2Fbilder%2Fweb%2Fxxl_ws%2FA300%2FRASPBERRY_PI_3B_PLUS_001.png&f=1&nofb=1&ipt=5845aa38e3acaeec0a9b76d6e899378e0b6ef437fce3df20138c3a36fae3d37d&ipo=images"
    },
    {
        id: 2,
        name: "Produit 2",
        price: 30,
        description: "Description du produit 2",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        name: "Produit 3",
        price: 45,
        description: "Description du produit 3",
        image: "https://via.placeholder.com/150"
    },
  {
        id: 4,
        name: "Produit 4",
        price: 65,
        description: "Description du produit 1",
        image: "https://via.placeholder.com/150"
    },
  {
        id: 5,
        name: "Produit 5",
        price: 85,
        description: "Description du produit 1",
        image: "https://via.placeholder.com/150"
    },
  {
        id: 6,
        name: "Produit 6",
        price: 125,
        description: "Description du produit 1",
        image: "https://via.placeholder.com/150"
    }
];

const productContainer = document.getElementById('product-list');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');
const checkoutModal = document.getElementById('checkout-modal');
let totalPrice = 0;

const stripe = Stripe('votre-publiable-key');
const elements = stripe.elements();
const cardElement = elements.create('card');

function renderProducts() {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Prix: ${product.price} €</p>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    totalPrice += product.price;
    totalPriceElement.textContent = totalPrice;
    checkoutButton.style.display = 'block';
}

function openCheckoutForm() {
    checkoutModal.style.display = 'block';
    cardElement.mount('#card-element');
}

function closeCheckoutForm() {
    checkoutModal.style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    stripe.createToken(cardElement).then(result => {
        if (result.error) {
            Swal.fire({
                title: 'Erreur',
                text: result.error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            fetch('https://votre-serveur.com/api/paiement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    token: result.token.id,
                    totalPrice
                })
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Merci pour votre confiance!',
                        text: 'Votre paiement a été effectué avec succès. Délai de livraison : 1 mois.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    closeCheckoutForm();
                } else {
                    throw new Error('Erreur lors de l\'envoi des données');
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de l\'envoi des données. Veuillez réessayer.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }
    });
}

window.onclick = function(event) {
    if (event.target == checkoutModal) {
        checkoutModal.style.display = 'none';
    }
}

renderProducts();