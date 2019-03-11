class Note {
  constructor(title) {
    this.title = title;
    // HINT🤩 
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    // give div a class
    newNote.setAttribute("class", "card");
    // make p element
    let newTitle = document.createElement('p');
    // put text in p
    newTitle.innerHTML = `${title}`;
    // make link 
    let removeLink = document.createElement('a');
    removeLink.setAttribute("href", "#");
    removeLink.setAttribute("class", "card-remove");
    removeLink.innerHTML = "Remove";
    // append p and link to div.card
    newNote.appendChild(newTitle);
    newNote.appendChild(removeLink);
    // HINT🤩 
    removeLink.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    let container = document.querySelector(".notes");
    container.appendChild(this.element);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    let arrOldNotes = JSON.parse(localStorage.getItem('note'));

    if(arrOldNotes === null){
      //if arrOldNotes returns NULL => make arrNotes; push title in arrNotes; set in localstore
      let arrNotes = [];
      arrNotes.push(`${this.title}`);
      localStorage.setItem('note', JSON.stringify(arrNotes));
    }else{
      //if arrOldNotes doesn't return NULL => get text in arrNotes; push new title; set all in localstore
      let arrNotes = arrOldNotes;
      arrNotes.push(`${this.title}`);
      localStorage.setItem('note', JSON.stringify(arrNotes));
    }

  }

  remove(event){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    
    //get text from p-tag 
    let sibiling = event.target.previousSibling.innerHTML;
    //get parentElement "div" to delete note
    let deleteDiv = event.target.parentElement;
    //give class to parent "Div"
    deleteDiv.setAttribute("class", "card animated bounceOut");
    // make new node element to remove from local storage
    let note = new Note();
    
    
    //make promis to remove from screen once it deleted in localStorage
    let delProm = new Promise( resolve =>{
      setTimeout(() =>{
        //remove from screen
        this.remove();
        resolve("it's working!");
      }, 500);
    });
    delProm.then( result =>{
      console.log(result);
    });

    // refere to removeFromStorage with p-tag text as parameter
    note.removeFromStorage(sibiling);
  } 

  removeFromStorage(sibiling){
    // get array from storage data
    let noteToDelete = JSON.parse(localStorage.getItem('note'));

    for(let i = noteToDelete.length-1; i>=0; i--){
      // if index of array === as text in p-tag
      if(noteToDelete[i] === sibiling){
        //delete found index from array
        noteToDelete.splice(i, 1);
      }
    }
    localStorage.setItem('note', JSON.stringify(noteToDelete));
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
    
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector("#btnAddNote") ;

    let input = document.querySelector("#txtAddNote");

    input.addEventListener("keyup", (e) =>{
      if(e.keyCode == 13){
        document.querySelector("#btnAddNote").click();
        return true;
      }
      e.preventDefault();
    });

    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    let arrLoadNotes = JSON.parse(localStorage.getItem('note'));
    
    //console.log(arrLoadNotes);
    arrLoadNotes.forEach( oldNotes => {
      //console.log(oldNotes);
      let note = new Note(oldNotes);
      note.add();
    });
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let newnote = document.querySelector("#txtAddNote").value;
    let note = new Note(newnote);
    // HINT🤩
    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form 
    document.querySelector('form').reset();
  }
  
}

let app = new App();