document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
  
    function showPage(index) {
      pages.forEach((page, i) => {
        if (i === index) {
          page.style.display = 'block';
        } else {
          page.style.display = 'none';
        }
      });
    }
  
    function navigateToNextPage() {
      currentPage++;
      if (currentPage < pages.length) {
        showPage(currentPage);
      }
    }
  
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('cta-button')) {
        event.preventDefault();
        navigateToNextPage();
      }
    });
  
    showPage(currentPage);
  });
  