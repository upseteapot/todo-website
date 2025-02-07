import { countTodosInMonth, getSelectedDate } from "./storage.js"
import { getDaysInMonth } from "./date.js"


export function updateTodoCompletion() {
    const completionSection = document.getElementById("completion-section"); 
    const selectedDate = getSelectedDate();
    const count = countTodosInMonth(selectedDate); 
    const total = getDaysInMonth(selectedDate);
    completionSection.innerHTML = "";
    let div;
    let span;
    let canvas;
    let dataValue;
    let color;
    let id;
    let chart;
    let container;
    
    for (let i=0; i < count.length; i++) {
        div = document.createElement("div"); 
        container = document.createElement("div");
        container.className = "completion-canvas-container";
        
        span = document.createElement("span");
        span.textContent = count[i].title;

        canvas = document.createElement("canvas"); 
        id = `chart-${i}`;
        canvas.id = id; 
        canvas.className = "completion-canvas";
        dataValue = [count[i].count, total - count[i].count];
        color = ["red", "grey"];

        container.appendChild(canvas);
        div.appendChild(span);
        div.appendChild(container);
        
        completionSection.appendChild(div);
        
        new Chart(id, { 
            type: "doughnut", 
            data: { 
                labels: ["Feita", "Não feita"],
                datasets: [{ 
                    backgroundColor: color, 
                    data: dataValue 
                }] 
            },
            options: {
                resposive: true,
                legend: {
                    display: false
                },
                borderWidth: 0
            }
        })

    }
}

updateTodoCompletion();

