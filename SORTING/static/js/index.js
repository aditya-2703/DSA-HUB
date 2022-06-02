

var algo = "bubble"
var array = []

// size of bar
var size = 30


// setting algorithm by selecting from button
let set_algo = (ele)=>{
    let curr_algos = ele.id
    algo = curr_algos
    game_start()
}
// reset bars to clear the screen of bars
let reset_bars = ()=>{
    let bar_list = document.querySelector(".bar_list")
    bar_list.innerHTML = ""   
}
// to draw bars of size n and return array
let make_bars = (size)=>{

    let bar_list = document.querySelector(".bar_list")
    let height_arr = []
    
    for(let i=0;i<size;i++){
        let bar = document.createElement("li")
        bar.classList.add("bar")
        bar.id = `${i}`
        let bar_size = parseInt(50/size)
        bar.style.height = Math.max(10,450-Math.random() * (400 - 10) + 10,400-Math.floor(Math.random()*300))+"px"
        height_arr.push(bar.style.height)
        bar.style.width = (250/size)+"px"
        bar.style.listStyleType = "none"
        bar.style.background="lightblue"
       
        bar.style.transform = `translateX(${i * bar_size}px)`;
        bar_list.appendChild(bar)    
    }
    return height_arr
    
}
// draw bars animation to window
let draw_bars = async (array)=>{
    for(let i=0;i<size;i++){
        let bar = document.getElementById(i)
        time_sleep(time)
        bar.style.height = array[i]+"px"
    }
}
// go to sort function
let go = ()=>{
    array = make_bars(size)
}
// game start function to remove non relevent stuff
let game_start = ()=>{
    document.querySelector(".comparision").style.display = "none"
    document.querySelector(".dandc").style.display = "none"
    document.querySelector(".heading").innerHTML = algo[0].toUpperCase() + algo.substring(1) + " Sort"
    document.querySelector(".heading").style.marginBottom = "5px"
    document.querySelector(".visualizer_cont").style.display="flex"
    document.querySelector(".home_icon").style.display="flex"
    console.log("Algorithm selected -> ",algo)
    go()
}


// clean array by parsing it to int
let clean_array = (array)=>{
    for(let i =0;i<array.length;i++){
        let element = array[i]
        let len = element.length
        let end = len - 2
        element = element.slice(0,end)
        array[i] = parseInt(element)
    }
    return array
}

// change color of bar by it's index and color
let change_color = (index,color)=>{
    document.getElementById(`${index}`).style.background = color
}


var time = 250
var speed_container = document.querySelector("#speedslider")
var size_container = document.querySelector("#sizeslider")
// time setting from slider
let set_time = (e)=>{
    time = 500-(e.target.value)*25
}
// size setting from slider
let set_size = (e)=>{
    if(e.target.value<=25){
        size = 25
    }
    else{
        size = (e.target.value+1)/10
    }
    
    console.log("actual is ",e.target.value,"total is ",size)
    reset_bars()
    array = make_bars(size)

}
// setting array color by array and colors
let set_array_color = async(array,color)=>{
    for(let i=0;i<array.length;i++){
        time_sleep(time)
        change_color(i,color)
    }
}
// event listners
speed_container.addEventListener("change",set_time)
size_container.addEventListener("change",set_size)

// time sleep function
function time_sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
// randomize bars function which triggers by button
let randomize_bars = ()=>{
    reset_bars()
    array = make_bars(size)
}

// selection sort algorithm
let selection_sort = async (array)=>{
    let min_element = 0
    let n = array.length
    let default_color = "lightblue"
    let new_color = "darkblue"

    for(let i=0;i<n;i++){
        min_element = i
        change_color(i,default_color)

        await new Promise((resolve)=>{
            setTimeout(()=>{
                    resolve()
                },time)
            })
        
        for(let j=i+1;j<n;j++){
            change_color(j,new_color)

            await new Promise((resolve)=>{
                setTimeout(()=>{
                        resolve()
                    },time)
                })
                    
            if (array[j]<=array[min_element]){

                change_color(min_element,default_color)
                min_element = j
                change_color(j,default_color)
            }
            else{
                change_color(j,default_color)
            }

        }
        if (min_element!=i){

            
            let a = document.getElementById(`${i}`)
            let b = document.getElementById(`${min_element}`)
            a.style.height = array[min_element]+"px"
            b.style.height = array[i]+"px"
        
            // temp = a.innerText
            // a.innerText = b.innerText
            // b.innerText = temp

            let temp = array[i]
            array[i] = array[min_element]
            array[min_element] = temp

            change_color(i,"lightgreen")
        }
        else{
            change_color(i,"lightgreen")
        }

    }
    return array
    
}
// bubble sort algorithm
let bubble_sort = async (array)=>{
    let n = array.length
    let default_color = "lightblue"
    let new_color = "darkblue"

    for(let i=0;i<n;i++){
        change_color(i,default_color)

        await new Promise((resolve)=>{
            setTimeout(()=>{
                    resolve()
                },time)
            })
        
        for(let j=0;j<n-i-1;j++){
            change_color(j,new_color)
            change_color(j+1,new_color)
            await new Promise((resolve)=>{
                setTimeout(()=>{
                        resolve()
                    },time)
                })
                    
            if (array[j]>array[j+1]){

                change_color(j+1,default_color)
                let a = document.getElementById(`${j}`)
                let b = document.getElementById(`${j+1}`)
                a.style.height = array[j+1]+"px"
                b.style.height = array[j]+"px"
            
                // temp = a.innerText
                // a.innerText = b.innerText
                // b.innerText = temp

                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp

                change_color(j,default_color)
                change_color(j+1,default_color)
            }
            else{
                
                change_color(j,default_color)
                change_color(j+1,default_color)
            }
            

        }
        change_color(n-i-1,"lightgreen")


    }
    return array
    
}
// insertion sort algorithm
let insertion_sort = async (array)=>{
    let n = array.length
    let default_color = "lightblue"
    let new_color = "darkblue"

    for(let i=0;i<n;i++){
        let temp = array[i]
        change_color(i,default_color)

        await new Promise((resolve)=>{
            setTimeout(()=>{
                    resolve()
                },time)
            })

        j=i-1
        while (j>=0 && temp<array[j]){
            if(j>=0){
                change_color(j+1,new_color)
                // change_color(j+1,new_color)
            }
            await new Promise((resolve)=>{
                setTimeout(()=>{
                        resolve()
                    },time)
                })
            if(j>=0){
                
                change_color(j,"lightgreen")
                change_color(j+1,"lightgreen")
            }
            let temp = array[j]
            array[j] = array[j+1]
            array[j+1] = temp
            
            let only_j = document.getElementById(`${j}`)
            let j_plus_one = document.getElementById(`${j+1}`)

            only_j.style.height = array[j]+"px"
            j_plus_one.style.height = array[j+1]+"px"
        
            temp = only_j.innerText
            only_j.innerText = j_plus_one.innerText
            j_plus_one.innerText = temp

            j-=1
        }
  

        array[j+1] = temp
        let a = document.getElementById(`${j+1}`)
        a.style.height = array[j+1]+"px"


        // change_color(j+1,default_color)

        change_color(i,"lightgreen")
       
            

    }


        return array
}
// shell sort algorithm
let shell_sort = async (array)=>{
    let n = array.length
    let default_color = "lightblue"
    let new_color = "darkblue"
    let i=0
    let gap = Math.floor(n/2);
    let j = gap+i;
    
    while(j<n){    

        if(array[i]>=array[j]){
            change_color(i,new_color)
            change_color(j,new_color)
            await new Promise((resolve)=>{
                setTimeout(()=>{
                        resolve()
                    },time)
                })
                
            let only_i = document.getElementById(`${i}`)
            let only_j = document.getElementById(`${j}`)
            
            let temp= array[j]
            array[j] = array[i]
            array[i] = temp

            

            only_i.style.height = array[i]+"px"
            only_j.style.height = array[j]+"px"
        
            temp = only_i.innerText
            only_i.innerText = only_j.innerText
            only_j.innerText = temp


            change_color(i,default_color)
            change_color(j,default_color)


        }
        i+=1
        j+=1
        if(j==n-1){
            gap = Math.floor(gap/2)
            i=0
            j = gap
            if(gap==1){
                array = insertion_sort(array)
                break
            }        
        }

    }

        return array
}
// sub paritition function for quick sort
let partition = async (array,low,high)=>{
    let pviot = array[high]
    i = low-1
    change_color(high,"red")

    for(let j=low;j<high;j++){

        let one = document.getElementById(`${i}`)
        let two = document.getElementById(`${j}`)

        change_color(j,"darkblue")
        await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve()
            },time)
        })
        if(array[j]<pviot){
            i++
            one = document.getElementById(`${i}`)
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp

            console.log("i is one is ",i,one)
            console.log("j is two is",j,two)

            one.style.height = array[i]+"px"
            two.style.height = array[j]+"px"

            temp = one.innerHTML
            one.innerHTML = two.innerHTML
            two.innerHTML = temp

            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve()
                },time)
            })

            change_color(i,"lightblue")
            change_color(j,"lightblue")
    }

    }
    // change_color(high,"lightgreen")
    let one = document.getElementById(`${i+1}`)
    let two = document.getElementById(`${high}`)
    
    one.style.height = array[high]+"px"
    two.style.height = array[i+1]+"px"

    let temp = array[i+1]
    array[i+1] = array[high]
    array[high] = temp

    temp = one.innerHTML
    one.innerHTML = two.innerHTML
    two.innerHTML = temp

    change_color(i+1,"lightgreen")
    change_color(high,"lightgreen")

    return i+1
}
// quick sort algorithm
let quick_sort = async (array,low,high)=>{
    
    if(low<high){
        let pivot  = await partition(array,low,high)
        console.log("pviot is ",pivot)
        await quick_sort(array,low,pivot-1)
        await quick_sort(array,pivot+1,high)
    }

}
// sub merge function for merge sort
let merge = async (array,left,right)=>{
    let i=0
    let j=0
    let k=0
  

    while(i<left.length && j<right.length){
        if(left[i]<right[j]){
            array[k] = left[i]
            i++
        }else{
            array[k] = right[j]
            j++
        }
        k++
    }
    while(i<left.length){
        array[k] = left[i]         
        i++
        k++
    }
    while(j<right.length){
        array[k] = right[j]
        j++
        k++
    }
    return array

}
// merge sort algorithm
let mergeSort = async (array)=>{
    
    if(array.length>1){
        let mid  = Math.floor(((array.length)/2))
        change_color(mid,"red")
        let left = array.slice(0,mid)
        let right = array.slice(mid,array.length)
        
        await mergeSort(left)
        
        await mergeSort(right)
        
        await time_sleep(time)

        await merge(array,left,right)

        await set_array_color(array,"blue")
        await draw_bars(array)
        await set_array_color(array,"lightgreen")


        await time_sleep(time)
    }

}
// disable slider
let disabled_sliders = ()=>{
    let speedslider = document.querySelector("#speedslider")
    speedslider.disabled = true
    let sizeslider = document.querySelector("#sizeslider")
    sizeslider.disabled = true
}
// enabled slider
let enabled_sliders = ()=>{
    let speedslider = document.querySelector("#speedslider")
    speedslider.disabled = false
    let sizeslider = document.querySelector("#sizeslider")
    sizeslider.disabled = false
}
// start visualize function which perform  some action then visualize algorithm by user input
let start_visualize = ()=>{
    array = clean_array(array)
    disabled_sliders()
    if(algo=="selection"){
        let new_array = selection_sort(array)
        console.log(new_array)
    }
    if(algo=="bubble"){
        console.log("this array is gone ",array)
        let new_array = bubble_sort(array)
        console.log(new_array)
    }
    else if(algo=="insertion"){
        console.log("this array is gone ",array)
        let new_array = insertion_sort(array)
        console.log(new_array)
    }
    else if(algo=="shell"){
        console.log("this array is gone ",array)
        let new_array = shell_sort(array)
        console.log(new_array)
    }
    else if(algo=="quick"){
        console.log("this array is gone ",array)
        let new_array = quick_sort(array,0,array.length-1)
        console.log(new_array)
    }
    else if(algo=="merge"){
        console.log("this array is gone ",array)
        let new_array = mergeSort(array)
        console.log(new_array)
    }
    enabled_sliders()

}


function home_(){
    location.reload()
}

