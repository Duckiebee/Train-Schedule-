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

//Creating new train info object
var newTrainInput = {
  name: trainName,
  destination: trainDestination,
  time: trainTime,
  frequency: trainFrequency
}

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
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

//Data from firebase
var newTrainInfo = childSnapshot.val();
console.log(newTrainInfo);

//create firebase variables for data 
var firebaseName = newTrainInfo.name;
var firebaseDestination = newTrainInfo.destination;
var firebaseTime = newTrainInfo.time;
var firebaseFrequency = newTrainInfo.frequency;

//Time calculations
var diffBetweenCurrentAndTrainTime = moment().diff(moment(firebaseTime, "hh:mm A"), "minutes");
var remainder = diffBetweenCurrentAndTrainTime % firebaseFrequency;
var timeAway = firebaseFrequency - remainder;
var nextTrainArrival = moment().add(timeAway, "minutes");
var formattedNextTrainArrival = moment(nextTrainArrival).format("hh:mm A");

//Log times for debugging
    console.log(timeAway);
    console.log(nextTrainArrival);

//Appends the new train info to the train schedule
    $("#trainScheduleTable").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + "</td><td>" + formattedNextTrainArrival + "</td><td>" + timeAway + "</td></tr>");
});
