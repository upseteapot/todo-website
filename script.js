
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
    const monthDays = getDaysInMonth(); 
    const startWeekday = getStartWeekday();
    const currentDay = parseInt(getCurrentDate().split("-")[0]);
    
    calendar.innerHTML = `
        <span>Domingo</span>
        <span>Segunda</span>
        <span>Terça</span>
        <span>Quarta</span>
        <span>Quinta</span>
        <span>Sexta</span>
        <span>Sábado</span>
    `;

    for (let i=0; i < startWeekday; i++) {
        let item = document.createElement("span");
        calendar.appendChild(item);
    }

    for (let i=0; i < monthDays; i++) {
        let item = document.createElement("span");
        
        if ((i+1) === currentDay)
            item.className = "day current-day";        
        else 
            item.className = "day";

        item.textContent = `${i+1}`
        calendar.appendChild(item);
    }
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
updateCalendar();

