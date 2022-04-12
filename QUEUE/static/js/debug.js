let album_data = [
    {
        id: 1,
        image: '/static/images/shape_of_you.jpeg',
        name: "Shape of you",
        artist_name: "Ed Sheeran",
        time: '3:22',
        prio:1,
        path:"/static/sounds/shape_of_you.mp3"
    },
    {
        id: 2,
        image: '/static/images/believer.jpg',
        name: "Believer",
        artist_name: "Imagine Dragons",
        time: '3:11',
        prio:1,
        path:"/static/sounds/believer.mp3"
    },
    {
        id: 3,
        image: '/static/images/fairy_tale.webp',
        name: "Fairy tale",
        artist_name: "Alexander Rybak",
        time: '2:56',
        prio:1,
        path:"/static/sounds/fairy_tail.mp3"
    },
    {
        id: 4,
        image: '/static/images/old_town_road.png',
        name: "Old town road",
        artist_name: "Lil Nas X",
        time: '2:22',
        prio:1,
        path:"/static/sounds/old_town.mp3"
    },
    {
        id: 5,
        image: '/static/images/devil_eyes.webp',
        name: "Devil eyes",
        artist_name: "Hippie Sabotage",
        time: '3:00',
        prio:1,
        path:"/static/sounds/devil_eyes.mp3"
    },
    {
        id: 6,
        image: '/static/images/the_nights.jpg',
        name: "The Nights",
        artist_name: "Avicii - The days",
        time: '4:22',
        prio:1,
        path:"/static/sounds/the_nights.mp3"
    },
    {
        id: 7,
        image: '/static/images/thrift_shop.jpg',
        name: "Thirft shops",
        artist_name: "The BossHoss",
        time: '4:22',
        prio:1,
        path:"/static/sounds/thrift_shop.mp3"
    },
    {
        id: 8,
        image: '/static/images/venom.jpg',
        name: "Venom",
        artist_name: "Eminem",
        time: '4:22',
        prio:1,
        path:"/static/sounds/venom.mp3"
    },]
    
    let fav_data = [
        {
            id: 2,
            image: '/static/images/believer.jpg',
            name: "Believer",
            artist_name: "Imagine Dragons",
            time: '3:11',
            prio:1,
            path:"/static/sounds/believer.mp3"
        },
        {
            id: 3,
            image: '/static/images/fairy_tale.webp',
            name: "Fairy tale",
            artist_name: "Alexander Rybak",
            time: '2:56',
            prio:1,
            path:"/static/sounds/fairy_tail.mp3"
        },
        {
            id: 4,
            image: '/static/images/old_town_road.png',
            name: "Old town road",
            artist_name: "Lil Nas X",
            time: '2:22',
            prio:1,
            path:"/static/sounds/old_town.mp3"
        },
    ]
    
    var curr_obj_list = []
    var id = 0
    var mode = ""
    var is_song_playing = false
    // change
    var volume_value = 0;
    
    
    // this class takes object and display data to screen
    class Album_song_template{
        
        show_data(){
            let data = localStorage.getItem("Album")
            data = JSON.parse(data)
            if(data.length>1){
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
    //  <a class="play" onclick="play_song(this)">Play</a><a class="dlt" onclick="delete_song(this)">Delete</a><a class="prio_s">Prio ${data[i].prio}</a></div></li>`
    
            
        }
        // delete_song(song){
        //     let arr = localStorage.getItem("Album")
        //     arr = JSON.parse(arr)
        //     arr= arr.splice(song,1)
        //     console.log(arr)
        //     localStorage.setItem("Album",JSON.stringify(arr))
        //     this.show_data()
        // }
        
    }
    // favorite list class has data of favorite list
    class Favorite_list{
        constructor(data){
            this.data = []
        }
        not_contains(curr_data){
            for(let i=0;i<this.data.length;i++){
                if(curr_data.id == this.data[i].id){
                    return false;
                }
            }
            return true;
        }
        add_data(curr_data){
            if(this.not_contains(curr_data)){
                this.data.push(curr_data);
                console.log(this.data)
            }
        }
        
        get_data(){
            return this.data
        }
        show_data(){
            let data = localStorage.getItem("Favorite")
            data = JSON.parse(data)
            let box = document.querySelector(".music_container")
            box.innerHTML = ""
            
            if(data.length>0){
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
        }
    }
    // priority list class has data of priority list
    class Priority_list{
        constructor(data){
            if(data==null){
                this.data = []
            }
            else{
                this.data  = data;
            }
        }
        not_contains(curr_data){
            for(let i=0;i<this.data.length;i++){
                if(curr_data.id == this.data[i].id){
                    this.data[i].prio = curr_data.prio + 1
                    return i;
                }
            }
            return -1;
        }
        add_data(curr_data,prio){
            let c_data = this.not_contains(curr_data)
            if(c_data === -1){
                this.data.push(curr_data);
            }
            else{
                this.data[c_data].prio = prio
            }
            console.log(this.data)
        }
        get_data(){
            return this.data
        }
        show_data(){        
            let data = localStorage.getItem("Priority")
            data = JSON.parse(data)
            let box = document.querySelector(".music_container")
            box.innerHTML = ""
    
            if(data.length>0){
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
        }
    }
    
    // this function set the curr song to screen
    function set_main_song(){
        let song = localStorage.getItem("Curr_song")
        song = JSON.parse(song)
        let image = document.querySelector(".hero_img")
        let song_name = document.querySelector(".song_name")
        let artist_name = document.querySelector(".artist_name")
        song_name.innerHTML = song.name
        artist_name.innerHTML = song.artist_name
        image.src = song.image
    }
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
    
    var album_obj  = new Album_song_template(curr_obj_list)
    var fav_obj = new Favorite_list()
    var prio_obj = new Priority_list()
    var audio_obj = new Audio()
    
    curr_obj_list  = album_data
    
    
    function add_to_fav(){
        let curr_song = JSON.parse(localStorage.getItem("Curr_song"))
        fav_obj.add_data(curr_song)  
        localStorage.setItem("Favorite",JSON.stringify(fav_obj.data))
        fav_obj.show_data()
        show_favorite()
        console.log("add to fav")   
    }
    function find_id(object){
        for(let i=0;i<curr_obj_list.length;i++){
            if(object.id == curr_obj_list[i].id){
                return i
            }
        }
        return -1
    }
    function add_to_prio(){
        let prio_button = document.querySelector(".prio_button")
        let msg = prio_button.innerHTML;
        let arr = msg.split(" ")
        prio_button.innerHTML = arr[0] + " " + (parseInt(arr[1]) + 1)
        let curr_song = JSON.parse(localStorage.getItem("Curr_song"))
        
        // change 
        let index = find_id(curr_song)
        curr_obj_list[index].prio = parseInt(arr[1]) + 1
    
    
        prio_obj.add_data(curr_song,parseInt(arr[1]) + 1)
        localStorage.setItem("Priority",JSON.stringify(prio_obj.get_data()))
        prio_obj.show_data()
        show_priority()
        console.log("add to prio")
    }
    function show_album(){
        document.querySelector(".album").style.color = "black"
        // document.querySelector(".priority").style.color =  "#CAC8C8"
        document.querySelector(".fav").style.color =  "#CAC8C8"
        album_obj.show_data()
    }
    function show_favorite(){
        document.querySelector(".album").style.color = "#CAC8C8"
        // document.querySelector(".priority").style.color =  "#CAC8C8"
        document.querySelector(".fav").style.color =  "black"
        curr_obj_list = fav_data
        fav_obj.show_data()
    
    }
    // function show_priority(){
    //     document.querySelector(".album").style.color = "#CAC8C8"
    //     document.querySelector(".priority").style.color =  "black"
    //     document.querySelector(".fav").style.color =  "#CAC8C8"
        
    //     prio_obj.show_data()
    // }
    function set_to_storage(){
        localStorage.setItem("Curr_song",JSON.stringify(curr_obj_list[id]))
        curr_obj_list =  set_audio_length(curr_obj_list)
        console.log(curr_obj_list)
        localStorage.setItem("Album",JSON.stringify(curr_obj_list))
        localStorage.setItem("Favorite",JSON.stringify(fav_obj.data))
        localStorage.setItem("Priority",JSON.stringify(prio_obj.data))
        show_album()
    
    }
    
    function play_audio_song(){
        let obj  = JSON.parse(localStorage.getItem("Curr_song")) 
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
        index  = parseInt(index.split(" ")[1])
        curr_obj_list[index-1]
    
        localStorage.setItem("Curr_song",JSON.stringify(curr_obj_list[index-1])) 
        set_main_song()
        is_song_playing= false
        play_audio_song()
    
    }
    
    
    set_to_storage()
    set_main_song()
    
    
    // volume slider 0 - 90
    //  0.0 - 1.0
    
    
    function volume_change(value){
        document.getElementById("myRange").value = value;
        volume_value = value/100
    }
    
    
    
    
    class Normal_Queue{
        constructor(arr){
            this.arr = arr
        }
        next_song(curr_song_index){
            let id = curr_song_index.id + 1 
            if(id < this.arr.length + 1){
                for(let i=0;i<this.arr.length;i++){
                    if(this.arr[i].id == id){
                        return this.arr[i]
                    }
                }
                return this.arr[0]
            }
            return this.arr[this.arr.length-1]
        }
        prev_song(curr_song_index){
            let id = curr_song_index.id - 1 
            if(id > 0){
                for(let i=0;i<this.arr.length;i++){
                    if(this.arr[i].id == id){
                        return this.arr[i]
                    }
                }
                return this.arr[0]
            }
            return this.arr[0]
        }
    }
    class Circular_Queue{
        constructor(arr){
            this.arr = arr
        }
        next_song(curr_song_index){
            let id = (curr_song_index.id + 1)%(this.arr.length + 1)
            for(let i=0;i<this.arr.length;i++){
                if(this.arr[i].id == id){
                    return this.arr[i]
                }
            }
            return this.arr[0]
        }
        prev_song(curr_song_index){
            let id = (curr_song_index.id + 1)%(this.arr.length + 1)
    
            for(let i=0;i<this.arr.length;i++){
                if(this.arr[i].id == id){
                    return this.arr[i]
                }
            }
            return this.arr[0]
            
        }
    }
    class Priority_Queue{
        constructor(arr){
            this.arr = []
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
            console.log("in pq class -> ",this.arr)
        }
        next_song(curr_song_index){
            if(curr_song_index===null){
                return this.arr[0]
            }
            if(curr_song_index>=this.arr.length){
                return
            }
            else{
                return this.arr[curr_song_index+1]
            }
        }
            
        prev_song(curr_song_index){
            if(curr_song_index===null){
                return this.arr[0]
            }
            if(curr_song_index<=0){
                return
            }
            else{
                return this.arr[curr_song_index-1]
            }
        }
        
    
    }
    
    mode = new Normal_Queue(curr_obj_list)
    
    
    
    
    function select_method(element){
        let normal_m = document.querySelector(".normal_m")
        let circular_m = document.querySelector(".circular_m")
        let priority_m = document.querySelector(".priority_m")
        normal_m.style.backgroundColor = "transparent"
        normal_m.style.border = "none"
        normal_m.style.color = "black"
        normal_m.style.fontWeight = "normal"
    
        circular_m.style.backgroundColor = "transparent"
        circular_m.style.border = "none"
        circular_m.style.color = "black"
        circular_m.style.fontWeight = "normal"
    
        priority_m.style.backgroundColor = "transparent"
        priority_m.style.border = "none"
        priority_m.style.color = "black"
        priority_m.style.fontWeight = "normal"
    
        element.style.color = "#32de84"
        element.style.fontWeight = "bolder"
    }
    
    function set_next_song(){
        let song = mode.next_song(JSON.parse(localStorage.getItem("Curr_song")))
        localStorage.setItem("Curr_song",JSON.stringify(song))
        let prio_button = document.querySelector(".prio_button")
        prio_button.innerHTML = "Prio" +" " + song.prio;
        set_main_song()
        is_song_playing = false;
        play_audio_song()
    }
    function set_prev_song(){
        let song = mode.prev_song(JSON.parse(localStorage.getItem("Curr_song")))
        localStorage.setItem("Curr_song",JSON.stringify(song))
        let prio_button = document.querySelector(".prio_button")
        prio_button.innerHTML = "Prio" + " " + song.prio;
        set_main_song()
        is_song_playing = false;
    
        play_audio_song()
    }
    function normal_mode(){
        let normal_q = new Normal_Queue(curr_obj_list)
        mode = normal_q
        // for highlight the on button
        select_method(document.querySelector(".normal_m"))
        console.log("normal"+mode)
    }
    
    function circular_mode(){
        let circular_q = new Circular_Queue(curr_obj_list)
        mode = circular_q
        select_method(document.querySelector(".circular_m"))
        console.log("circular"+mode)
    }
    
    function priority_mode(){
        
        let prio_q = new Priority_Queue(curr_obj_list)
        prio_q.create_heap()
        mode = prio_q
        select_method(document.querySelector(".priority_m"))
        console.log("priority"+mode)
    }
    
    
    
    