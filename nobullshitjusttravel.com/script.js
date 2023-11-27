
// Fonction pour afficher le pop-up
function afficherPopup() {
  Swal.fire({
    title: 'Discover cheap destinations',
    html: '<img src="dist/img/airplane.gif" alt="Image du pop-up" style="max-width: 100%;" />' +
          '<h2>every day its new offer</h2>',
    showCancelButton: true,
    confirmButtonText: 'Open',
    cancelButtonText: 'Close',
    allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      // Rediriger l'utilisateur vers la balise souhaitée
      var balise = document.querySelector('.bookingaff');
      if (balise) {
        balise.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

// Attendre 10 secondes avant d'afficher le pop-up
setTimeout(afficherPopup, 10000);


/***Sweetalert2 librairie****/
function openBooking(element) {
  // Récupérer l'URL affiliée à partir de l'attribut data-affiliate-url de la balise parente
  const affiliateUrl = element.closest('#product').dataset.affiliateUrl;
  Swal.fire({
    title: 'Available from our Partner.',
    text: 'Open the offer in Booking.com?',
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(affiliateUrl, '_blank');
    }
  });
}

