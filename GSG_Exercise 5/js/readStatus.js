function readStatus(bookId) {
  // Fetch the specific book
  fetch(`http://localhost:3000/books/${bookId}`)
    .then((response) => response.json())
    .then((book) => {
      // Toggle the status between 'read' and 'unread'
      const newStatus = book.status === "read" ? "unread" : "read";

      // Update the book's status
      fetch(`http://localhost:3000/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to update status");
          return response.json();
        })
        .then((updatedBook) => {
          // Update the status text in the HTML
          const statusElement = document.getElementById(`status-${bookId}`);
          if (statusElement) {
            statusElement.textContent = updatedBook.status;
          }
        })
        .catch((error) => console.error("Error updating book status:", error));
    })
    .catch((error) => console.error("Error fetching book data:", error));
}
