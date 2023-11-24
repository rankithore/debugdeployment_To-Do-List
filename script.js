let pendingTaks = [];
let completedTasks = [];
const taskInput = document.getElementById("add");
//add task in pending list
const addTask = () => {
  const taskText = taskInput.value.trim();
  // console.log(taskText)
  if (taskText !== "") {
    pendingTaks.push(taskText);
    renderPendingTasks();
    taskInput.value = "";
    taskInput.focus();
  } else {
    alert("Enter your task!");
    taskInput.focus();
  }
};

//render pending task
const renderPendingTasks = () => {
  const pendingList = document.getElementById("pendingList");
  const existingTasks = pendingList.querySelectorAll("li");

  existingTasks.forEach((task) => task.remove());

  for (let i = 0; i < pendingTaks.length; i++) {
    const taskText = pendingTaks[i];
    const newTask = document.createElement("span");
    newTask.innerHTML = `
        <li> ${taskText}
    <div>
        <i class="fa-solid fa-square-check" onclick='completeTask(${i})'></i>
        <i class="fa-solid fa-pen" onclick='editTask(${i})'></i>
        <i class="fa-solid fa-trash" onclick="deleteTask('pending', ${i})"></i>
        </div>
        </li>
        `;
    pendingList.appendChild(newTask);
  }
};

function editTask(index){
        const taskText = prompt('Edit the task:', pendingTaks[index]);
        if(taskText !== null){
            pendingTaks[index] = taskText;
            renderPendingTasks();
        }
}

function completeTask(index){
        const taskText = pendingTaks[index];
        pendingTaks.splice(index, 1);
        completedTasks.push(taskText);
        renderPendingTasks();
        renderCompletedTasks();
}

function deleteTask(listType, index){
        // alert('delete')
    if(listType === 'pending'){
        pendingTaks.splice(index, 1);
        renderPendingTasks();
    }else if(listType === 'completed'){
        completedTasks.splice(index, 1);
        renderCompletedTasks()
    }
}

function renderCompletedTasks(){
    const completeList = document.getElementById('completelist');
    const existingTasks = completeList.querySelectorAll('li');

    existingTasks.forEach(task => task.remove());

    for(let i=0; i<completedTasks.length; i++){
        const taskText = completedTasks[i];
        const newTask = document.createElement('span');
        newTask.innerHTML = `
        <li>
        ${taskText}
        <div>
        <i class="fa-solid fa-trash" onclick="deleteTask('completed', ${i})"></i>
        </div>
        </li>
        `;
        completeList.appendChild(newTask)
    }
}

//handle to submit button
document.getElementById("btn").addEventListener("click", addTask);
document.getElementById("add").addEventListener("keyup", function (event) {
  // console.log(event.key)
  if (event.key === "Enter") {
    addTask();
  }
});