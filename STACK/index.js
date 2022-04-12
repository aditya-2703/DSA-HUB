// game end function 




// global declaration
var obj;
var obj_display;
var player_one;
var player_two;
// this flag is for turn of player1 and 2 
// if turn is for player1 then turn_flag is true
var player1=true


// this function simply plays the music by taking path as parameter
const play_music = (path)=>{
    let audio = new Audio(path)
    audio.play()
}

// this function calls when player clicks start button 
const init_start = ()=>{
    play_music("/static/sound/game_start_music.wav")
    
    // this prompt takes user's name and after displays appropriate messages
    player_one = prompt("please enter player 1 name: ","Tom")
    player_two = prompt("please enter player 2 name: ","Jerry")

    // creating object of main class
    obj = new Main()

    // this function takes names of players for initialization
    obj.game_initialization(player_one,player_two)
    
    // this class is for displaying all the stuff to the screen
    obj_display =  new Display_changer()
    // this function displays names and other stuff to screen
    obj_display.display_score(obj.player1_index_arr.length,obj.player2_index_arr.length)
}


// this is the main class of the game
class Main{

    constructor(){
        this.player1_index_arr = []
        this.player2_index_arr = []
        this.card_obj_list  = {}
        this.floor = []
    }
    // this function will make some changes to display when game starts
    // like removing start button and make some changes
    game_start = ()=>{
        let board = document.getElementById("board")        
        board.innerHTML=""    

        let img = document.createElement("img")
        img.src="/static/images/player1.png"
        img.setAttribute("class","img_board")
        img.setAttribute("id","img_board")
        board.appendChild(img)
        
        let button = document.createElement("button")
        button.setAttribute("class","add")
        
        // for action of player whose  turn
        button.setAttribute("onclick","action()")
        button.setAttribute("id","add")
        button.innerHTML="Add"
        board.appendChild(button)
        
        // to display shuffle button
        document.getElementById("shuffle1_cont").style.display = "flex"
        document.getElementById("shuffle2_cont").style.display = "flex"

        let size_board = document.createElement("div")
        size_board.setAttribute("class","board_len")
        size_board.setAttribute("id","board_len")
        size_board.innerHTML = 0
        board.appendChild(size_board)
    
    
    }
    // this fucntion will map list of cards and images 
    cards_obj_creater = (random_index)=>{
    // image list
    let list_card=["AD.png","AC.png","AH.png","AS.png",
                "2D.png","2C.png","2H.png","2S.png",
                "3D.png","3C.png","3H.png","3S.png",
                "4D.png","4C.png","4H.png","4S.png",
                "5D.png","5C.png","5H.png","5S.png",
                "6D.png","6C.png","6H.png","6S.png",
                "7D.png","7C.png","7H.png","7S.png",
                "8D.png","8C.png","8H.png","8S.png",
                "9D.png","9C.png","9H.png","9S.png",
                "10D.png","10C.png","10H.png","10S.png",
                "JD.png","JC.png","JH.png","JS.png",
                "QD.png","QC.png","QH.png","QS.png",
                "KD.png","KC.png","KH.png","KS.png"]
    // group for links of same value cards
    let group={0:0,1:0,2:0,3:0,
        4:1,5:1,6:1,7:1,
        8:2,9:2,10:2,11:2,
        12:3,13:3,14:3,15:3,
        16:4,17:4,18:4,19:4,
        20:5,21:5,22:5,23:5,
        24:6,25:6,26:6,27:6,
        28:7,29:7,30:7,31:7,
        32:8,33:8,34:8,35:8,
        36:9,37:9,38:9,39:9,
        40:10,41:10,42:10,43:10,
        44:11,45:11,46:11,47:11,
        48:12,49:12,50:12,51:12}
    let card_detail={}; 
    for(let i=0;i<52;i++){
        card_detail[i]=[list_card[random_index[i]],group[random_index[i]]];
    }
    return card_detail;
    }
    // this function simply make arrow or link to show which user's turn is now
    make_glow = (flag)=>{
        // make player1 card glow
        document.getElementById("shuffle1_cont").style.display="none"
        document.getElementById("shuffle2_cont").style.display="none"
        document.querySelector(".container_one").style.border = "none"
        document.querySelector(".container_two").style.border = "none"
        
        
        if(flag){
        //    document.getElementById("shuffle1_cont").style.display="flex"
           document.querySelector(".container_one").style.border = "5px solid greenyellow"
        }
        // make player2 card glow
        else{
            // document.getElementById("shuffle2_cont").style.display="flex"
           document.querySelector(".container_two").style.border = "5px solid greenyellow"

        }
    }
    // as name suggest this is for initialization of the game   
    game_initialization= (player1,player2) => {

        // display input name of players
        let display_obj = new Display_changer()
        display_obj.display_player_name(player1,player2) 
        
        // some changes to display
        this.game_start()
    
        // generate 0 to 52 cards
        let total_ordered_card = this.generate_order_arr(52)
        // shuffle the card
        let shuffled_card = this.random_card(total_ordered_card)
        
        // this indexes will put on stack and doing operations
        this.player1_index_arr = shuffled_card.slice(0,26)
        this.player2_index_arr = shuffled_card.slice(26,52)
    
    
        // to create card object   
        this.card_obj_list = this.cards_obj_creater(shuffled_card) 
        
    
            
    }
    // this function will generate the order array by size which is given as parameter
    generate_order_arr(size){
        let arr = []
        for(let i=0;i<size;i++){
            arr.push(i)
        }
        return arr
    }
    // this function will shuffle the indexes or array so that we shuffle cards
    random_card(arr){

        let temp = []
        for(let i=0;i<arr.length;i++){
            temp.push(arr[i])
        }
        temp.sort(function() { return 0.5 - Math.random() });
        return temp;
    }
    // this function is only creating for debugging purpose so that we know exact status on each steps 
    check(){
        console.log("player1 index list",this.player1_index_arr)
        console.log("player2 index list",this.player2_index_arr)
        console.log("card obj list",this.card_obj_list)
        console.log("floor",this.floor)
    }
    // this function simply returns the value of card by given whole card as object
    // like if there is heart of 4 | dimond of 4
    // then each has same value so we return that value from here
    get_group(card_index){
        let group = this.card_obj_list[card_index][1]
        return group
    }
    // this function will return if the card of any player is same as card which is on floor
    is_same_value(player1){
        if (player1){
            let card1 =  this.player1_index_arr[this.player1_index_arr.length-1]
            let card2 =  this.floor[this.floor.length-1] 
            let group1 = this.get_group(card1)
            let group2 = this.get_group(card2)
            return group1 === group2
        }
        else{
            let card1 =  this.player2_index_arr[this.player2_index_arr.length-1]
            let card2 =  this.floor[this.floor.length-1]
            let group1 = this.get_group(card1)
            let group2 = this.get_group(card2)
            return group1 === group2
        }
    }
    // this function add cards to floor
    add_to_floor(player1){
        // player 1 is active
        if(player1){
            let card = this.player1_index_arr.pop()
            this.floor.push(card)
        }
        // player2 is active
        else{
            let card = this.player2_index_arr.pop() 
            this.floor.push(card)
        }
    }
    // for getting top card of playaer1
    player1_peep(){
        return this.player1_index_arr[this.player1_index_arr.length-1]
    }
    // for getting top card of player2
    player2_peep(){
        return this.player2_index_arr[this.player2_index_arr.length-1]
    }
    // for getting top card of floor
    floor_peep(){
        return this.floor[this.floor.length-1]
    }
    // this function is for changing the card in screen by taking active player
    change_card(player1){
        document.getElementById("player1_card").src = "/static/images/player1.png"
        document.getElementById("player2_card").src= "/static/images/player2.png"
        

        // player 1 is active
        if(player1){
            document.getElementById("player1_card").src = "/static/images/"+this.card_obj_list[this.player1_peep()][0]
        }
        // player2 is active
        else{
            document.getElementById("player2_card").src= "/static/images/"+this.card_obj_list[this.player2_peep()][0]
        }

        setTimeout(()=>{
            if(this.floor.length>0){
                document.getElementById("img_board").src = "/static/images/"+this.card_obj_list[this.floor_peep()][0]
                if(player1){
                    document.getElementById("player1_card").src = "/static/images/player1.png"
                }
                // player2 is active
                else{
                    document.getElementById("player2_card").src= "/static/images/player2.png"
                }
            }
        },1000)

    }
    // this function is perform when there is same card on floor and any player
    action_same_card(player1){
        
        play_music("/static/sound/same_card.wav")
        // player1 active so put all floor card to  this player's bag
        if(player1){
            let len = this.floor.length
            for(let i=0;i<len;i++){
                this.player1_index_arr.push(this.floor.pop())
            }
            document.getElementById("player1_card").src ="/static/images/player1.png"
            console.log("player1 good",this.player1_index_arr)
        }
        // player2 active so put all floor card to  this player's bag
        else{
            let len = this.floor.length
            for(let i=0;i<len;i++){
                this.player2_index_arr.push(this.floor.pop())
            }
            document.getElementById("player2_card").src="/static/images/player2.png"
            console.log("player2 good",this.player2_index_arr)
     
        }
    }
    // this function is for make some changing and displaying result when game is end
    game_end(player1){
        
        play_music("/static/sound/game_end.wav")
        
        let body = document.querySelector(".content_box")
        body.style.justifyContent = "center"
        body.style.alignItems = "center"



        let heading = document.querySelector(".heading")
        heading.style.display = "none"

        let container = document.querySelector(".container_main")
        container.style.display = "none"

        let win_gif = document.createElement("img")
        win_gif.src = "/static/images/party.gif"
        win_gif.setAttribute("class","win_gif")

        let message = document.createElement("div")
        message.innerHTML = `Congratulations ${player1} Win The Game!`
        message.setAttribute("class","win_msg")

        let restart_button  = document.createElement("button")
        restart_button.innerHTML = "Restart"
        restart_button.setAttribute("class","restart_btn")

        // this function is for restarting game by refreshing the page
        restart_button.onclick = function(){
            location.reload()
        }

        body.appendChild(win_gif)
        body.appendChild(message)
        body.appendChild(restart_button)

        
    }
    // this function is reset the cards 
    reset_card(player1,player2){
        this.game_initialization(player1,player2)
    }
    
}

// This functions changes text and elements on display
class Display_changer{
    // for displaying player names
    display_player_name(player1,player2){
        if(player1===null || player2===null){
            document.getElementById("player1").innerHTML = player1
            document.getElementById("player2").innerHTML = player2
        }
        else{
            document.getElementById("player1").innerHTML = player1
            document.getElementById("player2").innerHTML = player2
        }
    }
    // for displaying scores of players on display
    display_score(score1,score2){
        document.getElementById("score1").innerHTML = score1
        document.getElementById("score2").innerHTML = score2
    }
    // for displaying number of cards of floor on display
    display_score_board(value){
        document.getElementById("board_len").innerHTML = value
    }


}

// this function calls when player click add button
const action = ()=>{
    
    play_music("/static/sound/start_click.wav")

    
    // if there is more than one card on floor and is same value then perform some action acc to that
    if (obj.floor.length>1){
        if(obj.is_same_value(player1)){
            obj.action_same_card(player1)
        }
    }
    
    // to change the image 
    obj.change_card(player1)
    
    
    // pop the card from stack1 and push to floor
    obj.add_to_floor(player1)
    
    
    
    // player1 turn
    if(player1){
        
        
        // if both the player has 0 card left then give again cards to both or reset action
        if (obj.player1_index_arr.length===0 && obj.player2_index_arr.length===0){
            obj.reset_card(player_one,player_two)
        }
        
        // if there is only one card left tot player one then game ends 
        if (obj.player1_index_arr.length===1){
            obj.game_end(player_one)
        }
        
        // now player2's turn is comming
        player1=false
    }
    // player2 turn
    else{
        
        // if both the player has 0 card left then give again cards to both or reset action
        if (obj.player1_index_arr.length===0 && obj.player2_index_arr.length===0){
            obj.reset_card(player_one,player_two)
            
        }
        
        // if there is only one card left tot player two then game ends
        if (obj.player2_index_arr.length===1){
            obj.game_end(player_two)
        }
        
        // now player1's turn is comming
        player1=true
    }
    
    // for indicating turn of player
    obj.make_glow(player1)
    // for displaying total number of player's card 
    obj_display.display_score(obj.player1_index_arr.length,obj.player2_index_arr.length) 
    // for displaying total number of cards on floor
    obj_display.display_score_board(obj.floor.length)
}


