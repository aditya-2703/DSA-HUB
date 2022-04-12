let album_data = [
    {
        id: 1,
        image: '/static/images/shape_of_you.jpeg',
        name: "Shape of you",
        artist_name: "Ed Sheeran",
        time: '3:22',
        prio: 1,
        path: "/static/sounds/shape_of_you.mp3"
    },
    {
        id: 2,
        image: '/static/images/believer.jpg',
        name: "Believer",
        artist_name: "Imagine Dragons",
        time: '3:11',
        prio: 1,
        path: "/static/sounds/believer.mp3"
    },
    {
        id: 3,
        image: '/static/images/fairy_tale.webp',
        name: "Fairy tale",
        artist_name: "Alexander Rybak",
        time: '2:56',
        prio: 1,
        path: "/static/sounds/fairy_tail.mp3"
    },
    {
        id: 4,
        image: '/static/images/old_town_road.png',
        name: "Old town road",
        artist_name: "Lil Nas X",
        time: '2:22',
        prio: 1,
        path: "/static/sounds/old_town.mp3"
    },
    {
        id: 5,
        image: '/static/images/devil_eyes.webp',
        name: "Devil eyes",
        artist_name: "Hippie Sabotage",
        time: '3:00',
        prio: 1,
        path: "/static/sounds/devil_eyes.mp3"
    },
    {
        id: 6,
        image: '/static/images/the_nights.jpg',
        name: "The Nights",
        artist_name: "Avicii - The days",
        time: '4:22',
        prio: 1,
        path: "/static/sounds/the_nights.mp3"
    },
    {
        id: 7,
        image: '/static/images/thrift_shop.jpg',
        name: "Thirft shops",
        artist_name: "The BossHoss",
        time: '4:22',
        prio: 1,
        path: "/static/sounds/thrift_shop.mp3"
    },
    {
        id: 8,
        image: '/static/images/venom.jpg',
        name: "Venom",
        artist_name: "Eminem",
        time: '4:22',
        prio: 1,
        path: "/static/sounds/venom.mp3"
},
]

let fav_data = [
    {
        id: 2,
        image: '/static/images/believer.jpg',
        name: "Believer",
        artist_name: "Imagine Dragons",
        time: '3:11',
        prio: 1,
        path: "/static/sounds/believer.mp3"
    }
]

// show data to screen
function show_to_screen(data){
    let box = document.querySelector(".music_container")
    box.innerHTML = ""
    for(let i=0;i<data.length;i++){
        let name = data[i].name;
        let id = data[i].id;
        let image = data[i].image;
        let artist_name = data[i].artist_name;
        let time = data[i].time;
        let script = `<li>
        <div class="song_info">
            <img class="image_song" src="${image}" alt="">
            <div class="number">${id}</div>
            <div class="song_name_info">${name}</div>
        </div>
        <div class="artist_info">${artist_name}</div>
        <div class="song_time">${time}</div>
        <div class="dropdown">
        <button class="dropbtn">...
        <i class="fa fa-caret-down"></i>
        </button>
                <div class="dropdown-content">
        <a id="play ${id}" onclick="play_song(this)" href="#">Play</a>
        <a href="#">Prio - ${data[i].prio}</a>
        </div>`
        box.innerHTML += script;
    }
}

// globals 

var method_name = ""
var curr_song = album_data[0];
var mode = "normal"
var current_song_index = 0

// --------------------------------------------------------------------------------------------------------------------------------------------------------------


// initially
show_to_screen(album_data)

// highlight the section user clicks
function highlight_section(obj){
    document.querySelector(".fav").style.color = "#CAC8C8"
    document.querySelector(".album").style.color = "#CAC8C8"
    obj.style.color = "black"
}
// when user clicks favorite button on personal section
function show_favorite(){
    document.querySelector(".show_fav").style.color = "black"
    document.querySelector(".show_alb").style.color = "black"
    document.querySelector(".show_fav_img").src = "https://api.iconify.design/ant-design/heart-filled.svg"
    document.querySelector(".show_alb_img").src = "https://api.iconify.design/bxs/playlist.svg"

    
    // hightlight
    
    document.querySelector(".show_fav").style.fontWeight = "bolder"
    document.querySelector(".show_fav").style.color = "#39FF14"
    document.querySelector(".show_fav").style.textShadow = "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    document.querySelector(".show_fav_img").src = "https://api.iconify.design/ant-design/heart-filled.svg?color=%2339FF14"

    method_name = "favorite"
    highlight_section(document.querySelector(".fav"))
    show_to_screen(fav_data)
    display_song()
}
// when user clicks playlist button on personal section
function show_album(){
    document.querySelector(".show_fav").style.color = "black"
    document.querySelector(".show_alb").style.color = "black"
    document.querySelector(".show_fav_img").src = "https://api.iconify.design/ant-design/heart-filled.svg"
    document.querySelector(".show_alb_img").src = "https://api.iconify.design/bxs/playlist.svg"

    
    // hightlight
    
    document.querySelector(".show_alb").style.fontWeight = "bolder"
    document.querySelector(".show_alb").style.color = "#39FF14"
    document.querySelector(".show_alb").style.textShadow = "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    document.querySelector(".show_alb_img").src = "https://api.iconify.design/bxs/playlist.svg?color=%2339FF14"


    method_name = "album"
    highlight_section(document.querySelector(".album"))
    show_to_screen(album_data)
    display_song()
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------



// if method name favorite plays acc to fav 
// if method name album plays acc to album


// this function set the curr song to screen
function set_curr_song(song){

    let image = document.querySelector(".hero_img")
    let song_name = document.querySelector(".song_name")
    let artist_name = document.querySelector(".artist_name")
    let prio_btn = document.querySelector(".prio_button")
    song_name.innerHTML = song.name
    artist_name.innerHTML = song.artist_name
    image.src = song.image
    prio_btn.innerHTML = "Prio " + song.prio

}
// display the song based on the method name
function display_song(){
    if(method_name === "favorite"){
        set_curr_song(fav_data[0])
    }
    else{
        set_curr_song(album_data[0])
    }
}
display_song()



// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// next and prev song based on this methods 

class Normal_Queue{
    constructor(){
        this.arr = []
    }
    next_song(curr_song_index){
        let id = curr_song_index + 1 
        if(id < this.arr.length){
            return [this.arr[id],id]
        }
        return [this.arr[this.arr.length-1],this.arr.length-1]
    }
    prev_song(curr_song_index){
        let id = curr_song_index - 1 
        if(id > 0){
            return [this.arr[id],id]
        }
        return [this.arr[0],0]
    }
}
class Circular_Queue{
    constructor(){
        this.arr = []
    }
    next_song(curr_song_index){
        let id = (curr_song_index + 1)%(this.arr.length)
        return [this.arr[id],id]
    }
    prev_song(curr_song_index){
        let id = (curr_song_index - 1)%(this.arr.length)
        return [this.arr[id],id]
        
    }
}
class Priority_Queue{
    constructor(){
        this.arr = []
        this.index = 0

    }
    copy_array(arr){
        for(let i=0;i<arr.length;i++){
            this.arr.push(arr[i])
        }
    }
    get_size(){
        return this.arr.length-1;
    }

    make_heap(n,i){
        let largest = i
        let left = 2*i + 1
        let right = 2*i + 2
        // compare here
        if ((left<n) && (this.arr[largest].prio<this.arr[left].prio)){
            largest = left
        }
        // compare here
        if ((right<n) && (this.arr[largest]<this.arr[right].prio)){
            largest = right
        }
        if (largest!=i){
            let item = this.arr[largest]
            this.arr[largest] = this.arr[i]
            this.arr[i] = item
            this.make_heap(n,largest)
        }
    }
    
    create_heap(){

        // make heap 
        let n = this.arr.length
        for (var i = Math.floor(n / 2); i >= 0; i -= 1){
            this.make_heap(n,i)
        }
    
        //  delete heap
        for(let i=n-1;i>0;i--){
            let item = this.arr[0]
            this.arr[0] = this.arr[i]
            this.arr[i] = item
            this.make_heap(i,0)
        }
        // console.log("in pq class -> ",this.arr)
    }
    next_song(){
        this.create_heap()
        let id = this.index
        if(id<this.arr.length){
            this.index  += 1
            return [this.arr[id],id]
        }
        this.index  = this.arr.length-1 
        return [this.arr[this.arr.length-1],this.arr.length-1]
    }
        
    prev_song(){
        this.create_heap()
        let id = this.index
        if(id>=0){
            this.index  -= 1
            return [this.arr[id],id]
        }
        this.index  = 0
        return [this.arr[0],0]
    }
    get_song(){
        return this.arr[this.index]
    }
    

}

// setter methods 
function normal_mode(){
    // normal all 
    document.querySelector(".normal_m").style.color = "black"
    document.querySelector(".circular_m").style.color = "black"
    document.querySelector(".priority_m").style.color = "black"
    document.querySelector(".normal_m_img").src = "https://api.iconify.design/fluent/music-note-1-24-filled.svg"
    document.querySelector(".circular_m_img").src = "https://api.iconify.design/clarity/cd-dvd-line.svg"
    document.querySelector(".priority_m_img").src = "https://api.iconify.design/ant-design/ordered-list-outlined.svg"

    
    // hightlight
    
    document.querySelector(".normal_m").style.fontWeight = "bolder"
    document.querySelector(".normal_m").style.color = "#39FF14"
    document.querySelector(".normal_m").style.textShadow = "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    document.querySelector(".normal_m_img").src = "https://api.iconify.design/fluent/music-note-1-24-filled.svg?color=%2339FF14"



    mode = "normal"

}
function circular_mode(){
    // normal all 
    document.querySelector(".normal_m").style.color = "black"
    document.querySelector(".circular_m").style.color = "black"
    document.querySelector(".priority_m").style.color = "black"
    document.querySelector(".normal_m_img").src = "https://api.iconify.design/fluent/music-note-1-24-filled.svg"
    document.querySelector(".circular_m_img").src = "https://api.iconify.design/clarity/cd-dvd-line.svg"
    document.querySelector(".priority_m_img").src = "https://api.iconify.design/ant-design/ordered-list-outlined.svg"
    


    // hightlight
    
    document.querySelector(".circular_m").style.fontWeight = "bolder"
    document.querySelector(".circular_m").style.color = "#39FF14"
    document.querySelector(".circular_m").style.textShadow = "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    document.querySelector(".circular_m_img").src = "https://api.iconify.design/clarity/cd-dvd-line.svg?color=%2339FF14"
    
    mode = "circular"
}
function priority_mode(){
    // normal all 
    document.querySelector(".normal_m").style.color = "black"
    document.querySelector(".circular_m").style.color = "black"
    document.querySelector(".priority_m").style.color = "black"
    document.querySelector(".normal_m_img").src = "https://api.iconify.design/fluent/music-note-1-24-filled.svg"
    document.querySelector(".circular_m_img").src = "https://api.iconify.design/clarity/cd-dvd-line.svg"
    document.querySelector(".priority_m_img").src = "https://api.iconify.design/ant-design/ordered-list-outlined.svg"


    // hightlight
    
    document.querySelector(".priority_m").style.fontWeight = "bolder"
    document.querySelector(".priority_m").style.color = "#39FF14"
    document.querySelector(".priority_m").style.textShadow = "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    document.querySelector(".priority_m_img").src = "https://api.iconify.design/ant-design/ordered-list-outlined.svg?color=%2339FF14"
    
    mode = "priority"

}


// globals 
var normal_obj = new Normal_Queue()
var circular_obj = new Circular_Queue()
var priority_obj = new Priority_Queue()



// set next song button hits then this method triggers
function set_next_song(){
    if(mode == "normal"){
        if(method_name === "favorite"){
            normal_obj.arr = fav_data
        }
        else{
            normal_obj.arr = album_data
        }
        
        let list_ = normal_obj.next_song(current_song_index)
        curr_song = list_[0]
        current_song_index = list_[1]
        set_curr_song(curr_song)
        // console.log("next -> song -> ",curr_song, "index -> ",current_song_index)
        is_song_playing = false;
        play_audio_song()
    }
    else if(mode == "circular"){
        if(method_name === "favorite"){
            circular_obj.arr = fav_data
        }
        else{
            circular_obj.arr = album_data
        }
        
        let list_ = circular_obj.next_song(current_song_index)
        curr_song = list_[0]
        current_song_index = list_[1]
        set_curr_song(curr_song)
        // console.log("next -> song -> ",curr_song, "index -> ",current_song_index)
        is_song_playing = false;
        play_audio_song()
    }
    else if(mode == "priority"){
        if(method_name === "favorite"){
            priority_obj.arr = fav_data
        }
        else{
            priority_obj.arr = album_data
        }
        let list_ = priority_obj.next_song()
        curr_song = list_[0]
        current_song_index = list_[1]
        set_curr_song(curr_song)
        // console.log("next -> song -> ",curr_song, "index -> ",current_song_index ," pio -> " ,curr_song.prio)
        is_song_playing = false;
        play_audio_song()
    }
}
// set prev song button hits then this method triggers
function set_prev_song(){
    if(mode == "normal"){
        if(method_name === "favorite"){
            normal_obj.arr = fav_data
        }
        else{
            normal_obj.arr = album_data
        }
        let list_ = normal_obj.prev_song(current_song_index)
        curr_song = list_[0]
        current_song_index = list_[1]
        set_curr_song(curr_song)
        console.log("prev -> song -> ",curr_song, "index -> ",current_song_index)
        is_song_playing = false;
        play_audio_song()
    }
    else if(mode == "circular"){
        if(method_name === "favorite"){
            circular_obj.arr = fav_data
        }
        else{
            circular_obj.arr = album_data
        }
        let list_ = circular_obj.prev_song(current_song_index)
        curr_song = list_[0]
        current_song_index = list_[1]
        set_curr_song(curr_song)
        // console.log("prev -> song -> ",curr_song, "index -> ",current_song_index)
        is_song_playing = false;
        play_audio_song()
    }
    else if(mode == "priority"){
        if(method_name === "favorite"){
            priority_obj.copy_array(fav_data)
        }
        else{
            priority_obj.copy_array(album_data)
        }
        let list_ = priority_obj.prev_song()
        curr_song = list_[0]
        current_song_index = list_[1]
        set_curr_song(curr_song)
        is_song_playing = false;
        play_audio_song()
    }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------



// update priority 
function add_to_prio(element){
    let new_prio = 1
    // curr_song.prio = new_prio
    if(method_name === "favorite"){
        new_prio = fav_data[current_song_index].prio + 1
        fav_data[current_song_index].prio = new_prio
        show_to_screen(fav_data)
        priority_obj.arr = fav_data
    }
    else{
        new_prio = album_data[current_song_index].prio +1
        album_data[current_song_index].prio = new_prio
        show_to_screen(album_data) 
        priority_obj.arr = album_data

    }
    let new_prio_value = element.innerHTML.split(" ")[0] + " " + new_prio
    element.innerHTML = new_prio_value
}

function check_is_duplicate(curr_song){
    for(let i=0;i<fav_data.length;i++){
        if(curr_song.id === fav_data[i].id){
            return true;
        }
    }
    return false;
}
function add_to_fav(){
    let is_duplicated = check_is_duplicate(curr_song)
    if(!is_duplicated){
        fav_data.push(curr_song)
    }
    show_favorite()
    set_curr_song(curr_song)
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// global
var volume_value = 0;
var is_song_playing = false
var audio_obj = new Audio()


// volume adjuster

// this function set the audio true length of songs
function set_audio_length(curr_obj_list){
    
    for(let i=0;i<curr_obj_list.length;i++){
        let audio_obj = new Audio()
        audio_obj.src = curr_obj_list[i].path

        audio_obj.addEventListener('loadedmetadata', function(){
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            var duration = audio_obj.duration;
            let number = duration/60
            let prefix = parseInt(number).toString()
            let suffix = (parseInt((number % 10).toFixed(2).substring(2))).toString();            
            curr_obj_list[i].time = prefix+":"+suffix
            
        },false);
    }
    return curr_obj_list
}

// update audio length
album_data = set_audio_length(album_data)
fav_data = set_audio_length(fav_data)

function play_audio_song(){
    let obj  = curr_song
    let progress_bar = document.querySelector(".inner_slider")
    audio_obj.src = obj.path
    audio_obj.ontimeupdate = function(){
        progress_bar.style.width = Math.floor(((100*audio_obj.currentTime)/audio_obj.duration))+"%"
        // console.log(100*(audio_obj.currentTime/audio_obj.duration))
        audio_obj.volume = volume_value

    }
    if(is_song_playing==false){
        audio_obj.play()
        is_song_playing = true
        document.querySelector(".play").src = "https://api.iconify.design/ant-design/pause-circle-filled.svg?color=%23c4c4c4"
    }
    else{
        audio_obj.pause()
        is_song_playing = false
        document.querySelector(".play").src = "https://api.iconify.design/clarity/play-solid.svg?color=%23c4c4c4"
    }
}
function play_song(song){
    // console.log("play song")
    let index = song.id 
    index  = parseInt(index.split(" ")[1]) - 1
    if(method_name=== "favorite"){
        curr_song = fav_data[index]
    }    
    else{
        curr_song = album_data[index]
    }
    current_song_index = index
    set_curr_song(curr_song)
    is_song_playing= false
    play_audio_song()

}
function volume_change(value){
    document.getElementById("myRange").value = value;
    volume_value = value/100
}




 