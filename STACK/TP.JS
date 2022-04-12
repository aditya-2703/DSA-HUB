let container_one = document.querySelector(".container_one")
container_one.style.display = "none"

let img = document.getElementById("img_board")
img.style.display = "none"

let btn_add = document.getElementById("add")
btn_add.style.display = "none"

let board_card_len = document.getElementById("board_len")
board_card_len.style.display= "none"

let board = document.getElementById("board")
board.style.display = "none"

let player2 = document.querySelector(".container_two")
player2.innerHTML=""
board.innerHTML = ""

let player1_name = document.querySelector("#player1")
player1_name.innerHTML = ""

let score = document.getElementById("score1")
score.style.display="none"

let msg = document.querySelector(".heading")
msg.innerHTML = `${player1} win the match!`

let shuffle = document.querySelector(".shuffle_item")
shuffle.style.display = "none"

let main_container = document.querySelector(".content_box")
main_container.appendChild(msg)


let enjoy_gif = document.createElement("img")
enjoy_gif.setAttribute("src","static/images/party.gif")
enjoy_gif.setAttribute("class","result_gif")
enjoy_gif.style.position= "relative"

let btn = document.createElement("button")  
btn.setAttribute("class","restart_btn")
btn.innerHTML = "Restart"
btn.setAttribute("onclick","restart()")
main_container.appendChild(btn)
main_container.appendChild(enjoy_gif)


let ele1 = document.querySelector(".card_img_one")
ele1.style.display = "none"

let ele2 = document.querySelector(".card_img_two")
ele2.style.display = "none"

