import { getDateKey, getMonthYearKey, getDaysInMonth, getStartWeekday } from "./date.js"
import { getCheckedTodo, getSelectedDate, selectPreviousMonth, selectNextMonth } from "./storage.js"


const weekdaysNames = [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" ];
const monthsNames = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];

// "calendar-month"
function updateCalendarMonth() {
    const year = document.getElementById("calendar-year");
    const month = document.getElementById("calendar-month");
    const selectedDate = getSelectedDate();
    year.textContent = selectedDate.getFullYear();
    month.textContent = monthsNames[selectedDate.getMonth()];
}

// "calendar-days"
function createCalendarDays() {
    const calendarDays = document.getElementById("calendar-days");
    calendarDays.daysInMonth = 42;

    for (let i=0; i < weekdaysNames.length; i++) {
        let weekdayItem = document.createElement("li");
        weekdayItem.className = "weekday";
        weekdayItem.textContent = weekdaysNames[i]
        calendarDays.appendChild(weekdayItem);
    }

    for (let i=0; i < calendarDays.daysInMonth; i++) {
        let dayItem = document.createElement("li");
        dayItem.className = "day inactive";
        dayItem.id = `calendar-day-${i}`;
        calendarDays.appendChild(dayItem);
    }
}

function getTodoListItem(dateKey) {
    const checkedTodo = getCheckedTodo();
    const todoList = checkedTodo[dateKey];
    if (todoList === undefined)
        return null;

    let todoListItem = document.createElement("ul");
    let item;

    for (let i=0; i < todoList.length; i++) {
        item = document.createElement("li"); 
        item.textContent = todoList[i];
        todoListItem.appendChild(item);
    }

    return todoListItem;
}

export function updateCalendarDays() {
    const calendarDays = document.getElementById("calendar-days");
    const currentDate = new Date();
    const selectedDate = getSelectedDate();
    const monthDays = getDaysInMonth(selectedDate); 
    const startWeekday = getStartWeekday(selectedDate);
    let checkDate;
    let dayItem;
    let isSameMonth;
    let isSameDay;
    let spanItem;
    let dateKey;
    let todoListItem;

    for (let i=0; i < startWeekday + 1; i++) {
        checkDate = new Date(selectedDate);
        checkDate.setDate(1 - startWeekday + i);
        dayItem = document.getElementById(`calendar-day-${i}`);
        dayItem.innerHTML = "";
        dayItem.textContent = `${checkDate.getDate()}`;
        dayItem.className = "not-this-month";
    }

    for (let i=0; i < monthDays; i++) {
        checkDate = new Date(selectedDate);
        checkDate.setDate(i+1);
        dayItem = document.getElementById(`calendar-day-${i + startWeekday}`);
        dayItem.innerHTML = "";
        isSameMonth = getMonthYearKey(selectedDate) === getMonthYearKey(currentDate);
        isSameDay = (i+1) === parseInt(currentDate.getDate());

        spanItem = document.createElement("span");
        spanItem.textContent = `${i+1}`;
        dayItem.appendChild(spanItem); 
        
        dateKey = getDateKey(checkDate);
        todoListItem = getTodoListItem(dateKey);
        if (todoListItem != null)
            dayItem.appendChild(todoListItem);
        
        dayItem.className = "day"; 
        dayItem.className += (isSameDay && isSameMonth) ? " current-day" : "";
        dayItem.className += (todoListItem != null) ? " day-content" : "";
    }

    for (let i=0; i < calendarDays.daysInMonth - startWeekday - monthDays; i++) {
        checkDate = new Date(selectedDate);
        checkDate.setDate(monthDays + i + 1);
        dayItem = document.getElementById(`calendar-day-${startWeekday + monthDays + i}`);
        dayItem.innerHTML = "";
        dayItem.textContent = `${checkDate.getDate()}`;
        dayItem.className = "not-this-month";
    }
}

// Bind functions to events
function prevMonthButtonClick() {
    selectPreviousMonth();
    updateCalendarMonth();
    updateCalendarDays();
}

function nextMonthButtonClick() {
    selectNextMonth();
    updateCalendarMonth();
    updateCalendarDays();
}

const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
prevMonthButton.addEventListener("click", prevMonthButtonClick);
nextMonthButton.addEventListener("click", nextMonthButtonClick);

// Setup
updateCalendarMonth();
createCalendarDays();
updateCalendarDays();

