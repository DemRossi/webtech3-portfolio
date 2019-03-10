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
    //console.log(this.element);
    container.appendChild(this.element);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
  }
  
  remove(event){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let deleteDiv = event.target.parentElement;
    deleteDiv.setAttribute("class", "card animated bounceOut");

    let delProm = new Promise( (resolve, reject ) =>{
      setTimeout(() =>{
        this.remove();
        resolve("it's working!");
      }, 500);
    });
    delProm.then( result =>{
      console.log(result);
    });
    

  } 
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
    
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector("#btnAddNote") ;
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    // this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let newnote = document.querySelector("#txtAddNote").value;
    let note = new Note(newnote);
    // HINT🤩
    note.add();
    // note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();