const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');
const themeToggle = document.getElementById('theme-toggle');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const dateInput = document.getElementById('task-date');
    const date = dateInput.value;
  
    const errorMsg = document.getElementById('error-message');
    let hasError = false;
  
// Reset erros anteriores
taskInput.classList.remove('input-error');
dateInput.classList.remove('input-error');
errorMsg.classList.remove('visible');


// Validação
if (text === '') {
  taskInput.classList.add('input-error');
  hasError = true;
}
if (date === '') {
  dateInput.classList.add('input-error');
  hasError = true;
}

if (hasError) {
  errorMsg.textContent = 'Preencha todos os campos.';
  errorMsg.classList.add('visible');
  return;
}

  
    // Se tudo ok, salva e limpa
    tasks.push({ text, date, completed: false });
    taskInput.value = '';
    dateInput.value = '';
    renderTasks(currentFilter);
  });
  

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  
    filteredTasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.innerHTML = `
        <div>
          <span>${task.text}</span>
          ${task.date ? `<small style="display:block; color: gray; font-size: 0.8rem;">📅 ${task.date}</small>` : ''}
        </div>
        <div>
          <button onclick="toggleComplete(${index})">✔️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
  

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(currentFilter);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(currentFilter);
}

let currentFilter = 'all';
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(currentFilter);
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

console.log('Tema escuro?', document.body.classList.contains('dark'));
