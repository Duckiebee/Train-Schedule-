 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtfVckuQm57NaV13v28bTc-XH6r3I9Img",
    authDomain: "train-schedule-869a4.firebaseapp.com",
    databaseURL: "https://train-schedule-869a4.firebaseio.com",
    projectId: "train-schedule-869a4",
    storageBucket: "",
    messagingSenderId: "164001768365"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// button to add train inputs 
$("#addTrain-btn").on("click", function(event) {
    event.preventDefault();


//grabs the users input 
var trainName = $("#trainName").val().trim();
var trainDestination = $("#destination").val().trim();
var trainTime = $("#trainTime").val().trim();
var trainFrequency = $("#frequency").val().trim();


var newTrainInput = {
  name: trainName,
  destination: trainDestination,
  time: trainTime,
  frequency: trainFrequency
};

//uploads the data to the database 
database.ref().push(newTrainInput);

//logs data to the console 
console.log(newTrainInput.name);
console.log(newTrainInput.destination);
console.log(newTrainInput.time);
console.log(newTrainInput.frequency);


//clears all of the text-boxes after submitting data
$("#trainName").val("");
$("#destination").val("");
$("#trainTime").val("");
$("#frequency").val("");

  });

//creates a Firebase event to add a new train schedule to the database and a new row to the html
database.ref().on("child_added", function(data, prevChildKey) {
  console.log(data.val());

//stores data into a variable
var newTrainName = data.val().name;
var newTrainDestination = data.val().destination;
var newTrainTime = data.val().time;
var newTrainFrequency = data.val().frequency;

console.log(newTrainName);
console.log(newTrainDestination);
console.log(newTrainTime);
console.log(newTrainFrequency);



})