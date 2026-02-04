//Creating Library Array
const myLibrary = [];
book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
book2 = new Book("1984", "George Orwell", 328, false);
book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
book4 = new Book("Pride and Prejudice", "Jane Austen", 279, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

showLibrary(myLibrary);

//Book Object Creation
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    //Book toggling read value. Prototype allows every book to access the function.
    Book.prototype.toggleRead = function () {
        this.read = !this.read;
    }

}

//Function to add a new book to array
function addBookToLibrary() {
    // take params, create a book then store it in the array
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    showLibrary(myLibrary);
}


function showLibrary(libraryArray) {
    // Clear existing library display
    const libraryContainer = document.querySelector(".library");
    libraryContainer.innerHTML = "";

    // Loop through the library array and create book cards
    libraryArray.forEach(book => {
        const card = document.createElement("div");
        const cardTitle = document.createElement("h2");
        cardTitle.textContent = book.title;
        card.appendChild(cardTitle);

        const cardAuthor = document.createElement("h3");
        cardAuthor.textContent = book.author;
        card.appendChild(cardAuthor);

        const cardPages = document.createElement("p");
        cardPages.textContent = book.pages + " pages";
        card.appendChild(cardPages);

        const cardRead = document.createElement("p");
        cardRead.textContent = book.read ? "Read" : "Not Read";
        card.appendChild(cardRead);

        const readButton = document.createElement("button");
        readButton.textContent = "Toggle Read"
        card.appendChild(readButton);

        //Read Button event listener
        readButton.addEventListener("click", () => {
            book.toggleRead();
            showLibrary(myLibrary);
        })

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        //Remove Button event listener
        removeButton.addEventListener("click", () => {
            const bookId = myLibrary.indexOf(book);
            if (bookId !== -1) {
                myLibrary.splice(bookId, 1);
                showLibrary(myLibrary);
            }


        }
        );
        card.appendChild(removeButton);

        libraryContainer.appendChild(card);
    });
}


// Event listener for the add book button
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".addBookBtn");
const closeButton = document.querySelector(".closeBtn");
const submitButton = document.querySelector(".submitBtn");

addBookButton.addEventListener("click", () => {
    const title = document.getElementById("title");
    title.value = "";
    const author = document.getElementById("author");
    author.value = "";
    const pages = document.getElementById("pages");
    pages.value = "";
    const read = document.getElementById("read");
    read.checked = false;

    dialog.showModal();

});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

//AddBook Submission event listener
submitButton.addEventListener("click", () => {
    dialog.close();
    addBookToLibrary();
})
