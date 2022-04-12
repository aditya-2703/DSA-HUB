
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
        document.querySelector(".heading").innerHTML = ""
        document.querySelector(".heading").style.top= "70px"
        document.querySelector(".heading").style.fontSize= "180px"



        document.querySelector(".method").style.display = "none"
        document.querySelector(".start_btn").style.display = "none"
    }
// add dialoge box
    add_dialoge_box = () => {
        document.querySelector(".dialoge_box").style.display = "flex"
    }
// removing the dialoge box so that collision does not occure
    remove_dialoge_box = () => {
        document.querySelector(".dialoge_box").style.display = "none"
    }
// for getting the method of game
    on_method_select = (element) => {
        // console.log(element.value)
        method = element.value
    }
// for starting the game
    start_game(){
        this.remove_extra()
        this.add_dialoge_box()
        this.setting_heading()
    }
// setting the initial point
    setting_heading = () => {
        if (method==="binary"){
            document.querySelector(".heading").innerHTML = "50"
        }
        else{
            document.querySelector(".heading").innerHTML = "0"
        }

    }
    add_restart_button(){
        document.querySelector(".restart_button").style.display = "flex"
    }
    // game end function 
     game_end = ()=>{
        document.querySelector("body").style.background = 'url("/static/images/game_winning_gif.gif")'
        
        document.querySelector(".nav_box").style.top = "200px"

        document.querySelector(".heading").style.display = "none"
         
        document.querySelector(".select_method").style.display = "none"

        document.querySelector(".second_heading_winning").style.display="block"
        // document.querySelector(".second_heading_winning").style.top="200px"
        
        
        document.querySelector(".no_of_steps").style.display = "block"
        
        document.querySelector(".no_of_steps").innerHTML = `In ${this.steps} steps`
        document.querySelector(".no_of_steps").style.fontWeight = `bolder`
        
        // document.querySelector(".no_of_steps").style.top= `200px`

        
        document.querySelector(".restart_button").style.top = "400px"
        this.add_restart_button()
        
    }
    // to adding dialoge boxes for lower and higher
    add_two_more_dialoge_box = ()=>{
        document.querySelector(".query_dialoge_box").style.display = "flex"
    }
    remove_two_more_dialoge_box = ()=>{
        document.querySelector(".query_one").style.display = "none"
        document.querySelector(".query_two").style.display = "none"
        document.querySelector(".game_end_query_btn").style.display = "none"

    }
    remove_heading(){
        document.querySelector(".heading").style.display="none"
    }
    // to geting the number related query
    reply_yes_or_no_button = (element) => {
        if (element.className==="yes"){
            // alert("game end")
            this.game_end()
        }
        else{
            
                this.add_two_more_dialoge_box()
                this.remove_dialoge_box()
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
                document.querySelector(".heading").innerHTML = curr_number
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

            document.querySelector(".heading").innerHTML = curr_number

        }
    }
}


let object_of_basic_game_function = new Basic_game_functions()
// game start 
const start_game = ()=>{
    object_of_basic_game_function.start_game()
}
// that two dialoge box
const reply_on_query_button = (element) => {
    increase_or_decrease = element.className
    curr_number = document.querySelector(".heading").innerHTML
    object_of_basic_game_function.reply_on_query_button(method,curr_number,increase_or_decrease)
}
// that initial dialoge box 
const reply_yes_or_no_button = (element) => {
    object_of_basic_game_function.reply_yes_or_no_button(element)
}
// method for chosing or picking selected method
const on_method_select = (sel) => {
    // var sel = document.getElementById('opts');
    // console.log(sel)
    object_of_basic_game_function.on_method_select(sel)
}
// for restarting the game
const restart_game = () => {
    location.reload()
}







