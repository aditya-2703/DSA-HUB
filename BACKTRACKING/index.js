// ---------------------------------------------- 
// global declaration
var level = "medium"
var board = null
var n = 0
var box_n = 0
var curr_selected_number = 0
var hashmap = {}
var draw_obj 
var is_taken_solution = false

// remove non-related stuff from screen and also add the extra buttons
function remove_start_btn_heading(){
    document.querySelector(".big_heading").style.display = "none"
    document.querySelector(".start_button").style.display = "none"
    document.querySelectorAll(".level").forEach(element => {
        element.style.display = "none"
    });
    // document.getElementById(level).style.display="flex"
    let solution_button = `<button class="level" id="solution" onclick="get_solution()"><div class="level_text">Get Solution</div>            
    </button>`
    let restart_button = `<button class="level" id="restart" onclick="restart_game()"><div class="level_text">Play Again</div>            
    </button>` 
    document.querySelector(".nav_header").innerHTML+=solution_button
    document.querySelector(".nav_header").innerHTML+=restart_button

}
// this function is triggered when the user clicks on the level (easy,hard,medium) button
function choosen_level_list(ele){
    level = ele.id
    remove_start_btn_heading()
    start()
}
// this function sets the global property acc to the level
function show_suduko(){
    if(level==="easy"){
        n = 4
        board = [[3,1,4,0],[0,0,1,3],[2,0,3,0],[1,0,2,0]]
        box_n =2
    }
    else if(level==="medium"){
        n = 9
        board = [[0,0,0,2,6,0,7,0,1],[6,8,0,0,7,0,0,9,0],[1,9,0,0,0,4,5,0,0],[8,2,0,1,0,0,0,4,0],[0,0,4,6,0,2,9,0,0],[0,5,0,0,0,3,0,2,8],[0,0,9,3,0,0,0,7,4],[0,4,0,0,5,0,0,3,6],[7,0,3,0,1,8,0,0,0],] 
        box_n =3
    }
    else{
        n = 9
        board = [[0,6,9,0,0,5,0,7,4],[0,4,2,0,1,9,0,0,0],[5,8,3,7,6,0,9,1,0],[0,1,7,6,8,2,4,0,0],[4,0,0,0,0,0,2,0,0],[3,2,8,0,5,0,1,0,0],[0,9,0,0,3,0,0,0,1],[0,7,0,9,4,1,0,6,0],[0,3,0,2,7,0,5,0,0]] 
        box_n =3
    }
    let obj = new Suduko_element()
    obj.board = board
    obj.n = n
    obj.level = level
    draw_obj= new Draw(obj)
}
// this function marks the default values in the suduko board so that default value is not overrided by new values
function make_default(){
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(board[i][j]!=0){
                hashmap[i+"_"+j] = true
            }
            else{
                hashmap[i+"_"+j] = false
            }
        }
    }
}
// this function is triggered when the user clicks on the start button
function start(){
    remove_start_btn_heading()
    show_suduko()
    make_default()
    document.querySelector(".submit").style.display = "block"
}

// suduko element class which represent the object with following property
class Suduko_element{
    constructor(){
        this.level = ''
        this.board = []
        this.n = 0
    }
}

// draw class which generly deals with the drawing of the suduko board to screen 
class Draw{
    constructor(obj){
        this.suduko_obj = obj
        this.board = this.suduko_obj.board
        this.size = this.suduko_obj.n

        this.draw_template()
        this.fill_values()
    }
    // this function is used to draw the suduko board template without any values
    draw_template(){
        let size = this.suduko_obj.n
        let board = document.querySelector('.suduko_board');
        board.classList.add("launch_board")
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let span = document.createElement('span');
                span.setAttribute("class","cell");
                span.setAttribute("id",`${i}${j}`)
                span.setAttribute("onclick",`cell_choosen_action(this,${i},${j})`)
                span.innerHTML = " "
                board.appendChild(span);
            }
        }
        board.style.gridTemplateColumns = `repeat(${size},1fr)`
        board.style.gridTemplateRows = `repeat(${size},1fr)`
    }
    // this function is used to fill values in that template
    fill_values(){
        let suduko = this.board
        let size = this.size
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let ele = document.getElementById(`${i}${j}`)
                if(suduko[i][j]==0){
                    ele.innerHTML = ""
                }
                else{
                    ele.innerHTML = suduko[i][j]
                }
            }
        }

    }
    // this function filled the values which is solution in the suduko board in some time order
    async fill_for_solution(board){
        let size = this.size
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                if(hashmap[i+"_"+j]==false){
                    let ele = document.getElementById(`${i}${j}`)
                    ele.innerHTML = board[i][j]
                    await sleep(100 + 50 * i)
                }
            }
            await sleep(100 + 50 * i)
        }
    }
}

// this function checks is the row and col is safe or not
function is_row_col_safe(row,col){
    let board_ = board
    let size_ = n
    let number = curr_selected_number
    for(let i=0;i<size_;i++){
        if(board_[row][i]==number || board_[i][col]==number){
            return false
        }
    }
    return true
}
// this function checks is the box is safe or not
function is_box_safe(row,col){
    let board_ = board
    let number = curr_selected_number
    row = row - (row%box_n)
    col = col - (col%box_n)
    let row_range = box_n
    let col_range = box_n
    // if(level=="medium"){
    //     col_range-=1
    // }
    for(let i=0;i<row_range;i++){
        for(let j=0;j<col_range;j++){
            if(board_[row+i][col+j]==number){
                return false;
            }
        }
    }
    return true;
}
// this function checks is the number is safe or not
function is_safe(i,j){
    return is_row_col_safe(i,j) && is_box_safe(i,j)
}
// this function is called when user clicks the number or picks the number
function number_selection_action(ele){
    let number_selected = parseInt(ele.innerHTML)
    // if number is not valid exp - in 4x4 sudoku the number picked by user is 9 then is not valid
    if(number_selected>n){
        alert("Invalid number Selection")
    }
    else{
        document.querySelectorAll(".n").forEach(element =>{
            element.style.color = "black"
        })
        // highlight number
        ele.style.color = "green"
        // select number as global
        curr_selected_number = number_selected
    }
}
async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}    
// this function highlights the cell by which is our place is not safe
async function highlight_mistake(row,col){
    let board_ = board
    let size_ = n
    let number = curr_selected_number
    let time = 500
    let array = []
    for(let i=0;i<size_;i++){
        // row
        if(board_[row][i]==number){
            document.getElementById(`${row}${i}`).style.background = "red"
            array.push([row,i])
        }
        // col
        if(board_[i][col]==number){
            document.getElementById(`${i}${col}`).style.background = "red"
            array.push([i,col])
        }
    }
    row = row - (row%box_n)
    col = col - (col%box_n)
    let col_range = box_n
    // box
    for(let i=0;i<box_n;i++){
        for(let j=0;j<col_range;j++){
            if(board_[row+i][col+j]==number){
                document.getElementById(`${row+i}${col+j}`).style.background = "red"
                array.push([row+i,col+j])
            }
        }
    }
    // wait
    await sleep(time)
    // remove highlight
    for(let i=0;i<array.length;i++){
        let temp_row = array[i][0]
        let temp_col = array[i][1]
        document.getElementById(`${temp_row}${temp_col}`).style.background = "white"
    }
}

// this function is called when user clicks on the cell
function cell_choosen_action(ele,i,j){
    let flag = is_safe(i,j)
    let is_default = hashmap[i+"_"+j]
    if(flag && !is_default){
        ele.innerHTML = curr_selected_number
        ele.style.color = "green"
        board[i][j] = curr_selected_number
    }
    else{
        // hight light the mistake
        highlight_mistake(i,j)
    }
}

// when user clicks submit button 
function submit_game(){
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(board[i][j]==0){
                alert("Please fill all the cells")
                return
            }
        }
    }
    alert("Congratulations you win the game🎉🎉")
}

// this class takes suduko it's size and grid size and return solved suduko
class Sudoku_solver{
    constructor(board,n,box_size){
        this.board = board
        this.size = n
        this.box_size = box_size
    }
    // is row col safe
    is_row_col_safe(value,row,col){
        let board_ = this.board
        let size_ = this.size
        let number = value
        for(let i=0;i<size_;i++){
            if(board_[row][i]==number || board_[i][col]==number){
                return false
            }
        }
        return true
    }
    // is box safe
    is_box_safe(value,row,col){
        let board_ = this.board
        let number = value
        let box_n = this.box_size

        row = row - row % box_n;
        col = col - col % box_n;
        for (let i = 0; i < box_n; i++) {
            for (let j = 0; j < box_n; j++) {
                if (board_[row + i][col + j] === number) {
                    return false;
                }
            }
        }
        return true;
    }
    // is safe
    is_safe(value,i,j){
        return this.is_row_col_safe(value,i,j) && this.is_box_safe(value,i,j)
    }
    // if all the value filled means suduko is solved
    is_filled(){
        let board_ = this.board
        let size_ = this.size
        for(let i=0;i<size_;i++){
            for(let j=0;j<size_;j++){
                if(board_[i][j]==0){
                    return false
                }
            }
        }
        return true
    }
    // this function solved suduko using backtracking
    solver_util(){
        if(this.is_filled()){
            return true;
        }
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                if(this.board[i][j]==0){
                    for(let k=1;k<=this.size;k++){
                        if(this.is_safe(k,i,j)){
                            this.board[i][j] = k
                            if(this.solver_util()){
                                return true
                            }
                            this.board[i][j] = 0
                        }
                    }
                    return false
                }
            }
        }
    }
    // this function solves suduko
    solve(){
        this.solver_util()
    }
}
// this function called when user clicks get solution button
function get_solution(){
    let suduko_board_deep_copy = JSON.parse(JSON.stringify(board))
    let suduko_solver = new Sudoku_solver(suduko_board_deep_copy,n,box_n)
    suduko_solver.solve()
    draw_obj.fill_for_solution(suduko_board_deep_copy)
    board = suduko_board_deep_copy
}
// restart game
function restart_game(){
    location.reload()
}
