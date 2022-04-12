

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
        const start_timer = setInterval(()=>{
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
        so_button.setAttribute("onclick","get_solution_action()")
        let vi_button= document.createElement("a")
        vi_button.innerHTML = "Visualize"
        vi_button.setAttribute("class","visualize_button")
        vi_button.setAttribute("onclick","get_visualize_action()")
        parent.appendChild(so_button)
        parent.appendChild(vi_button)
    
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
    show_duplicate =(color,number)=>{
        let arr = document.querySelectorAll(".cell")
        // console.log("for duplicate",arr)
        for(let i=0;i<size_of_board*size_of_board;i++){
            if(Number.isInteger(parseInt(arr[i].innerHTML))){
                if (parseInt(arr[i].innerHTML)===number){
                    arr[i].style.color = color
                }
            }
            
        }
    }
    // this function checks the position is safe or not 
    is_safe = (row,col)=>{
        if(this.is_row_safe(col) && this.is_col_safe(row) &&  this.is_box_safe(row-(row%individual_size),col-(col%individual_size))){
            return true
        }
        return false    
    }
    // this function checks is col in safe or not
    is_col_safe = (row)=>{
        for(let i=0;i<size_of_board;i++){
            if(suduko_board[row][i]===number_selected){
                return false
            }
        }
        return true
    }
    // this function checks is row in safe or not
    is_row_safe = (col)=>{
        for(let i=0;i<size_of_board;i++){
            if(suduko_board[i][col]===number_selected){
                return false
            }
        }
        return true
    }
    // this function checks is box in safe or not
    is_box_safe = (row,col)=>{
        for(let i=0;i<individual_size;i++){
            for(let j=0;j<individual_size;j++){
                    if(suduko_board[row+i][col+j]===number_selected){
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

// Global declarations
const level="";
var timer = 1
var board_info = get_board_by_level(level)
var suduko_board = board_info[0]
const defualt = get_board_by_level(level)[0]
const bottom_margin = board_info[1]
const size_of_board = board_info[2]
const individual_size = board_info[3]
var number_selected = 0;
var object;
var timer_id;

    
// onclick action when clicking start button
const start = () => {
    let button = document.querySelector('.start_button');
    button.style.display = 'none';
    // level = choosen_list[0].toLowerCase()
    object = new Game_basic(level)
    object.create_board_display(size_of_board)
    object.set_timer(timer)
    object.rem_extra_from_nav()
    
}



// -------------------------------------------------------------------------------------------------------------

const sleep =  async (milliseconds) => {
    await new Promise(resolve => setTimeout(resolve, milliseconds))}

// this function fills the solution board to display
const fill_solution_arr = (new_board)=>{
    // remove number box
    let number_box = document.querySelector(".number_box")
    number_box.style.display = "none"
    // make board bigger


    let arr = document.querySelectorAll(".cell")
    let solution_board = new_board.flat()
    for(let i=0;i<size_of_board*size_of_board;i++){
        setTimeout(()=>{
            make_change(arr[i],level)
            arr[i].innerHTML = solution_board[i]
        },100*i);
    }
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
        for(let i=0;i<this.board_size;i++){
            if(this.board[row][i]==number  || this.board[i][col]==number){
                return false
            }
        }
        return true
    }
     is_safe(row,col,value){
        return  this.is_row_col_safe(row,col,value) &&  this.is_box_safe(row-row%this.grid_size,col-col%this.grid_size,value)
    }
    add_number(row,col,number){
        this.board[row][col] = number            
    }
    backtrack(){
        if(this.suduko_solver()===true){
            return true
        }
    }
    remove_number(){
        this.board[row][col] = 0
    }
    fill_suduko_arr(row,col){
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){

                let element = document.getElementById(`${i}${j}`)
                element.innerHTML = this.board[i][j]
                element.style.color="green"
            }
        }
    }
    fill_element_color(row,col,color){
        let element = document.getElementById(`${row}${col}`)
        element.style.backgroundColor = color
    }
    suduko_solver  = async ()=>{       
        

        for(let row=0;row<this.board_size;row++){
                for(let col=0;col<this.board_size;col++){
                     
                        await sleep(500) 
                        
                        if(this.board[row][col]==0){
                            await sleep(500)
                            for(let number=1;number<=this.board_size;number++){
                                this.fill_number(row,col,number,"red")
                                await sleep(500)
                                let flag = this.is_safe(row,col,number) 
                                this.fill_element_color(row,col,"white")
                                await sleep(500)
                                if(flag){
                                    await sleep(500)
                                    this.fill_number(row,col,number,"green")
                                    await sleep(500)
                                    this.fill_suduko_arr(row,col)              
                                    await sleep(500)
                                    this.add_number(row,col,number)
                                    await sleep(500)
                                    this.backtrack()
                                    await sleep(500)    
                                    this.remove_number(row,col)
                                    await sleep(500)
                                
                                }

                                await sleep(500)
                                this.fill_element_color(row,col,"transparent")
                            }

                        await sleep(500) 
                        return false
                    
                        }


            }
        }   
        return true
    }
    get_solution(){
        this.suduko_solver()
    }
}

    

const get_visualize_action=()=>{
    // fill_solution_arr(suduko_board)
    let visualizer_obj = new Get_visualize_solution(level,suduko_board,size_of_board,individual_size)
     visualizer_obj.get_solution()
}

start()
get_visualize_action()