//Get elements from HTML
const groupDiv = document.getElementById('groupDiv');
const clearUsers01 = document.getElementById('clearUsers');
const clearRoles01 = document.getElementById('clearRoles');
const personDiv = document.getElementById('personDiv');
const deleteRoles = document.getElementById('deleteRoles');
const roleDiv = document.getElementById('roleDiv');
const editRoleDiv = document.getElementById('editRoleDiv');

//let dataFields = document.querySelectorAll(".two");

const auth = firebase.auth();
const db = firebase.firestore();
let groupNum01;
let elementsToDel = [];
let elementsToDelUnique;



document.addEventListener('DOMContentLoaded', function () {
    showGroupsOfUser();
}, false);


function group() {

    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            renderDoc(doc, "list-group-item .disabled", doc.id, "groupList")
        });
    });
    var div = document.getElementById("GroupDiv");

}


function person() {
    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            renderDoc(doc, "list-group-item person .disabled", doc.data().userEmail, 'personList') //Display email

        });
    });

}



clearUsers01.addEventListener('click', e => {
    clearUsers();

})

clearRoles01.addEventListener('click', e => {
    console.log('t111est')
    clearRoles();
})

deleteRoles.addEventListener('click', e => {
    clearSelectedRoles();
    deleteFromDb()

})




function deleteFromDb() {
    let ourGroup = localStorage.getItem("userGroup001");
    //elementsToDel
    elementsToDelUnique = [new Set(elementsToDel)];
    console.log(elementsToDelUnique);


}

//When user click on a group let us say, then we need to highlight what they clicked on, keep the highlight, and display revleent users
let personClicked;

let gropuDiv = document.querySelector('#groupDiv');
groupDiv.addEventListener('click', e => {
    //  let exactGroup = e.target.innerText //This will get us the group name that user clicked on
    //  //This will act as a toggle
    //  if((!(e.target.class == "list-group-item list-group-item-warning"))){
    //      e.target.class = "list-group-item list-group-item-warning"
    //      console.log( e.target.class)
    //  }
    //  else{
    //     e.target.class = "list-group-item list-group-item"
    //     console.log( e.target.class)
    //  }
    //  //e.target.style.backgroundColor = "pink";

    e.target.classList.toggle("colorred");
    localStorage.setItem("userGroup001", e.target.innerText); //Will set local storage item needed later for currently selected group
    if (e.target.classList.contains("colorred")) {
        clearUsers();
    }

    //Add call to function to get group number 
    // let groupNuum01 = getGroupNumber(e);
    //    console.log(localStorage.getItem('groupNum') + "hey hey")
    //&& e.target.classList.contains('colorred')
    if (e.target.classList.contains('colorred')) { //This if will prevent user list from showing up twice
        showUsers(e.target.id) //Only show people of specfied group selected by user

    }


})



let removeFromGroup = document.querySelector('#editProjecdtDiv');
removeFromGroup.addEventListener('click', e => {
    e.target.classList.toggle("colorred"); //change color
})


//When user wants to submit all decsions
let submitBtnAll = document.querySelector('#submitBtn');
submitBtnAll.addEventListener('click', e => {
    submitAll();
})

function submitAll(){
console.log('test')
}


//Elements needed to delete in firebase!
//This will clear selected roles on screen from user
function clearSelectedRoles() {
    var elements = document.getElementById("roleShowList").querySelectorAll(".colorred")
    // let copyLength = elements.length;
    // var elementsToDel = [];
    // let i =0
    // while(copyLength.length > 0){

    //     copyLength--;
    //     elementsToDel[i] = elements[copyLength];
    //     i++
    // }

    // console.log(elementsToDel.id)

    while (elements.length > 0) {
        elementsToDel.push(elements[0].id);
        //console.log(elements[0].id)
        elements[0].parentNode.removeChild(elements[0]);
    }
}

let markFordelation = [];
roleDiv.addEventListener('click', e => {
    //markFordelation.push(e.target.id);

    e.target.classList.toggle("colorred");
    // if(e.target.classList.contains("colorred")){
    //     markFordelation.push(e.target.id);
    // }
    // else{
    //     var item = e.target.id;
    //     var index = markFordelation.indexOf(item);
    //     markFordelation.splice(index, 1);
    // }
});


personDiv.addEventListener('click', e => {
  //  let roleRight = getElementsByClassName(".two");

    e.target.classList.toggle("colorred");
    console.log("u clicked on " + e.target.innerText)
    personClicked = e.target.innerText;

    //If we didn't add this, the roles would just keep displaying into a stack
    if (e.target.classList.contains("colorred")) {
        clearRoles();
    }


    console.log("I want to show role")
    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            if (doc.data().userEmail == personClicked && e.target.classList.contains('colorred')) { //The second half of this statment prevents showing the role twice
                //Display Roles      
                // renderDoc2(doc, "list-group-item role .disabled", 
                // doc.data().role1, doc.data().role2, doc.data().role3, doc.data().role4, doc.data().role5,
                // "roleShowList") 

                //This will display proper roles to screen for given user
                dataFields[0].textContent = doc.data().role1;
                dataFields[1].textContent = doc.data().role2;
                dataFields[2].textContent = doc.data().role3;
                dataFields[3].textContent = doc.data().role4;
                dataFields[4].textContent = doc.data().role5;

                

            }
        });
    });


    //Add call to show roles
    //showRoles();
});

//Will show all roles of selected user
// function showRoles(){
//     //roleDiv

//     db.collection('users').get().then(function (querySnapshot) {
//         //console.log('hey99')
//         querySnapshot.docs.forEach(function (doc) {
//              if(doc.data().email == personClicked)
//             renderDoc(doc, "list-group-item person .disabled", doc.data().Role, 'roleShowList')
//         });
//     });
// }

function changeRoles() {
    //editRoleDiv

}



//Not in use, but might need to implement later
function getGroupNumber(e) {
    let groupName = e.target.innerText;

    //  let fetchedGroupId = document.querySelectorAll(`#${groupName}`);


}


//Only shows users within group
function showUsers(groupNum) {
    db.collection('groups').get().then(function (querySnapshot) {
        console.log('hey99')
        querySnapshot.docs.forEach(function (doc) {
            if (doc.data().group == groupNum)
                renderDoc(doc, "list-group-item person .disabled", doc.data().userEmail, 'personList')
        });
    });
}

function clearUsers() {
    console.log('test')
    var elements = document.getElementsByClassName("person");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }


}





function clearRoles() {
    console.log('test roles')
    var elements = document.getElementsByClassName("role");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }


}

function Role() {

}

function something() {

}



//Section to get all projects user is currently invovled in (has contributed or been asked to )
function showGroupsOfUser() {





    db.collection('projects').get().then(function (querySnapshot) {
        console.log('99999999999999')
        querySnapshot.docs.forEach(function (doc) {
            //If Submitter UID == selected user UID
            // if(doc.data().SubmitterUID == "5R0JHvLyLgTgKmIJSbMpiMiXWrf1"){ //give test value
            //    // renderDoc(doc, "userGroup", "project name", "projectsList"); //value needs to be project name
            // }            
            console.log('ayoooo2')
           let  selectedUser = "5R0JHvLyLgTgKmIJSbMpiMiXWrf1"
            db.collectionGroup("projects").where("asigneeUID", "==", selectedUser)
            .get()
            .then(function(querySnapshot) {
               
                querySnapshot.forEach(function(doc) {
                    console.log('ayoooo')
                    renderDoc(doc, "userGroup", "project name", "projectsList");
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        

            //if Assigner UID == selected user UID


        });
    })
}



//end section





function renderDoc(doc, className, value, list) { //Value is user email
    var ul = document.getElementById(list); //Give unorderd list (container)
    console.log(doc.data().userEmail) //Make sure able to retreive email




    let liElement = document.createElement('li'); //Create new li to tack on
    liElement.setAttribute('class', className); //Attach class to it (bootstrap id prob)
    liElement.setAttribute('id', doc.data().group);
    liElement.appendChild(document.createTextNode(value)); //Value of child element
    //let liElementText = document.createElement(doc.data().userEmail)
    let className01 = document.querySelector(className)
    ul.appendChild(liElement) //Append new child element
}

// function to display all roles of user
function renderDoc2(doc, className, value, value2, value3, value4, valu5, list) { //Value is user email
    var ul = document.getElementById(list); //Give unorderd list (container)
    console.log(doc.data().userEmail) //Make sure able to retreive email

    //Push given roles into one array
    var a = [];
    a.push(value, value2, value3, value4, valu5);

    for (let z = 0; z < 5; z++) {
        let liElement = document.createElement('li'); //Create new li to tack on
        liElement.setAttribute('class', className); //Attach class to it (bootstrap id prob)
        liElement.setAttribute('id', z);
        liElement.appendChild(document.createTextNode(a[z])); //Value of child element
        //let liElementText = document.createElement(doc.data().userEmail)
        let className01 = document.querySelector(className)
        ul.appendChild(liElement) //Append new child element
    }
}


//For user editing of roles:
let dataFields = document.querySelectorAll(".two");
let editBtn = document.getElementById("editBtn");
let saveBtn = document.getElementById("saveBtn");
let submitBtn = document.getElementById("submitBtn");

editBtn.addEventListener('click', function () {
    let copyDataFields = dataFields;

    let textBoxArr = document.getElementById("card1").querySelectorAll(".form-control");
    console.log(textBoxArr)
    for (var i = 0; i < textBoxArr.length; i++) {
        textBoxArr[i].style.visibility = 'visible'
    }


});

//We make this global because to submit to db we need to acess data from another function later on
let textBoxArr;
saveBtn.addEventListener('click', function () {
    textBoxArr = document.getElementById("card1").querySelectorAll(".form-control");
    let newValArr;
    //console.log(textBoxArr)
    for (var i = 0; i < textBoxArr.length; i++) {
        console.log(textBoxArr[i].value);
        textBoxArr[i].style.visibility = 'hidden'

        //Update UI
        if (textBoxArr[i].value) {
            dataFields[i].textContent = textBoxArr[i].value;
        }

    }
    //  console.log(newValArr)

});

submitBtn.addEventListener('click', function () {
    let projectName = localStorage.getItem('projectName');
    let loadTicket = localStorage.getItem('loadTicket');
    console.log(projectName);
    snackbar.innerText = 'Ticket Updated!';
    showAlert();
    // updateTicketDoc();

    //Show snackbar for user


});





//End of user editing role section







function showAlert() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


group()
//showGroupsOfUser()
//person()



