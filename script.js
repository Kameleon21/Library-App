const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const form = document.getElementById("newForm");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");

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

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 950, false);
const theHollows = new Book("The Hallows", "J.R.R Tolkien", 750, true);
const theBirth = new Book("The Birth", "J.R.R Tolkien", 650, false);

// values assigned for to create an object
//functions to add books to array
function addBookToLib() {
  let title = prompt("Enter a title of a book");
  let author = prompt("Enter the author");
  let numberPage = parseInt(prompt("Enter number of pages"));
  let isRead = prompt("Did you read the book?");
  const word = new Book(title, author, numberPage, isRead);
  myLibrary.push(word);
}

// addBookToLib(theHobbit);
// addBookToLib(theHollows);
// addBookToLib(theBirth);

// functions to loop over the array and display the details on a div
let count = 0;
const loopOver = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    // to prevent duplicate books being displayed
    if (count <= i) {
      i + count;
      const newCard = document.createElement("div");
      newCard.classList.add("book");
      newCard.innerText = myLibrary[i].info();
      bookContainer.append(newCard);
      count++;
    }
  }
};

// function to call the constructor functions and for the user to fill out the fields
addBtn.addEventListener("click", () => {
  modal.style.visibility = "visible";
});

// cancel the add of new book process and the fields
cancelBtn.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  Name.value = " ";
  authorName.value = " ";
  pageNumber.value = 0;
  document.querySelector('input[name="read"]:checked').checked = false;
});

// Run the method to add new object and pass it into the array
newBookBtn.addEventListener("click", () => {
  addBookToLib();
  loopOver();
  modal.style.visibility = "hidden";
});
