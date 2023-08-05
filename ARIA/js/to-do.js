const inputBox = document.getElementById('input-box');
const listContainer = document.querySelector('.list-container');
const todo_window = document.querySelector('.todo-container');
const bookmark_window = document.querySelector('.bookmark-container');
const bookmarkContainer = document.querySelector('.bookmarklist-container');
const open_todo = document.querySelector('.add-icon');
const open_bookmark = document.querySelector('.bookmark-icon');
const close_todo = document.querySelector('.exit');
const close_bookmark= document.querySelector('.close');
const add = document.querySelector('.add');
const book = document.querySelector('.book');
const todo = document.querySelector('.todo-list');
const mark = document.querySelector('.mark');


close_todo.addEventListener('click', () => {
    todo_window.classList.remove('active');
});

close_bookmark.addEventListener('click', () => {
    bookmark_window.classList.remove('active');
});

open_todo.addEventListener('click', () => {
    todo_window.classList.toggle('active');
    add.classList.toggle('active');
});

open_bookmark.addEventListener('click', () => {
    bookmark_window.classList.toggle('active');
    book.classList.toggle('active');
});



function addTask(){
    if(inputBox.value === ''){
        alert('You must write something!');
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        let i = document.createElement('i');
        i.innerHTML = '<i class="fa-solid fa-bookmark"></i>'
        li.appendChild(i);
    }
    inputBox.value = '';
    saveData()
}

function getTask(todo) {
    let task = todo
    let li = document.createElement('li');
        li.innerHTML = task;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        let i = document.createElement('i');
        i.innerHTML = '<i class="fa-solid fa-bookmark"></i>'
        li.appendChild(i);
        mark.classList.remove('checked');
        
    saveData()
}


listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData();
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.tagName === 'I'){
        e.target.classList.toggle('checked');
        saveData();
        saveBookmark();
    }
}, false);

bookmarkContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveBookmark();
        getTask(e.target.innerHTML);
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveBookmark();
    }
}, false);


function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
}
function saveBookmark(){
    localStorage.setItem('bookmark', listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem('data');
    bookmarkContainer.innerHTML = localStorage.getItem('bookmark');
}

showTask();