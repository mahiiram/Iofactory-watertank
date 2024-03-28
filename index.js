// function to calculate the units stored by blocks
function Water(arr, n) {
  let res = 0;
  let fill = [0];
  for (let i = 1; i < n - 1; i++) {
    let left = arr[i];
    for (let j = 0; j < i; j++) {
      left = Math.max(left, arr[j]);
    }
    let right = arr[i];
    for (let j = i + 1; j < n; j++) {
      right = Math.max(right, arr[j]);
    }
    res += Math.min(left, right) - arr[i];
    fill.push(Math.min(left, right) - arr[i]);
  }
  fill.push(0);
  return [res, fill];
}

// function to default create table of m x n size
function createTable(m, n) {
  let table = document.createElement('table');
  table.style.width = '50%';
  table.setAttribute('cellpadding', '15px');
  table.setAttribute('border', '1');
  table.setAttribute('rules', 'all');
  for (let i = 0; i < m; i++) {
    var tr = document.createElement('tr');
    for (let j = 0; j < n; j++) {
      var td = document.createElement('td');
      td.setAttribute('id', j);
      tr.appendChild(td);
    }
    tr.setAttribute('id', i);
    table.appendChild(tr);
  }
  return table;
}

// function to fill colors in both the tables (input table and output table)
function fillColor(element, fill, arr, m, n, yellowFill) {
  for (let i = 0; i < n; i++) {
    let blueFill = fill[i];
    for (let j = 0; j < m; j++) {
      if (j >= m - fill[i] - arr[i] && blueFill != 0) {
        element[j].children[i].style.backgroundColor = 'lightblue';
        blueFill -= 1;
      }
      if (j >= m - arr[i] && yellowFill) {
        element[j].children[i].style.backgroundColor = 'yellow';
      }
    }
  }
}

// main function which will call when the enter button is clicked
function showOutput() {
  var input = document.getElementById('InputArray').value; // retrieving array from input field
  if (input == '') {
    // error handling for empty input
    alert('Please give a valid input');
  } else {
    input = input.replace(/^\s+|\s+$|\s+|[a-zA-Z]+/gm, ''); // cleaning input

    let arr = input.split(',').map(Number);
    let n = arr.length;
    let m = Math.max(...arr) + 1;

    //accessing the div's in which table is going to create
    let tablediv1 = document.getElementById('table1');
    let tablediv2 = document.getElementById('table2');

    //removing & creating default table from div so that web app can be used repetitively
    tablediv1.removeChild(tablediv1.firstElementChild);
    tablediv2.removeChild(tablediv2.firstElementChild);
    tablediv1.appendChild(createTable(m, n));
    tablediv2.appendChild(createTable(m, n));

    //after creating table, access all rows of both tables to fill color
    let table1Fill = document.querySelectorAll('#table1 > table > tr');
    let table2Fill = document.querySelectorAll('#table2 > table > tr');

    //setting given input
    document.getElementById('givenInput').innerText = input;

    //converting array elemnts from sting to integer
    for (let index = 0; index < n; index++) {
      arr[index] = parseInt(arr[index]);
    }

    // calling Water() to calculate units of water hold by blocks
    let result = Water(arr, n);

    //setting output units
    document.getElementById('output').innerText = result[0] + ' Units';

    //filling colors to both tables
    fillColor(table1Fill, result[1], arr, m, n, true);
    fillColor(table2Fill, result[1], arr, m, n, false);
  }
}

var btn = document.getElementById('Enter'); // access enter button via DOM
btn.addEventListener('click', showOutput); // adding eventListener to enter button
4;