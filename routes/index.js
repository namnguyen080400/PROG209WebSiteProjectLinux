var express = require('express');
var router = express.Router();
var fs = require("fs");

let contactArray = [];

let fileManager  = {
  read: function() {
    if (fileManager.validData()) {
      var rawdata = fs.readFileSync('objectdata.json');
      let goodData = JSON.parse(rawdata);
      contactArray = goodData;
    }
  },

  write: function() {
    let data = JSON.stringify(contactArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};

let ContactObject = function (pName, pEmail, pPhoneNumber, pPhoto_URL, pType) {
    this.name = pName;
    this.email = pEmail;
    this.phoneNumber = pPhoneNumber;
    this.photoURL = pPhoto_URL;
    this.type = pType;
    this.ID = Math.random().toString(16).slice(5);
};

if (!fileManager.validData()) {
  contactArray.push(new ContactObject("Indiana Jones", "indianaJones@gmail.com", 
                                      "453234343", 
                                      "https://pbs.twimg.com/media/FxZCpf2aYAAEBrH?format=jpg&name=large",
                                      "Family"))
  fileManager.write();
} else {
  fileManager.read(); 
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/getContact', function(req, res) {
  fileManager.read();
  res.status(200).json(contactArray);
});

router.post('/AddContact', function(req, res) {
  const newContact = req.body;
  contactArray.push(newContact);
  fileManager.write();
  res.status(200).json(newContact);
});

module.exports = router;
