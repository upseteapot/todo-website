
function newTodoButtonClick() {
    const titleInput = document.getElementById("title-input");
    addTodo(titleInput.value);
    updateTodoDisplay();
}

function trashIconClick(e) {
    removeTodo(e.currentTarget.todoId); 
    updateTodoDisplay();
}

function checkIconClick(e) {
    toggleStatus(e.currentTarget.todoId);
    updateTodoDisplay();
}

function updateTodoDisplay() {
    const todoData = getTodoData();
    const todoDisplay = document.getElementById("todo-display");
    todoDisplay.innerHTML = "";

    todoData.forEach((element) => {
        let item = document.createElement("li");
        let checkIconClass = getStatus(element) ? "fa-square-check" : "fa-square"; 
        let textClass = getStatus(element) ? "checked" : "unchecked";

        item.innerHTML = `
            <div>
                <span id="${element.id}-check" class="fa-regular ${checkIconClass}"></span>
                <span id="${element.id}-todo" class="${textClass}">${element.title}</span>
                <span id="${element.id}-delete" class="fa fa-trash"></span>
            </div>
        `
        todoDisplay.appendChild(item);

        const checkIcon = document.getElementById(`${element.id}-check`);
        checkIcon.todoId = element.id;
        checkIcon.addEventListener("click", checkIconClick);
        
        const trashIcon = document.getElementById(`${element.id}-delete`);
        trashIcon.todoId = element.id;
        trashIcon.addEventListener("click", trashIconClick);
    });
}

function updateCalendar() {
    const calendar = document.getElementById("calendar-days");
}

// Compatibilty
let legacy = true;
if (localStorage.getItem("legacy-flag") === null || localStorage.getItem("legacy-flag") === legacy) {
    localStorage.clear();
    localStorage.setItem("legacy-flag", !legacy);
}

const newTodoButton = document.getElementById("new-todo-button");
newTodoButton.addEventListener("click", newTodoButtonClick);

updateTodoDisplay();

