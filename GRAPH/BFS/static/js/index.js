var board = []
var moves = 0
var n = 3
var m = 3
var basic_obj = null

// this class has basic functions for board
class Basic{
    constructor(n,m){
        this.n = n 
        this.m = m
        this.board = [[]]
        this.moves  = 0 
    
        this.draw_obj = null
        this.ans_obj =  null


    }
    update_board(board){

        this.moves = 0
        // this.board = board

        this.draw_obj.board = board
        this.draw_obj.n = board.length
        this.draw_obj.m = board[0].length

        this.ans_obj.board = board
        this.ans_obj.n = board.length
        this.ans_obj.m = board[0].length
        this.ans_obj.goal = ""


        this.ans_obj.set_board(board)
        this.draw_obj.draw_board()
    }
    
    // this method draw empty board
    draw_zero(row,col,next_row,next_col){
        // curr row-col is not empty 
        // next)row next)col is empty
        // console.log(row,col,next_row,next_col)
        document.getElementById(`${row}-${col}`).classList.remove("empty")
        document.getElementById(`${row}-${col}`).innerHTML = this.board[row][col]
        document.getElementById(`${next_row}-${next_col}`).classList.add("empty")
    
    }
    // get the empty tile
    get_tiles(){
        let value = 1
        let ans = 0
        let n = this.n
        let m = this.m
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                if(i===n-1 && j===m-1){
                    continue
                }
                else if(this.board[i][j]==value){
                    value+=1
                }
                else{
                    ans+=1
                }
                
            }
        }
        return ans;
    }
    // update moves and tile info to screen
    update_move(){
        moves+=1
        let tiles = this.get_tiles()
        let template = `${moves} Moves | ${tiles} Tiles` 
        document.querySelector(".sm_info").innerHTML = template
    }
    find_empty_cell(){
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                let value = this.board[i][j]
                if(value==0){
                    return [i,j]
                }
            }
        }
        
    }
    // this method take action on click of tile
    take_shift_action(movement){
        if(movement===""){
            return;
        }
        let cell = this.find_empty_cell()
        let row = cell[0]
        let col = cell[1]
        let nr=0
        let nc=0

        let board = this.board

        if(movement=="left"){
            let next_r = row 
            let next_c = col+1
            if(next_c>=m){
                console.log("not possible to move a tile")
                return 
            }
            let new_value = board[next_r][next_c]
            board[row][col] = new_value
            board[next_r][next_c] = 0
            nr = next_r
            nc = next_c
        }
        else if(movement=="right"){
            // console.log("right")
            let next_r = row 
            let next_c = col-1
            if(next_c<0){
                // console.log("not possible")
                return 
            }
            let new_value = board[next_r][next_c]
            board[row][col] = new_value
            board[next_r][next_c] = 0
            nr = next_r
            nc = next_c
        }
        else if(movement=="up"){
            // console.log("up")
            let next_r = row+1 
            let next_c = col
            if(next_r>=n){
                // console.log("not possible")
                return 
            }
            let new_value = board[next_r][next_c]
            board[row][col] = new_value
            board[next_r][next_c] = 0
            nr = next_r
            nc = next_c
        }
        else{
            // console.log("down")
            let next_r = row - 1
            let next_c = col
            if(next_r<0){
                // console.log("not possible")
                return 
            }
            let new_value = board[next_r][next_c]
            board[row][col] = new_value
            board[next_r][next_c] = 0
            nr = next_r
            nc = next_c
    
        }
        this.board = board
        this.update_board(this.board)

        this.update_move()
        this.draw_zero(row,col,nr,nc)
    }

    // this method count inversions of array which help to check is board is solvable
    getInvCount(arr)
    {
        let inv_count = 0 ;
        let n = arr.length;
        for(let i=0;i<n;i++){
            let curr_value = arr[i]
            for(let j=i+1;j<n;j++){
                let next_value = arr[j]
                if(curr_value>next_value){
                    inv_count+=1
                }
            }
        }
        return inv_count;
    }
    // this method checks if board is solvable
    is_solvable(puzzle){
        let flat_arr = puzzle.flat()
        let invCount = this.getInvCount(flat_arr);
        return (invCount % 2 == 0);
    }
    
    // this method shuffles array
    shuffleArray(arr) {
        arr.sort(() => Math.random() - 0.5);
    }

    // this method makes board of size n*m
    make_board(n,m){
        let temp_board=  []
        let index = 0
        
        let reference_board = []
        for(let i=1;i<=n*m;i++){
            reference_board.push(i)
        }
        this.shuffleArray(reference_board)
        // console.log(reference_board)
    
        for(let i=0;i<n;i++){
           let temp_1d = []
            for(let j=0;j<m;j++){
                let val = reference_board[index]
                if(val==n*n){
                    temp_1d.push(0)
                    index+=1
                    continue
                }
                temp_1d.push(val)
                index+=1
           } 
           temp_board.push(temp_1d)
        }
    
        if(!this.is_solvable(temp_board)){
            return this.make_board(n,m)
        }
        return temp_board
    }
    // start game by taking some action 
    start_game(n,m){
        
        // remove unnecessary elements
        
        document.querySelector(".container").style.display="none"
        document.querySelector(".game_start_container").style.display="flex"


        // make board
        this.board = this.make_board(n,m)
        this.draw_obj = new Draw_board(this.board)
        this.ans_obj = new Bfs_min_moves(this.board)
        this.update_board(this.board)

    }
    // make board of size n*m by user input 
    make_board_diff(ele){
        let level = ele.id 
        let n = this.n
        let m = this.m
        if(level==="easy"){
            n = 2
            m = 3
    
        }
        else if(level==="medium"){
            n = 3
            m = 3
        }
        else{
            n = 4
            m = 4
        }
        
        this.n = n
        this.m = m
        this.start_game(n,m)
    }
    // this method is called when user clicks on tile
    check_is_win(){
        let value = 1
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                if(i===n-1 && j===m-1){
                    continue
                }
                else if(this.board[i][j]==value){
                    value+=1
                }
                else{
                    return false;
                }
                
            }
        }
        return true;
    }
    // shuffle board by random
    suffle_board(){
        this.start_game(this.n,this.m)
    }
    // for update get hint content
    update_min_moves(string){
        let ele = document.querySelector(".min_moves_element")
        ele.innerHTML = string
    }
    // get hint content
    get_hint(){
        let board = this.board
        this.update_board(board)
        if(!this.is_solvable(board)){
            this.update_min_moves("Try Some Other Moves! ")
            return
        }
        let ans = this.ans_obj.get_min_moves()
        if(ans===-1){
            this.update_min_moves("Try Some Other Moves! ")
        }
        else{
            this.update_min_moves(`Min Moves To Solve : ${ans}`)
        }
    }
    press_keys(ele){
        let movement = ""
        if(ele.keyCode == 37){
            movement = "left"
        }
        else if(ele.keyCode == 38){
            movement = "up"
        }
        else if(ele.keyCode == 39){
            movement = "right"
        }
        else if(ele.keyCode == 40){
            movement = "down"
        }


        this.take_shift_action(movement)
        let flag = this.check_is_win()
        if(flag){
            // alert("congratulations you win the game")
            this.update_min_moves('Congratulation You Solved The Puzzle!')
            return 
        }
        this.get_hint()
    
    }
}




// class for drawing board on screen
class Draw_board{
    constructor(board){
        this.board = board
        this.n = this.board.length
        this.m = this.board[0].length
    }
    draw_board(){
        let parent = document.querySelector(".main_grid_cont")

        
        // declare grid size 
        
        parent.style.gridTemplateRows = "repeat("+this.n+", minmax(50px, 1fr))"
        parent.style.gridTemplateColumns = "repeat("+this.m+", minmax(50px, 1fr))"


        parent.innerHTML = ""
        
        let n = this.board.length
        let m = this.board[0].length
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                let value = this.board[i][j] 
                if(value==0){
                    let template = `<div id="${i}-${j}" class="grid_item empty"></div>`
                    parent.innerHTML+=template
                    continue
                }
                let template = `<div id="${i}-${j}" class="grid_item">${value}</div>`
                parent.innerHTML+=template
            }
        }
    }
}


// start game when user clicks to start 
function start_game(){
    basic_obj = new Basic(n,m)
    basic_obj.start_game(n,m)
}


// get hint 
function get_hint(){
    basic_obj.get_hint()
}

// make board by difficulty
function make_board_diff(ele){
    basic_obj.make_board_diff(ele)
}


// suffle board
function suffle_board(){
    basic_obj.suffle_board()
    
}







// delay function 
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}




// class for minimum moves
class Bfs_min_moves{
    constructor(board){
        this.board = board
        this.n = this.board.length
        this.m = this.board[0].length
        this.goal = ""
        this.make_goal()
    }
    make_goal(){
        let string = ""
        for(let i=1;i<this.n*this.m;i++){
            string+=i+"-"
        }
        this.goal=string + "0"
    }
    swap(s,pos1,pos2){
        let ans = ""
        let string= s.split("-")
        for(let i=0;i<string.length;i++){
            if (i==pos1){
                ans+=string[pos2]+"-"
            }
            else if (i==pos2){
                ans+=string[pos1]+"-"
            }
            else{
                ans+=string[i]+"-"
            }
        }
        return ans.slice(0,ans.length-1);
    }

    generate_valid_moves(){
        let maping = []
        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.m;j++){
                let cell = i*this.m + j
                let arr = []
                if (i-1>=0){
                    let up = (i-1)*this.m+j
                    arr.push(up)
                }
                if (j-1>=0){
                    let left = i*this.m +(j-1)
                    arr.push(left)
                }
                if (i+1<this.n){
                    let down = (i+1)*this.m + j
                    arr.push(down)
                }
                if (j+1<this.m){
                    let right = i*this.m + (j+1)
                    arr.push(right)
                }
                maping.push(arr)
            }

        }
        return maping
    }
    get_board(){
        return this.board
    }  
    set_board(){
        this.board = board
    }  
    get_min_moves(){

        let board = this.get_board()
        let n = this.n
        let m = this.m

        if(!basic_obj.is_solvable(board)){
            return -1
        }
        let curr_string = ""
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                curr_string+=board[i][j]+"-"
            }
        }
        curr_string = curr_string.slice(0,-1)
        
        let queue = [curr_string]
        let visited = new Map()
        let directions = this.generate_valid_moves()
        let result = 0

        while(queue.length>0){
            let n = queue.length
            for(let i=0;i<n;i++){
                let node = queue.shift()
                if (node===this.goal){
                    return result
                }
                
                let pos = -1
                let arr = node.split("-")

                for(let i=0;i<arr.length;i++){
                    if (arr[i] == "0"){
                        pos=i
                        break
                    }
                }
                for(let i=0;i<directions[pos].length;i++){
                    let d = directions[pos][i]
                    let string = this.swap(node,d,pos)
                    if (visited.has(string)==false){
                        queue.push(string)
                        visited.set(string)
                    }
                }
                
            }
            result+=1
        }

        return -1
    }

}



start_game()


// when user press keys for moving tiles
function press_keys(ele){
    basic_obj.press_keys(ele)
}
document.addEventListener("keydown",press_keys)
