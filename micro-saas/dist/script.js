/*Swal.fire({
  title: 'Bienvenue sur notre site de Vente Directe',
  text: 'Nous mettons à jour nos meilleurs offres du jours ',
  icon: 'info',
  timer: 5000,
  timerProgressBar: true,
  showConfirmButton: false
}).then(() => {
  // Action après la confirmation de la déconnexion
});*/
//shop basic, product, panier, paiement, newletters
document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'RASPBERRY PI 3B+', description: '4 x 1,4 GHz, 1 Go RAM, WiFi, BT', price: 50, image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-reichelt.de%2Fbilder%2Fweb%2Fxxl_ws%2FA300%2FRASPBERRY_PI_3B_PLUS_001.png' },
        { id: 2, name: 'Posca', description: '8 Marqueurs PC3M - Pointe Conique Pointe Fine', price: 30, image: 'https://m.media-amazon.com/images/I/81MSB2mJEgL._AC_UL480_FMwebp_QL65_.jpg' },
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
        /*  nodejs / PHPmyAdmin / firebase / AWS Lambda / strype / paypal ... */
        fetch('yourserver', {
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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

function renderButton() {
    gapi.signin2.render('google-signin-btn', {
        'scope': 'profile email',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');

    const reviews = [];

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const text = document.getElementById('review-text').value;
        const rating = document.getElementById('review-rating').value;

        const review = { name, text, rating };
        reviews.push(review);

        displayReviews();

        reviewForm.reset();
    });

    function displayReviews() {
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h4>${review.name}</h4>
                <p class="rating">${'★'.repeat(review.rating)}</p>
                <p>${review.text}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }
});
/*document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');
    const productId = 1; // ID du produit, à adapter en fonction du produit affiché

    function fetchReviews() {
        fetch(`reviews.php?product_id=${productId}`)
            .then(response => response.json())
            .then(reviews => {
                displayReviews(reviews);
            });
    }

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const text = document.getElementById('review-text').value;
        const rating = document.getElementById('review-rating').value;

        const review = {
            product_id: productId,
            reviewer_name: name,
            review_text: text,
            rating: parseInt(rating)
        };

        fetch('reviews.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchReviews();
                reviewForm.reset();
            }
        });
    });

    function displayReviews(reviews) {
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h4>${review.reviewer_name}</h4>
                <p class="rating">${'★'.repeat(review.rating)}</p>
                <p>${review.review_text}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    fetchReviews();
});

*/

/*
SEO (Search Engine Optimization)

    Recherche de mots-clés :
        Utilise des outils comme Google Keyword Planner, Ubersuggest, ou AnswerThePublic pour trouver des mots-clés pertinents liés à tes produits.
        Cible des mots-clés à longue traîne (long-tail keywords) qui sont moins compétitifs et plus spécifiques à tes produits.

    Optimisation du contenu :
        Rédige des descriptions de produits détaillées et uniques en incluant les mots-clés ciblés.
        Crée un blog avec des articles informatifs et tutoriels liés à l'art et au bricolage, intégrant naturellement des mots-clés.
        Utilise des balises H1, H2, et H3 pour structurer ton contenu.

    Optimisation des images :
        Utilise des noms de fichiers descriptifs pour tes images (ex. : pinceau-aquarelle.jpg).
        Ajoute des balises alt avec des descriptions pertinentes.
        Compresse les images pour améliorer le temps de chargement de ton site.

    Backlinks :
        Cherche des opportunités de guest blogging sur des sites pertinents.
        Participe à des forums et communautés en ligne et inclut des liens vers ton site.
        Collabore avec des influenceurs pour des critiques de produits ou des mentions sur leur blog.

    Expérience utilisateur (UX) :
        Assure-toi que ton site est mobile-friendly.
        Améliore la vitesse de chargement de ton site.
        Utilise une navigation claire et intuitive.

Partage sur les Réseaux Sociaux

    Créer des profils professionnels :
        Crée des comptes sur Facebook, Instagram, Pinterest, et TikTok.
        Optimise tes profils avec des descriptions claires, des liens vers ton site, et des images de haute qualité.

    Publier régulièrement :
        Planifie des publications régulières avec un mélange de contenus : photos de produits, tutoriels, vidéos en direct, témoignages clients.
        Utilise des outils comme Buffer ou Hootsuite pour programmer tes publications.

    Utiliser des hashtags :
        Recherches les hashtags populaires et pertinents pour chaque publication.
        Crée des hashtags de marque pour encourager l'engagement des utilisateurs.

    Interagir avec ton audience :
        Réponds aux commentaires et messages rapidement.
        Engage-toi avec des groupes et communautés d'artistes et de bricoleurs sur les réseaux sociaux.

    Collaborer avec des influenceurs :
        Identifie des micro-influenceurs dans le domaine de l'art et du bricolage.
        Propose des collaborations pour des publications sponsorisées, des concours ou des critiques de produits.

Atteindre des Clients Gratuitement avec des Outils Gratuits

    SEO et Blogging :
        Rédige des articles de blog optimisés pour le SEO.
        Partage tes articles sur des forums et groupes en ligne pertinents.

    Email Marketing :
        Utilise des outils gratuits comme Mailchimp pour créer des campagnes d'emailing.
        Offre des réductions ou des produits gratuits en échange d'abonnements à ta newsletter.

    Marketing de Contenu :
        Crée des tutoriels et des guides pratiques en PDF que les utilisateurs peuvent télécharger gratuitement.
        Partage ces ressources sur ton site et tes réseaux sociaux.

    Référencement Local :
        Inscris ton entreprise sur Google My Business.
        Encourage les clients satisfaits à laisser des avis positifs.

    Forums et Groupes en Ligne :
        Participe activement à des forums et groupes Facebook liés à l'art et au bricolage.
        Partage tes produits et offres spéciales, mais assure-toi de respecter les règles de chaque groupe.
*/