const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const form = document.getElementById("newForm");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");
const removeAll = document.getElementById("removeAll");

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
    if (count <= i) {
      i + count;
      let newCard = document.createElement("div");
      createBook(newCard, i);
      let delBtn = document.createElement("button");
      createDelBtn(delBtn, i);
      newCard.appendChild(delBtn);
      bookContainer.appendChild(newCard);
      count++;
      changeClr(newCard, i);
      let allBooks = document.querySelectorAll(".book");
      let allDelBtn = document.querySelectorAll(".numberBtn");
      allBooks.forEach((book1) => {
        allDelBtn.forEach((btn1) => {
          btn1.addEventListener("click", () => {
            let dataB1 = book1.dataset.bookNumber;
            let dataBT1 = btn1.dataset.bookNumber;
            if (dataB1 === dataBT1) {
              let selectedDiv = document.querySelector(
                `[data-book-number="${dataB1}"]`
              );
              myLibrary.splice(dataB1, 1);
              bookContainer.removeChild(selectedDiv);
              count--;
            }
          });
        });
      });
    }
  }
};

// Change books color
function changeClr(item, valueAt) {
  if (myLibrary[valueAt].read === "Yes") {
    item.classList.add("read");
  } else if (myLibrary[valueAt].read === "No") {
    item.classList.add("unread");
  }
}

// create each book
function createBook(item, valueAt) {
  item.dataset.bookNumber = valueAt;
  item.classList.add("book");
  item.innerHTML = `<h4>Title</h4>
      <p>${myLibrary[valueAt].title}</p>
      <h4>Author</h4>
      <p>${myLibrary[valueAt].author}</p>
      <h4>Number of pages</h4>
      <p>${myLibrary[valueAt].numPages}</p>
      <h4>Have you read this book?</h4>
      <p>${myLibrary[valueAt].read}</p> `;
}

// create delete btn
function createDelBtn(btnName, valueAt) {
  btnName.innerText = "Remove Book";
  btnName.dataset.bookNumber = valueAt;
  btnName.classList.add("numberBtn");
}

// // delete a book function
function deleteBook(allBooks, allBtn) {
  allBooks.forEach((book1) => {
    allBtn.forEach((btn1) => {
      btn1.addEventListener("click", () => {
        let dataB1 = book1.dataset.bookNumber;
        let dataBT1 = btn1.dataset.bookNumber;
        if (dataB1 === dataBT1) {
          myLibrary.splice(dataB1, 1);
        }
      });
    });
  });
}

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

// hide modal and call clear modal function
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
