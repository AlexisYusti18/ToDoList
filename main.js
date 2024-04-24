const input = document.querySelector('input')
const addNote = document.querySelector('.addNote-btn')
const ul = document.querySelector('ul')
const searchInput = document.querySelector('#searchInput');
addNote.addEventListener('click', (e)=>{
    e.preventDefault();
    
    if (input.value === "") {
        alert('Debes Introducir Un Texto' )
    } else {
        const p =  document.createElement('p');
        const listItem = document.createElement('li');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        const text = input.value;
        p.textContent = text;
        listItem.appendChild(checkBox);
        listItem.appendChild(p);
        listItem.appendChild(addDelete());
        ul.appendChild(listItem);
    }
    input.value = '';
})

function addDelete(){
    const deleteBtn = document.createElement('button')

    deleteBtn.textContent = 'X'
    deleteBtn.className = 'btn-delete'

    deleteBtn.addEventListener('click', (e)=>{
        const item = e.target.parentElement;
        ul.removeChild(item);
    })
    return deleteBtn
}
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const notes = ul.getElementsByTagName('li');
    Array.from(notes).forEach((note) => {
        const text = note.querySelector('p').textContent.toLowerCase();
        if (text.includes(searchText)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
});