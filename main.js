import { postData, patchData, getData } from '/lib/http.js';
import { reload } from '/lib/utils.js';

const modal = document.getElementById("taskModal");
const btn = document.getElementById("createTaskBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("taskForm");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

form.onsubmit = async function(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  
  const newTask = {
    id: crypto.randomUUID(),
    title: title,
    description: description,
    createdAt: new Date().toISOString(),
    status: "todo"
  };

  await postData('/todos', newTask);
  modal.style.display = "none";
  loadTasks();
}

const loadTasks = async () => {
  const tasks = await getData('/todos');
  reload(tasks.filter(task => task.status === 'todo'), Task, document.getElementById('todo'), 'go home');
  reload(tasks.filter(task => task.status === 'inProgress'), Task, document.getElementById('inProgress'), 'В процессе');
  reload(tasks.filter(task => task.status === 'completed'), Task, document.getElementById('completed'), 'Готово');
}

export function Task(item) {
  const div = document.createElement('div');
  div.className = 'card';
  div.draggable = true;
  div.id = item.id;
  div.textContent = item.title;
  div.ondragstart = (event) => {
    event.dataTransfer.setData("text/plain", item.id);
  };
  return div;
}

const columns = document.querySelectorAll('.column');
columns.forEach(column => {
  column.ondragover = (event) => {
    event.preventDefault();
  };
  
  column.ondrop = async (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const task = await getData(`/todos/${id}`);
    task.status = column.id;
    await patchData(`/todos/${id}`, task);
    loadTasks();
  };
});

loadTasks();
