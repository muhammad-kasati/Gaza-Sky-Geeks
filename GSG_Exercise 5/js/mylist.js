function renderSavedBooks() {
  const bookContainer = document.querySelector(".product-container");
  let savedBooks = JSON.parse(localStorage.getItem("myBooksList")) || [];

  bookContainer.innerHTML = "";
  console.log(savedBooks);
  savedBooks.forEach(function (book) {
    const bookmarkClass = book.status === "read" ? "read" : "unread";
    const bookCard = `
            <div class="product-card" data-id="${book.id}">
              <i class="bx bxs-bookmark status-icon ${
                book.status === "read" ? "read" : "unread"
              }" id="bookmark-${book.id}" onclick="readStatus(${book.id})"></i>
              <img src="${book.imageSrc}" alt="${book.title}" />
              <div class="book-details">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="price">${book.price}</p>
                <p class="description">${book.description}</p>
              </div>
              <div class="card-footer">
                <a href="SingleBook.html?id=${book.id}">
                  <button class="read-more-btn">Read More</button>
                </a>
                <div class="actions">
                  <a href="UpdateBooks.html?id=${book.id}">
                    <i class="bx bxs-edit update-icon"></i>
                  </a>
                  <button onClick="deleteBook(${
                    book.id
                  })" style="border: none;">
                    <i class="bx bxs-trash delete-icon"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
    bookContainer.innerHTML += bookCard;
  });
}

document.addEventListener("DOMContentLoaded", renderSavedBooks);
