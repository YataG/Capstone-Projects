//declaring variables//
let addToDoButton = document.getElementById('addButn');
let itemsToDo = document.getElementById('itemsToDo');
let inputField = document.getElementById('myInput');

addToDoButton.addEventListener('click', function makeList() {
  var list = document.createElement('p'); //create paragraph everytime button is clicked//
  list.innerText = inputField.value; //sets text of paragraph = value that is inputed//
  itemsToDo.appendChild(list); //appends list to itemsToDo//
  inputField.value = ''; //removes the input after it is added to the list//
  list.addEventListener('click', function () {
    list.classList.add('doneElement'); //item done//
  });
  list.addEventListener('dblclick', function () {
    itemsToDo.removeChild(list); //removes item after completed//
  });
  //items can be added by pressing enter key//
  inputField.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      makeList();
    }
  });
});
