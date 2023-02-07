const addBtn = document.getElementById("add");

// constructor
function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}
// Lib array
let myLibrary = [];

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 950, false);
const theHollows = new Book("The Hallows", "J.R.R Tolkien", 750, true);
const theBirth = new Book("The Birth", "J.R.R Tolkien", 650, false);

//functions to add books to array
function addBookToLib(value) {
  myLibrary.push(value);
}

addBookToLib(theHobbit);
addBookToLib(theHollows);
addBookToLib(theBirth);

// function to call the constructor functions and for the user to fill out the fields
addBtn.addEventListener("click", () => {
  let newBook = prompt("Enter the name of the Book");
  console.log(newBook);
  addBookToLib(newBook);
});
