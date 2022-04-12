// this function will play sound by taking path as param
const play_audio = (path)=>{
    let audio = new Audio(path) 
    audio.play()
}

// this function basically fill color by setting background color with id 
const color = (color,id)=>{
    let element = document.getElementById(id)
    element.style.background  = color
    // if(color === "green"){
    //     element.style.borderRadius = "50%"
    // }
    // else{
    //     element.style.borderRadius = "10%"
    // }
}

// this function checks the boundry according to command or action
const is_out_of_boundry = (command,location)=>{
    right_top=17
    right_bottom=341
    left_top=0
    left_bottom=324
    // if is out of boundry return true 
    // else false
    if(command==="left"){
        for(let i=0;i<=18;i++){
            if(location===((i)*18)){
                game_end()
                return true
            }
        }
        return false
    }
    else if(command === "right"){
        for(let i=0;i<=18;i++){ 
            if(location===(17*(i+1))+i){
                game_end()

                return true
            }
        }
        return false

    }
    else if(command === "up"){
        // console.log("up with location")
        for(let i=0;i<18;i++){
            if(location===i){
                game_end()

                return true
            }
        }
        return false
    }
    else if(command === "down"){
        // console.log("down with location")
        for(let i=324;i<342;i++){
            if(location===i){
                game_end()

                return true
            }
        }
        return false
    }
    return true
}

// when game ends then this function will call 
// this function will remove all snake food stuff and display message
const game_end = ()=>{
    play_audio("/static/sound/game_over.wav")
    let container_box=document.getElementById("container_box_grid")
    container_box.innerHTML = `<div class="game_over_text">Game Over</div>
                                <button class="restart_game" onclick="restart()">Restart</button>`
    
}

// for restart game
const restart = ()=>{
    location.reload()
}

// this class create and returns board
class Create_board{
    constructor(max_size){
        this.container_box_grid = document.getElementById("container_box_grid")
        this.ul = document.createElement('ul')
        this.max_size=max_size

    }
    create_board(){
        this.ul.setAttribute('class','small_pixels')
        this.container_box_grid.appendChild(this.ul)
        for(let x=0;x<this.max_size;x++){
            // let small_pixel = `<div class="small_pixel"></div>`
            let li = document.createElement('li')
            li.setAttribute('class','small_pixel')
            li.setAttribute('id',x)
            this.ul.appendChild(li)
        }
        
    }
    fill_boundry(){
        var boundry = []
        for(let x=0;x<this.max_size;x++){
            if(x<18 || x%18===0 || x>342-18){
                boundry.push(x)
            }
        }
        for(let x=0;x<18;x++){
            boundry.push((17*(x+1) + x))
        }
        return boundry
    }
    
    is_boundry(index){
        for(let x=0;x<this.max_size;x++){
            if(x<18 || x%18===0 || x>this.max_size-18){
                if(x === index){
                    return true
                }
            }
        }
        for(let x=0;x<342;x++){
            if(x===index){
                return true
            }
        }
        return false
    }

    fill_boundry_with_color(boundry){
        let borders = boundry
        for(let x=0;x<borders.length;x++){
            document.getElementById(borders[x]).style.background="red"
        }
    }
}

let create_board = new Create_board(342)
create_board.create_board()
var boundry = create_board.fill_boundry()


// this function will fill the color for food
function fill_food(max_size){
    let food_location = Math.floor(Math.random()*max_size)
    color("green",food_location)
    return food_location
}

// food
var food_location = fill_food(342)


// this function will return random position for snake
function snake_pos_random(){
    let snake_location = Math.floor(Math.random()*342)
    if(snake_location===food_location){
        snake_pos_random()
    }
    return snake_location
}


// -------------------------------------------------------------------------------------------------
// this class is for defining node
class Node{
    constructor(){
        this.data=null;
        this.next=null;
    }
}
// this class controll all snake growing movement (main function)
class Snake{
    constructor(){
        this.start = null
        this.node = new Node()
        this.tail = null
        this.snake_size = 0
        // this.audio = new Audio("/static/sound/bg.mp3")
        // this.audio.loop=true
        // this.audio.volume = 0.5
        // this.audio.play()
    }
    // this function just assign node to new location and done movement
    movement_snake(location){
        let node = new Node()
        node.data = location
        this.start = node
        this.tail = node
    }
    // this function actually add node to particular location 
    grow_snake(location){
        let newnode = new Node()
        newnode.data = location


        if (this.start === null){
            this.start = newnode
            this.tail = newnode
            this.snake_size+=1
            return
        }
        else{
            let temp =  this.start 
            while(temp.next){
                temp=temp.next;
            }
            this.snake_size+=1
            temp.next = newnode;
            this.tail = newnode
        }


    }
    // this function check the status generally this is for debugging 
    // this function also perform score display and setting score
    check_snake_status(){
        let temp = this.start
        while(temp){
            temp=temp.next
        }
        document.getElementById("result").innerHTML = this.snake_size-1
        // game end
        
        // console.log("head ->",this.start.data,"tail->",this.tail.data,"snake size->",this.snake_size)
    }
    // this is simple operation for performing add node begining for linked list
    add_beg(location){
        let nn = new Node()
        nn.data =  location
        if(this.start === null){
            this.start = nn
            this.tail = nn
            this.snake_size+=1
        }
        else{
            nn.next = this.start 
            this.start = nn
            this.snake_size+=1

        }
    }
    // this is simple operation for performing remove node from end for linked list
    rem_end(){
        if(this.start===null){

        }
        else{
            let temp = this.start
            while(temp.next.next){
                temp=temp.next
            }
            this.tail = temp
            temp.next=null
            this.snake_size-=1
        }
    }
    // this is simple operation for performing add node end for linked list
    add_end(location){
        let nn = new Node()
        nn.data = location
        if(this.start === null){
            this.start = nn
            this.tail = nn 
            this.snake_size+=1
            return
        }
        else{
            let temp = this.start
            while(temp.next){
                temp=temp.next
            }
            temp.next = nn
            this.tail = nn
            this.snake_size+=1

        }
    }
    // this is simple operation for performing remove node begining for linked list
    rem_beg(){
        if(this.start===null){
            console.log("there is already no node")   
        }
        else{
            let temp = this.start
            this.start = temp.next 
            temp=null
            this.snake_size-=1

        }
    }
    // -------------------------------------------------left------------------------------------------------
    move_left(){
        // our initial location
        let our_location = this.start.data
        
        // our willing location
        let new_location = our_location-1

        // this condition will check boundry
        if(is_out_of_boundry("left",new_location+1)){
            console.log("out of boundry")
            this.game_end()
            return 
        }
        else{
            // if snake eat food than it grows
            if(new_location === food_location){
                play_audio("/static/sound/eat.wav")
                this.grow_snake()
                food_location = fill_food(342)
                
            }
            // if there  is just one node then just move it
            if(this.start.next === null){
                this.movement_snake(new_location)
            }
            else{
                // we have to transfer our whole data in to left side 
                // new node = first / first = second / second = third
                this.add_beg(new_location)
                this.rem_end()
            }
        }
        this.check_snake_status()

    }
    // -------------------------------------------------right------------------------------------------------
    move_right(){
        // initial location  
        let our_location = this.start.data
        
        // willing location
        let new_location = our_location+1

        // for check boundry
        if(is_out_of_boundry("right",this.tail.data)){
            console.log("out of boundry")
            this.game_end()

            return 
        }
        else{

            // ----------- if eat food it grow
            if(new_location === food_location){
                play_audio("/static/sound/eat.wav")
                this.add_beg(our_location-1)
                food_location = fill_food(342)

            }
            // condition for checking only one node if it is then just move
            if(this.start.next === null){
                    this.movement_snake(new_location)
            }
            else{
                // we have to transfer our whole data in to left side 
                // new node = first / first = second / second = third
                    our_location = this.tail.data
                    new_location = our_location+1
                    this.add_end(new_location)
                    this.rem_beg()
            }

        }
        this.check_snake_status()
    }
    // -------------------------------------------------up------------------------------------------------
    move_up(left,right){
        
        // this codition checkes that movement of up is with left or right according to that it moves the snake tail and head


            if(right){
                let our_location = this.tail.data
                let new_location = our_location-18
                let start_location = this.start.data
                
                // check boundry
                if(is_out_of_boundry("up",new_location+18)){
                    console.log("out of boundry")
                    return 
                }
                else{
                
                    // ----------- if eat food it grow
                    if(new_location === food_location){
                    play_audio("/static/sound/eat.wav")
                        this.add_beg(new_location)
                        food_location = fill_food(342)
        
                    }
                    if(this.start.next === null){
                        this.movement_snake(new_location)
                        
                    }
                    else{
                        // we have to transfer our whole data in to left side 
                        // new node = first / first = second / second = third
                        our_location = this.tail.data
                        new_location = our_location-18
                        this.add_end(new_location)
                        this.rem_beg()
                        
                    }
                }
            }
            else if(left){
                let our_location = this.start.data
                let new_location = our_location-18
                // ----------- if eat food it grow
                if(is_out_of_boundry("up",new_location+18)){
                    console.log("out of boundry")
                    this.game_end()

                    return 
                }
                else{
                   if(new_location === food_location){
                        play_audio("/static/sound/eat.wav")

                        //  some locha
                        this.add_beg(new_location)
                        food_location = fill_food(342)
        
                    }
                    if(this.start.next === null){
                            this.movement_snake(our_location)
                        
                    }
                    
                    else{
                        // we have to transfer our whole data in to left side 
                        // new node = first / first = second / second = third
                            our_location = this.start.data
                            new_location = our_location-18
                            this.add_beg(new_location)
                            this.rem_end()
                    }
                }
            }
            // if none of left right is pressed then it goes here
            else{
                

                let our_location = this.start.data
                let new_location = our_location-18
                if(is_out_of_boundry("up",new_location+18)){
                    console.log("out of boundry")
                    this.game_end()

                    return 
                }
                else{
                // ----------- if eat food it grow
                    if(new_location === food_location){
                        play_audio("/static/sound/eat.wav")

                        //  some locha
                        this.add_beg(new_location)
                        food_location = fill_food(342)
        
                    }
                    if(this.start.next === null){
                        this.movement_snake(new_location)
                    }
                    
                    else{
                        // we have to transfer our whole data in to left side 
                            our_location = this.start.data
                            new_location = our_location-18
                            this.add_beg(new_location)
                            this.rem_end()
                            this.start = new_location
                            this.tail = this.tail-18
                        }
                }
            }
        
        this.check_snake_status()
    }
    // -------------------------------------------------bottom------------------------------------------------
    move_bottom(left,right){
        
        // this codition checkes that movement of bottom is with left or right according to that it moves the snake tail and head

            if(left){
                let our_location = this.start.data
                let new_location = our_location+18
                let tail_location = this.tail.data

                // for check boundry
                if(is_out_of_boundry("down",our_location)){
                    // console.log("out of boundry")
                    return 'game_end'
                
                }
                else{
                    // ----------- if eat food it grow
                    if(new_location === food_location){
                        play_audio("/static/sound/eat.wav")
                        this.add_end(tail_location+1)
                        food_location = fill_food(342)
        
                    }
                    
                    else{
                        // we have to transfer our whole data in to left side 
                        // new node = first / first = second / second = third
                            our_location = this.start.data
                            new_location = our_location+18
                            this.add_beg(new_location)
                            this.rem_end()
                        }
                }
    
            }
            else if(right){
                let our_location = this.tail.data
                let our_start_location = this.start.data
                let new_location = our_location+18
                if(is_out_of_boundry("down",our_start_location) || is_out_of_boundry("down",our_location)){
                    // console.log("out of boundry")
                    this.game_end()
                    
                    return 
                }
                else{
                // ----------- if eat food it grow
                    if(new_location === food_location){
                        play_audio("/static/sound/eat.wav")
                        this.add_beg(our_start_location-1)
                        food_location = fill_food(342)
        
                    }
                    else{
                        // we have to transfer our whole data in to left side 
                        // new node = first / first = second / second = third
                            our_location = this.tail.data
                            new_location = our_location+18
                            this.add_end(new_location)
                            this.rem_beg()
                        
                    }
                }
            }
        // if none of left or right is selected then it goes here 
            else{
                let our_location = this.tail.data
                let new_location = our_location+18
                let our_start_location = this.start.data

                if(is_out_of_boundry("down",our_start_location)){
                    // console.log("out of boundry")
                    this.game_end()

                    return 
                }
                else{

                    if(new_location === food_location){
                        play_audio("/static/sound/eat.wav")
                        this.add_beg(our_start_location-18)
                        food_location = fill_food(342)
        
                    }
                    else{
                            let temp = this.tail
                            this.tail = this.start 
                            this.start = temp
                            new_location = this.tail.data + 18
                            our_start_location = this.start.data
                            this.add_end(new_location)
                            this.rem_beg(our_start_location)
                            this.tail = new_location
                            this.start = our_start_location+18

                        }
                    }
                
            
            }
            
        this.check_snake_status()
    
    }
}
// -------------------------------------------------------------------------------------------------





// this class is controll all the keys and perform some action
// -------------------------------------------------------------------------------------------------
class Controls{
    constructor(){
        this.left=false
        this.right=false
        this.up=false
        this.down=false
        this.up_count=0
        this.game_end='game_start'
    }
    main(snake_obj,draw_obj){
        document.addEventListener("keydown",function(event){

            if(event.keyCode  == 37){
                // for seting pos
                // <- <- <-
                // here i have to go left side 
                this.left=true
                this.right=false
                this.game_end=snake_obj.move_left()
            }
            else if(event.keyCode == 38){
                // console.log("up")
                // ^
                // |
                this.game_end=snake_obj.move_up(this.left,this.right,this.up_count)
              
          
            }
            else if(event.keyCode == 39){
                // console.log("right")
                // -> -> ->
                this.right=true
                this.left=false
                this.game_end=snake_obj.move_right()
            }
            else if(event.keyCode == 40){
                // console.log("down")
                // |
                // v
                this.game_end=snake_obj.move_bottom(this.left,this.right)
                
                
            }   

            draw_obj.draw(snake_obj)
        })


    }
    
}
// -------------------------------------------------------------------------------------------------


// this class will draw linked list(snake) and food with some color
// -------------------------------------------------------------------------------------------------
class Draw{
    constructor(snake_obj){
        this.snake_obj = snake_obj
    }
    // this function will reset all the color 
    reset_board(){
        for(let i=0;i<342;i++){
            if (i===food_location){
                continue
            }
            else{
                color("lightgreen",i)
            }
        }
        color("black",food_location)
    }
    draw(){
        this.reset_board()
        // after reseting all color will fill new one
        let temp  = snake_obj.start
        while(temp){
            color("green",temp.data)
            temp=temp.next
        }
    }

}
// -------------------------------------------------------------------------------------------------



let snake_obj= new Snake()   
let snake_position = snake_pos_random() 
snake_obj.grow_snake(snake_position)
snake_obj.check_snake_status()


let draw_obj = new Draw(snake_obj)
draw_obj.draw()

let controls= new Controls()
controls.main(snake_obj,draw_obj)





