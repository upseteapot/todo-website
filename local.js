
function getTodo() {
    const todo = localStorage.getItem("todo");
    if (todo == null) 
        return new Array();
    return JSON.parse(todo);
}

function addTodo(newTodo) {
    const todo = getTodo(); 
    todo.push(newTodo);
    localStorage.setItem("todo", JSON.stringify(todo));
}

