let bar_list = document.querySelector(".bar_list")
let height_arr = []
let make_bars = (size)=>{

    
    for(let i=0;i<size;i++){
        let bar = document.createElement("li")
        bar.classList.add("bar")
        bar.id = `${i}`
        bar.style.height = Math.max(40,700 - Math.floor(Math.random()*800))+"px"
        height_arr.push(bar.style.height)
        bar.style.width = (700/size)+"px"
        bar.style.listStyleType = "none"
        bar.style.background = "lightblue"
        bar.style.transform = `translateX(${i * 50}px)`;
        bar_list.appendChild(bar)    
    }


}
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
make_bars(20)
let array = clean_array(height_arr)
var time = 300
let change_color = (index,color)=>{
    document.getElementById(`${index}`).style.background = color
}
let draw_bars = async (array)=>{
    
    for(let i=0;i<array.length;i++){
        time_sleep(time)
        let bar = document.getElementById(i)
        bar.style.height = array[i]+"px"
    
        bar.style.background = "lightgreen"
    
    }
    
}
function time_sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 

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
let mergeSort = async (array)=>{
    
    if(array.length>1){
        let mid  = Math.floor(((array.length)/2))
        change_color(mid,"red")
        let left = array.slice(0,mid)
        let right = array.slice(mid,array.length)
        
        await mergeSort(left)
        await draw_bars(left)

        await mergeSort(right)
        await draw_bars(right)

        await time_sleep(time)

        await merge(array,left,right)

        await draw_bars(array)

        await time_sleep(time)
    }

}
mergeSort(array)
console.log(array)



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

let quick_sort = async (array,low,high)=>{
    
    if(low<high){
        let pivot  = await partition(array,low,high)
        console.log("pviot is ",pivot)
        await quick_sort(array,low,pivot-1)
        await quick_sort(array,pivot+1,high)
    }

}
