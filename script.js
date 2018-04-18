var config = {
    apiKey: "AIzaSyAzupqWSkbtADiPUqO97GZxpneA_W4fgUY",
    authDomain: "fir-sdk-47b3e.firebaseapp.com",
    databaseURL: "https://fir-sdk-47b3e.firebaseio.com",
    projectId: "fir-sdk-47b3e",
    storageBucket: "fir-sdk-47b3e.appspot.com",
    messagingSenderId: "655911874389"
};
firebase.initializeApp(config);
firebase.auth().languageCode = 'fr';

let myId;
let db = firebase.database();
let recupPerso = db.ref('personnage');

recupPerso.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        if (myId == childData.uid || childData.uid == null) {
            document.getElementById('persoList').innerHTML += '<li>' + childData.name +
                '</li>';
        }
    });
});

function writePerso(Name) {
    db.ref('personnage/' + name).push({
        name: Name,
        uid: myId,
    });
}

function pushPerso() {
    let name = document.getElementById("Name").value;
    writePerso(name);
    window.location.reload();
}


const uiConfig = {
    signInSuccessUrl: 'liste.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu' // conditions générales d'utilisation
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // All datas
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            myId = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;


            // retour de l'utilisateur après authentification
            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });
        } else {

            // Gestion de la deconnexion
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    });
}
initApp();

function logout() {
    firebase.auth().signePit().then(function () {

    }).catch(function (error) {
    });
}