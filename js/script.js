document.addEventListener("DOMContentLoaded", function(){
    const addNewBookForm = document.getElementById("addNewBookForm");
    const editBookForm = document.getElementById("editBookForm");
    const searchBookForm = document.getElementById("searchForm")
    const overlay = document.getElementById("overlay");
    const overlayBG = overlay.querySelector("#overlayBG");
    const closeBtn = overlay.querySelector("#cancelEdit");

    addNewBookForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        addNewBook();
    });

    editBookForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        editBook();
    });
    
    searchBookForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        searchBook();
    });

    function cancelEdit(){
        overlay.style.display = "none";
        overlay.querySelector("#bookId").removeAttribute("value");
    }

    overlayBG.addEventListener("click", ()=>{
        cancelEdit();
    });

    closeBtn.addEventListener("click", ()=>{
        cancelEdit();
    });

    if(isStorageSupported()){
        loadDataFromStorage();
    }
});