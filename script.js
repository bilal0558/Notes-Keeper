//Creating references to all the controls.
let noteTextField = document.getElementById("note-text");
let fontColorPicker = document.getElementById("font-color-picker");
let fontSizeInput = document.getElementById("font-size-input");
let fontFamilyInput = document.getElementById("font-family-input");
let allNotesDiv = document.getElementById("all-notes");

//Initializing Note ID.
//Used for assigning a unique ID to each note.
let noteId = 0;

//Checking if the web app is opened for the first time, if it is so, then initializing the localStorage.
if(localStorage.getItem("noteID")==null){
    localStorage.setItem("noteID",noteId);
}
else{
   noteId = parseInt(localStorage.getItem("noteID"));
}

//allNotes array used for storing all the notes in the local storage. 
let allNotes = [];

//Checking if the web app is opened for the first time, if it is so, then initializing the localStorage.
if(JSON.parse(localStorage.getItem("allNotes")==null)){
     localStorage.setItem("allNotes",JSON.stringify(allNotes));
}
else{
    allNotes = JSON.parse(localStorage.getItem("allNotes"));
    allNotes.forEach(function(note){
        initialNotesPaint(note.id, note.text, note.color, note.size, note.family);
    })
}

//Adding event listener to the form, using .onsubmit because .addEventListener was attaching 2 handlers (Issue)
document.getElementById("new-note-form").onsubmit = addNewNote;


function addNewNote(){
    let noteText = noteTextField.value;
    let fontColor = fontColorPicker.value;
    let fontSize = fontSizeInput.value;
    let fontFamily = fontFamilyInput.value;
    
    createNewNote(noteText, fontColor, fontSize, fontFamily);
    return false;
}

//function used for initial painting to the notes from the local storage when the app is loaded.
function initialNotesPaint(id, text, color, size, family){
    let note = document.createElement("div");
    note.className = "note";
    note.id = id;
    note.style.color = color;
    note.style.fontSize = `${size}px`;
    note.style.fontFamily = family;
    note.innerHTML = `
        ${text}
        <button class="delete-button" style="font-size : 10px;">X</button>
    `;
    paintNote(note);
}

function createNewNote(text, color, size, family){
    noteId++;
    let note = document.createElement("div");
    note.className = "note";
    note.id = noteId;
    note.style.color = color;
    note.style.fontSize = `${size}px`;
    note.style.fontFamily = family;
    note.innerHTML = `
        ${text}
        <button class="delete-button" style="font-size : 10px;">X</button>
    `;

    //Note object created to be pushed into the local storage.
    let noteData = {
        id : noteId,
        text : text,
        color : color,
        size : size,
        family : family
    }

    allNotes.push(noteData);

    //Updating the content of local storage, both allNotes as well as noteID.
    localStorage.setItem("allNotes",JSON.stringify(allNotes));
    localStorage.setItem("noteID",noteId);
    paintNote(note);
}

function paintNote(note){
    allNotesDiv.append(note);
    addHandlerToDelete();
}

function deleteNode(){
    this.parentNode.remove();
    let toRemoveID = this.parentNode.id;

    //Removing the required notes from the allNotes array.
    for (let i = 0; i < allNotes.length; i++) {      
        if(allNotes[i].id == toRemoveID){
            allNotes.splice(i,1);
        }
        
    }

    //Updating the content of local storage.
    localStorage.setItem("allNotes",JSON.stringify(allNotes));

}

//Adding handler to all the delete buttons created.
function addHandlerToDelete(){
    let buttons = document.querySelectorAll(".delete-button");
    buttons.forEach((button)=>{
        button.addEventListener("click", deleteNode);
    });
}
