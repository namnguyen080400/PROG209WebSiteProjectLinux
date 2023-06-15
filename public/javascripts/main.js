let contactArray = [];

let ContactObject = function (pName, pEmail, pPhoneNumber, pPhoto_URL, pType) {
    this.name = pName;
    this.email = pEmail;
    this.phoneNumber = pPhoneNumber;
    this.photoURL = pPhoto_URL;
    this.type = pType;
    this.ID = Math.random().toString(16).slice(5);
};


// if (localStorage.getItem("contacts")) {
//     contactArray = JSON.parse(localStorage.getItem("contacts"));
// }

// Runs when DOM is loaded
document.addEventListener("DOMContentLoaded", function (event) {
    createList();

    document.getElementById("submitContact").addEventListener("click", function () {
        var contact = new ContactObject(
            document.getElementById("name").value,
            document.getElementById("email").value,
            document.getElementById("phone").value,
            document.getElementById("Photo_URL").value,
            document.getElementById("select_type").value
        );
        // contactArray.push(contact);
        
        $.ajax({
            url : "/AddContact",
            type: "POST",
            data: JSON.stringify(contact),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                document.location.href = "index.html#display";
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("Photo_URL").value = "";
        
                //createList();
                document.location.href = "index.html#display";
            }
        });

    });

    document.getElementById("deleteContact").addEventListener("click", function () {
        var contactId = localStorage.getItem('parm');
        console.log("Delete contact button click " + contactId);
        
        $.ajax({
            url : "/deleteContact",
            type: "POST",
            data: JSON.stringify({contactId}),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log("abcd");
                document.location.href = "index.html#display";
                // document.getElementById("name").value = "";
                // document.getElementById("email").value = "";
                // document.getElementById("phone").value = "";
                // document.getElementById("Photo_URL").value = "";
        
                //createList();
                document.location.href = "index.html#display";
            }
        });

    });

    $(document).on("pagebeforeshow", "#display", function (event) {
        createList();
    });
//     $(document).on("click", "#saveUL a", function () {
//     var contactId = $(this).data("contactId");
//     var contact = contactArray.find(function (contact) {
//       return contact.ID === contactId;
//     });
//     displayContactInfo(contact);
//   });




    document.getElementById("friend").addEventListener("click", function () {
        displayContactsByType("Friend");
    });

    document.getElementById("family").addEventListener("click", function () {
        displayContactsByType("Family");
    });

    $(document).on("pagebeforeshow", "#contact", function (event) {
        let contactId = localStorage.getItem('parm');
        console.log("display save " + contactId);
        displaySavedContacts(contactId);
    });

    $(document).on("click", ".delete-button", function () {
        var contactId = $(this).data("contactId");
        deleteContact(contactId);
    });
});

function createList() {
    var myul = document.getElementById("myul");
    myul.innerHTML = "";

    $.get("/getContact", function(data, status) {
        contactArray = data;

        contactArray.forEach(function (element) {
            var li = document.createElement("li");
            var link = document.createElement("a");
            link.innerText = element.name;
            link.href = "#contact";
            link.dataset.contactId = element.ID;
            link.addEventListener("click", function () {
                //displayContactInfo(element);
                console.log("I am here " + element.ID + " " + element.name);
                localStorage.setItem("parm", element.ID);
                document.location.href = "index.html#contact";
            });
    
            li.appendChild(link);
            myul.appendChild(li);
        });
    });


 
}





function displayContactInfo(contact) {
    var contactInfo = document.getElementById("contactInfo");
    contactInfo.innerHTML = "";

    var nameHeading = document.createElement("h3");
    nameHeading.innerText = contact.name;
    contactInfo.appendChild(nameHeading);

    var emailPara = document.createElement("p");
    emailPara.innerText = "Email: " + contact.email;
    contactInfo.appendChild(emailPara);

    var phonePara = document.createElement("p");
    phonePara.innerText = "Phone: " + contact.phoneNumber;
    contactInfo.appendChild(phonePara);

    var photoImg = document.createElement("img");
    photoImg.src = contact.photoURL;
    photoImg.alt = contact.name + "'s photo";
    contactInfo.appendChild(photoImg);

    var typePara = document.createElement("p");
    typePara.innerText = "Type: " + contact.type;
    contactInfo.appendChild(typePara);
}

function displayContactsByType(type) {
    var filteredContacts = contactArray.filter(function (contact) {
        return contact.type === type;
    });

    var myul = document.getElementById("myul");
    myul.innerHTML = "";

    filteredContacts.forEach(function (element) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.innerText = element.name;
        link.href = "#contact";
        link.dataset.contactId = element.ID;
        link.addEventListener("click", function () {
            displayContactInfo(element);
        });

        li.appendChild(link);
        myul.appendChild(li);
    });
}

// function displaySavedContacts() {
//     var saveUL = document.getElementById("saveUL");
//     saveUL.innerHTML = "";
  
//     contactArray.forEach(function (contact) {
//       var li = document.createElement("li");
//       var link = document.createElement("a");
//       link.innerText = contact.name;
//       link.href = "#contact";
//       link.dataset.contactId = contact.ID;
//       link.addEventListener("click", function () {
//         displayContactInfo(contact);
//       });
  
//       li.appendChild(link);
//       saveUL.appendChild(li);
//     });
//   }

// ul link can jump to page4 
function displaySavedContacts(ID) {

    var friendSavedInfo = document.getElementById("friendSavedInfo");
    friendSavedInfo.innerHTML = "";

    var familySavedInfo = document.getElementById("familySavedInfo");
    familySavedInfo.innerHTML = "";
  

    contactArray.forEach(function (contact) {
        if (contact.ID ===ID) {
            var contactInfo = document.createElement("div");
            contactInfo.classList.add("saved-contact-info");

            var nameHeading = document.createElement("h3");
            nameHeading.innerText = contact.name;
            contactInfo.appendChild(nameHeading);

            var emailPara = document.createElement("p");
            emailPara.innerText = "Email: " + contact.email;
            contactInfo.appendChild(emailPara);

            var phonePara = document.createElement("p");
            phonePara.innerText = "Phone: " + contact.phoneNumber;
            contactInfo.appendChild(phonePara);

            var photoImg = document.createElement("img");
            photoImg.src = contact.photoURL;
            photoImg.alt = contact.name + "'s photo";
            contactInfo.appendChild(photoImg);

            var typePara = document.createElement("p");
            typePara.innerText = "Type: " + contact.type;
            contactInfo.appendChild(typePara);

            // var deleteButton = document.createElement("button");
            // deleteButton.innerText = "Delete";
            // deleteButton.classList.add("delete-button");
            // deleteButton.dataset.contactId = contact.ID;
            // contactInfo.appendChild(deleteButton);

            if (contact.type === "Friend") {
                friendSavedInfo.appendChild(contactInfo);
            } else if (contact.type === "Family") {
                familySavedInfo.appendChild(contactInfo);
            }
        }
        
    });
}
// page4 able to delete the infor after refreshing or closing 
function deleteContact(contactId) {
    contactArray = contactArray.filter(function (contact) {
        return contact.ID !== contactId;
    });

    createList();
    displaySavedContacts();

  
    //localStorage.setItem("contacts", JSON.stringify(contactArray));
}