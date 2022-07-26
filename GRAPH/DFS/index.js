var matrix = [['.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'], ['#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#'], ['#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#'], ['#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#'], ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#'], ['#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#'], ['#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#'], ['#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#'], ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#'], ['#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#'], ['#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#'], ['#', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'], ['#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], ['#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#'], ['#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#'], ['#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '#'], ['#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '#', '.', '.', '#'], ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.', '.', '.'], ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.']]
var n = 21
var m = 31
var x = 0
var y = 0
var container = ".main_grid_cont"

// fill color as path 
function fill_color(r,c,color){
    let element = document.getElementById(`${r}-${c}`)
    element.style.backgroundColor   = color
}

// show thor and thanos
function show_main_char(){
    // let element = document.getElementById(`${0}-${0}`)
    // element.innerHTML = `<img class="img_cell thor" src="/DFS/thor.png">`   

    // document.getElementById(`${0}-${0}`).firstChild.style.width =  "100px"
    // document.getElementById(`${0}-${0}`).firstChild.style.height = "100px"
    // document.getElementById(`${0}-${0}`).firstChild.style.zIndex = "3"
    // document.getElementById(`${0}-${0}`).firstChild.style.position = "absolute"
    // document.getElementById(`${0}-${0}`).firstChild.style.top =  "-50px"
    // document.getElementById(`${0}-${0}`).firstChild.style.left = "-50px"


    // element = document.getElementById(`${n-1}-${m-1}`)
    // element.innerHTML = `<img id="thanos" class="img_cell thor" src="/DFS/thanos.webp">`   

    // document.getElementById(`thanos`).style.width =  "100px"
    // document.getElementById(`thanos`).style.height = "100px"
    // document.getElementById(`thanos`).style.zIndex = "1"
    // document.getElementById(`thanos`).style.position = "absolute"
    // document.getElementById(`thanos`).style.top =  "-10px"
    // document.getElementById(`thanos`).style.left = "-30px"
}

//  fill image to cell -thor hammer 
function fill_img(r,c,path,flag){
    if (flag===1){
        let element = document.getElementById(`${r}-${c}`)
        element.innerHTML = `<img class="img_cell thor" src="${path}">`   
    }
    else{
        let element = document.getElementById(`${r}-${c}`)
        element.innerHTML = ""   
    }

    // show_main_char()
   
}


// draw grid in screen and fill the cell with appropriate color
function make_cell(){
    let row = n
    let col = m
    let parent = document.querySelector(container);
    for(let i=0;i<row*col;i+=1){
        let r = Math.floor(i/col)
        let c = i%col
        let cell = document.createElement("div");


        if(matrix[r][c]=="#"){
            cell.classList.add("fill");
        }
        // cell.innerHTML= "."
        cell.classList.add("cell");
        cell.setAttribute("id",`${r}-${c}`)
        parent.appendChild(cell);
    }
}
make_cell();


// show_main_char()




// draw grid added with ans
function draw_grid(grid){
    for(let i=0;i<grid.length;i+=1){
        for(let j=0;j<grid[i].length;j+=1){
            if(grid[i][j]=="+"){
                if(i!=0 && j!=0 && i!=n-1 && j!=m-1){
                    fill_color(i,j,"lightgreen")
                }
            }
        }
    }
}


// main function which can give us path from thor to thanos
class Dfs{
    constructor(row,col,matrix){
        this.n = row
        this.m = col
        this.matrix = matrix
    } 
    // check if cell is valid
    is_not_valid(row,col,grid){
        if( row<0 || col<0 || row>=this.n || col>=this.m || grid[row][col]=="#"){
            return true
        }
        return false
    }
    // helper function
    helper(i,j,grid,visited){
        // if path is not valid return
        if (this.is_not_valid(i,j,grid) || visited[i][j]==true){
            return false
        }
        // if coordianates is goal then draw the grid or maze and return
        if (i==this.n-1 && j==this.m-1){
            console.log(grid)
            draw_grid(grid)
            return true
        }
    
        if (grid[i][j] == "."){
            // marking
            grid[i][j] = "+"
            visited[i][j] = true

            // recursion
            let flag = this.helper(i+1,j,grid,visited)
            if (flag){
                return true
            }
            flag = this.helper(i-1,j,grid,visited)
            if (flag){
                return true
            }
            flag = this.helper(i,j+1,grid,visited)
            if (flag){
                return true
            }
            flag = this.helper(i,j-1,grid,visited)
            if (flag){
                return true
            }    
            // unmarking 
            visited[i][j] = false
            grid[i][j] = "."

        }
    }
    // this function give us solution by taking row and col
    get_solution(row,col){
        matrix = this.matrix
        let visited=[]
        for(let i=0;i<this.n;i+=1){
            let temp=[]
            for(let j=0;j<this.m;j++){
                temp.push(false)
            }
            visited.push(temp)
        }
        this.helper(row,col,matrix,visited)
    }


}


let obj = new Dfs(n,m,matrix)

// is valid for moving tile or hammer 
function is_valid(r,c){
    if(r<0 || c<0 || r>=n || c>=m || matrix[r][c]=="#"){
        return false
    }
    return true
}

// move hammer to next cell by clearing prev cell
function make_change(oldx,oldy,newx,newy,img){
    fill_img(oldx,oldy,img,0)
    fill_img(newx,newy,img,1)
}

// when user clicks to solve button 
function solve_board(){
    console.log("wait solving..")
    obj.get_solution(x,y)
    // fill_img(n-1,m-1,"./mjolnir.svg",1)
}

// for sleep
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// when hammer reach to thanos
async function game_win_action(x,y){
    // put explosion image
    // element = document.getElementById(`${n-1}-${m-1}`)
    // element.innerHTML += `<img id="blast" class="img_cell blast" src="./blast.gif">`   
    document.getElementById("blast").style.display = "block"
    // document.getElementById("blast").style.width =  "100px"
    // document.getElementById("blast").style.height = "100px"
    // document.getElementById("blast").style.zIndex = "5"
    // document.getElementById("blast").style.position = "absolute"
    // document.getElementById("blast").style.top =  "-10px"
    // document.getElementById("blast").style.left = "-30px"

    await sleep(2000)
    
    // remove thanos
    document.getElementById("thanos").style.display = "none"
    
    
    // show hammer at that place
    document.getElementById("blast").src = "./mjolnir.svg"

    // remove small hammer also
    document.getElementById(`${x}-${y}`).innerHTML = ""

    // dialogue box win the game or any thing
    alert("Congratulations! You have won the game 🏆")


    
}

// game_win_action()

let img = "./mjolnir.svg"
// let thunder = 063474
function move_char(msg){

    if(x>n-2 && y>m-2){
        console.log("you win")
        game_win_action(x,y)
        // alert("win")   
        return 
    }


    if(msg==="up"){
        if(is_valid(x-1,y)){
            let oldx = x
            let oldy = y
            let newx = x-1
            let newy = y
            make_change(oldx,oldy,newx,newy,img)
            x-=1
        }
    }
    else if(msg=="left"){
        if(is_valid(x,y-1)){
            let oldx = x
            let oldy = y
            let newx = x
            let newy = y-1
            make_change(oldx,oldy,newx,newy,img)
            y-=1
        }
    }
    else if(msg=="right"){
        if(is_valid(x,y+1)){
            let oldx = x
            let oldy = y
            let newx = x
            let newy = y+1
            make_change(oldx,oldy,newx,newy,img)
            y+=1
        }    
    }
    else if(msg=="down"){
        if(is_valid(x+1,y)){
            let oldx = x
            let oldy = y
            let newx = x+1
            let newy = y
            make_change(oldx,oldy,newx,newy,img)
            x+=1
        }
    }
}


// done
document.addEventListener("keydown",function(event){
    if(event.keyCode==38){
        console.log("up")
        move_char("up")
    }
    if(event.keyCode==40){
        console.log("down")
        move_char("down")
    }
    if(event.keyCode==37){
        console.log("left")
        move_char("left")
    }
    if(event.keyCode==39){
        console.log("right")
        move_char("right")
    }

})
// 

function restart(){
    location.reload()
}
