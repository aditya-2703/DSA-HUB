



// -------------------------------------------------------------------------------------------------------------
// Global declarations initialization

var level
var timer 
var theme
var board_info 
var suduko_board 
var defualt 
var bottom_margin 
var size_of_board 
var individual_size 
var number_selected 
var object
var timer_id
var start_timer 
var state_matrix



// this function is for dropdown list of level
function choosen_level_list(){
    document.querySelector(".dropdown_level_list").style.display="flex"
}
// this function set the choosend opotion
function choosen_level_from_nav(event){
    setTimeout(()=>{
        document.querySelector(".dropdown_level_list").style.display="none"
    },100)
    let tag = event
    document.querySelector(".level_text").innerHTML=tag.innerHTML
    localStorage.setItem("level",tag.innerHTML)
    // console.log(typeof(level_trial))
}
// this function is for dropdown list of time
function choosen_time_list(){
    document.querySelector(".dropdown_time_list").style.display="flex"
}
// this function set the choosend opotion
function choosen_time_from_nav(event){
    setTimeout(()=>{
        document.querySelector(".dropdown_time_list").style.display="none"
    },100)
    let tag = event
    document.querySelector(".time_text").innerHTML=tag.innerHTML
    localStorage.setItem("time",tag.innerHTML)
    // console.log(time_trial)
}
// this function is for dropdown list of theme
function choosen_theme_list(){
    document.querySelector(".dropdown_theme_list").style.display="flex"
}
// this function set the choosend opotion
function choosen_theme_from_nav(event){
    setTimeout(()=>{
        document.querySelector(".dropdown_theme_list").style.display="none"
    },100)
    let tag = event
    document.querySelector(".theme_text").innerHTML=tag.innerHTML
    localStorage.setItem("theme",tag.innerHTML)
    // console.log(theme_trial)    
}

// -------------------------------------------------------------------------------------------------------------

//  This class consists of basics operation while game starts like creating board,timer,etc
class Game_basic{
    constructor(level){
        this.level = level
    }
    // this function sets the timer and run the timer on background
    set_timer=(timer)=>{
        timer = timer
        let  minute = timer
        let  second = 0
        start_timer = setInterval(()=>{
            if(second==0){
                if(minute>0){
                    second = 59
                    minute--;
                }
                else if(minute==0){
                    clearInterval(start_timer)
                }
            }         
            else{
                second--;
            }
            document.querySelector('.big_timer').innerHTML = minute+":"+second;
            
        },1000) 
        
        
    }
    // this function is for creating board
    create_board_display = (size)=> {
        let board = document.querySelector('.suduko_board');
        board.classList.add("launch_board")
        document.querySelector(".launch_board").style.width = (size*50 +  size*2)+"px";
        document.querySelector(".launch_board").style.height = (size*50 + size*2)+"px";
        // document.querySelector(".launch_board").style.bottom = bottom_margin+"px";
        for(let i=0;i<size;i++){
            // setTimeout(()=>{
            for(let j=0;j<size;j++){
                // setTimeout(()=>{
                    let span = document.createElement('span');
                    span.setAttribute("class","cell");
                    span.setAttribute("id",`${i}${j}`)
                    span.setAttribute("onclick",`cell_choosen_action(this,${i},${j})`)
                    if(suduko_board[i][j]!==0){
                        span.innerHTML = suduko_board[i][j]
                    }
                    board.appendChild(span);
                // },25*j)
            }
            // },250*i)
        }
        document.querySelector('.big_heading').style.display = 'none';
        document.querySelector('.game_start_big_heading').style.display = 'flex';
    
    }
    // this function tells is cell full or not or selected or not
    not_selected_default = (row,col)=>{
        if(defualt[row][col]===0){
            return true
        }
        return false
    }
    // this function removes navbar and set new elements
    rem_extra_from_nav = ()=>{
        let level = document.querySelector('.level');
        let theme = document.querySelector('.theme');
        let time  = document.querySelector('.time');
        level.style.display = 'none';
        theme.style.display = 'none';
        time.style.display = 'none';
    
        let parent = document.querySelector(".nav_header")
        let so_button = document.createElement("a") 
        so_button.innerHTML = "Get Solution!"
        so_button.setAttribute("class","get_solution_button")
        so_button.style.width = "20vw"
        so_button.style.fontSize = "1.5em"
        so_button.setAttribute("onclick","get_solution_action()")
        // let vi_button= document.createElement("a")
        // vi_button.innerHTML = "Visualize"
        // vi_button.setAttribute("class","visualize_button")
        // vi_button.setAttribute("onclick","get_visualize_action()")
        parent.appendChild(so_button)
        // parent.appendChild(vi_button)
    
    }
    // this  function perform game end operations
    is_game_end = ()=>{
        for(let i=0;i<size_of_board;i++){
            for(let j=0;j<size_of_board;j++){
                if(suduko_board[i][j]===0){
                    return false
                }
            }
        }
        return true
    }
    // this function show error when use types same number in suduko
    show_duplicate =(color,bg_color,row,col,number,grid_size)=>{
        let arr = document.querySelectorAll(".cell")
        // console.log("for duplicate",arr)
        for(let i=0;i<size_of_board;i++){
            for(let j=0;j<size_of_board;j++){
            
                let is_row_safe = suduko_board[row][j]==number 
                let is_col_safe = suduko_board[i][col]==number
                let is_box_safe = suduko_board[(row-row%grid_size)+(i%grid_size)][(col-col%grid_size)+(j%grid_size)]==number
                if (is_row_safe || is_col_safe || is_box_safe){
                        if((state_matrix[row][col]).state!=="default"){
                            let element = document.getElementById(`${i}${j}`)
                            if(Number.isInteger(parseInt(element.innerHTML))){
                                if (parseInt(element.innerHTML)===number){
                                    element.style.color = color
                                    element.style.backgroundColor = bg_color
                                }
                        }
                        // else{
                        // }
                    }
                }
            }
            
        }
       
       
       

    }
    // this function checks the position is safe or not 
    is_safe = (row,col,number)=>{
        if(this.is_row_safe(col,number) && this.is_col_safe(row,number) &&  this.is_box_safe(row-(row%individual_size),col-(col%individual_size),number)){
            return true
        }
        return false    
    }
    // this function checks is col in safe or not
    is_col_safe = (row,number)=>{
        for(let i=0;i<size_of_board;i++){
            if(suduko_board[row][i]===number){
                return false
            }
        }
        return true
    }
    // this function checks is row in safe or not
    is_row_safe = (col,number)=>{
        for(let i=0;i<size_of_board;i++){
            if(suduko_board[i][col]===number){
                return false
            }
        }
        return true
    }
    // this function checks is box in safe or not
    is_box_safe = (row,col,number)=>{
        for(let i=0;i<individual_size;i++){
            for(let j=0;j<individual_size;j++){
                    if(suduko_board[row+i][col+j]===number){
                        return false
                    }
            }
        }
        return true
    }
    
    
}
// this function returns board by selected level
const get_board_by_level = (level) => {
    
    if(level==="easy"){
        const board = [
            [3,1,4,0],
            [0,0,1,3],
            [2,0,3,0],
            [1,0,2,0],
        ]
        return [board,350,4,2]
    }
    else if (level==="medium"){
        const board = [
            [1,5,6,0,2,0],
            [0,0,3,0,0,0],
            [6,1,2,3,0,0],
            [3,0,5,6,0,2],
            [5,3,4,0,6,0],
            [0,0,0,5,3,0],
        ]
        return [board,325,6,2]

    }
    else{
        const board = [
            [0,6,9,0,0,5,0,7,4],
            [0,4,2,0,1,9,0,0,0],
            [5,8,3,7,6,0,9,1,0],
            [0,1,7,6,8,2,4,0,0],
            [4,0,0,0,0,0,2,0,0],
            [3,2,8,0,5,0,1,0,0],
            [0,9,0,0,3,0,0,0,1],
            [0,7,0,9,4,1,0,6,0],
            [0,3,0,2,7,0,5,0,0],

        ] 
        return [board,150,9,3]

    }
}

// setting Globals
const set_globals = (level,timer,theme)=>{
    level=level.toLowerCase()
    timer = timer
    theme = theme
    board_info = get_board_by_level(level)
    suduko_board = board_info[0]
    default_board = get_board_by_level(level)[0]
    bottom_margin = board_info[1]
    size_of_board = board_info[2]
    individual_size = board_info[3]
    number_selected = 0;

    // mark default value 
    state_matrix = mark_default_value(suduko_board)
}
// this class represent the defaults value and entered value 
class Tick_value{
    constructor(value , state){
        this.value = value 
        this.state = state
    }
}
// marks all default values to be default
function mark_default_value(board){
    let empty_board = []
    for(let i=0;i<size_of_board;i++){
        temp = []
        for(let j=0;j<size_of_board;j++){
            temp.push([])
        }
        empty_board.push(temp)
    }
    for(let i=0;i<size_of_board;i++){
        for(let j=0;j<size_of_board;j++){
            if(board[i][j]!==0){
                let state = new Tick_value(board[i][j],"default")
                empty_board[i][j] = state
            }
            else{
                let state = new Tick_value(board[i][j],"entered")
                empty_board[i][j] = state
            }
        }
    }
    return empty_board
}
// setting theme according to color 
const get_set_colored_theme = (theme)=>{
        theme = theme.toLowerCase()
        document.querySelector("body").setAttribute("class",theme)
}


    
// onclick action when clicking start button
const start = () => {
    // initialization part
    level = localStorage.getItem("level")
    time = localStorage.getItem("time")
    theme = localStorage.getItem("theme")

    // level - easy,medium,hard
    // time - 10min,15min,30min
    // theme - dark,light

    actual_time = time.slice(0,2)
    
    let button = document.querySelector('.start_button');
    
    set_globals(level,Number.parseInt(actual_time))
    
    
    button.style.display = 'none';
    object = new Game_basic(level)
    object.create_board_display(size_of_board)
    object.set_timer(Number.parseInt(actual_time))
    object.rem_extra_from_nav()
    
    get_set_colored_theme(theme)
}

// onclick action when pressing 1 to 9 number button
const number_selection_action = (number)=>{
    arr = document.querySelectorAll(".clicked")
    for(let i=0;i<arr.length;i++){
        arr[i].style.color = "black"
    }
    number_selected = parseInt(number.innerHTML);
    number.style.color = "green"
}


const remove_element = (class_name)=>{
    document.querySelector(`.${class_name}`).innerHTML = ""
    document.querySelector(`.${class_name}`).style.display = "none"
    clearInterval(start_timer)
}

function restart_game(){
    location.reload()
}
const game_end_changes_function=()=>{
    gif = "/static/images/win.gif"
    remove_element("suduko_board")
    remove_element("number_box")
    remove_element("big_timer")
    let restart_button = document.querySelector(".get_solution_button")
    restart_button.innerHTML = "Restart Game"
    restart_button.setAttribute("onclick", "restart_game()")
    let display_background = document.querySelector(".game_end_display")
    
    let h1_element = document.createElement("h1")
    h1_element.setAttribute("class","winning_congrats")
    h1_element.innerHTML = "Congratulations"

    let h2_element = document.createElement("h2")
    h2_element.setAttribute("class","winning_msg")
    h2_element.innerHTML = "You win the game"

    let img_element = document.createElement("img")
    img_element.setAttribute("class","greeting_img")
    img_element.src = gif

    display_background.appendChild(h1_element)
    display_background.appendChild(h2_element)
    display_background.appendChild(img_element)

    var audio = new Audio("/static/sounds/win.mp3")
    audio.play()
    audio.loop()
    

}


// onclick action when pressing each cell of suduko board number button
const cell_choosen_action=(cell,row,col)=> {    
    if(state_matrix[row][col].state==="default"){
        return
    }
    // if((state_matrix[row][col]).state !== "default"){
        if(object.is_safe(row,col,number_selected)){
            cell.innerHTML = number_selected
            cell.style.color = "green"
            suduko_board[row][col] = number_selected
            if(object.is_game_end()===true){
                game_end_changes_function()
                // alert("congratulations!!")
            }
        }
        else{
            cell.innerHTML = "&#10060";
            object.show_duplicate("white","#DC143C",row,col,number_selected,individual_size)
            setTimeout(()=>{
                if((state_matrix[row][col]).state === "entered"){
                    object.show_duplicate("black","rgba(255, 255, 255, 0.25)",row,col,number_selected,individual_size)
                    cell.innerHTML = ""
                }
                if((state_matrix[row][col]).state === "default"){
                    object.show_duplicate("red","transparent",row,col,number_selected,individual_size)
                    cell.innerHTML = ""
                }
                
            },1000);

            suduko_board[row][col] = 0
        }
    // }
    
}

// -------------------------------------------------------------------------------------------------------------

// This class is for simple solution of suduko
class Get_solution{
    constructor(board,size_of_board,individual_size){
        this.board = board
        this.board_size = size_of_board
        this.grid_size = individual_size
    }
    // this function is for checking is row and col safe or not
    is_row_col_safe_solver_suduko = (row,col,number)=>{
        for(let i=0;i<this.board_size;i++){
            if(this.board[i][col]==number || this.board[row][i]==number){
                return false
            }
        }
    
        return true
    }
    // this function is for checking is box in safe or not
    is_box_safe_solver_suduko = (row,col,number)=>{
        for(let i=0;i<this.grid_size;i++){
            for(let j=0;j<this.grid_size;j++){
                if(suduko_board[row+i][col+j]===number){
                    return false
                }
            }
        }
        return true
    }
    // this function returns true if number is safe in row,col and box
    is_safe_solver_suduko = (row,col,number)=>{
        if(this.is_row_col_safe_solver_suduko(row,col,number) &&  this.is_box_safe_solver_suduko(row-(row%this.grid_size),col-(col%this.grid_size),number)){
            return true
        }
        return false
    }
    // this function checks empty location and return it
    is_empty_location = (board)=>{
        for(let i=0;i<this.board_size;i++){
            for(let j=0;j<this.board_size;j++){
                if(board[i][j]==0){
                    return [i,j]
                }
            }
        }
        return true
    }
    // this function solves suduko by backtracking
    suduko_solver = (col)=>{
        if (this.is_empty_location(this.board)==true){
            return true
        }
        let place = this.is_empty_location(this.board)
        let row = place[0]
        col = place[1]
        for(let number=1;number<=this.board_size;number++){
            if(this.is_safe_solver_suduko(row,col,number) ){
                this.board[row][col] = number
                if(this.suduko_solver(col+1)===true){
                    return true
                }
                this.board[row][col] = 0
            }
        }
        return false
    }
    // This function is for getting solution of suduko
    get_solution = ()=>{
        this.suduko_solver(0)
        return this.board
    }
}

//  this function is for styling css
const make_change = (element,level)=>{
    if(level==="easy"){
        // element.style.width= "148px"
        // element.style.height="148px"
        // element.style.fontSize = "30px"
    }
}
// this function fills the solution board to display
const fill_solution_arr = (new_board)=>{
    // remove number box
    let number_box = document.querySelector(".number_box")
    number_box.style.display = "none"
    // make board bigger
    if(level=="easy"){
        let board = document.querySelector(".launch_board")
        // board.style.width = "600px"
        // board.style.height= "600px"
        // board.style.top = "150px"
    }


    let arr = document.querySelectorAll(".cell")
    let solution_board = new_board.flat()
    for(let i=0;i<size_of_board*size_of_board;i++){
        setTimeout(()=>{
            make_change(arr[i],level)
            arr[i].innerHTML = solution_board[i]
        },100*i);
    }
}
// action when clicking on get solution button is perform here
const get_solution_action=()=>{
    remove_element("big_timer")


    let restart_button = document.querySelector(".get_solution_button")
    restart_button.innerHTML = "Restart Game"
    restart_button.setAttribute("onclick", "restart_game()")
    let display_background = document.querySelector(".game_end_display")


    let solution_object = new Get_solution(default_board,size_of_board,individual_size)
    let new_board = solution_object.get_solution()
    console.log(new_board)
    fill_solution_arr(new_board)
}



class Get_visualize_solution{
    constructor(level,board,board_size,grid_size){
        this.level = level
        this.board = board
        this.board_size = board_size
        this.grid_size = grid_size
    }
   
    make_cell_bg_change = (row,col,color)=>{
        let cell = document.getElementById(`${row}${col}`)
        cell.style.backgroundColor = color  
    }
    fill_number = (row,col,number,color)=>{
        if(color!==null){
            let cell = document.getElementById(`${row}${col}`)
            cell.innerHTML = number
            cell.style.color = color
        }
    }
    is_box_safe(row,col,value){
        for(let i=0;i<this.grid_size;i++){
            for(let j=0;j<this.grid_size;j++){
                if(suduko_board[row+i][col+j]===value){
                    return false
                }
            }
        }

        // return true
        // let i=0
        // let j=0
        // let something=0
        // let temp_loop = setInterval(()=>{

        //     let temp_inner_loop = setInterval(()=>{
        //         if(suduko_board[row+i][col+j]===value){
        //             something=false
        //         }
        //         if(j>=this.grid_size){
        //             clearInterval(temp_inner_loop)
        //         }
        //         j++
        //         if(j==this.grid_size){
        //             j=0
        //             i++
        //         }
        //     } ,1000*j)
        //     if (i>=this.board_size){
        //         clearInterval(temp_loop)
                
        //     }
        //     if(this.board[row][i]==number  || this.board[i][col]==number){
        //         something=false
        //         this.make_cell_bg_change(row,i,"red")
        //         clearInterval(temp_loop)
        //     }
        //     setTimeout(()=>{
        //         this.make_cell_bg_change(row,i,"transparent")
        //     },100*i)
        //     i+=1
        // },1000*i)
        // if (something===true){
        //     return true
        // }
        // else{
        //     return false
        // }
    }
    is_empty_location(board){
        for(let i=0;i<this.board_size;i++){
            for(let j=0;j<this.board_size;j++){
                if(board[i][j]==0){
                    return [i,j]
                }
            }
        }
        return true
    }
    is_row_col_safe(row,col,number){
        // let i=0
        // let something=0
        // let temp_loop = setInterval(()=>{
        //     if (i>=this.board_size){
        //         clearInterval(temp_loop)
                
        //     }
        //     if(this.board[row][i]==number  || this.board[i][col]==number){
        //         something=false
        //         this.make_cell_bg_change(row,i,"red")
        //         clearInterval(temp_loop)
        //     }
        //     setTimeout(()=>{
        //         this.make_cell_bg_change(row,i,"transparent")
        //     },100*i)
        //     i+=1
        // },1000*i)
        // if (something===true){
        //     return true
        // }
        // else{
        //     return false
        // }
        for(let i=0;i<this.board_size;i++){
            if(this.board[row][i]==number  || this.board[i][col]==number){
                return false
            }
        }
        return true
    }
    is_safe(row,col,value){
        return this.is_row_col_safe(row,col,value) && this.is_box_safe(row-row%this.grid_size,col-col%this.grid_size,value)
    }
    
    suduko_solver  = ()=>{       

        

        for(let row=0;row<this.board_size;row++){
                for(let col=0;col<this.board_size;col++){
                        if(this.board[row][col]==0){
                            for(let number=1;number<=this.board_size;number++){
                                    if(this.is_safe(row,col,number) ){
                                            this.board[row][col] = number            
                                            if(this.suduko_solver()===true){
                                                return true
                                            }
                                            this.board[row][col] = 0
                                    }
                            }
                        
                        
                        return false
                    
                }
            }
        }   
        return true
    }
    get_solution(){
        this.suduko_solver()
        console.log(this.board)
    }
}

    

const get_visualize_action=()=>{
    // fill_solution_arr(suduko_board)
    let visualizer_obj = new Get_visualize_solution(level,suduko_board,size_of_board,individual_size)
    visualizer_obj.get_solution()
}