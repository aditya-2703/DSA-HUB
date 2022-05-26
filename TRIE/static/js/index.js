const cuteAlert = ({
    type,
    title,
    message,
    img,
    buttonText = 'OK',
    confirmText = 'OK',
    vibrate = [],
    playSound = null,
    cancelText = 'Cancel',
    closeStyle,
  }) => {
    return new Promise(resolve => {
      const existingAlert = document.querySelector('.alert-wrapper');
  
      if (existingAlert) {
        existingAlert.remove();
      }
  
      const body = document.querySelector('body');
  
      const scripts = document.getElementsByTagName('script');
  
      let src = '';
  
      for (let script of scripts) {
        if (script.src.includes('cute-alert.js')) {
          src = script.src.substring(0, script.src.lastIndexOf('/'));
        }
      }
  
      let btnTemplate = `
      <button class="alert-button ${type}-bg ${type}-btn">${buttonText}</button>
      `;
  
      if (type === 'question') {
        btnTemplate = `
        <div class="question-buttons">
          <button class="confirm-button ${type}-bg ${type}-btn">${confirmText}</button>
          <button class="cancel-button error-bg error-btn">${cancelText}</button>
        </div>
        `;
      }
  
      if (vibrate.length > 0) {
        navigator.vibrate(vibrate);
      }
  
      if (playSound !== null) {
        let sound = new Audio(playSound);
        sound.play();
      }
  
      const template = `
      <div class="alert-wrapper">
        <div class="alert-frame">
          ${img !== '' ? '<div class="alert-header ' + type + '-bg">' : '<div>'}
            <span class="alert-close ${
              closeStyle === 'circle'
                ? 'alert-close-circle'
                : 'alert-close-default'
            }">X</span>
            ${img !== '' ? '<img class="alert-img" src="/static/image/success.svg" />' : ''}
          </div>
          <div class="alert-body">
            <span class="alert-title">${title}</span>
            <span class="alert-message">${message}</span>
            ${btnTemplate}
          </div>
        </div>
      </div>
      `;
  
      body.insertAdjacentHTML('afterend', template);
  
      const alertWrapper = document.querySelector('.alert-wrapper');
      const alertFrame = document.querySelector('.alert-frame');
      const alertClose = document.querySelector('.alert-close');
  
      if (type === 'question') {
        const confirmButton = document.querySelector('.confirm-button');
        const cancelButton = document.querySelector('.cancel-button');
  
        confirmButton.addEventListener('click', () => {
          alertWrapper.remove();
          resolve('confirm');
        });
  
        cancelButton.addEventListener('click', () => {
          alertWrapper.remove();
          resolve();
        });
      } else {
        const alertButton = document.querySelector('.alert-button');
  
        alertButton.addEventListener('click', () => {
          alertWrapper.remove();
          resolve('ok');
        });
      }
  
      alertClose.addEventListener('click', () => {
        alertWrapper.remove();
        resolve('close');
      });
  
  /*     alertWrapper.addEventListener('click', () => {
        alertWrapper.remove();
        resolve();
      }); */
  
      alertFrame.addEventListener('click', e => {
        e.stopPropagation();
      });
    });
  };
var data=[]

class Trie_node{
    constructor(data=null){
        this.data = data
        this.child = []
        for(let i = 0; i < 26; i++){
            this.child.push(null)
        }
        this.is_end = false
        this.phone_num = ""
    }    
}

class Trie{
    constructor(){
        this.root = new Trie_node("R")
    }
    // insert word into trie
    insert_word(word,num){
        let curr = this.root
        for(let i=0;i<word.length;i++){
            let char = word[i]
            let index = char.charCodeAt(0) - 97
            if(curr.child[index]==null){
                curr.child[index] = new Trie_node(char)
            }
            curr = curr.child[index]
            curr.phone_num = num
        }
        curr.is_end=true
        curr.phone_num = num

    }
    // search word into trie
    search_word(word){
        let curr = this.root
        for(let i=0;i<word.length;i++){
            let char = word[i]
            let index = char.charCodeAt(0) - 97
            if(curr.child[index]==null){
                return false
            }
            curr = curr.child[index]
        }
        return curr.is_end
    }
    // get node from word if exists else null
    get_node(word){
        let curr = this.root
        for(let i=0;i<word.length;i++){
            let char = word[i]
            let index = char.charCodeAt(0) - 97
            if(curr.child[index]==null){
                return null
            }
            curr = curr.child[index]
        }
        return curr

    }
    // fill suggestions in suggestions array with backtracking 
    fill_suggestions(node,suggestions,word){
        if(node.is_end){
            let record = {"name" : word, "phone" : node.phone_num}
            suggestions.push(record)
        }
        for(let i = 0; i < 26; i++){
            let char = String.fromCharCode(i+97);
            if(node.child[i]!=null){
                word+=char
                this.fill_suggestions(node.child[i],suggestions,word)
                word = word.slice(0,word.length-1)
            }
        }
    }
    // return all the suggestions from given word
    get_all_suggestions(word){
        let suggestions = []
        let curr = this.get_node(word)
        if(curr==null){
            return suggestions
        }
        this.fill_suggestions(curr,suggestions,word)
        return suggestions
    }
    // fill the records in records obj
    fill_sorted_order(root,records,word){
        if(root.is_end){
            let each_info = {"name":word,"phone":root.phone_num}
            records.push(each_info)
        }
        for(let i = 0; i < 26; i++){
            let char = String.fromCharCode(i+97);
            if(root.child[i]!=null){
                word+=char
                this.fill_sorted_order(root.child[i],records,word)
                word = word.slice(0,word.length-1)
            }
        }
    }
    // return sorted order of all contact
    get_sorted_order(){
        let curr = this.root
        let records = []
        this.fill_sorted_order(curr,records,"")
        return records
    }
}


// get random phone number
function get_phone_number(){
    let phone_number = Math.floor(Math.random() * 1000000000);
    return phone_number.toString()
}
// create data object from this random 200 names and map with random phone number
function get_data_obj(){
    let contact_name_list = ['Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Theodore', 'Jack', 'Levi', 'Alexander', 'Jackson', 'Mateo', 'Daniel', 'Michael', 'Mason', 'Sebastian', 'Ethan', 'Logan', 'Owen', 'Samuel', 'Jacob', 'Asher', 'Aiden', 'John', 'Joseph', 'Wyatt', 'David', 'Leo', 'Luke', 'Julian', 'Hudson', 'Grayson', 'Matthew', 'Ezra', 'Gabriel', 'Carter', 'Isaac', 'Jayden', 'Luca', 'Anthony', 'Dylan', 'Lincoln', 'Thomas', 'Maverick', 'Elias', 'Josiah', 'Charles', 'Caleb', 'Christopher', 'Ezekiel', 'Miles', 'Jaxon', 'Isaiah', 'Andrew', 'Joshua', 'Nathan', 'Nolan', 'Adrian', 'Cameron', 'Santiago', 'Eli', 'Aaron', 'Ryan', 'Angel', 'Cooper', 'Waylon', 'Easton', 'Kai', 'Christian', 'Landon', 'Colton', 'Roman', 'Axel', 'Brooks', 'Jonathan', 'Robert', 'Jameson', 'Ian', 'Everett', 'Greyson', 'Wesley', 'Jeremiah', 'Hunter', 'Leonardo', 'Jordan', 'Jose', 'Bennett', 'Silas', 'Nicholas', 'Parker', 'Beau', 'Weston', 'Austin', 'Connor', 'Carson', 'Dominic', 'Xavier', 'Jaxson', 'Jace', 'Emmett', 'Adam', 'Declan', 'Rowan', 'Micah', 'Kayden', 'Gael', 'River', 'Ryder', 'Kingston', 'Damian', 'Sawyer', 'Luka', 'Evan', 'Vincent', 'Legend', 'Myles', 'Harrison', 'August', 'Bryson', 'Amir', 'Giovanni', 'Chase', 'Diego', 'Milo', 'Jasper', 'Walker', 'Jason', 'Brayden', 'Cole', 'Nathaniel', 'George', 'Lorenzo', 'Zion', 'Luis', 'Archer', 'Enzo', 'Jonah', 'Thiago', 'Theo', 'Ayden', 'Zachary', 'Calvin', 'Braxton', 'Ashton', 'Rhett', 'Atlas', 'Jude', 'Bentley', 'Carlos', 'Ryker', 'Adriel', 'Arthur', 'Ace', 'Tyler', 'Jayce', 'Max', 'Elliot', 'Graham', 'Kaiden', 'Maxwell', 'Juan', 'Dean', 'Matteo', 'Malachi', 'Ivan', 'Elliott', 'Jesus', 'Emiliano', 'Messiah', 'Gavin', 'Maddox', 'Camden', 'Hayden', 'Leon', 'Antonio', 'Justin', 'Tucker', 'Brandon', 'Kevin', 'Judah', 'Finn', 'King', 'Brody', 'Xander', 'Nicolas', 'Charlie', 'Arlo', 'Emmanuel', 'Barrett', 'Felix', 'Alex', 'Miguel', 'Abel', 'Alan', 'Beckett', 'Amari', 'Karter']
    let data = []
    for(let i=0;i<contact_name_list.length;i++){
        let record = {}
        record.name = contact_name_list[i]
        record.phone = get_phone_number()
        data.push(record)
    }
    return data
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

// load data
data = get_data_obj()
// console.log(data)

// template which will be used to show data
async function template(data_obj){
    
    let parent_element = document.querySelector(".contact_list_container")
    parent_element.innerHTML = ""
    for(let i=0;i<data_obj.length;i++){
        let name = data_obj[i].name
        name =name.charAt(0).toUpperCase() + name.slice(1);
        let url1  = "static/image/avatar1.png"
        let phone = data_obj[i].phone
        let format = "("+phone.slice(0,3)+")"+"-"+phone.slice(3,6)+"-"+phone.slice(6,10)
        let animation_string = `data-aos="fade-up" data-aos-delay="${i+50}"`
        let string=""
        string = `<div  class="contact_box">
            <div class="dp">
                <div class="dp_inner_1">
                    <div class="dp_inner_2">
                        <img src="${url1}" alt="">
                    </div>
                </div>
                </div>
                <div class="info">
                    <div class="info_name">${name}</div>
                    <div class="info_phone">+${format}</div>
                </div>
        </div>`
        
        parent_element.innerHTML+=string
    }
}

// global declaration
var trie_obj = new Trie()


// show data in contact list as name sorted order
function show_data(data){
    for(let i=0;i<data.length;i++){
        let name_data = data[i].name.toLowerCase()
        trie_obj.insert_word(name_data,data[i].phone)
    }
    let list = trie_obj.get_sorted_order()
    template(list)
}


// function to add data 
function add_data(){
    let name_elemenet = document.getElementById("name@")
    let phone_element = document.getElementById("phone@")
    let name = name_elemenet.value
    let phone = phone_element.value
    if(name=="" && phone==""){
      alert("Please Enter Name and Phone Number")
    }
    else{
      let curr_data = {name: name, phone: phone}
      data.push(curr_data)
      name_elemenet.value = ""
      phone_element.value = ""
      show_data(data)
      cuteAlert({
          type:"success",
          title:"congratulations",
          message: "contact added successfully",
          buttonText: "ok",
      })
    }
}

document.querySelector(".search_bar").addEventListener("input",search_data)

// function to search contact
function search_data(ele){
    let query = ele.target.value.toLowerCase()
    // by this query get all suggestions
    let suggestions = trie_obj.get_all_suggestions(query)
    template(suggestions)
}

show_data(data)
