const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
const randomPromptBtn = document.querySelector(".btn-random-prompt");
const embedFungen = document.querySelector(".embed-fungen");

/*
function toggleEmbedFungen() {
    if (embedFungen.style.display === "none" || embedFungen.style.display === "") {
        embedFungen.style.display = "block";  // Show the embed-fungen section
    } else {
        embedFungen.style.display = "none";  // Hide the embed-fungen section
    }
}

randomPromptBtn.addEventListener("click", toggleEmbedFungen);
*/


function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);

}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "pics/images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);

})

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

/*async function getRandomPrompt() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=3');
        const data = await response.json();
        
        if (data.length === 3) {
            const promptText = `Write a story with these words: ${data.join(', ')}`;
            alert(promptText); // Show the prompt in an alert
        } else {
            alert("Couldn't fetch the words, try again!");
        }
    } catch (error) {
        console.error("Error fetching random words:", error);
        alert("Error fetching random words. Please try again later.");
    }
}*/
const exportPdfBtn = document.querySelector(".btn-export-pdf");


exportPdfBtn.addEventListener("click", function () {
    const { jsPDF } = window.jspdf; 
    const doc = new jsPDF();  

    let notesContent = "";
    const notes = document.querySelectorAll(".input-box");
    
 
    notes.forEach(note => {
        notesContent += note.innerText + "\n\n"; 
    });

    doc.text(notesContent, 10, 10); 
    doc.save("my_notes.pdf"); 
});
//randomPromptBtn.addEventListener("click", getRandomPrompt);