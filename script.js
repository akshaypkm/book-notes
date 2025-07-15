async function loadBooks() {
  try {
    const response = await fetch('books.json');
    const books = await response.json();
    const bookList = document.getElementById('book-list');
    
    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'card p-6 rounded-lg shadow';
      card.innerHTML = `
        <h2 class="text-xl font-semibold text-white">${book.title}</h2>
        <p class="text-gray-400 italic">by ${book.author}</p>
        <div class="placeholder-img mt-4 rounded">Image Placeholder</div>
        <ul class="mt-4 space-y-2 hidden book-points">
          ${book.points.map(point => `<li class="text-gray-300">• ${point}</li>`).join('')}
        </ul>
      `;
      card.addEventListener('click', () => {
        const points = card.querySelector('.book-points');
        points.classList.toggle('hidden');
      });
      bookList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadBooks);
