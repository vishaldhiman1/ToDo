

// Function to run after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  changeDate(); // Display the current date
  loadTodos(); // Load tasks from local storage
});

// Function to display the current date
function changeDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const setDate = document.querySelector('.currenTime');
  const date = new Date();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const d = date.getDate();
  const currentDate = `${day}, ${month} ${d}`;
  const ele = document.createElement('p');
  ele.innerText = currentDate;
  setDate.appendChild(ele);
}

// Input field to add tasks
const taskInput = document.querySelector('.todo');
taskInput.addEventListener('keydown', addTask);

// Helper function to create a task element
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task-item');
  taskElement.style.display = 'flex';
  taskElement.style.alignItems = 'center';
  taskElement.style.justifyContent = 'space-between';
  

  taskElement.innerHTML = `
    <div style="font-size:x-large; margin-left:19px; width:90%; height:100%">${task}</div>
    <i class="fa-solid fa-trash delete-icon" style="margin-right:19px; width:35px; height:30px; cursor:pointer; display:flex;
    justify-content:center;align-items:center" onclick="deleteTask(this)"></i>`;
  taskElement.style.backgroundColor = 'whitesmoke';
  taskElement.style.height = '42px';
  taskElement.style.margin = "5px 0px 0px 27px";
  taskElement.style.width = '93%';
  taskElement.style.marginBottom = '4px';

  return taskElement;
}

// Add a new task
function addTask(event) {
  if (event.key === 'Enter') {
    const input = taskInput.value.trim(); // Trim whitespace
    if (input === '') {
      alert('Please enter a valid task.');
      return;
    }

    const tasksContainer = document.querySelector('.task');
    const taskElement = createTaskElement(input);
    tasksContainer.appendChild(taskElement);

    // Update local storage
    const todoList = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.push(input);
    localStorage.setItem('todos', JSON.stringify(todoList));

    taskInput.value = ''; // Clear input field
    console.log(`Added task: ${input}`);
  }
}

// Delete a task
function deleteTask(element) {
  const taskText = element.previousElementSibling.textContent.trim();
  console.log(`Deleting task: ${taskText}`);

  // Remove from local storage
  let todoList = JSON.parse(localStorage.getItem('todos')) || [];
  const newTodoList = todoList.filter(task => task !== taskText);
  if (newTodoList.length === todoList.length) {
    console.error(`Task not found in local storage: ${taskText}`);
  } else {
    console.log(`Task removed from local storage: ${taskText}`);
  }
  localStorage.setItem('todos', JSON.stringify(newTodoList));

  // Remove from DOM
  element.parentElement.remove();
  console.log(`Task removed from DOM: ${taskText}`);
}

// Load tasks from local storage on page load
function loadTodos() {
  const tasksContainer = document.querySelector('.task');
  tasksContainer.innerHTML = ''; // Clear any existing tasks
  const todoList = JSON.parse(localStorage.getItem('todos')) || [];
  todoList.forEach(task => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });
  console.log(`Loaded tasks: ${todoList}`);
}

let imp=document.querySelector('.imp');
imp.addEventListener('click',important);

function important(event){
  if(!event){
imp.innerHTML=`<i class="fa-solid fa-star"></i>
<p>Important</p>
`
imp.style.marginLeft='3px';
  }

}
