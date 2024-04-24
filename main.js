const input = document.querySelector('input');
const addNote = document.querySelector('.addNote-btn');
const ul = document.querySelector('ul');
const searchInput = document.querySelector('#searchInput');
const filterCompletedCheckbox = document.querySelector('#filterCompleted');

// Cargar notas desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToDOM(note.text, note.completed);
    });
});

// Función para agregar una nota al DOM y al localStorage
function addNoteToDOM(text, completed = false) {
    const p = document.createElement('p');
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = completed;
    
    p.textContent = text;
    listItem.appendChild(checkBox);
    listItem.appendChild(p);
    listItem.appendChild(addDelete());listItem
    ul.appendChild(listItem);
}

addNote.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (input.value === "") {
        alert('Debes introducir un texto');
    } else {
        addNoteToDOM(input.value);
        saveNotesToLocalStorage();
    }
    input.value = '';
});

function addDelete() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'btn-delete';
    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);
        saveNotesToLocalStorage();
    });
    return deleteBtn;
}

function saveNotesToLocalStorage() {
    const notes = [];
    const noteItems = ul.querySelectorAll('li');
    noteItems.forEach(noteItem => {
        const text = noteItem.querySelector('p').textContent;
        const completed = noteItem.querySelector('input[type="checkbox"]').checked;
        notes.push({ text, completed });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function filterNotes() {
    const searchText = searchInput.value.toLowerCase();
    const notes = ul.getElementsByTagName('li');
    Array.from(notes).forEach((note) => {
        const text = note.querySelector('p').textContent.toLowerCase();
        const isCompleted = note.querySelector('input[type="checkbox"]').checked;

        if ((!filterCompletedCheckbox.checked || isCompleted) && text.includes(searchText)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterNotes);
filterCompletedCheckbox.addEventListener('change', filterNotes);