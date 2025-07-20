async function loadBooks() {
  try {
    console.log('Starting loadBooks...');
    console.log('Current URL:', window.location.href);

    const response = await fetch('books.json');
    if (!response.ok) throw new Error(`Failed to fetch books.json: ${response.status}`);

    const books = await response.json();
    console.log('Loaded books:', books);

    const bookList = document.getElementById('book-list');
    if (!bookList) {
      console.error('book-list element not found on index.html');
      const main = document.querySelector('main');
      if (main) {
        main.innerHTML = '<p class="text-red-500 text-center">Error: book-list container not found. Please check index.html for <div id="book-list">.</p>';
      }
      return;
    }

    // Clear the container
    bookList.innerHTML = '';

    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'card rounded-lg shadow';

      card.innerHTML = `
        <div class="card-header flex items-center gap-4 p-4 cursor-pointer">
          <img src="${book.image || 'images/fallback.jpg'}" class="book-img" alt="${book.title} cover">
          <div>
            <h2 class="text-xl font-semibold text-white">${book.title}</h2>
            <p class="text-gray-400 italic">by ${book.author}</p>
          </div>
        </div>
        <div class="card-details hidden p-4">
          <ul class="list-none text-gray-300">
            ${book.points.map(point => `<li class="mb-2">• ${point}</li>`).join('')}
          </ul>
        </div>
      `;

      console.log('Card created for:', book.title);

      const header = card.querySelector('.card-header');
      const details = card.querySelector('.card-details');

      header.addEventListener('click', () => {
        console.log('Click detected on card:', book.title);

        const isAlreadyOpen = !details.classList.contains('hidden');

        // Collapse all other cards
        document.querySelectorAll('.card-details').forEach(detail => {
          if (detail !== details) detail.classList.add('hidden');
        });

        // Toggle the clicked one
        if (isAlreadyOpen) {
          details.classList.add('hidden');
          console.log('Card collapsed:', book.title);
        } else {
          details.classList.remove('hidden');
          console.log('Card expanded:', book.title);
        }
      });

      bookList.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading books:', error);
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = '<p class="text-red-500 text-center">Error: Failed to load books. Please check books.json.</p>';
    }
  }
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  console.log('DOM not ready, waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', loadBooks);
} else {
  console.log('DOM already loaded, running loadBooks');
  loadBooks();
}
