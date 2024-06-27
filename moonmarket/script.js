document.addEventListener('DOMContentLoaded', function() {
    // Exemple d'animation fade-in pour l'accueil
    const header = document.querySelector('header');
    header.style.opacity = 0;
    setTimeout(() => {
        header.style.transition = 'opacity 1s';
        header.style.opacity = 1;
    }, 500);

    // Exemple d'animation zoom-in pour les éléments de la liste
    const listItems = document.querySelectorAll('section#calendrier ul li');
    listItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
            item.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            item.style.opacity = 1;
            item.style.transform = 'scale(1)';
        }, 500 + index * 100);
    });
});

//popup en attendant la page
document.addEventListener('DOMContentLoaded', function() {
    const popupLink = document.getElementById('popup-link');

    popupLink.addEventListener('click', function(event) {
        event.preventDefault();

        Swal.fire({
            title: 'Nos Produits',
            html: `
                <p>Meilleurs produits au meilleur prix.</p>
                <p>Plus de 150 références selon les saisons.</p>
                <h4>Légumes et fruits du verger dans le magasin:</h4>
                <ul>
                    <li>Pommes (Dalinette, Jonagold, Boskoop...), Butternuts</li>
                    <li>Légumes: Artichaux, asperges, aubergines,...</li>
                </ul>
                <h4>Fruits et agrumes selon saison:</h4>
                <ul>
                    <li>Abricots, cerises, citrons,...</li>
                </ul>
                <h4>Fruits exotiques:</h4>
                <ul>
                    <li>Ananas, avocats, bananes,...</li>
                </ul>
                <h4>Fruits séchés:</h4>
                <ul>
                    <li>Abricots, dattes, figues,...</li>
                </ul>
                <h4>Fruits à coque:</h4>
                <ul>
                    <li>Noix, noisettes, amandes, marron</li>
                </ul>
                <h4>Condiments:</h4>
                <ul>
                    <li>Epicerie fine, Délices du Lubéron</li>
                    <li>Sels et Epices: La serpette (Reze)</li>
                    <li>Huiles d'olive de Crète en différents formats</li>
                    <li>Olives, Rillettes et Tapenades, Soupes et sauces</li>
                </ul>
                <h4>Miels:</h4>
                <ul>
                    <li>Acacia, toutes fleurs, Montagne, Printemps, Tournesol, Noisettes, Amandes</li>
                </ul>
                <h4>Jus de Pomme et Pétillants:</h4>
                <ul>
                    <li>Nature, pommes-cassis, pommes-pêche abricots, pommes-framboises</li>
                </ul>
                <h4>Oeufs de plein air:</h4>
                <ul>
                    <li>Poules élevées en plein air</li>
                </ul>
            `,
            confirmButtonText:'OK'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Redirection vers notre partenaire');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const img = card.querySelector('img');
        const description = card.getAttribute('data-description');
        
        img.addEventListener('click', function() {
            Swal.fire({
                title: card.querySelector('h2').innerText,
                text: description,
                imageUrl: img.src,
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: card.querySelector('h2').innerText,
                confirmButtonText: 'Fermer'
            });
        });
    });
});