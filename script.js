async function loadBooks() {
  try {
    const response = await fetch('books.json');
    const books = await response.json();
    const bookList = document.getElementById('book-list');
    
    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'card bg-white p-6 rounded-lg shadow';
      card.innerHTML = `
        <h2 class="text-xl font-semibold text-gray-900">${book.title}</h2>
        <p class="text-gray-600 italic">by ${book.author}</p>
        <ul class="mt-4 space-y-2">
          ${book.points.map(point => `<li class="text-gray-700">• ${point}</li>`).join('')}
        </ul>
      `;
      bookList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadBooks);