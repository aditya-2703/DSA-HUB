"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game_basic = function Game_basic(level) {
  _classCallCheck(this, Game_basic);

  this.level = level;
};

var get_board_by_level = function get_board_by_level(level) {
  if (level === "easy") {
    var board = [[3, 1, 4, 0], [0, 0, 1, 3], [2, 0, 3, 0], [1, 0, 2, 0]];
    return [board, 350, 4, 2];
  } else if (level === "medium") {
    var _board = [[1, 5, 6, 0, 2, 0], [0, 0, 3, 0, 0, 0], [6, 1, 2, 3, 0, 0], [3, 0, 5, 6, 0, 2], [5, 3, 4, 0, 6, 0], [0, 0, 0, 5, 3, 0]];
    return [_board, 325, 6, 2];
  } else {
    var _board2 = [[0, 6, 9, 0, 0, 5, 0, 7, 4], [0, 4, 2, 0, 1, 9, 0, 0, 0], [5, 8, 3, 7, 6, 0, 9, 1, 0], [0, 1, 7, 6, 8, 2, 4, 0, 0], [4, 0, 0, 0, 0, 0, 2, 0, 0], [3, 2, 8, 0, 5, 0, 1, 0, 0], [0, 9, 0, 0, 3, 0, 0, 0, 1], [0, 7, 0, 9, 4, 1, 0, 6, 0], [0, 3, 0, 2, 7, 0, 5, 0, 0]];
    return [_board2, 150, 9, 3];
  }
};

var level = "medium";
var timer = 1;
var board_info = get_board_by_level(level);
var suduko_board = board_info[0];
var defualt = get_board_by_level(level)[0];
var bottom_margin = board_info[1];
var size_of_board = board_info[2];
var individual_size = board_info[3];
var number_selected = 0;

var start = function start() {
  var button = document.querySelector('.start_button');
  button.style.display = 'none';
  create_board_display(size_of_board);
  set_timer(timer);
};

var create_board_display = function create_board_display(size) {
  var board = document.querySelector('.suduko_board');
  board.classList.add("launch_board");
  document.querySelector(".launch_board").style.width = size * 50 + size * 2 + "px";
  document.querySelector(".launch_board").style.height = size * 50 + size * 2 + "px";
  document.querySelector(".launch_board").style.bottom = bottom_margin + "px";

  var _loop = function _loop(i) {
    setTimeout(function () {
      var _loop2 = function _loop2(j) {
        setTimeout(function () {
          var span = document.createElement('span');
          span.setAttribute("class", "cell");
          span.setAttribute("onclick", "cell_choosen_action(this,".concat(i, ",").concat(j, ")"));

          if (suduko_board[i][j] !== 0) {
            span.innerHTML = suduko_board[i][j];
          }

          board.appendChild(span);
        }, 25 * j);
      };

      for (var j = 0; j < size; j++) {
        _loop2(j);
      }
    }, 250 * i);
  };

  for (var i = 0; i < size; i++) {
    _loop(i);
  }

  document.querySelector('.big_heading').style.display = 'none';
  document.querySelector('.game_start_big_heading').style.display = 'flex';
};

var number_selection_action = function number_selection_action(number) {
  arr = document.querySelectorAll(".clicked");

  for (var i = 0; i < arr.length; i++) {
    arr[i].style.color = "black";
  }

  number_selected = parseInt(number.innerHTML);
  number.style.color = "green";
};

var not_selected_default = function not_selected_default(row, col) {
  if (defualt[row][col] === 0) {
    return true;
  }

  return false;
};

var is_col_safe = function is_col_safe(row) {
  for (var i = 0; i < size_of_board; i++) {
    if (suduko_board[row][i] === number_selected) {
      return false;
    }
  }

  return true;
};

var is_row_safe = function is_row_safe(col) {
  for (var i = 0; i < size_of_board; i++) {
    if (suduko_board[i][col] === number_selected) {
      return false;
    }
  }

  return true;
};

var is_box_safe = function is_box_safe(row, col) {
  var limit = Math.sqrt(size_of_board);

  for (var i = 0; i < limit; i++) {
    for (var j = 0; j < limit; j++) {
      if (suduko_board[row + i][col + j] === number_selected) {
        return false;
      }
    }
  }

  return true;
};

var is_safe = function is_safe(row, col) {
  var limit = Math.sqrt(size_of_board);

  if (is_row_safe(col) && is_col_safe(row) && is_box_safe(row - row % limit, col - col % limit)) {
    return true;
  }

  return false;
};

var is_game_end = function is_game_end() {
  for (var i = 0; i < size_of_board; i++) {
    for (var j = 0; j < size_of_board; j++) {
      if (suduko_board[i][j] === 0) {
        return false;
      }
    }
  }

  return true;
};

var show_duplicate = function show_duplicate(color, number) {
  var arr = document.querySelectorAll(".cell");
  console.log("for duplicate", arr);

  for (var i = 0; i < size_of_board * size_of_board; i++) {
    if (Number.isInteger(parseInt(arr[i].innerHTML))) {
      if (parseInt(arr[i].innerHTML) === number) {
        arr[i].style.color = color;
      }
    }
  }
};

var cell_choosen_action = function cell_choosen_action(cell, row, col) {
  if (not_selected_default(row, col)) {
    if (is_safe(row, col)) {
      cell.innerHTML = number_selected;
      cell.style.color = "green";
      suduko_board[row][col] = number_selected;

      if (is_game_end() === true) {
        alert("congratulations!!");
      }
    } else {
      cell.innerHTML = "&#10060";
      show_duplicate("red", number_selected);
      setTimeout(function () {
        show_duplicate("black", number_selected);
        cell.innerHTML = "";
      }, 1000);
      suduko_board[row][col] = 0;
    }
  }
};

var rem_extra_from_nav = function rem_extra_from_nav() {
  var level = document.querySelector('.level');
  var theme = document.querySelector('.theme');
  var time = document.querySelector('.time');
  level.style.display = 'none';
  theme.style.display = 'none';
  time.style.display = 'none';
  var parent = document.querySelector(".nav_header");
  var so_button = document.createElement("a");
  so_button.innerHTML = "Get Solution!";
  so_button.setAttribute("class", "get_solution_button");
  so_button.setAttribute("onclick", "get_solution_action()");
  var vi_button = document.createElement("a");
  vi_button.innerHTML = "Visualize";
  vi_button.setAttribute("class", "visualize_button");
  vi_button.setAttribute("onclick", "get_visualize_action()");
  parent.appendChild(so_button);
  parent.appendChild(vi_button);
}; // suduko solver backtracking code


var is_row_col_safe_solver_suduko = function is_row_col_safe_solver_suduko(row, col, number) {
  for (var i = 0; i < size_of_board; i++) {
    if (suduko_board[i][col] == number || suduko_board[row][i] == number) {
      return false;
    }
  }

  return true;
};

var is_box_safe_solver_suduko = function is_box_safe_solver_suduko(row, col, number) {
  for (var i = 0; i < individual_size; i++) {
    for (var j = 0; j < individual_size; j++) {
      if (suduko_board[row + i][col + j] === number) {
        return false;
      }
    }
  }

  return true;
};

var is_safe_solver_suduko = function is_safe_solver_suduko(row, col, number) {
  if (is_row_col_safe_solver_suduko(row, col, number) && is_box_safe_solver_suduko(row - row % individual_size, col - col % individual_size, number)) {
    return true;
  }

  return false;
};

var is_empty_location = function is_empty_location(board) {
  for (var i = 0; i < size_of_board; i++) {
    for (var j = 0; j < size_of_board; j++) {
      if (board[i][j] == 0) {
        return [i, j];
      }
    }
  }

  return true;
};

var suduko_solver = function suduko_solver(col) {
  if (is_empty_location(suduko_board) == true) {
    return true;
  }

  place = is_empty_location(suduko_board);
  row = place[0];
  col = place[1];

  for (var number = 1; number <= size_of_board; number++) {
    if (is_safe_solver_suduko(row, col, number)) {
      suduko_board[row][col] = number;

      if (suduko_solver(col + 1) === true) {
        return true;
      }

      suduko_board[row][col] = 0;
    }
  }

  return false;
};

var make_change = function make_change(element, level) {
  if (level === "easy") {
    element.style.width = "148px";
    element.style.height = "148px";
    element.style.fontSize = "30px";
  }
};

var fill_solution_arr = function fill_solution_arr() {
  // remove number box
  var number_box = document.querySelector(".number_box");
  number_box.style.display = "none"; // make board bigger

  if (level == "easy") {
    var board = document.querySelector(".launch_board");
    board.style.width = "600px";
    board.style.height = "600px";
    board.style.top = "150px";
  }

  var arr = document.querySelectorAll(".cell");
  var solution_board = suduko_board.flat();

  var _loop3 = function _loop3(i) {
    setTimeout(function () {
      make_change(arr[i], level);
      arr[i].innerHTML = solution_board[i];
    }, 100 * i);
  };

  for (var i = 0; i < size_of_board * size_of_board; i++) {
    _loop3(i);
  }
};

var get_solution_action = function get_solution_action() {
  suduko_solver(0);
  console.log("after ", suduko_board); // fill_solution_arr()
}; // start()


rem_extra_from_nav(); // get_solution_action()

var get_visualize_action = function get_visualize_action() {};