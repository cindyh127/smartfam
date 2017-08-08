window.onload = function() {
    checkIfLoggedIn()
    getDataFromApi()
}
function googleTranslateElementInit() {
                new google.translate.TranslateElement({pageLanguage: 'en',layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false}, 'google_translate_element');
            }
function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            //logged in code
            console.log("user signed in")
            console.log(user)
            var photoURL = user.photoURL
            document.getElementById('side-logo-image')
                .setAttribute('src', photoURL)
            // document.getElementById('google-signin')
            //     .setAttribute('style', 'display: none; visibility: hidden')
            // document.getElementById('signout')
            //     .setAttribute('style', 'display: inline-block; visibility: visible')
            var googleDisplayName = user.displayName
            document.getElementById('google-displayName')
                .innerHTML = 'Name: '+googleDisplayName
            //  document.getElementById('text').innerHTML = 'You are signed in click Next to continue'

        }
        else {
            //signed out code 
            //console.log("user not signed in")
            // document.getElementById('google-signin')
            //     .setAttribute('style', 'display: inline-block; visibility: visible')
            // document.getElementById('signout')
            //     .setAttribute('style', 'display: none; visibility: hidden')

        }
    })

}



function signOut() {
    firebase.auth().signOut()
    document.getElementById('google-displayName')
            .innerHTML = ''
    document.getElementById('side-logo-image')
        .setAttribute('src', 'images/blank-profile-picture.jpg')

    checkIfLoggedIn()
}

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
function getDataFromApi(){
    var borough = document.getElementById('borough').innerHTML
    var url =  `https://data.cityofnewyork.us/resource/fu5n-kurd.json?borough_community=${borough}`
    fetch(url)
    .then(function(data){
        return data.json()
    })
    .then(function(json){
        console.log(json)
        
    var finalHTML = ''
    for (var i = 0; i < json.length; i++) {
        var name = json[i].agency
        //  document.getElementById('name')
        //         .innerHTML = name
        var borough1 = json[i].borough_community
        // document.getElementById('borough')
        //         .innerHTML = 'Borough: '+borough
        var contactNumber = json[i].contact_number
        // document.getElementById('contact-number')
        //         .innerHTML = 'Contact Number: '+contactNumber
        var gradeLevelAgeGroup = json[i].grade_level_age_group
        // document.getElementById('grade-level-age-group')
        //         .innerHTML = 'Grade Level/Age Group: '+ gradeLevelAgeGroup 
        var siteName = json[i].site_name
        // document.getElementById('site-name')
        //         .innerHTML = 'Site Name: '+ siteName
        finalHTML +=
            `    <div class="row">
                    <div class="col s12 m11">
                      <div class="card white">
                        <div class="card-content black-text">
                          <span class="card-title">${name}</span>
                          <p id ="borough" >Borough: ${borough1}</p>
                          <p id ="contact-number" >Contact Number: ${contactNumber}</p>
                          <p id ="grade-level-age-group" >Grade Level/Age Group: ${gradeLevelAgeGroup}</p>
                          <p id ="site-name" >Site Name: ${siteName}</p>
                        </div>
                        <div class="card-action">
                        </div>
                      </div>
                    </div>
                  </div>
                
            `
    }
    document.getElementById('programs').innerHTML = `<h1 id = "borough">${borough}</h1>`+ finalHTML
    })
}

function fixSizing(){
                var w = window.innerWidth;
                var h = window.innerHeight;  
                
                if (w < 800) {
                    document.body.setAttribute('style', "background-color: #8ec5ed;padding-left: 0px")
                    document.getElementById('mySidebar').setAttribute('style', 'z-index:3; width: 250px; margin-left:0px; padding-top:90px')
                   
                   
                } else if (w > 800) {
                    document.body.setAttribute('style', "background-color: #8ec5ed; padding-left: 250px")
                    document.getElementById('mySidebar').setAttribute('style', 'z-index:3; width: 250px; margin-left: -250px')
                }
            }