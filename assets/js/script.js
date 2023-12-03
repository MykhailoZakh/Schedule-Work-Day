// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });

// function for today's time listenner and printing it at main screen
function time(){
  let today = dayjs();
  // console.log('second');
  
  $('#today-time').text(today.format('[Time now: ] MMMM DD, YYYY HH:mm:ss'));  
}
time();

// interval for repeating time function every second
setInterval(function(){
  time();
  
  
  // return hourNow;
}, 1000);

let hourIDArrayEL = [$('#hour-9'), $('#hour-10'), $('#hour-11'), $('#hour-12'), $('#hour-13'), $('#hour-14'), $('#hour-15'), $('#hour-16'), $('#hour-17'), $('#hour-18')];
let hourIDArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// console.log(hourIDArrayEL);
// for (let i = 0; i < hourIDArray.length; i++){
//   if(hourIDArray[i] == hourNow){
//     hourIDArrayEL[i].removeClass("present");
//   }
// }

// function to check time and change color of section depending of current time
function checkBoxColor() {
  let today = dayjs();
  let hourNow = today.format("H");
  console.log(hourNow);
  // console.log(hourIDArrayEL);
for (let i = 0; i < hourIDArray.length; i++){
  if(hourIDArray[i] == hourNow){
    hourIDArrayEL[i].addClass("present")
  } 
  if (hourIDArray[i] < hourNow){
    hourIDArrayEL[i].addClass("past");
  } 
  if (hourIDArray[i] > hourNow) {
    hourIDArrayEL[i].addClass("future");
  }
}
}

checkBoxColor();

// event listener for buttons to store input and button ID to local storage
let buttonIDArray = [];
let inputValueArray = [];
let sectionBoxEL = $('.time-block');
console.log(sectionBoxEL);

sectionBoxEL.on("click", ".btn", function(){

  let buttonId = $(this).attr('id');
  console.log(buttonId);
  let input = $(this).siblings('.description').val().trim();
  if(input === "") {
    return;
  }
  buttonIDArray.push(buttonId);
  inputValueArray.push(input);
  localStorage.setItem("buttonID", JSON.stringify(buttonIDArray));
  localStorage.setItem("input", JSON.stringify(inputValueArray));

})

// function to print text from local storage
function printText(){
let buttonArray = ["btn-9", "btn-10", "btn-11", "btn-12", "btn-13", "btn-14", "btn-15", "btn-16", "btn-17", "btn-18",]
let storedButtonID = JSON.parse(localStorage.getItem("buttonID"));
let storedInput = JSON.parse(localStorage.getItem("input"));

if((storedButtonID !== null) && (storedInput !== null)) {
  buttonIDArray = storedButtonID;
  inputValueArray = storedInput;
  for(let i = 0; i < storedInput.length; i++){
    let buttonIDStorred = buttonIDArray[i];
    let textValue = inputValueArray[i];
    for(let i = 0; i < buttonArray.length; i++){
      if(buttonIDStorred === buttonArray[i]) {
        $(`#${buttonArray[i]}`).siblings('.description').text(textValue);
      }
    }
    
  }
}
}
printText();