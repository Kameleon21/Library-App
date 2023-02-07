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
