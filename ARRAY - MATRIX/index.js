// this function plays audio by taking path as param
const play_audio = (path)=>{
    let audio = new Audio(path)
    audio.volume=0.5
    audio.play() 
}

// this function will perform actions when keypressing happens 
function keypress(e){

        if(e.keyCode === 37){
            play_audio("/static/sound/move.wav")
            // console.log("left")
            left()
        }
        else if(e.keyCode === 38){
            play_audio("/static/sound/move.wav")
            // console.log("up")
            up()
        }
        else if(e.keyCode === 39){
            play_audio("/static/sound/move.wav")
            // console.log("right")
            right()
        }
        else if(e.keyCode === 40){
            play_audio("/static/sound/move.wav")
            // console.log("down")
            down()  
        }
}
// event listner for keypressing
window.addEventListener('keyup',keypress,false)

// this function will create blank(0) board of length n
function create_board(n){
    let grid = [];
    for(var j=0;j<n*n;j++){
        grid.push(0)
    }
    return grid;
}

// Global declarations
var n=4;
var grid_board = create_board(n)

generat_random(grid_board,n);
generat_random(grid_board,n);
var msg=""
// this function will shuffles the grid_board
function generat_random(grid,n){
    let randomx = Math.floor(Math.random()* (n*n))
    if(grid[randomx] === 0){
        grid[randomx]=2;
    }
    else{
        generat_random(grid,n);
    }
}
// this function will check if there is 2048 in the grid_board
function is_2048(grid,n){
    for(let i=0;i<n*n;i++){
        if (grid[i]===2048){
            play_audio("/static/sound/win.wav")
            return "You Win The Game"
        }
    }
}

// this function performs action when user presses right for row
function combine_row_right(grid,n){
    play_audio("/static/sound/add.wav")
    for(let i=0;i<n*n -1 ;i++){
        if(grid[i] == grid[i+1]){
            let total = parseInt(grid[i]) + parseInt(grid[i+1])
            grid[i]=0
            grid[i+1]=total
        }
    }
    msg=is_2048(grid,n)
    return grid
}
// this function performs action when user presses left for row
function combine_row_left(grid,n){
    play_audio("/static/sound/add.wav")
    for(let i=0;i<n*n -1 ;i++){
        if(grid[i] == grid[i+1]){
            let total = parseInt(grid[i]) + parseInt(grid[i+1])
            grid[i]=total
            grid[i+1]=0
        }
    
    }
    msg=is_2048(grid,n)
    return grid
}

// this function performs action when user presses right for column
function combine_col_right(grid,n){
    play_audio("/static/sound/add.wav")
    for(let i=0;i<n*n - n ;i++){
        if(grid[i] == grid[i+n]){
            let total = parseInt(grid[i]) + parseInt(grid[i+n])
            grid[i]=0
            grid[i+n]=total
        }
    
    }
    msg=is_2048(grid,n)
    return grid
}
// this function performs action when user presses left for column
function combine_col_left(grid,n){
    play_audio("/static/sound/add.wav")
    for(let i=0;i<n*n -n ;i++){
        if(grid[i] == grid[i+n]){
            let total = parseInt(grid[i]) + parseInt(grid[i+n])
            grid[i]=total
            grid[i+n]=0
        }
    
    }
    msg=is_2048(grid,n)
    return grid
}

// this function modify the grid_board acc to action 
function right_work(arr){
    for(var i=0;i<n*n;i++){

        if(i%4==0){
            let one=arr[i]
            let two =arr[i+1]
            let three = arr[i+2]
            let four = arr[i+3]

            let row = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]

            let filterrow = row.filter(nums=>nums)
            let missingrow = n  - filterrow.length
            let zeros = Array(missingrow).fill(0)
            let newarr = zeros.concat(filterrow)

            arr[i]=newarr[0]
            arr[i+1]=newarr[1]
            arr[i+2]=newarr[2]
            arr[i+3]=newarr[3]
        }
    }
    // return newarr
}
// this function modify the grid_board acc to action 
function right(){
    right_work(grid_board)
    generat_random(grid_board,n)
    grid_board=combine_row_right(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function modify the grid_board acc to action 
function left_work(arr){
    for(var i=0;i<n*n;i++){

        if(i%4==0){
            let one=arr[i]
            let two =arr[i+1]
            let three = arr[i+2]
            let four = arr[i+3]

            let row = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]

            let filterrow = row.filter(nums=>nums)
            let missingrow = n  - filterrow.length
            let zeros = Array(missingrow).fill(0)
            let newarr = filterrow.concat(zeros)

            arr[i]=newarr[0]
            arr[i+1]=newarr[1]
            arr[i+2]=newarr[2]
            arr[i+3]=newarr[3]
        }
    }
    // return newarr
}
// this function modify the grid_board acc to action 
function left(){
    left_work(grid_board)
    generat_random(grid_board,n)
    grid_board = combine_row_left(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function modify the grid_board acc to action 
function up_work(grid_board,n){
    for(let i=0;i<n ; i++){
        let one = grid_board[i]
        let two = grid_board[i+(n)]
        let three = grid_board[i+(n*2)]
        let four = grid_board[i+(n*3)]
        
        let column = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]
        
        let filtercol = column.filter(nums=>nums)
        let missingcol = n  - filtercol.length
        let zeros = Array(missingcol).fill(0)
        let newarr = filtercol.concat(zeros)
        grid_board[i]=newarr[0]
        grid_board[i+(n)]=newarr[1]
        grid_board[i+(n*2)]=newarr[2]
        grid_board[i+(n*3)]=newarr[3]
    }
}
// this function modify the grid_board acc to action 
function up(){
    up_work(grid_board,n)
    generat_random(grid_board,n)
    grid_board = combine_col_left(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function modify the grid_board acc to action 
function down_work(grid_board,n){
    for(let i=0;i<n ; i++){
        let one = grid_board[i]
        let two = grid_board[i+(n)]
        let three = grid_board[i+(n*2)]
        let four = grid_board[i+(n*3)]
        
        let column = [parseInt(one),parseInt(two),parseInt(three),parseInt(four)]
        
        let filtercol = column.filter(nums=>nums)
        let missingcol = n  - filtercol.length
        let zeros = Array(missingcol).fill(0)
        let newarr = zeros.concat(filtercol)
        grid_board[i]=newarr[0]
        grid_board[i+(n)]=newarr[1]
        grid_board[i+(n*2)]=newarr[2]
        grid_board[i+(n*3)]=newarr[3]
    }
}
// this function modify the grid_board acc to action 
function down(){
    down_work(grid_board,n)
    generat_random(grid_board,n)
    grid_board=combine_col_right(grid_board,n)
    fill_board_canvas(grid_board,n)
}
// this function reload or restart the game 
function reload_game(){
    location.reload()
}
// this function fill board by adding some values
fill_board_canvas(grid_board,n)
function fill_board_canvas(grid_board,n){
    let li = ``;
    let colors = ["ligthblue","red","lightgreen","lightgrey"]
    // let color = colors[Math.floor(Math.random() * colors.length)]
    let zero=0
    for(var i=0;i<n*n+1;i++){
        if(grid_board[i]==0){
            zero+=1
        }
    }
    if(msg){
        document.getElementById("result").innerHTML = `${msg}`
        document.getElementById("ul_grid").style.display="none"
        
    }
    if(zero!=0){
        for(var i=0;i<n*n;i++){
            li+=`<li class="c${grid_board[i]}">${grid_board[i]}</li>`
        }
        document.getElementById("ul_grid").innerHTML=li
    }
    else{
        play_audio("/static/sound/lose.wav")
        let btn =document.createElement('button')
        btn.innerHTML="RESTART"
        btn.setAttribute('onclick',"reload_game()")
        btn.setAttribute("class","restart_btn")
        let game_over = document.createElement("div")
        game_over.setAttribute("id","game_over")
        let body = document.querySelector("body")
        body.appendChild(game_over)
        let result = document.createElement("div")
        result.setAttribute("id","result")
        game_over.appendChild(result)
        result.innerHTML = `Game Over`
        document.getElementById("ul_grid").style.display="none"
        result.appendChild(btn)
         
    }
}