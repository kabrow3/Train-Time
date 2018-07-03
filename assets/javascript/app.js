/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyD_EtU03eKL832L0_T3VGNQD8jUOxq-ApM",
    authDomain: "train-time-94d97.firebaseapp.com",
    databaseURL: "https://train-time-94d97.firebaseio.com",
    projectId: "train-time-94d97",
    storageBucket: "train-time-94d97.appspot.com",
    messagingSenderId: "397347851101"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#train-first-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      first: trainFirst,
      freq: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);
    console.log("------------------------------");
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-first-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
    console.log("----------------------------------");
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;
    
    var now = moment().format("X");
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);
    console.log("---------------------------");
  
   

    var trainFreqMath = moment(trainFreq, "mm").format("X");

    var timeSince = moment().diff(moment(trainFirst, "X"));
    console.log(timeSince);

    var tempAway = timeSince % trainFreqMath;
    console.log(tempAway);

    var trainAway = trainFreqMath - tempAway;
    console.log(trainAway);

    var trainAwayPretty = moment.unix(trainAway).format("mm");
    console.log(trainAwayPretty);

    var nextTrain = now + trainAway;
    console.log(nextTrain);
    
    var nextTrainPretty = moment.unix(nextTrain).format("hh:mm A");
    console.log(nextTrainPretty);
  
     
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextTrainPretty + "</td><td>" + trainAwayPretty + "</td></tr>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  