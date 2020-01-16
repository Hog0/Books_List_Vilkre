const form = document.querySelector("#book-form");
const bookList = document.querySelector(".collection");
const bookInput = document.querySelector("#book");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-books");

loadEventListeners();

function loadEventListeners(){
    //Load books from local storage, if there are any
    document.addEventListener('DOMContentLoaded', getBooks);
    //Add a book event
    form.addEventListener('submit', addBook);
    //Remove book
    bookList.addEventListener('click', removeBook);
    //clear all books
    clearBtn.addEventListener('click', clearBooks);
    //filter books
    filterInput.addEventListener('keyup', filterBooks);
}

//get books from local storage
function getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book){
        // create an li document
        const li = document.createElement('li');
        // add class name to the li element
        li.className = 'collection-item';
        // create a textnode and append it to the li
        li.appendChild(document.createTextNode(book));

        const link = document.createElement('a');
        //add a class to the a element
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
        li.appendChild(link);
        bookList.appendChild(li);

    });


}

function addBook(event){
    //check for empty input
    if(bookInput.value === ''){
        alert('Enter a book');
    }else {
        //create an li element to add to the ul
    const li = document.createElement('li');
    //add a class name to the li element
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(bookInput.value));
    //create a new anchor element
    const link = document.createElement('a');
    //add a class to the a element
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
    li.appendChild(link);
    bookList.appendChild(li);
  
    //store in LocalStorage

    storeInLocalStorage(bookInput.value);
    bookInput.value = '';
    
    event.preventDefault();
    }
}

function storeInLocalStorage(book){
    //declare an array to read from the local storage
    console.log(bookInput.value);
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    
    //add a book to the books array
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(event){
   
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the book?')){
            event.target.parentElement.parentElement.remove();
            console.log(event.target.parentElement.parentElement.textContent);
            //Remove from local storage
            removeBookFromLocalStorage(event.target.parentElement.parentElement);
        }
    }
}

function removeBookFromLocalStorage(bookItem){
    let books;

    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(book, index){
        if(bookItem.textContent.slice(0, -1) === book){
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
}

function clearBooks(){
    if(confirm("Clear the book list?")){
        event.target.parentElement.remove();
        console.log(event.target.parentElement.textContent);
        //Remove from local storage

        localStorage.clear();
    }
}

function filterBooks(event){
    const userFilter = event.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(function(book){
        const item = book.firstChild.textContent;
        if(item.toLowerCase().indexOf(userFilter) != -1){
            book.style.display = 'block';
        }else {
            book.style.display = 'none';
        }
    });

}