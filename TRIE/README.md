# Trie - Contact Diary

<p align="center">
  <img src="l_trie.png">
</p>


This project is an Contact - list app which uses Trie data structure to insert , search and sort the contacts. This app can add the data with phone number and it's also able to show suggestions based on our input keyword. 

# How to run app 

 * This is simple website with vanila javascript so you can directly run on your local machine without downloading any additional framework.
 * If you want to edite then it is better to use sass compiler because scss is used here. 

# How to run modules

 * You can search any contact name by search field and add the entry by given fields and add it.

# How it works

```sh

Trie - Contact Diary

data
    - list of objects 
    - object = {name:"name",phone="xxxxyyyyzz"}

class Trie_node
    -> constructor()
        - data - data of curr Trie_node
        - child - 26 len of array
        - is_end - boolean which make sure that this is end of string
        - phone_num - phone number with this data

class Trie  
    -> constructor()
        - initialize root Trie_node
    
    -> insert_word()
        - insert word in to Trie

    -> search_word()
        - search word in to Trie
    
    -> get_node()
        - get node from word

    -> fill_suggestions()
        - fill the suggestions in one array and return 
    
    -> get_all_suggestions()
        - take node from word
        - fill the object with suggestions and return  
    
    -> fill_sorted_order()
        - fill the object with sorted entry and return  

    -> get_sorted_order()
        - take root
        - fill the objects and return the list of object with sorted order
    
-> get_phone_number()
    - generates the random number

-> get_data_obj()
    - create data obj from list of names

-> template()
    - template for display list of object to screen

-> show_data()
    - to show data in sorted order

-> add_data()
    - when user press add button data added to trie

-> search_data()
    - when user search the data then it takes all suggestions and display it into screen

```
## What it looks like


<p align="center">
  <img src="0.gif">
</p>
  
