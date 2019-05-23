var db = require("../models");
const Op = require('sequelize').Op;
var Dictionary = require("oxford-dictionary-api");
var ud = require('urban-dictionary');
//These are ids from roopab77@yahoo.com
var app_id = "57b5b6d6";
var app_key = "5b951074772124cf421dbfae350ff379";
//These are app ids from aarushi 
//  var app_id = "f861bb24"; 
//  var app_key = "6e85422081c2a5e1abc58f3f5d13d699";

var dict = new Dictionary(app_id, app_key);
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

module.exports = function (app, passport) {
  // Create all our routes and set up logic within those routes where required.


  //This route would get all the words from the database 
  app.get("/words", function (req, res) {
    db.Words.findAll({}).then(function (dbWords) {
      //console.log(dbWords);
      res.json(dbWords);
    });
  });

  app.get("/all", function (req, res) {
    var render_obj = { pageTitle: "Spelling Wizard" };
    db.WordDates.findAll().then(function (dbWordswithDates) {
      var wordids = [];
      dbWordswithDates.forEach(element => {
        wordids.push(element.wordid);
      });
      db.Words.findAll({ where: { id: { [Op.notIn]: wordids } } }).then(function (dbWords) {
        render_obj.words = dbWords;

        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        render_obj.today = month + "/" + day + "/" + year;
        //res.json(dbWords);
        res.render("allwords", render_obj);
      })
        .catch(error => { console.log(error); });

    }).catch(error => { console.log(error); });

  });

  app.get("/allchosen", function (req, res) {
    db.WordDates.findAll().then(function (dbWords) {
      //console.log(dbWords);
      res.json(dbWords);
    });

  });

  //This route finds the word by id
  app.get("/words/:id", function (req, res) {
    db.Words.findAll({ where: { id: req.params.id } }).then(function (dbWords) {
      //console.log(dbWords);
      res.json(dbWords);
    });
  });

  //This is the root route 
  app.get("/", ensureLoggedIn('/signin'), function (req, res) {
    var render_obj = { pageTitle: "Spelling Wizard" };
    db.Words.findAll({ where: { id: { [Op.between]: [1, 10] } } }).then(function (dbWords) {
      render_obj.words = dbWords;
      //res.json(dbWords);
      res.render("dashboard", render_obj);
    });
    // res.render("words", render_obj);  
  });

  //This route finds the words for today 
  app.get("/today", function (req, res) {
    var render_obj = { pageTitle: "Spelling Wizard" };
    var today = new Date();
    var date = today.toDateString();
    var wordDetails = [];
    console.log("TODAY IS   " + date);
    db.WordDates.findAll({
      // where: {
      //   createdAt: {
      //     [Op.lt]: new Date(),
      //     [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      //   }
      // }
    }).
      then(function (dbWords) {
        var words = [];
        dbWords.forEach(element => {
          words.push(element.wordid);
        });
        db.Words.findAll({ where: { id: { [Op.in]: words } } }).then(function (dbWordDetails) {
          // res.json(dbWordDetails); 
          render_obj.words = dbWordDetails;
          res.render("index", render_obj);

        });

      });
  });


  //This route finds the words for today 
  app.get("/practice", function (req, res) {
    var render_obj = { pageTitle: "Spelling Wizard" };

    res.render("quiz", render_obj);


  });


  //This route is to get the word details from the oxford dictionary API 
  app.get("/worddefinition/:word", function (req, res) {
    var word = req.params.word;
    console.log("word is " + word);
    dict.find(word, function (error, data) {
      if (error) return console.log(error);
      //console.log(data);
      res.json(data);
    });
  });
  //This route gets the word details from the dictionary API 


  //This route will update the spellingDB words table with all the other fields 
  app.put("/api/wordupdate", function (req, res) {
    db.Words.update({
      wordDefinition: req.body.wordDefinition,
      wordAudioLink: req.body.wordAudioLink,
      wordType: req.body.wordType,
      wordInSentence: req.body.wordInSentence
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbword) {
        console.log(dbword.word + "updated");
        res.json(dbword);
      });
  });

  //This route inserts words into the worddates table 
  app.put("/api/worddate", function (req, res) {
    var createdAt = new Date(Date.now());

    db.WordDates.create({
      wordid: req.body.wordid,
      createdAt: createdAt
    }).then(function (response) {
      console.log(response);
      res.json(response);
    });
  });

  //This route will update the spellingDB wordsDates table with ready to quiz field  
  app.put("/api/worddateupdate", function (req, res) {
    db.WordDates.update({
      readytoquiz: req.body.readytoquiz
    }, {
        where: {
          wordid: req.body.id
        }
      }).then(function (dbword) {
        console.log(dbword.word + "updated");
        res.json(dbword);
      });
  });
}

