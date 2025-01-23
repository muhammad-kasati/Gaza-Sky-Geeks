let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navmenu");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

window.onscroll = function () {
  let scrollButton = document.querySelector(".scroll-to-top");
  if (document.documentElement.scrollTop > 200) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
};

fetch("http://localhost:3000/books")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((data) => {
    const booklist = document.getElementById("book-list");
    const showMoreContainer = document.querySelector(".show-more-container");

    if (booklist) {
      const booksToDisplay = data.slice(0, 6);
      booksToDisplay.forEach((book) => {
        const bookmarkClass = book.status === "read" ? "read" : "unread";

        const bookCard = `
  <div class="product-card" data-id="${book.id}">
    <i class="bx bxs-bookmark status-icon ${
      book.status === "read" ? "read" : "unread"
    }" id="bookmark-${book.id}" onclick="readStatus(${book.id})"></i>
    <img src="imgs/${book.image}" alt="${book.title}" class="book-image"/>
    <div class="book-details">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">${book.author}</p>
      <p class="book-price">${book.price}</p>
      <p class="book-description">${book.description}</p>
    </div>
    <div class="card-footer">
      <a href="pages/SingleBook.html?id=${book.id}">
        <button class="read-more-btn">Read More</button>
      </a>
      <div class="actions">
        <a href="pages/UpdateBooks.html?id=${book.id}">
          <i class="bx bxs-edit update-icon"></i>
        </a>
        <button onClick="deleteBook(${book.id})" style="border: none;">
          <i class="bx bxs-trash delete-icon"></i>
        </button>
      </div>
    </div>
  </div>
`;
        booklist.innerHTML += bookCard;
      });

      if (data.length > 6) {
        showMoreContainer.style.display = "block";
      } else {
        showMoreContainer.style.display = "none";
      }
    }
  })
  .catch((error) => {
    console.error("Problem with the fetch data:", error);
  });
