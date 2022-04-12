var method=null;


// simple binary search for next number
class Binary_search{
    constructor(){
        this.start = 1
        this.end = 100
    }
    get_next_number = () => {
        let mid = Math.floor((this.start+this.end)/2)
        console.log("this is your next number take it ",mid)
        return mid
    }
}

class Basic_game_functions{

//  constructor
    constructor(){
        this.binary_search_obj= new Binary_search()
        this.steps = 0
    }
    // for removing extra elements in screen
   remove_extra = () => {
        // document.querySelector(".main_number").innerHTML = ""
        // document.querySelector(".main_number").style.top= "70px"
        // document.querySelector(".main_number").style.fontSize= "180px"



        // document.querySelector(".method").style.display = "none"
        // document.querySelector(".start_btn").style.display = "none"

        document.querySelector(".button_list").style.display = "none"
        document.querySelector(".statement").style.display = "none"
        document.querySelector(".hero").style.display = "none"
        

        
        
    }
// add dialoge box
    add_option_list = () => {
        document.querySelector(".option_list").style.display = "flex"
    }
// removing the dialoge box so that collision does not occure
    remove_option_list = () => {
        document.querySelector(".option_list").style.display = "none"
    }
// for getting the method of game
    on_method_select = (element) => {
        // console.log(element.value)
        method = element.id    
    }
// for starting the game
    start_game(){
        this.remove_extra()
        this.add_option_list()
        this.setting_main_number()
    }
// setting the initial point
    setting_main_number = () => {
        document.querySelector(".main_number").style.display = "flex"
        if (method==="binary"){
            document.querySelector(".main_number").innerHTML = "50"
        }
        else{
            document.querySelector(".main_number").innerHTML = "0"
        }

    }
    add_restart_button(){
        document.querySelector(".restart_button").style.display = "flex"
    }
    // game end function 
     game_end = ()=>{
        document.querySelector("body").style.background = 'url("/static/images/game_winning_gif.gif")'
        
        document.querySelector(".heading").style.display = "none"

        document.querySelector(".main_number").style.display = "none"
         
        document.querySelector(".option_list").style.display = "none"


        document.querySelector(".hero").style.display="block"
        document.querySelector(".hero").src="https://api.iconify.design/codicon/debug-restart.svg"
        document.querySelector(".hero").style.order="2"
        document.querySelector(".hero").onclick = ()=>{
            location.reload()
        }
        document.querySelector(".hero").classList.add("hero_animation")


        
        document.querySelector(".main_number").style.display = "block"
        
        // I Guessed Your Number 
        document.querySelector(".main_number").innerHTML = `I Guessed Your Number In ${this.steps} steps`
        document.querySelector(".main_number").style.fontWeight = `bolder`
        document.querySelector(".main_number").style.fontSize = "7em"
        document.querySelector(".main_number").style.textAlign = "center"
        document.querySelector(".main_number").style.lineHeight  = "100px"
        document.querySelector(".main_number").style.color  = "green"


        // document.querySelector(".no_of_steps").style.top= `200px`

        
        // document.querySelector(".restart_button").style.top = "400px"
        this.add_restart_button()
        
    }
    // to adding dialoge boxes for lower and higher
    add_two_more_option_list = ()=>{
        document.querySelector(".query_option_list").style.display = "flex"
    }
    remove_two_more_option_list = ()=>{
        document.querySelector(".query_one").style.display = "none"
        document.querySelector(".query_two").style.display = "none"
        document.querySelector(".game_end_query_btn").style.display = "none"

    }
    remove_main_number(){
        document.querySelector(".main_number").style.display="none"
    }
    // to geting the number related query
    reply_yes_or_no_button = (element) => {
        if (element.className==="yes"){
            // alert("game end")
            this.game_end()
        }
        else{
            
                this.add_two_more_option_list()
                this.remove_option_list()
                this.steps+=1
            
        }
    }


    // to perform action based on query
    reply_on_query_button = (method,curr_number,increase_or_decrease)=>{

        // win the game
        if (increase_or_decrease==="win"){
            // alert("you win the game")
            this.game_end()
        }

        // binaray serach
        if (method==="binary"){            
            curr_number  = parseInt(curr_number)
            
            // else{

                if (increase_or_decrease==="low"){
                    // i have to go upper
                    this.binary_search_obj.start = curr_number
                    this.steps+=1

                    curr_number = this.binary_search_obj.get_next_number()
                    if(curr_number<=0 || curr_number>100){
                        alert("Range of number is between 1-100")
                    }
                
                }
                else{
                    // i have to go lower 
                    this.binary_search_obj.end= curr_number
                    this.steps+=1

                    curr_number = this.binary_search_obj.get_next_number()
                    if(curr_number<=0 || curr_number>100){
                        alert("Range of number is between 1-100")
                    }
                
                }
                document.querySelector(".main_number").innerHTML = curr_number
            // }


        }

        // for linear search
        else{

            curr_number = parseInt(curr_number)
            this.steps+=1
            
            if (increase_or_decrease==="low"){
                // i have to go upper
                if(curr_number<=99){
                    curr_number = curr_number + 1
                }
                else{
                    alert("Range of number is between 1-100")
                }

            }
            else{

                // i have to go lower
                if(curr_number>=1){
                    curr_number = curr_number - 1
                }
           
                else{
                    alert("Range of number is between 1-100")
                }
            }

            document.querySelector(".main_number").innerHTML = curr_number

        }
    }
}


let object_of_basic_game_function = new Basic_game_functions()
// game start 
const start_game = (element)=>{
    object_of_basic_game_function.on_method_select(element)
    object_of_basic_game_function.start_game()
}
// that two dialoge box
const reply_on_query_button = (element) => {
    increase_or_decrease = element.className
    curr_number = document.querySelector(".main_number").innerHTML
    object_of_basic_game_function.reply_on_query_button(method,curr_number,increase_or_decrease)
}
// that initial dialoge box 
const reply_yes_or_no_button = (element) => {
    object_of_basic_game_function.reply_yes_or_no_button(element)
}

// for restarting the game
const restart_game = () => {
    location.reload()
}







