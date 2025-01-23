// Get the book ID from the URL
const id = new URLSearchParams(window.location.search).get("id");

if (id) {
  fetch(`http://localhost:3000/books/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Book not found");
      return response.json();
    })
    .then((book) => {
      const viewBook = document.getElementById("book-view");
      viewBook.innerHTML = "";

      const singlebook = `
      <div class="set-row" id="book-view">
        <img src="../imgs/${book.image}" alt="Book Cover" id="currentImageName" />

        <div class="book-content">
          <h2 id="title">${book.title}</h2>
          <p class="description" id="description">${book.description}</p>
          <p class="price" id="price">Price: <span class="current-price">${book.price}</span></p>
          <ul class="book-details">
            <li id="author"><strong>Author:</strong> ${book.author}</li>
          </ul>
          <ul class="book-details">
            <li id="genre"><strong>Genre:</strong> ${book.genre}</li>
          </ul>

          <!-- Dynamic Add/Remove button -->
          <button class="list-toggle-btn">Add to My List</button>

          <div class="actions">
            <button type="submit" style="border: none;" onClick="window.location.href='UpdateBooks.html?id=${book.id}'">
              <i class="bx bxs-edit update-icon"></i>
            </button>
            <button onClick="deleteBook(${book.id})" style="border: none;">
              <i class="bx bxs-trash delete-icon"></i>
            </button>
          </div>
        </div>
      </div>`;

      viewBook.innerHTML += singlebook;

      // Check if the book is already in the list and update the button
      toggleButton(book.id);
    })
    .catch((error) => console.error("Error fetching book data:", error));
}

// Function to add or remove the book from the list
function toggleBookInList(bookId) {
  let savedBooks = JSON.parse(localStorage.getItem("myBooksList")) || [];
  const addToListButton = document.querySelector(".list-toggle-btn");

  // Check if the book is already in the list
  const bookIndex = savedBooks.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    // If the book is in the list, remove it
    savedBooks.splice(bookIndex, 1);
    localStorage.setItem("myBooksList", JSON.stringify(savedBooks));
    addToListButton.innerText = "Add to My List";
    alert("Book removed from your list.");
  } else {
    // If the book is not in the list, add it with initial status as "unread"
    const book = {
      id: bookId,
      title: document.getElementById("title").innerText,
      description: document.getElementById("description").innerText,
      price: document.querySelector(".current-price").innerText,
      author: document
        .getElementById("author")
        .innerText.replace("Author: ", ""),
      genre: document.getElementById("genre").innerText.replace("Genre: ", ""),
      imageSrc: document.getElementById("currentImageName").getAttribute("src"),
      status: "unread", // Initial status
    };
    savedBooks.push(book);
    localStorage.setItem("myBooksList", JSON.stringify(savedBooks));
    addToListButton.innerText = "Remove from My List";
    alert("Book added to your list.");
  }
}

// Function to toggle the button text based on whether the book is in the list
function toggleButton(bookId) {
  let savedBooks = JSON.parse(localStorage.getItem("myBooksList")) || [];
  const addToListButton = document.querySelector(".list-toggle-btn");

  // Set button text and functionality based on presence in the list
  if (savedBooks.some((b) => b.id === bookId)) {
    addToListButton.innerText = "Remove from My List";
  } else {
    addToListButton.innerText = "Add to My List";
  }

  // Attach event listener to toggle add/remove functionality
  addToListButton.onclick = () => toggleBookInList(bookId);
}
