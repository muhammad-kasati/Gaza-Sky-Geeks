// AddBook function

const form = document.getElementById("book-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const description = document.getElementById("description").value;
  const status = "unread";
  const price = document.getElementById("price").value;
  const image = document.getElementById("image");
  const imageName = image.files.length > 0 ? image.files[0].name : "5.webp";

  fetch("http://localhost:3000/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error: the response not OK ");
    })
    .then((existingBooks) => {
      // Calculate the new ID
      const lastId = existingBooks[existingBooks.length - 1].id;
      const id = lastId + 1;

      const bookData = {
        id,
        title,
        author,
        genre,
        description,
        status,
        price,
        image: imageName,
      };

      return fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
    })

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to add the book");
    })
    .then(() => {
      window.location.href = "../pages/AllBooks.html"; // Redirect to main page after update
    })

    .catch((error) => {
      console.error("Error:", error);
    });

  form.reset();
});
