const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");

// constructor
function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.changeRead = function (valueAt) {
  if (myLibrary[valueAt].read === "Yes") {
    myLibrary[valueAt].read = "No";
  } else if (myLibrary[valueAt].read === "No") {
    myLibrary[valueAt].read = "Yes";
  }
};

// Lib array
let myLibrary = [];

//functions to add books to array
function addBookToLib() {
  let title = Name.value;
  let author = authorName.value;
  let numberPage = pageNumber.value;
  let read = document.querySelector("input[name=read]:checked").value;
  const word = new Book(title, author, numberPage, read);
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
      let readBtn = document.createElement("button");
      createReadBtn(readBtn);
      newCard.append(delBtn, readBtn);
      bookContainer.appendChild(newCard);
      count++;
      changeClr(newCard, i);
      let allDelBtn = document.querySelectorAll(".numberBtn");
      deleteBook(allDelBtn, newCard);
      changeReadStatus(readBtn, i, newCard, delBtn);
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

// creates the change status button
function createReadBtn(readBtn) {
  readBtn.innerText = "Change Read Status";
  readBtn.classList.add("readClass");
}

// Change read status
function changeReadStatus(readBtn, valueAt, book, delBtn) {
  readBtn.addEventListener("click", () => {
    let bookIndex = book.dataset.bookNumber;
    let btnIndex = delBtn.dataset.bookNumber;
    if (bookIndex === btnIndex) {
      myLibrary[bookIndex].changeRead(valueAt);
      createBook(book, valueAt);
      createDelBtn(delBtn, valueAt);
      createReadBtn(readBtn);
      if (book.classList.contains("read")) {
        book.classList.remove("read");
        book.classList.add("unread");
      } else if (book.classList.contains("unread")) {
        book.classList.remove("unread");
        book.classList.add("read");
      }
      book.append(delBtn, readBtn);
      bookContainer.append(book);
    }
  });
}

// delete a book function
function deleteBook(allBtn, book) {
  allBtn.forEach((btn1) => {
    btn1.addEventListener("click", () => {
      let dataB1 = book.dataset.bookNumber;
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
}

// clear the modal box
const clearModal = () => {
  Name.value = " ";
  authorName.value = " ";
  pageNumber.value = 0;
  document.querySelector('input[name="read"]:checked').checked = false;
};

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
  loopOver();
  clearModal();
  modal.style.visibility = "hidden";
});
