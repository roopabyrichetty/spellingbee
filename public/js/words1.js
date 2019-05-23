

   var words = [ "acceded",
   "acescent",
   "acetone",
   "aeronautic",
   "aeroplankton",
   "agrarianism",
   "aleatoric",
   "alepidote",
   "alfresco",
   "allopelagic",
   "aoristic",
   "apothecary",
   "aquarellist",
   "aqueduct",
   "arability",
   "arbacia",
   "arboriculture",
   "archizoic",
   "arcing",
   "aretalogy",
   "ascensor",
   "asperities",
   "assurgent",
   "astuciously",
   "asynchrony",
   "atherine",
   "atmogenic",
   "auctioneer",
   "auk"
     
  ]
  words.forEach(element => {
    var wordDetails = getWordDetails(element);

  });
  


function getWordDetails(word) {
  var wordDetails = {};
  // const url = "https://www.dictionaryapi.com/api/v3/references/learners/json/" + word + "?key=b367400e-d843-4079-9dd0-36124d099740";
  const url = "https://wordsapiv1.p.mashape.com/words/" + word;
  $.get(url,function(result){
   console.log(result);
  });
}
