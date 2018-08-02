
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
  

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#train-first-input").val().trim(), "HH:mm");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      first: trainFirst,
      freq: trainFreq
    };
  
    // Uploads train data to the database
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
  
  // Creates Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
    console.log("----------------------------------");
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;
    
      
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);
    console.log("---------------------------");
  
   

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log(trainFirstConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainPretty = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextTrainPretty);
    
  
     
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });
  
