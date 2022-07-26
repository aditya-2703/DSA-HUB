var board = []
var moves = 0
var n = 3
var m = 3

const cuteAlert = ({
    type,
    title,
    message,
    img,
    buttonText = 'OK',
    confirmText = 'OK',
    vibrate = [],
    playSound = null,
    cancelText = 'Cancel',
    closeStyle,
  }) => {
    return new Promise(resolve => {
      const existingAlert = document.querySelector('.alert-wrapper');
  
      if (existingAlert) {
        existingAlert.remove();
      }
  
      const body = document.querySelector('body');
  
      const scripts = document.getElementsByTagName('script');
  
      let src = '';
  
      for (let script of scripts) {
        if (script.src.includes('cute-alert.js')) {
          src = script.src.substring(0, script.src.lastIndexOf('/'));
        }
      }
  
      let btnTemplate = `
      <button class="alert-button ${type}-bg ${type}-btn">${buttonText}</button>
      `;
  
      if (type === 'question') {
        btnTemplate = `
        <div class="question-buttons">
          <button class="confirm-button ${type}-bg ${type}-btn">${confirmText}</button>
          <button class="cancel-button error-bg error-btn">${cancelText}</button>
        </div>
        `;
      }
  
      if (vibrate.length > 0) {
        navigator.vibrate(vibrate);
      }
  
      if (playSound !== null) {
        let sound = new Audio(playSound);
        sound.play();
      }
  
      const template = `
      <div class="alert-wrapper">
        <div class="alert-frame">
          ${img !== '' ? '<div class="alert-header ' + type + '-bg">' : '<div>'}
            <span class="alert-close ${
              closeStyle === 'circle'
                ? 'alert-close-circle'
                : 'alert-close-default'
            }">X</span>
            ${img !== '' ? '<img class="alert-img" src="/static/images/trophy.gif" />' : ''}
          </div>
          <div class="alert-body">
            <span class="alert-title">${title}</span>
            <span class="alert-message">${message}</span>
            ${btnTemplate}
          </div>
        </div>
      </div>
      `;
  
      body.insertAdjacentHTML('afterend', template);
  
      const alertWrapper = document.querySelector('.alert-wrapper');
      const alertFrame = document.querySelector('.alert-frame');
      const alertClose = document.querySelector('.alert-close');
  
      if (type === 'question') {
        const confirmButton = document.querySelector('.confirm-button');
        const cancelButton = document.querySelector('.cancel-button');
  
        confirmButton.addEventListener('click', () => {
          alertWrapper.remove();
          resolve('confirm');

        });
  
        cancelButton.addEventListener('click', () => {
          alertWrapper.remove();
          resolve();
        });
      } else {
        const alertButton = document.querySelector('.alert-button');
  
        alertButton.addEventListener('click', () => {
          alertWrapper.remove();
          resolve('ok');
        });
      }
  
      alertClose.addEventListener('click', () => {
        alertWrapper.remove();
        resolve('close');
      });
  
  /*     alertWrapper.addEventListener('click', () => {
        alertWrapper.remove();
        resolve();
      }); */
  
      alertFrame.addEventListener('click', e => {
        e.stopPropagation();
      });
    });
  };

// alert box
function end_game_alert(){
    cuteAlert({
        type:"success",
        title:"congratulations",
        message: `Congratulations You win The Game in ${moves} moves.`,
        buttonText: "Try Again!",
    })
    suffle_board()

}




// is solvable sub-function -- done
function getInvCount(arr)
{
    let inv_count = 0 ;
    let n = arr.length;
    for(let i=0;i<9;i++){
        let curr_value = arr[i]
        for(let j=i+1;j<9;j++){
            let next_value = arr[j]
            if(curr_value>next_value){
                inv_count+=1
            }
        }
    }
    return inv_count;
}
// solvable checker -- done
function is_solvable(puzzle){
    // let flat_arr = puzzle.flat()
    let flat_arr = puzzle
    let invCount = getInvCount(flat_arr);
    return (invCount % 2 == 0);
}

// shuffle array -- done
function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr
}
// make board -- done
function make_board(n,m){
    let temp_board=  []
    let index = 0
    
    let reference_board = []
    for(let i=1;i<=n*m;i++){
        reference_board.push(i)
    }
    reference_board = shuffleArray(reference_board)
    if(!is_solvable(temp_board)){
        make_board(n,m)
    }

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

    return temp_board

    
}
// class for drawing board on screen
class Draw_board{
    constructor(n,m,board){
        this.n = n
        this.m = m
        this.board = board
    }
    draw_board(){
        let parent = document.querySelector(".main_grid_cont")
        parent.innerHTML = ""
        
        
        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.m;j++){
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


// start game when user clicks to start -- done
function start_game(){
    document.querySelector(".container").style.display="none"
    document.querySelector(".game_start_container").style.display="flex"
}

// start_game()

// make board by difficulty
function make_board_diff(ele){
    let level = ele.id 
    if(level==="easy"){
        n = 3
        m = 3

    }
    else if(level==="medium"){
        n = 3
        m = 3
    }
    else{
        n = 3
        m = 3
    }
    board = make_board(n,m)
    obj.board = board
    obj.n = n
    obj.m = m
    obj.draw_board()
    moves=-1
    update_move()
    get_hint()

    let class_ele = document.querySelector(".main_grid_cont")
    class_ele.style.gridTemplateColumns = "repeat("+m+", minmax(50px, 1fr))"
    class_ele.style.gridTemplateRows = "repeat("+n+", minmax(50px, 1fr))"
}
// suffle board
function suffle_board(){
    board = make_board(n,m)
    obj.board = board
    obj.draw_board()
    moves=-1
    update_move()
    get_hint()

    // end_game_alert()

    
}
// find empty cell -- done
function find_empty_cell(){
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            let value = board[i][j]
            if(value==0){
                return [i,j]
            }
        }
    }
    
}
// draw zero on empty cell--done
function draw_zero(row,col,next_row,next_col){
    // curr row-col is not empty 
    // next)row next)col is empty
    // console.log(row,col,next_row,next_col)
    document.getElementById(`${row}-${col}`).classList.remove("empty")
    document.getElementById(`${row}-${col}`).innerHTML = board[row][col]
    document.getElementById(`${next_row}-${next_col}`).classList.add("empty")

}
// get tile with empty cell--done
function get_tiles(){
    let value = 1
    let ans = 0
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(board[i][j]==value){
                value+=1
            }
            else{
                ans+=1
                value+=1
            }
            
        }
    }
    return ans;
}
// update move --done
function update_move(){
    moves+=1
    let tiles = get_tiles()
    let template = `${moves} Moves | ${tiles} Tiles` 
    document.querySelector(".sm_info").innerHTML = template
}
// take shift action when user clicks on grid or press key--done
function take_shift_action(movement){
    if(movement===""){
        return;
    }
    let cell = find_empty_cell()
    let row = cell[0]
    let col = cell[1]
    let nr=0
    let nc=0
    if(movement=="left"){
        let next_r = row 
        let next_c = col+1
        if(next_c>=m){
            console.log("not possible")
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
    update_move()
    draw_zero(row,col,nr,nc)
}
// check if user win or not 
function check_is_win(){
    let value = 1
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(i===n-1 && j===m-1){
                continue
            }
            else if(board[i][j]==value){
                value+=1
            }
            else{
                return false;
            }
            
        }
    }
    return true;
}
// delay function 
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
// for update get hint content
function update_min_moves(string){
    let ele = document.querySelector(".min_moves_element")
    // let original = "Click Here For Get Hint : 💡"
    // if(min_moves!==-1){
        ele.innerHTML = string
    // }
    // else{
        // ele.innerHTML = `Try Some Other Moves! `
    // }
    
    // delay(10000).then(() => {ele.innerHTML = original;})
}

// class for minimum moves
class Bfs_min_moves{
    constructor(board){
        this.board = board
        this.n = board.length
        this.m = board[0].length
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
    
    get_min_moves(){

        if(!is_solvable(this.board)){
            return -1
        }
        let curr_string = ""
        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.m;j++){
                curr_string+=this.board[i][j]+"-"
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
                // console.log(directions[pos])
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
// get hint content
function get_hint(){
    let flat_board = board.flat()
    if(!is_solvable(board)){
        update_min_moves("Try Some Other Moves! ")
        return
    }
    ans_obj.board  = board
    let ans = ans_obj.get_min_moves()
    if(ans===-1){
        update_min_moves("Try Some Other Moves! ")
    }
    else{
        update_min_moves(`Min Moves To Solve : ${ans}`)
    }
}

// start_game()


// grid declaration -- done
let class_ele = document.querySelector(".main_grid_cont")
class_ele.style.gridTemplateColumns = "repeat("+m+", minmax(50px, 1fr))"
class_ele.style.gridTemplateRows = "repeat("+n+", minmax(50px, 1fr))"



// make board--done
board = make_board(n,m)
var obj = new Draw_board(n,m,board)
obj.draw_board()

// tile text changed
let tile_text = document.querySelector(".sm_info")
let text = `0 Moves | ${get_tiles()} Tiles`
tile_text.innerHTML = text

// get and --done
var ans_obj = new Bfs_min_moves(board)
get_hint()

function press_keys(ele){
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
    take_shift_action(movement)
    let flag = check_is_win()
    if(flag){
        // alert("congratulations you win the game")
        end_game_alert()
        update_min_moves('Congratulation You Solved The Puzzle!')
        return 
    }
    get_hint()

}
document.addEventListener("keydown",press_keys)


function open_code(){
    let url = ""
    window.open(url, 'blank');
}