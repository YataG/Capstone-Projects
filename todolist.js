//Create a new list item when clicking add
let addToDoButton = document.getElementById('addButn');
let itemsToDo = document.getElementById('itemsToDo');
let inputField = document.getElementById('myInput');

addToDoButton.addEventListener('click', function () {
  var list = document.createElement('p');
  list.innerText = inputField.value;
  list.classList.add(); //add css class name here//
  itemsToDo.appendChild(list);
  inputField.value = '';
  list.addEventListener('click', function () {
    list.style.textDecoration = 'line-through';
  });
  list.addEventListener('dblclick', function () {
    itemsToDo.removeChild(list);
  });
});
