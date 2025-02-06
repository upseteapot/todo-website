import { getDaysInMonth, getStartWeekday } from "./date.js"
import { getCheckedTodo, getSelectedDate, selectPreviousMonth, selectNextMonth } from "./storage.js"


export function updateCalendar() {
    const month = document.getElementById("calendar-month");
    const calendar = document.getElementById("calendar-days");
    const date = new Date();
    const monthDays = getDaysInMonth(date); 
    const startWeekday = getStartWeekday(date);
    const filteredData = getCheckedTodo();
    
    const monthsKeys = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    month.textContent = monthsKeys[date.getMonth()];
    
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
        let item = document.createElement("div");
        calendar.appendChild(item);
    }

    for (let i=0; i < monthDays; i++) {
        let item = document.createElement("div");
         
        if ((i+1) === date.getDate())
            item.className = "day current-day";        
        else 
            item.className = "day";

        item.textContent = `${i+1}`

        let todos = filteredData[`${i+1}-${date.getMonth()+1}-${date.getFullYear()}`];
        if (todos != undefined) {
            for (let j=0; j < monthDays; j++) {
                let spanItem = document.createElement("span");
                spanItem.textContent = todos[j];
                item.appendChild(spanItem); 
            }
        }

        calendar.appendChild(item);
    }
}

updateCalendar();

