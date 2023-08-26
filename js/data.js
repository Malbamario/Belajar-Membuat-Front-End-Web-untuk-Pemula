const STORAGE_KEY = "MALBA_BOOKSELF";

let books = [];
let elementOnEditing = null;

function isStorageSupported(){
    if(typeof(Storage) !== "undefined"){
        return true;
    }else{
        alert("Sorry your browser not support Web Storage");
    }
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(data !== null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function uppdateDataToStorage(){
    if(isStorageSupported()){
        saveData();
    }
}

function composeBookObject(title, author, year, isComplete){
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId){
            return book;
        }
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for(book of books){
        if(book.id === bookId){
            return index;
        }
        index++;
    }
    return -1;
}