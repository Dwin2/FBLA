import {set, ref, get, child, onValue, app, auth, database, userId, remove} from './firebase.js';

function addUserData(path, id, msgStart, msgEnd) {
    const v = ref(database, path);
    onValue(v, (snapshot) => {
        const data = snapshot.val();
        document.getElementById(id).innerHTML =  msgStart + data + msgEnd;
    });
}
function addCardBody(id, flag) {
    var cardBody = '<div class="card" style="margin-left: 6%;">' +
    '<div class="card-body bg-white">' + 
    '<h5 class="card-title" id="' + id + '-name"></span></h5>' + 
    '<h5 class="card-tag"><span class="badge" id="' + id + '-tags"></span></h5>' +
    '<hr class="my-4">' + 
    '<p class="txt" id="' + id + '-description"></p>' + 
    '<p class="txt" id="' + id + '-location"><strong>Location: </strong></p>' + 
    '<p class="txt" id="' + id + '-date"><strong>Date: </strong></p>' + 
    '<p class="txt" id="' + id + '-time"><strong>Time: </strong></p>' + 
    '<a href="./login.html" class="btn btn-primary" style="margin-top: 2%; font-size: 20px; margin-right: 6%;">More Info</a>';
    if (!flag) {
        cardBody += '<button data-toggle="modal" data-target="#modal" class="btn btn-danger" style="margin-top: 2%; font-size: 20px;" onclick="unRegister(' + "'" + id +"'" + ');">Unregister</button>' +
        '</div>' + 
        '</div>';
    } else {
        cardBody += '<button data-toggle="modal" data-target="#modal" class="btn btn-success" style="margin-top: 2%; font-size: 20px;" onclick="register('+ id + ');">Register</button>' +
        '</div>' + 
        '</div>';
    }
    
    document.getElementById("cards").innerHTML += cardBody;
}
function addEventInfo(childData, idx) {
    const eventRef = ref(database, 'events/' + childData);
    onValue(eventRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const field = childSnapshot.key;
            const data = childSnapshot.val();
            var id = idx + "-" + field;
            if (field == "at" || field == "bt") id = idx + "-time";
            if (field == "bt") document.getElementById(id).innerHTML += " to "
            document.getElementById(id).innerHTML += data;
            if (field == "tags") {
                if (data == "sports") document.getElementById(id).classList.add("badge-danger");
                else document.getElementById(id).classList.add("badge-primary");
            }
        });
    });
}
function unRegister(id, uid) {
    const v = ref(database, 'users/' + uid + '/events/' + id);
    remove(v).then(() => {
        console.log("Unregistered.");
        location.reload();
    });
    //     onValue(v, (snapshot) => {
    //     const data = snapshot.val();
    //     document.getElementById(id).innerHTML =  msgStart + data + msgEnd;
    // });
}
function addEvent(uid, id) {
    console.log(id);
    //check already registed
    const v = ref(database, 'users/' + uid + '/events/' + id);
    set(v, {
        id : parseInt(id)
    });
}
//var extern = document.getElementsByTagName("link")[0].import;
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };

export {addUserData, addCardBody, addEventInfo, unRegister, addEvent, includeHTML};

