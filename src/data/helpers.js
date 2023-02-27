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
    '<h5 class="card-title" id="' + id + '-name"></h5>' + 
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
        cardBody += '<button data-toggle="modal" data-target="#modal" class="btn btn-danger" style="margin-top: 2%; font-size: 20px;" onclick="register('+ id + ');">Register</button>' +
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

export {addUserData, addCardBody, addEventInfo, unRegister, addEvent};

