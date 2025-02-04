
function getCurrentDate() {
    const date = new Date(); 
    const dateStr = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`; 
    return dateStr;
}

function getId() {
    const idLocalStorage = localStorage.getItem("id");
    const id = (idLocalStorage === null) ? 0 : parseInt(idLocalStorage);
    localStorage.setItem("id", id + 1);
    return id; 
}

function getTodoData() {
    const todoData = localStorage.getItem("todo");
    if (todoData === null) 
        return new Array();
    return JSON.parse(todoData);
}

function addTodo(title) {
    const todoData = getTodoData(); 
    const id = getId();
    const newTodo = {
        id: id,
        title: title,
        statusHistory: []
    }
    todoData.push(newTodo);
    localStorage.setItem("todo", JSON.stringify(todoData));
}

function toggleStatus(id) {
    const todoData = getTodoData();
    const dateStr = getCurrentDate();
    let todo;

    for (let i=0; i < todoData.length; i++) {
        todo = todoData.at(i);
        if (todo.id === id) {
            if (getStatus(todo))
                todo.statusHistory.pop();
            else
                todo.statusHistory.push(dateStr);
        }
    }

    localStorage.setItem("todo", JSON.stringify(todoData));
}

function getStatus(todo) {
    return todo.statusHistory.at(-1) === getCurrentDate();
}

function removeTodo(id) {
    const todoData = getTodoData();
    let todo;
    
    for (let i=0; i < todoData.length; i++) {
        todo = todoData.at(i);
        if (todo.id === id) {
            todoData.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("todo", JSON.stringify(todoData));
}

