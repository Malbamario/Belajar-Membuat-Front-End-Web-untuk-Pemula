const BOOK_ID = "itemId"

const unreadRow = document.getElementById("unreadRow");
const readedRow = document.getElementById("readedRow");
const emptyBox = document.getElementById("empty");

function clearBookself(){
    readedRow.parentElement.hidden = true;
    unreadRow.parentElement.hidden = true;
    while (unreadRow.firstChild) {
        unreadRow.removeChild(unreadRow.firstChild);
    }
    while (readedRow.firstChild) {
        readedRow.removeChild(readedRow.firstChild);
    }
}

function refreshDataFromBooks(){
    let count = 0;
    clearBookself();
    for(book of books){
        const newBookElement = makeBookElement(book.title, book.author, book.year, book.isComplete);
        newBookElement[BOOK_ID] = book.id;
        if(book.isComplete){
            readedRow.parentElement.hidden = false;
            emptyBox.hidden = true;
        }else{
            unreadRow.parentElement.hidden = false;
            emptyBox.hidden = true;
        }
        appendToRow(book.isComplete, newBookElement);
        count++;
    }
    if(count===0){
        console.log(count);
        emptyBox.hidden = false;
    }
    
    if(readedRow.firstChild !== null){
        readedRow.parentElement.hidden = false;
    }
    if(unreadRow.firstChild !== null){
        unreadRow.parentElement.hidden = false;
    }
}

document.addEventListener("ondatasaved", () => {
    refreshDataFromBooks();
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

function makeBookElement(title, author, year, isComplete){
    const container = document.createElement("div");
    const card = document.createElement("div");
    const titleElement = document.createElement("h5");
    const authorNYear = document.createElement("p");
    const btnRow = document.createElement("div");

    container.classList.add("col-md-6", "col-lg-6");
    card.classList.add("card", "card-body", "mb-4");
    titleElement.classList.add("card-title", "card-title-overflow");
    authorNYear.classList.add("card-text", "text-secondary");
    btnRow.classList.add("row", "mx-0");

    titleElement.innerText = title;
    titleElement.setAttribute("title", title);
    authorNYear.innerHTML = author+"<br>"+year;
    
    if(isComplete){
        btnRow.append(createButton(["col-4", "me-1", "btn", "btn-primary"], function(parent){
            addBookToUnread(parent);
        }));
    }else{
        btnRow.append(createButton(["col-4", "me-1", "btn", "btn-success"], function(parent){
            addBookToReaded(parent);
        }));
    }

    btnRow.append(createButton(["col", "mx-1", "btn", "btn-secondary"], function(parent){
        openEditForm(parent[BOOK_ID], title, author, year, isComplete);
        elementOnEditing = parent;
    }));

    btnRow.append(createButton(["col-4", "ms-1", "btn", "btn-danger"], function(parent){
        addBookToTrash(parent);
    }));

    card.append(titleElement, authorNYear, btnRow);
    container.append(card);
    return container;
}

function appendToRow(isComplete, element){
    if(isComplete){
        readedRow.append(element);
    }else{
        unreadRow.append(element);
    }
}

function addNewBook(){
    const addBookForm = document.getElementById("addNewBookForm");
    const titleEl = addBookForm.querySelector("#titleInput");
    const authorEl = addBookForm.querySelector("#authorInput");
    const yearEl = addBookForm.querySelector("#yearInput");
    const year = parseInt(yearEl.value);
    const isCompleteEl = addBookForm.querySelector("#isCompleteInput")
    
    let newBookElement = makeBookElement(titleEl.value, authorEl.value, year, isCompleteEl.checked);
    const bookObj = composeBookObject(titleEl.value, authorEl.value, year, isCompleteEl.checked);

    newBookElement[BOOK_ID] = bookObj.id;
    books.push(bookObj);

    appendToRow(isCompleteEl.checked, newBookElement);
    uppdateDataToStorage();
    alert("Book succeed to saved");
    titleEl.value = "";
    authorEl.value = "";
    yearEl.value = "";
    isCompleteEl.checked = false;
    const addDiv = document.getElementById("collapseForm")
    addDiv.classList.remove('show');
}

function editBook(){
    const editForm = document.getElementById("editBookForm")
    const id = parseInt(editForm.querySelector("#bookId").value);
    const title = editForm.querySelector("#titleInput").value;
    const author = editForm.querySelector("#authorInput").value;
    const year = parseInt(editForm.querySelector("#yearInput").value);
    const isComplete = editForm.querySelector("#isCompleteInput").checked;
    
    let newBookElement = makeBookElement(title, author, year, isComplete);
    newBookElement[BOOK_ID] = id;
    const bookObj = findBook(id);
    bookObj.title = title;
    bookObj.author = author;
    bookObj.year = year;
    bookObj.isComplete = isComplete;

    appendToRow(isComplete, newBookElement);
    elementOnEditing.remove();
    elementOnEditing = null;
    uppdateDataToStorage();
    alert("Book succeed to edited");
    document.getElementById("overlay").style.display = "none";
}

function createButton(buttonTypeClasses, eventListener){
    const button = document.createElement("a");
    for(buttonTypeClass of buttonTypeClasses){
        button.classList.add(buttonTypeClass);
        if(buttonTypeClass === "btn-success"){
            button.innerText = "Complete";
        } else if(buttonTypeClass === "btn-primary"){
            button.innerText = "Read Again";
        } else if(buttonTypeClass === "btn-secondary"){
            button.innerText = "Edit";
        }else if(buttonTypeClass === "btn-danger"){
            button.innerText = "Delete";
        }
    }
    button.addEventListener("click", function(ev){
        eventListener(ev.target.parentElement.parentElement.parentElement);
    });
    return button;
}

function addBookToReaded(bookElement){
    const title = bookElement.querySelector("div > div > h5").innerText;
    const authorNYear = bookElement.querySelector("div > div > p").innerHTML.split("<br>");

    const newBookElement = makeBookElement(title, authorNYear[0], authorNYear[1], true);
    const bookObj = findBook(bookElement[BOOK_ID])
    bookObj.isComplete = true;
    newBookElement[BOOK_ID] = bookObj.id

    readedRow.append(newBookElement);
    bookElement.remove();

    uppdateDataToStorage();
}

function addBookToUnread(bookElement){
    const title = bookElement.querySelector("div > div > h5").innerText;
    const authorNYear = bookElement.querySelector("div > div > p").innerHTML.split("<br>");

    const newBookElement = makeBookElement(title, authorNYear[0], authorNYear[1], false);
    const bookObj = findBook(bookElement[BOOK_ID])
    bookObj.isComplete = false;
    newBookElement[BOOK_ID] = bookObj.id

    unreadRow.append(newBookElement);
    bookElement.remove();

    uppdateDataToStorage();
}

function openEditForm(id, title, author, year, isComplete){
    document.getElementById("overlay").style.display = "block";
    const editForm = document.getElementById("editBookForm");
    editForm.querySelector("#bookId").value = id;
    editForm.querySelector("#titleInput").value = title;
    editForm.querySelector("#authorInput").value = author;
    editForm.querySelector("#yearInput").value = year;
    editForm.querySelector("#isCompleteInput").checked = isComplete;
}

function addBookToTrash(bookElement){
    if(confirm("Are you sure?")){
        const bookIndex = findBookIndex(bookElement[BOOK_ID]);
        books.splice(bookIndex, 1);

        bookElement.remove();
        uppdateDataToStorage();
    }
}

function searchBook(){
    const searchBar = document.getElementById("inputSearch")
    let searchedTitle = searchBar.value;
    const isSensitive = document.getElementById("isSensitiveInput").checked;
    if(searchedTitle!==""){
        let count = 0;
        for(book of books){
            let bookTitle = book.title;
            if(!isSensitive){
                bookTitle = book.title.toLowerCase();
                searchedTitle = searchedTitle.toLowerCase();
            }
            if(bookTitle.includes(searchedTitle)){
                if(count===0){
                    clearBookself();
                }
                const newBookElement = makeBookElement(book.title, book.author, book.year, book.isComplete);
                newBookElement[BOOK_ID] = book.id;
                appendToRow(book.isComplete, newBookElement);
                count++;
            }
        }

        if(readedRow.firstChild !== null){
            readedRow.parentElement.hidden = false;
        }
        if(unreadRow.firstChild !== null){
            unreadRow.parentElement.hidden = false;
        }

        searchBar.value='';
        if(count===0){
            alert("Sorry, the book you search is not found");
        }
    } else refreshDataFromBooks();
}