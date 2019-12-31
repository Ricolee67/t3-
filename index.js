

function get_todos() {

    //let todos;
    let todos_str = localStorage.getItem('todo');
    // if (todos_str !== null) {
    // todos ; 
    //}
    return todos_str !== null ? JSON.parse(todos_str) : [];
}




function add() {
    let checkbox = document.getElementById('checkbox').value;
    let todos = get_todos();
    if (checkbox && checkbox.length > 1) {
        todos.unshift(checkbox);
        localStorage.setItem('todo', JSON.stringify(todos));
    }


    vue();

    return false;
}

function remove(event) {

    // let id = this.getAttribute('id');
    let todos = get_todos();
    todos.splice(event.detail.id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));


    vue();

    return false;
}

function vue() {
    //  let todos = get_todos();




    window.dispatchEvent(new CustomEvent('page-refresh'))
}
window.addEventListener('remove-entry', remove)
document.getElementById('add').addEventListener('click', add);

