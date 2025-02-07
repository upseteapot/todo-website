import { getCurrentDateKey, getMonthYearKey, parseDateKey, parseMonthYearKey } from "./date.js"


// "id" in localStorage.
export function getId() {
    const idLocalStorage = localStorage.getItem("id");
    const id = (idLocalStorage === null) ? 0 : parseInt(idLocalStorage);
    localStorage.setItem("id", id + 1);
    return id; 
}

// "todo" in localStorage.
export function getTodoData() {
    const todoData = localStorage.getItem("todo");
    if (todoData === null) 
        return new Array();
    return JSON.parse(todoData);
}

export function addTodo(title) {
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

export function removeTodo(id) {
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

export function getCheckedTodo() {
    const todoData = getTodoData();
    let checked = new Map();
    let todo;
    let date;
    for (let i=0; i < todoData.length; i++) {
        todo = todoData.at(i);
        for (let j=0; j < todo.statusHistory.length; j++) {
            date = todo.statusHistory[j];
            if (checked[date] === undefined)
                checked[date] = new Array();
            checked[date].push(todo.title);
        }
    }
    return checked;
}

export function countTodosInMonth(date) {
    const todoData = getTodoData();
    let count = new Array();
    let todo;
    let completionDate;
    let todoCount;
    
    for (let i=0; i < todoData.length; i++) {
        todo = todoData.at(i);
        todoCount = 0;
        for (let j=0; j < todo.statusHistory.length; j++) {
            completionDate = parseDateKey(todo.statusHistory[j]);
            if (completionDate.getMonth() == date.getMonth()
                && completionDate.getFullYear() == date.getFullYear())
                todoCount += 1;
        }
        count.push({ title: todo.title, count: todoCount });
    }
    
    return count;
}

export function toggleStatus(id) {
    const todoData = getTodoData();
    const dateStr = getCurrentDateKey();
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

export function getStatus(todo) {
    return todo.statusHistory.at(-1) === getCurrentDateKey();
}

// "selected-date" in sessionStorage.
export function getSelectedDate() {
    const selectedDateKey = sessionStorage.getItem("selected-date");

    if (selectedDateKey === null) {
        let newSelected = new Date();
        sessionStorage.setItem("selected-date", getMonthYearKey(newSelected));
        return newSelected;
    }

    return parseMonthYearKey(selectedDateKey);
}

export function selectPreviousMonth() {
    const selectedDate = getSelectedDate();
    const newSelectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1);
    sessionStorage.setItem("selected-date", getMonthYearKey(newSelectedDate));
}

export function selectNextMonth() {
    const selectedDate = getSelectedDate();
    const newSelectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    sessionStorage.setItem("selected-date", getMonthYearKey(newSelectedDate));
}

