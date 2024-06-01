// script.js
// Configuration de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const products = [
    {
        id: 1,
        name: "Produit 1",
        price: 25,
        description: "Description du produit 1",
        image: "https://via.placeholder.com/150"
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
    }
];

const productContainer = document.getElementById('product-list');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');
const checkoutModal = document.getElementById('checkout-modal');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
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

function showLoginForm() {
    loginModal.style.display = 'block';
}

function closeLoginForm() {
    loginModal.style.display = 'none';
}

function showSignupForm() {
    signupModal.style.display = 'block';
}

function closeSignupForm() {
    signupModal.style.display = 'none';
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            Swal.fire({
                title: 'Connexion réussie',
                text: 'Vous êtes maintenant connecté.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            closeLoginForm();
            document.getElementById('login-button').style.display = 'none';
            document.getElementById('signup-button').style.display = 'none';
            document.getElementById('logout-button').style.display = 'block';
        })
        .catch(error => {
            Swal.fire({
                title: 'Erreur',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            Swal.fire({
                title: 'Inscription réussie',
                text: 'Votre compte a été créé avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            closeSignupForm();
            document.getElementById('login-button').style.display = 'none';
            document.getElementById('signup-button').style.display = 'none';
            document.getElementById('logout-button').style.display = 'block';
        })
        .catch(error => {
            Swal.fire({
                title: 'Erreur',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

function logout() {
    auth.signOut().then(() => {
        Swal.fire({
            title: 'Déconnexion réussie',
            text: 'Vous êtes maintenant déconnecté.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('signup-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';
    });
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
    } else if (event.target == loginModal) {
        loginModal.style.display = 'none';
    } else if (event.target == signupModal) {
        signupModal.style.display = 'none';
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('signup-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'block';
    } else {
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('signup-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';
    }
});

renderProducts();
