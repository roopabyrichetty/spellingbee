$(document).ready(function () {

  var id = 1;
  //getWordDetails(id);

});

$("#btn-next").on("click", function () {
  var id = $("#word_id").text();
  id = parseInt(id);
  id = id + 1;
  getWordDetails(id);
});

$("#btn-prev").on("click", function () {
  var id = $("#word_id").text();
  id = parseInt(id);
  if (id == 1) {
    id = 1000;
  }
  else {
    id = id - 1;
  }
  getWordDetails(id);
});

$("#btn-savewords").on("click", function() {

  var anyBoxesChecked = false;
  $('#' + "allwords" + ' input[type="checkbox"]').each(function() {
      if ($(this).is(":checked")) {
          console.log($(this).attr("id"));
          var id = $(this).attr("id");
          //Insert a new row for the id 
          var  wordDetails = {
            wordid: id
          };
          $.ajax({
            method: "PUT",
            url: "/api/worddate",
            data: wordDetails
          }).then(function(response){
            console.log(response)
          }
          );
      }
  });
 
 
});

$("#btn-saveforquiz").on("click",function() {
  alert("here");
  var anyBoxesChecked = false;
  $('#' + "allwords" + ' input[type="checkbox"]').each(function() {
    var readytoquiz = false;
      if ($(this).is(":checked")) {
        readytoquiz = true;

       }
          console.log($(this).attr("id"));
          var id = $(this).attr("id");
          //Insert a new row for the id 
          var  wordDetails = {
            wordid: id,
            readytoquiz: readytoquiz
          };
          $.ajax({
            method: "PUT",
            url: "/api/worddateupdate",
            data: wordDetails
          }).then(function(response){
            console.log(response)
          }
          );
     
  });

});



function getWordDetails(id) {
  $.ajax("/words/" + id, {
    type: "GET"
  }).then(function (data) {
    console.log(data);
    $("#actual_word").text(data[0].word);
    $("#word_definition").text(data[0].wordDefinition);
    $("#word_type").text(data[0].wordType);
    $("#word_example").text(data[0].wordInSentence);
    $("#word_audio").attr("src", data[0].wordAudioLink);
    $("#word_id").text(id);
  });

}