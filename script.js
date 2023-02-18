const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");

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
function createBook() {
  bookContainer.textContent = "";
  myLibrary.forEach((element) => {
    // create the elements
    let div = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let haveRead = document.createElement("button");
    let remove = document.createElement("button");
    // assign values to them
    title.textContent = element.title;
    author.textContent = element.author;
    pages.textContent = element.numPages + " pages";
    haveRead.textContent = element.read;
    remove.textContent = "Delete";
    // assigning dataset to remove button
    haveRead.dataset.bookRead = myLibrary.indexOf(element);
    remove.dataset.ID = myLibrary.indexOf(element);
    let valueAt = remove.dataset.ID;
    remove.addEventListener("click", removeBook);
    haveRead.addEventListener("click", () => {
      myLibrary[valueAt].changeRead(valueAt);
      console.log(myLibrary[valueAt].read);
    });
    // add class to the book Cards
    div.classList.add("book");
    // Append to the books to cont
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(haveRead);
    div.appendChild(remove);
    bookContainer.appendChild(div);
  });
}

function removeBook(element) {
  myLibrary.splice(element.target.dataset.book, 1);
  createBook();
}

// call the change change read status function
function changeReadStatus(valueAt) {
  if (myLibrary[valueAt].read === "Yes") {
    myLibrary[valueAt].read = "No";
  } else if (myLibrary[valueAt].read === "No") {
    myLibrary[valueAt].read = "Yes";
  }
}

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
  createBook();
  clearModal();
  modal.style.visibility = "hidden";
});
