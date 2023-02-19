import {set, ref, get, child, onValue, app, auth, database, userId} from './firebase.js';

function addUserData(path, id, msgStart, msgEnd) {
    const v = ref(database, path);
        onValue(v, (snapshot) => {
        const data = snapshot.val();
        document.getElementById(id).innerHTML =  msgStart + data + msgEnd;
    });
}

export {addUserData};