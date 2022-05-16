// import heapq

class Node{
    constructor(value,freq){
        this.value = value
        this.freq = freq
        this.left = null
        this.right = null
    }
}
class Huffman{
        constructor(){
            this.text= text
            this.heap  = new PriorityQueue({ comparator: function(a, b) { return a.freq - b.freq; }});
            this.code= {}
            this.char_list = {}
            this.reverse_code= {}
        }
        make_char_freq_list(){
            for(let i=0;i<this.text.length;i++){
                let char = this.text[i]
                if ((char in this.char_list)==false){
                    this.char_list[char] = 1
                }
                else{
                    this.char_list[char]+=1
                }
            }
        }
        fill_heap(){
            for(const [key, value] of Object.entries(this.char_list)){
                let node = new Node(key,value)
                this.heap.queue(node)
            }
        }
        make_heap_node(){
            while(this.heap.length>1){
                let node_one = this.heap.dequeue()
                let node_two = this.heap.dequeue()
                let new_node = new Node("null",node_one.freq+node_two.freq)
                new_node.left = node_one
                new_node.right = node_two
                this.heap.queue(new_node)
            }
        }
        make_tree(){
            return this.heap.peek()
        }
        make_code(root,curr_code){
            if(root==null){
                return 
            }
            if (root.value!="null"){
                let value = root.value
                this.code[value] = curr_code
                this.reverse_code[curr_code] = value
            }
            this.make_code(root.left,curr_code+"0")
            this.make_code(root.right,curr_code+"1")
        }
        make_text(){
            let ans =""
            // for(const [key, value] of Object.entries(this.code)){
            //     ans+=value
            // }
            for(let i=0;i<this.text.length;i++){
                ans+=this.code[this.text[i]]
            }
            return ans
        }
        padding_text(encoded_text){
            let padding_value = 8 - (encoded_text.length % 8)
            for(let i=0;i<padding_value;i++){
                encoded_text += '0'
            }   
            let padding_encode_info = ("00000000"+padding_value.toString(2)).slice(-8);
            
            let padded_encoded_text = padding_encode_info + encoded_text
            return padded_encoded_text
        }
        encode_text(ans){
            let arr = []
            

            for(let i=0;i<ans.length;i+=8){
                let byte = ans.slice(i,i+8)
                let n_ans = parseInt(byte, 2);
                arr.push(n_ans)
            }
            return arr
        }
        encodeUnicode(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
            }));
          }
        convertToDecimal(byte) {
            let result = 0;
          
            byte = byte.split('');
          
            byte.reverse();
          
            for (let a = 0; a < byte.length; a++){
              if (byte[a] === '1'){
                result += 2 ** a;
              }
            }
          
            return result;
        }
          
        binaryAgent(str) {
            let bytes = [];
            for(let i=0;i<str.length;i+=8){
                bytes.push(str.slice(i,i+8))
            }
            let output = '';
              
            for (let k = 0; k < bytes.length; k++){
                output += String.fromCharCode(this.convertToDecimal(bytes[k]));
            }
          
            return output;
          }
        text2Binary(string) {
            return string.split('').map(function (char) {
                return char.charCodeAt(0).toString(2);
            }).join(' ');
        }
        make_reverse_code_code(){
            console.log(this.reverse_code)
            let ans = "["
            for(const [key, value] of Object.entries(this.reverse_code)){
                ans+=`{${key}:${this.text2Binary(value)}},`
            }
            ans+="]"

            return ans
        }
        compress(){

            this.make_char_freq_list()
            // console.log("character freq dict done",this.char_list)
            
            // # fill heap
            this.fill_heap()
            // console.log("heap is filled by node objects",this.heap)
            
            // # make heap-node
            this.make_heap_node()
            // console.log("from all nodes make only one node which is root",this.heap)
            
            // # make heap-tree
            let root = this.make_tree()
            // console.log("root node from heap if ",root)

            // # make code for each
            this.make_code(root,"")
            // console.log("make binary codes for each value is",this.code)
            // console.log("make binary codes for each value is",this.reverse_code)
            
            // # make text
            let ans_text = this.make_text()
            // console.log("making all the codes to one text",ans_text,ans_text.length)
            
            let encoding_msg = ans_text
            // ans_text = this.padding_text(ans_text)
            // console.log("add missing 0's ",ans_text,"with length is",ans_text.length)

            // encoding_msg = this.binaryAgent(ans_text)
            
            text = this.make_reverse_code_code()
            encoding_msg +=text
            return [encoding_msg,this.reverse_code]
        }
        

}
class Decoding{
    constructor(){
        this.reverse_code = {}
    }

    remove_padding(binary){
        // first 8 bit is length of extra padding
        let padding_len = parseInt(binary.slice(0,8),2)
        // remove the last 2(padding len) and this first 8 bit from string
        let ans = binary.slice(8,binary.length-padding_len)
        return ans
    }
    convertToDecimal(byte) {
        let result = 0;
      
        byte = byte.split('');
      
        byte.reverse();
      
        for (let a = 0; a < byte.length; a++){
          if (byte[a] === '1'){
            result += 2 ** a;
          }
        }
      
        return result;
    }
    hex2bin(h) {
        return h.split('').reduce(function(acc, i) {
            return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
        }, '')
    }
    stringToBinary(str) {
        let strOut = "";
        for (var i = 0; i < str.length; i++) {
            strOut += str[i].charCodeAt(0).toString(2);
        }
        return strOut
    }
    decode_string(string){
        let decoded_text = ''
        let current_bits = ''
        for(let i=0;i<string.length;i++){
            let bit = string[i]
            current_bits += bit
            if (current_bits in this.reverse_code){
                let character = this.reverse_code[current_bits]
                decoded_text += character
                current_bits = ""
            }
        }
        return decoded_text
        
    }
    
    get_char_code(string){
        let i=0
        while (i<string.length){
            let value = string[i]
            if(value=="["){
                break
            }
            i+=1
        }
        let pure_encode_text = string.slice(0,i)
        let code = string.slice(i+1,string.length-1)
        code = code.split(",")
        let ans = {}
        for(let i=0;i<code.length;i++){
            let temp = code[i].split(":")
            if(temp.length==2){
                let key = temp[0]
                let value = temp[1]
                key = key.slice(1)
                value = value.slice(0,temp[1].length-1)
                value = String.fromCharCode(parseInt(value, 2))
                ans[key] = value
            }
        }
        this.reverse_code = ans
        return pure_encode_text
    }
    decompress(string){
        string = this.get_char_code(string)
        string = this.decode_string(string)
        // console.log("string-> "+string)
        return string   
    }
}
const byteSize = str => new Blob([str]).size;


var text=""
var obj = new Huffman()
var code = ""


function bytesToSize(bytes) {
    let size = (new Blob([bytes]).size)  
    if(bytes[0]=="1" || bytes[0]=="0"){
        let new_size = 0;
        for(let i=0;i<bytes.length;i++){
            if(bytes[i]=="0" || bytes[i]=="1"){
                new_size+=1
            }
        }
        size = new_size/8 
    }
    if(size < 1024) {
        return size + "kb"
    }
    return size/1024 + "mb"

}

let element=document.querySelector(".encode") 
element.addEventListener("change",(d)=>{
    text = element.value
    document.querySelector(".encode_size_text").innerHTML =  "Size : " + bytesToSize(text)

})

function set_value(value){
    document.querySelector(".decode").value = value
    document.querySelector(".decode_size_text").innerHTML =  "Size : " + bytesToSize(value)
}

function encoding(){
    obj.text = text
    let arr = obj.compress()
    let encoding_msg = arr[0]
    set_value(encoding_msg)
    code = arr[1]
}
function decoding(){
    let encoding_msg = text
    let obj_decode = new Decoding()
    let decode = obj_decode.decompress(encoding_msg)
    set_value(decode)
}


