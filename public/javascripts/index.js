let contactArray = [];

let  ContactObject = function (pName, pEmail, pPhoneNumber, pPhoto_URL) {
    this.name = pName;
    this.email = pEmail;
    this.phoneNumber = pPhoneNumber;
    this.Photo_URL = pPhoto_URL;
    this.ID = Math.random().toString(16).slice(5);
}

// code runs immediately
//================================================================

// runs when DOM is loaded
document.addEventListener("DOMContentLoaded", function (event) {

    createList();

    document.getElementById("submitContact").addEventListener("click", function () {
        var contact = new ContactObject(
            document.getElementById("name").value,
            document.getElementById("email").value,
            document.getElementById("phone").value,
            document.getElementById("Photo_URL").value
        );
        contactArray.push(contact);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("Photo_URL").value = "";

        createList();
        document.location.href = "index.html#display";
    });

    $(document).on("pagebeforeshow", "#display", function (event) {
        createList();
    });

    document.getElementById("showByNameButton").addEventListener("click", function() {
      displayContactsByName();
    });

});

//======================================
// function definitions
function createList() {
    // clear prior data
    var myul = document.getElementById("myul");
    myul.innerHTML = "";
      count = 1;   
    contactArray.forEach(function (element) {   // use handy array forEach method
        var li = document.createElement('li');
        // added data-role="listview" to the ul in the html
        li.innerHTML = "ID: " + element.ID + "<b> Name: </b>" + element.name + " <b> Email: </b>" + element.email + "<b> Phone Number: </b>" + element.phoneNumber;
      count++;
        myul.appendChild(li);
    });
};

function displayContactInfo(contact) {
  var INFOR = document.getElementById("contactInfo");
  INFOR.innerHTML = "";

  var NAME1 = document.createElement('h3');
  NAME1.innerText = "Name: " + contact.name;

  var EMAILL1 = document.createElement('p');
  EMAILL1.innerText = "Email: " + contact.email;

  var PHONE1 = document.createElement('p');
  PHONE1.innerText = "Phone Number: " + contact.phoneNumber;

  var PHOTOIMG = document.createElement("button");
  PHOTOIMG.appendChild(document.createTextNode(contact.name + "'s Avatar"));
  PHOTOIMG.addEventListener("click", function() {
    window.open(contact.Photo_URL);
  });
  INFOR.appendChild(NAME1);
  INFOR.appendChild(EMAILL1);
  INFOR.appendChild(PHONE1);
  INFOR.appendChild(PHOTOIMG);


}
function displayContactsByName() {
  var content1 = document.getElementById("content1");
  content1.innerHTML = "";
  let sortedByNameArray = contactArray.sort(
    (p1, p2) => (p1.name.localeCompare(p2.name))
  );
  sortedByNameArray.forEach(function(element) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.innerText = element.name;
      link.href = "javascript:void(0)";
      link.addEventListener("click", function() {
          displayContactInfo(element);
      });
      li.appendChild(link);
      content1.appendChild(li);
  });
}