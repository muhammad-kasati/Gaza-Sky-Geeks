const deleteBook = (bookId) => {
  // Confirm the deletion action before proceeding
  if (confirm("Are you sure you want to delete this book?")) {
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the book");
        }
        alert("Book has been successfully deleted.");
        window.location.href = "../pages/AllBooks.html";
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error deleting the book. Please try again.");
      });
  }
};
