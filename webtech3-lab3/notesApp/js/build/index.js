"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
  function Note(title) {
    _classCallCheck(this, Note);

    this.title = title;
    // HINT🤩 
    this.element = this.createElement(title);
  }

  _createClass(Note, [{
    key: "createElement",
    value: function createElement(title) {
      var newNote = document.createElement('div');
      // give div a class
      newNote.setAttribute("class", "card");
      // make p element
      var newTitle = document.createElement('p');
      // put text in p
      newTitle.innerHTML = "" + title;
      // make link 
      var removeLink = document.createElement('a');
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
  }, {
    key: "add",
    value: function add() {
      // HINT🤩
      // this function should append the note to the screen somehow
      var container = document.querySelector(".notes");
      container.appendChild(this.element);
    }
  }, {
    key: "saveToStorage",
    value: function saveToStorage() {
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
      var arrOldNotes = JSON.parse(localStorage.getItem('note'));

      if (arrOldNotes === null) {
        //if arrOldNotes returns NULL => make arrNotes; push title in arrNotes; set in localstore
        var arrNotes = [];
        arrNotes.push("" + this.title);
        localStorage.setItem('note', JSON.stringify(arrNotes));
      } else {
        //if arrOldNotes doesn't return NULL => get text in arrNotes; push new title; set all in localstore
        var _arrNotes = arrOldNotes;
        _arrNotes.push("" + this.title);
        localStorage.setItem('note', JSON.stringify(_arrNotes));
      }
    }
  }, {
    key: "remove",
    value: function remove(event) {
      var _this = this;

      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element

      //get text from p-tag 
      var sibiling = event.target.previousSibling.innerHTML;
      //get parentElement "div" to delete note
      var deleteDiv = event.target.parentElement;
      //give class to parent "Div"
      deleteDiv.setAttribute("class", "card animated bounceOut");
      // make new node element to remove from local storage
      var note = new Note();

      //make promis to remove from screen once it deleted in localStorage
      var delProm = new Promise(function (resolve) {
        setTimeout(function () {
          //remove from screen
          _this.remove();
          resolve("it's working!");
        }, 500);
      });
      delProm.then(function (result) {
        console.log(result);
      });

      // refere to removeFromStorage with p-tag text as parameter
      note.removeFromStorage(sibiling);
    }
  }, {
    key: "removeFromStorage",
    value: function removeFromStorage(sibiling) {
      // get array from storage data
      var noteToDelete = JSON.parse(localStorage.getItem('note'));

      for (var i = noteToDelete.length - 1; i >= 0; i--) {
        // if index of array === as text in p-tag
        if (noteToDelete[i] === sibiling) {
          //delete found index from array
          noteToDelete.splice(i, 1);
        }
      }
      localStorage.setItem('note', JSON.stringify(noteToDelete));
    }
  }]);

  return Note;
}();

var App = function () {
  function App() {
    _classCallCheck(this, App);

    console.log("👊🏼 The Constructor!");

    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector("#btnAddNote");

    var input = document.querySelector("#txtAddNote");

    input.addEventListener("keyup", function (e) {
      if (e.keyCode == 13) {
        document.querySelector("#btnAddNote").click();
        return true;
      }
      e.preventDefault();
    });

    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }

  _createClass(App, [{
    key: "loadNotesFromStorage",
    value: function loadNotesFromStorage() {
      // HINT🤩
      // load all notes from storage here and add them to the screen
      // something like note.add() in a loop would be nice
      var arrLoadNotes = JSON.parse(localStorage.getItem('note'));

      arrLoadNotes.forEach(function (oldNotes) {
        var note = new Note(oldNotes);
        note.add();
      });
    }
  }, {
    key: "createNote",
    value: function createNote(e) {
      // this function should create a new note by using the Note() class
      var newnote = document.querySelector("#txtAddNote").value;
      var note = new Note(newnote);
      // HINT🤩
      note.add();
      note.saveToStorage();
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      // this function should reset the form 
      document.querySelector('form').reset();
    }
  }]);

  return App;
}();

var app = new App();

//# sourceMappingURL=index.js.map