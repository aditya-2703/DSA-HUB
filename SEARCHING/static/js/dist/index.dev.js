"use strict";

var method = null; // for removing extra elements in screen

var remove_extra = function remove_extra() {
  document.querySelector(".heading").innerHTML = "";
  document.querySelector(".heading").style.top = "70px";
  document.querySelector(".heading").style.fontSize = "180px";
  document.querySelector(".method").style.display = "none";
  document.querySelector(".start_btn").style.display = "none";
}; // for getting the method of game


var on_method_select = function on_method_select(element) {
  method = element.id;
}; // for starting the game


function start_game() {
  remove_extra();
  setting_heading();
}

var setting_heading = function setting_heading() {
  if (method === "binary") {
    document.querySelector(".heading").innerHTML = "50";
  } else if (method === "ternary") {
    document.querySelector(".heading").innerHTML = "x";
  } else {
    document.querySelector(".heading").innerHTML = "0";
  }
};

start_game();