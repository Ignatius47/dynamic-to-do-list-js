document.addEventListener('DOMContentLoaded', () => {
  taskInput = document.getElementById('task-input');
  taskList = document.getElementById('task-list');
  addButton = document.getElementById('add-task-btn');

  loadTasks();

  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });
});

function addTask(taskText, save = true) {
  if (!taskText.trim()) {
    alert('Please enter a task.');
    return;
  }

  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-btn');

  removeButton.onclick = function () {
    taskList.removeChild(listItem);
    removeFromStorage(taskText);
  };

  listItem.appendChild(removeButton);
  taskList.appendChild(listItem);

  if (save) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  taskInput.value = '';
}

function removeFromStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(taskText => addTask(taskText, false));
}