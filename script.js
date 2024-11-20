
const myLibrary = [];
const booksDOM = [];
const display = document.querySelector(".display-book");

const newBook = document.querySelector('.new-book');
const dialog = document.querySelector('#dialog')
const submitBtn = dialog.querySelector('#submit');
const titleInput = dialog.querySelector('#title');
const authorInput = dialog.querySelector('#author');
const pagesInput = dialog.querySelector('#pages');
const readInput = dialog.querySelector('#read');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(read){
        if(!read){
            return `${title} by ${author}, ${pages} pages, not read yet`;
        }
        else{
            return `${title} by ${author}, ${pages} pages, has been read`;
        }
    }
}

function createBookDOMObj( book, index ){
    const bookObj = {
        theBook: book,
        theIndex: index
    };

    booksDOM.push( bookObj );
}

function addBookToLibrary( title, author, pages, read ){
    myLibrary.push( new Book( title, author, pages, read ) );
    let index = myLibrary.length - 1;
    createBookDOMObj( myLibrary.at( index ), index );
}

function updateDOMIndex(booksDOM){
    booksDOM.forEach( bookObj => {
        bookObj.theIndex = booksDOM.indexOf(bookObj);
    });
    
    while(display.lastElementChild){
        display.removeChild(display.lastElementChild);
    }

    display.appendChild(newBook);
    displayBooks(booksDOM);
}

function deleteBook( index ){
    booksDOM.splice(index, 1);
    myLibrary.splice(index, 1);

    updateDOMIndex(booksDOM);
}

function showBookDetails( obj ){
    const bookDiv = document.createElement('div');
    const bookIndex = document.createElement('h5');
    bookIndex.textContent = obj.theIndex + ": ";
    bookDiv.appendChild(bookIndex);
    const bookPara = document.createElement('p');
    bookPara.textContent = obj.theBook.info();
    bookDiv.appendChild( bookPara );
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    bookDiv.appendChild(deleteBtn);
    const readBtn = document.createElement('button');
    readBtn.textContent = "Read";
    bookDiv.appendChild(readBtn);
    display.appendChild( bookDiv );

    deleteBtn.addEventListener('click', function(){
        display.removeChild(bookDiv);
        deleteBook(obj.theIndex);
    });

    readBtn.addEventListener('click', function(){
        obj.theBook.read = obj.theBook.read === true ? false : true;
        bookPara.textContent = obj.theBook.info(obj.theBook.read);
    });
}

function displayBooks( booksDOM ){
    booksDOM.forEach( bookObj => {
        showBookDetails( bookObj );
    });
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary( titleInput.value, authorInput.value, pagesInput.value, readInput.value );
    showBookDetails( booksDOM.at( booksDOM.length-1 ) );
    dialog.close();
});

newBook.addEventListener('click', () => {
    dialog.showModal();
});


addBookToLibrary("The Hobbit", 'Camrey Can', 20, false);
console.log(myLibrary);
displayBooks(booksDOM);