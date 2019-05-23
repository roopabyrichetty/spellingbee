

$(document).ready(function () {

  $.ajax("/words", {
    type: "GET"
  }).then(function (data) {
    console.log(data);
    getDefinition(data);
  });



})

function getDefinition(wordList) {

  // for (var i = 960; i <=1000 ; i++) {
  //   //Get all the details from oxford Dictionary API 
  //   var word = wordList[i];
  //   var wordDetails = getWordDetails(word);
  // }
   var words = [ "ascensor",
   "asperities",
   "assurgent",
   "astuciously",
   "asynchrony",
   "atherine",
   "atmogenic",
   "auctioneer",
   "auk",
   "aureate",
   "autistic",
   "avuncular",
   "awry",
   "azalea",
   "Backstein",
   "badinage",
   "badminton",
   "baleen",
   "ballotage",
   
   
   "balustrade"
   
  ]
  words.forEach(element => {
    var wordDetails = getWordDetails(element);

  });
  
}

function getWordDetails(word) {
  var wordDetails = {};
  const url = "/worddefinition/" + word.word;
  $.ajax(url, {
    type: "GET"
  }).then(function (data) {
    console.log(data);
    var audiofile = "";
    var worddefn = "";
    var wordtype = "";
    var wordsentence = "";
    if (data.results.length > 0) {
      if (data.results[0].lexicalEntries.length > 0) {
        if (data.results[0].lexicalEntries[0].hasOwnProperty("pronunciations")) {
          if (data.results[0].lexicalEntries[0].pronunciations[0].hasOwnProperty("audioFile")) {
            audiofile = data.results[0].lexicalEntries[0].pronunciations[0].audioFile;
          }
        }
        worddefn = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        wordtype = data.results[0].lexicalEntries[0].lexicalCategory;
        if (data.results[0].lexicalEntries[0].entries[0].senses[0].hasOwnProperty("examples")) {
          wordsentence = data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
        }
      }
    }
    if (!audiofile) { audiofile = ""; }
    if (!worddefn) { worddefn = "" }
    if (!wordtype) { wordtype = "" }
    if (!wordsentence) { wordsentence = "" }
    wordDetails = {
      id: word.id,
      wordDefinition: worddefn,
      wordAudioLink: audiofile,
      wordType: wordtype,
      wordInSentence: wordsentence
    };
    //Update the database with the word details
    $.ajax({
      method: "PUT",
      url: "/api/wordupdate",
      data: wordDetails
    }).then(
      console.log("success")
    );
  });
  return wordDetails;
}
