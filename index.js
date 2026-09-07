document.addEventListener('DOMContentLoaded', () => {
    const filterItems = document.querySelectorAll('.filter-item');
  
    filterItems.forEach(item => {
      item.addEventListener('click', () => {
        filterItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  
    const starIcons = document.querySelectorAll('.star-icon');
  
    starIcons.forEach(star => {
      star.addEventListener('click', () => {
        star.classList.toggle('active');
        
        if (star.classList.contains('active')) {
          star.textContent = '★';
        } else {
          star.textContent = '☆';
        }
      });
    });
  });