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
    
    if (count.length == 0) {
        completionSection.innerHTML = `
            <div class="message">
            Crie novas tarefas para ver seu progresso!
            </div>
        `
    }

    for (let i=0; i < count.length; i++) {
        div = document.createElement("div"); 
        div.className = "todo-completion";
        container = document.createElement("div");
        container.className = "completion-canvas-container";
        
        span = document.createElement("span");
        span.textContent = count[i].title;

        canvas = document.createElement("canvas"); 
        id = `chart-${i}`;
        canvas.id = id; 
        canvas.className = "completion-canvas";
        dataValue = [count[i].count, total - count[i].count];
        color = ["rgb(100, 255, 100)", "grey"];

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
                    borderWidth: 0,
                    data: dataValue,
                }] 
            },
            options: {
                cutoutPercentage: 85,
                legend: {
                    display: false
                },
            }
        })

    }
}

updateTodoCompletion();

