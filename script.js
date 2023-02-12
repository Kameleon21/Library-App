const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const form = document.getElementById("newForm");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");
// const ifRead = document.querySelector('input[name=read]:checked').value;

// constructor
function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, Read? ${this.read}`;
};

// Lib array
let myLibrary = [];

//functions to add books to array
function addBookToLib() {
  let title = Name.value;
  let author = authorName.value;
  let numberPage = pageNumber.value;
  let isRead = document.querySelector("input[name=read]:checked").value;
  const word = new Book(title, author, numberPage, isRead);
  myLibrary.push(word);
}

// functions to loop over the array and display the details on a div
let count = 0;
const loopOver = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    // to prevent duplicate books being displayed
    if (count <= i) {
      i + count;
      let newCard = document.createElement("div");
      newCard.dataset.bookNumber = i;
      newCard.classList.add("book");
      newCard.innerHTML = `<h4>Title</h4>
      <p>${myLibrary[i].title}</p>
      <h4>Author</h4>
      <p>${myLibrary[i].author}</p>
      <h4>Number of pages</h4>
      <p>${myLibrary[i].numPages}</p>
      <h4>Have you read this book?</h4>
      <p>${myLibrary[i].read}</p> `;
      let delBtn = document.createElement("button");
      delBtn.innerText = "Remove Book";
      delBtn.dataset.bookNumber = i;
      delBtn.classList.add("numberBtn");
      newCard.appendChild(delBtn);
      bookContainer.append(newCard);
      count++;
      if (myLibrary[i].read === "Yes") {
        newCard.classList.add("read");
      } else if (myLibrary[i].read === "No") {
        newCard.classList.add("unread");
      }
    }
  }
};

// clear the modal box
const clearModal = () => {
  Name.value = " ";
  authorName.value = " ";
  pageNumber.value = 0;
  document.querySelector('input[name="read"]:checked').checked = false;
};

// function to call the constructor functions and for the user to fill out the fields
addBtn.addEventListener("click", () => {
  modal.style.visibility = "visible";
  Name.focus();
});

// cancel the add of new book process and the fields
cancelBtn.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  clearModal();
});

// Run the method to add new object and pass it into the array
newBookBtn.addEventListener("click", () => {
  addBookToLib();
  loopOver();
  clearModal();
  modal.style.visibility = "hidden";
});
