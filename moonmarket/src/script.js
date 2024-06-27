console.clear();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        markers: false
      }
    })
    .to("img", {
      scale: 4,
      z: 350,
      transformOrigin: "center center",
      ease: "power1.inOut"
    })
    .to(
      ".section.hero",
      {
        scale: 1.4,
        transformOrigin: "center center",
        ease: "power1.inOut"
      },
      "<"
    );
});


//darken bg on scroll - jQuery
//cannot figure out how to get the same effect using GSAP,
//if you do, please let me know :D

$(document).ready(function() {
   $.fn.darkenScroll = function() {
    var elem = $( this );
    self = this;

    $(window).on('scroll', function(){
      scroll = $(document).scrollTop();
      offsetTop = elem.offset().top + elem.outerHeight();
      opacity = 1 / offsetTop * scroll;
      if (opacity > 0 && opacity < 1) {
        elem.css({'box-shadow': '10000px 0 0 0 rgba(0,0,0,' + opacity + ') inset'});
      }
    })
  }
  $('.section.hero').darkenScroll();
})

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
/*
document.addEventListener('DOMContentLoaded', function() {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Désactiver l'effet parallax pour les appareils mobiles
      document.querySelectorAll('.parallax').forEach(function(el) {
          el.style.backgroundAttachment = 'scroll';
      });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const rellax = new Rellax('.rellax', {
      speed: -2,
      center: true,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
  });

  // Vérifier les appareils mobiles et ajuster si nécessaire
  if (/Mobi|Android/i.test(navigator.userAgent)) {
      rellax.destroy(); // Désactiver Rellax sur mobile
  }
});
*/