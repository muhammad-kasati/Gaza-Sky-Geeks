const form = document.getElementById("update-book-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const image = document.getElementById("image");
  let imageName = "";
  if (image.files.length === 0) {
    // No update on image - take the image name from the span in the edit page
    imageName = document.getElementById("currentImageName").innerText;
  } else {
    // the image updated - take the new image from file browser
    imageName = image.files[0].name;
  }

  const id = new URLSearchParams(window.location.search).get("id"); // get the id from url
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  const updatedBookData = {
    id: id,
    title,
    author,
    genre,
    description,
    image: imageName,
    price,
  };

  fetch(`http://localhost:3000/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBookData),
  })
    .then((response) => {
      if (response.ok) return response.json();

      throw new Error("Network response was not ok");
    })
    .then((data) => {
      console.log(" updated successfully:", data);
      window.location.href = "../pages/AllBooks.html"; // Redirect to main page after update
    })
    .catch((error) => console.error("Error updating book:", error));
});

///////////////UpdateBook/////////////

const id = new URLSearchParams(window.location.search).get("id");

if (id) {
  fetch(`http://localhost:3000/books/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Book not found");
      return response.json();
    })
    .then((book) => {
      document.getElementById("title").value = book.title;
      document.getElementById("author").value = book.author;
      document.getElementById("description").value = book.description;
      document.getElementById("price").value = book.price;
      document.getElementById("currentImageName").innerText = book.image;
      document.getElementById("genre").value = book.genre;
    })
    .catch((error) => console.error("Error fetching book data:", error));
}
