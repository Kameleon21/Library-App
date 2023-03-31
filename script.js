const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");
const readInfo = document.getElementById("readInfo");
const unreadInfo = document.getElementById("unreadInfo");

// Lib array
const myLibrary = [];

// constructor
class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  changeRead(valueAt) {
    if (myLibrary[valueAt].read === "Read") {
      myLibrary[valueAt].read = "Unread";
    } else if (myLibrary[valueAt].read === "Unread") {
      myLibrary[valueAt].read = "Read";
    }
  }
}

// functions to add books to array
function addBookToLib() {
  const title = Name.value;
  const author = authorName.value;
  const numberPage = pageNumber.value;
  const read = document.querySelector("input[name=read]:checked").value;
  const word = new Book(title, author, numberPage, read);
  myLibrary.push(word);
}

// Displays the amount of read and unread books
function displayReadData() {
  const readBooks = document.querySelectorAll(`.read`);
  const unreadBooks = document.querySelectorAll(`.unread`);
  readInfo.textContent = `Read ${readBooks.length}`;
  unreadInfo.textContent = `Unread ${unreadBooks.length}`;
}

// add color to books if read or unread
function changeClr(div, valueAt, btn) {
  if (myLibrary[valueAt].read === "Read") {
    div.classList.add("read");
    btn.classList.add("readBtn");
  } else if (myLibrary[valueAt].read === "Unread") {
    div.classList.add("unread");
    btn.classList.add("unreadBtn");
  }
}

// change book color if book status changes
function ifRead(div, btn) {
  if (div.classList.contains("read")) {
    div.classList.remove("read");
    div.classList.add("unread");
    btn.classList.remove("readBtn");
    btn.classList.add("unreadBtn");
  } else if (div.classList.contains("unread")) {
    div.classList.remove("unread");
    div.classList.add("read");
    btn.classList.remove("unreadBtn");
    btn.classList.add("readBtn");
  }
  displayReadData();
}

// create each book
function createBook() {
  bookContainer.textContent = "";
  myLibrary.forEach((element) => {
    // create the elements
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const haveRead = document.createElement("button");
    const remove = document.createElement("button");
    // assign values to them
    title.textContent = element.title;
    author.textContent = element.author;
    pages.textContent = `${element.numPages} pages`;
    haveRead.textContent = element.read;
    remove.textContent = "Delete";
    // assigning dataset to remove button
    haveRead.dataset.bookRead = myLibrary.indexOf(element);
    remove.dataset.ID = myLibrary.indexOf(element);
    const valueAt = remove.dataset.ID;
    // adding EventListeners to each book
    remove.addEventListener("click", removeBook);
    haveRead.addEventListener("click", () => {
      myLibrary[valueAt].changeRead(valueAt);
      haveRead.textContent = myLibrary[valueAt].read;
      ifRead(div, haveRead);
    });
    // add class to the book Cards
    div.classList.add("book");
    haveRead.classList.add("numberBtn");
    // Append to the books to cont
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(haveRead);
    div.appendChild(remove);
    // function to add color
    changeClr(div, valueAt, haveRead);
    bookContainer.appendChild(div);
  });
}

function removeBook(element) {
  myLibrary.splice(element.target.dataset.ID, 1);
  createBook();
  displayReadData();
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
newBookBtn.addEventListener("click", () => {
  addBookToLib();
  createBook();
  clearModal();
  displayReadData();
  modal.style.visibility = "hidden";
});

// random books added to populate the screen
const randomBook = () => {
  const harryPotter = new Book("Harry Potter", "J.K Rowling", 450, "Unread");
  const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 500, "Read");
  const legend = new Book("Legend", "Mary Lu", 350, "Unread");
  const theSpook = new Book("The Spook", "Joseph Delaney", 400, "Read");
  myLibrary.push(harryPotter, theHobbit, legend, theSpook);
  createBook();
  displayReadData();
};

randomBook();
