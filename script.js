const addBtn = document.getElementById("add");
const modal = document.querySelector(".addModal");
const cancelBtn = document.getElementById("cancel");
const Name = document.getElementById("Name");
const authorName = document.getElementById("author");
const pageNumber = document.getElementById("number");
const newBookBtn = document.getElementById("bookBtn");
const bookContainer = document.getElementById("content");
let count = 0;
let countToCompare;

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
      <button class="haveRead" data-btn=${valueAt}>${myLibrary[valueAt].read}</button> `;
}

// create delete btn
function createDelBtn(btnName, valueAt) {
  btnName.innerText = "Remove Book";
  btnName.dataset.bookNumber = valueAt;
  btnName.classList.add("numberBtn");
}

// Change read status
function changeReadStatus(book, valueAt) {
  const changeBtn = document.querySelector(`[data-btn="${valueAt}"]`);
  changeBtn.addEventListener("click", () => {
    const bookValue = book.dataset.bookNumber;
    const changeBtnValue = changeBtn.dataset.btn;
    const bookClass = document.querySelector(
      `[data-book-number = "${valueAt}"]`
    );
    if (bookValue === changeBtnValue) {
      myLibrary[valueAt].changeRead(valueAt);
      changeBtn.innerText = `${myLibrary[valueAt].read}`;
      if (bookClass.classList.contains("read")) {
        bookClass.classList.remove("read");
        bookClass.classList.add("unread");
      } else if (bookClass.classList.contains("unread")) {
        bookClass.classList.remove("unread");
        bookClass.classList.add("read");
      }
    }
  });
}

// change value of book number data set
function changeBookNumber() {
  const changeDivs = document.querySelectorAll(`[data-book-number]`);
  changeDivs.dataset.bookNumber = 0;
}

// delete a book function
function deleteBook(allBtn, book) {
  allBtn.forEach((btn1) => {
    btn1.addEventListener("click", () => {
      const dataB1 = book.dataset.bookNumber;
      const dataBT1 = btn1.dataset.bookNumber;
      if (dataB1 === dataBT1) {
        const selectedDiv = document.querySelector(
          `[data-book-number="${dataB1}"]`
        );
        myLibrary.splice(dataB1, 1);
        bookContainer.removeChild(selectedDiv);
        count--;
        changeBookNumber();
      }
    });
  });
}

// functions to loop over the array and display the details on a div
const loopOver = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    if (count <= i) {
      i + count;
      const newCard = document.createElement("div");
      createBook(newCard, i);
      const delBtn = document.createElement("button");
      createDelBtn(delBtn, i);
      newCard.appendChild(delBtn);
      bookContainer.appendChild(newCard);
      count++;
      changeClr(newCard, i);
      const allDelBtn = document.querySelectorAll(".numberBtn");
      deleteBook(allDelBtn, newCard);
      changeReadStatus(newCard, i);
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
