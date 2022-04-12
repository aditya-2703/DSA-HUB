// global declaration
var textfiled;
var game_start=false;
var main_text = "";
var input_text = document.getElementById("textfiled");

function WordCount(str) { 
    return str.split(" ").length;
}

function play(arg) {
    if (arg=="win"){
        var audio = new Audio('/static/sound/win.wav');
    }
    else{
        var audio = new Audio('/static/sound/type.wav');
    }
    audio.play();
}

  
// fetch data from api 
const  data_json = ()=>{
    return fetch("https://baconipsum.com/api/?type=meat-and-filler")
    .then(res => res.json())
    .then(data => data[0].slice(0,300)+".")
}

async function get_data() {
    const data = await data_json();
    main_text = data;
    document.querySelector(".inbuild_cont").innerHTML = data
    return data;
}

get_data()

const make_span = ()=>{
    var main_text = document.querySelector(".inbuild_cont").innerHTML;
    document.querySelector(".inbuild_cont").innerHTML = ""
    for(let i=0;i<main_text.length;i++){
        let new_span = document.createElement("span");
        if(main_text[i]==" "){
            new_span.innerHTML = "&nbsp;"
        }
        else{
            new_span.innerHTML = main_text[i];
        }
        new_span.setAttribute("class","single_char")
        document.querySelector(".inbuild_cont").appendChild(new_span);
    }
    result = document.querySelectorAll(".single_char")
    return result
}


// timer when game starts
const start_timer = ()=>{
    let timer = document.querySelector(".timer");
    let init = new Date().getTime()
    let x = setInterval(function(){
    let now = new Date().getTime();
    let distance = now-init
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timer.innerHTML = minutes + ":" + seconds;
    },1000)
}
   

// when player hit start button then this function will be called
const game_init = ()=>{
    let startbtn = document.querySelector('.button');
    startbtn.style.display = 'none';
    let result_pannel = document.querySelector(".result_cont")
    result_pannel.style.display = 'block';
    textfiled = document.getElementById("textfiled");
    game_start=true;
}



var mistakes = []
var correct_count=0;
var wrong_count=0
var index=0;
var list_element;
var game_stop=false;

input_text.addEventListener("input",(char)=>{
    
    play("")

    let type_char = char.data
    
    if (index==0 && game_stop==false){
        game_init();
        start_timer()   
        list_element = make_span()
    }
    if (index == list_element.length-1){
        game_stop=true
        let time = document.querySelector(".timer");
        time = time.innerHTML
        let time_arr = time.split(":")
        let minutes = time_arr[0]
        let seconds = time_arr[1]   
        let total_time = parseInt(minutes,10)+(parseInt(seconds,10)/60)
        game_end(correct_count,wrong_count,mistakes,total_time)
    }
    if (type_char == " " && list_element[index].innerHTML==="&nbsp;"){
        list_element[index].classList.add("correct")
        correct_count+=1   
    }
    if (type_char == " " && list_element[index].innerHTML!=="&nbsp;"){
        list_element[index].classList.add("mistake")
        wrong_count+=1
    }
    if (list_element[index].innerHTML===type_char){
        list_element[index].classList.add("correct")
        correct_count+=1
    }
    if(list_element[index].innerHTML!==type_char){
        mistakes.push(type_char)
        list_element[index].classList.add("mistake")
        wrong_count+=1   
    }
    
    index+=1

})

game_end = (right,wrong,arr,total_time)=>{
    let characters = document.querySelectorAll("span").length
    let wpm = Math.floor(60*(total_time+1))
    document.querySelector("#result_currect_word").innerHTML =  right
    document.querySelector("#wpm").innerHTML = wpm
    document.querySelector("#result_wrong_word").innerHTML = wrong
    input_text.style.display="none"


    
    let startbtn = document.querySelector('.button');
    startbtn.style.display = 'block';
    startbtn.classList.add("restart_game")
    startbtn.innerHTML="Restart"
    startbtn.onclick = ()=>{
        play("res")
        location.reload()
    }
    let timer_section = document.querySelector(".timer")
    timer_section.innerHTML = '<button class="restart_button">Play Again</button>'
    play("win")
}