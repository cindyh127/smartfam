function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            //logged in code
            console.log("user signed in")
            console.log(user)
            document.getElementById('text').innerHTML = 'You are signed in click Next to continue'
            document.getElementById('google-signin')
                .setAttribute('style', 'display: none; visibility: hidden')
            document.getElementById('next')
                .setAttribute('style', 'display: inline-block; visibility: visible')

        }
        else {
            //signed out code 
            //console.log("user not signed in")
            document.getElementById('google-signin')
                .setAttribute('style', 'display: inline-block; visibility: visible')
             document.getElementById('next')
                .setAttribute('style', 'display: none; visibility: hidden')

        }
    })

}
window.onload = function() {
    checkIfLoggedIn()
}



// function signOut() {
//     firebase.auth().signOut()
//     checkIfLoggedIn()
// }

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider

    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function(data) {
            console.log(data)
            var idToken = data.credential.idToken
            checkIfLoggedIn()
        })
        .catch(function(error) {
            console.log(error)
        })
}
