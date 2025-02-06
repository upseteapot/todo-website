import { getMonthYearKey, getDaysInMonth, getStartWeekday } from "./date.js"
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
    
    for (let i=0; i < startWeekday + 1; i++) {
        checkDate = new Date(selectedDate);
        checkDate.setDate(1 - startWeekday + i);
        dayItem = document.getElementById(`calendar-day-${i}`);
        dayItem.textContent = `${checkDate.getDate()}`;
        dayItem.className = "not-this-month";
    }

    for (let i=0; i < monthDays; i++) {
        dayItem = document.getElementById(`calendar-day-${i + startWeekday}`);
        isSameMonth = getMonthYearKey(selectedDate) === getMonthYearKey(currentDate);
        isSameDay = (i+1) === parseInt(currentDate.getDate());
        dayItem.className = (isSameMonth && isSameDay) ? "day active current-day" : "day active";
        dayItem.textContent = `${i+1}`; 
    }
    
    for (let i=0; i < calendarDays.daysInMonth - startWeekday - monthDays; i++) {
        checkDate = new Date(selectedDate);
        checkDate.setDate(monthDays + i + 1);
        dayItem = document.getElementById(`calendar-day-${startWeekday + monthDays + i}`);
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

