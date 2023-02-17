const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");
let count = 0;

// constructor
class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  changeRead(valueAt) {
    if (myLibrary[valueAt].read === "Yes") {
      myLibrary[valueAt].read = "No";
    } else if (myLibrary[valueAt].read === "No") {
      myLibrary[valueAt].read = "Yes";
    }
  }
}

// Lib array
const myLibrary = [];

// functions to add books to array
function addBookToLib() {
  const title = Name.value;
  const author = authorName.value;
  const numberPage = pageNumber.value;
  const read = document.querySelector("input[name=read]:checked").value;
  const word = new Book(title, author, numberPage, read);
  myLibrary.push(word);
}

// create each book
function createBook(valueAt) {
  const bookCard = document.createElement("div");
  bookCard.dataset.bookNumber = valueAt;
  bookCard.classList.add("book");
  bookCard.innerHTML = `<h4>Title</h4>
      <p>${myLibrary[valueAt].title}</p>
      <h4>Author</h4>
      <p>${myLibrary[valueAt].author}</p>
      <h4>Number of pages</h4>
      <p>${myLibrary[valueAt].numPages}</p>
      <h4>Have you read this book?</h4>
      <button class="haveRead" data-btn=${valueAt}>${myLibrary[valueAt].read}</button>
      <button data-book=${valueAt}>Delete Book</button>`;
  if (myLibrary[valueAt].read === "Yes") {
    bookCard.classList.add("read");
  } else if (myLibrary[valueAt].read === "No") {
    bookCard.classList.add("unread");
  }
  bookContainer.appendChild(bookCard);
}
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (count <= i) {
      console.log(myLibrary[i]);
      createBook(i);
      count++;
    }
  }
}

// display whats in the array
// function create() {}

// clear the modal box
function clearModal() {
  Name.value = " ";
  authorName.value = " ";
  pageNumber.value = 0;
  document.querySelector('input[name="read"]:checked').checked = false;
}

// display the modal
addBtn.addEventListener("click", () => {
  modal.style.visibility = "visible";
  Name.focus();
});

// hide modal and call clear modal function
cancelBtn.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  clearModal();
});

// Run the method to add new object and pass it into the array
newBookBtn.addEventListener("click", (e) => {
  addBookToLib();
  displayBooks();
  clearModal();
  modal.style.visibility = "hidden";
});
