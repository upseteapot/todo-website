
function updateTodoDisplay() {
    const todo = getTodo();
    const todoDisplay = document.getElementById("todo-display");

    todoDisplay.innerHTML = "";

    todo.forEach((element) => {
        let item = document.createElement("li");
        item.textContent = element;
        todoDisplay.appendChild(item);
    });
}

function newTodoButtonClick() {
    const titleInput = document.getElementById("title-input");
    addTodo(titleInput.value);
    updateTodoDisplay();
}

const newTodoButton = document.getElementById("new-todo-button");
newTodoButton.addEventListener("click", newTodoButtonClick);

updateTodoDisplay();

