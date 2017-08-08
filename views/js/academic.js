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
            var googleEmail = user.email
            document.getElementById('google-email')
                .innerHTML = 'Email: '+ googleEmail
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
    document.getElementById('google-email')
            .innerHTML = ''
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

function addRating(rate, name) {
    var database = firebase.database()
    var user = firebase.auth().currentUser
    if (user) {
        var userId = user.uid
        var displayName = user.displayName
        var ratingsRef = database.ref('/ratings')
            .child(userId).child(name)
            //  .child('/ratings')
            //  .child(userId)
            //  .child(displayName)
            //  .child(name)
        ratingsRef.set(rate)
            .then(function() {
                Materialize.toast('Rating submitted!', 4000)
                //   window.location.reload()
            })
            .catch(function(err) {
                console.log(err)
            })
    }
    else {
        throw new Error('You need to log in!!!')
    }
}
// var ratingsArray = []

// function averageRatings(programName) {
//     var user = firebase.auth().currentUser
//     var database = firebase.database()
//     var ratingsRef = database.ref('/ratings')
//     ratingsRef.once("value", function(snapshot) {
//             snapshot.forEach(function(childSnapshot) {
//                     var childData = childSnapshot.val();
//                     var programName = childData.programName
//                     ratingsArray.push(childData)
//                     for (var i = 0; i < ratingsArray.length; i++) {
//                         var rating = ratingsArray[i]
//                         var rateCount = snapshot.numChildren();
//                         var total = 0
//                         snapshot.forEach(function(rateSnapshot) {
//                             total += rating
//                         })
//                         console.log("Average=" + total / rateCount)
//                     }
//                 })
//                 //console.log(ratingsArray)
//         })
//         .catch(function(error) {
//             console.log(error)
//         })

// }

// function checkIfLoggedIn() {
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             //logged in code
//             console.log("user signed in")
//             console.log(user)
//             var photoURL = user.photoURL
//             document.getElementById('google-small-pic')
//                 .setAttribute('src', photoURL)
//         }
//         else {
//             //signed out code 
//             console.log("user not signed in")
//             document.getElementById('google-small-pic')
//                 .setAttribute('src', '')
//         }
//     })
// }

window.onload = function() {
    checkIfLoggedIn()
    drawCard()
}

var programs = {
    title: "Prep for Prep",
    link: "https://www.prepforprep.org/page"
}

function favorite(id, name) {
  console.log('checking')
  var user = firebase.auth().currentUser
  var userId = user.uid
  if (document.getElementById(id).checked) {
      firebase.database().ref('/favorites').child(userId).child(name).set(true)
  } else {
      firebase.database().ref('/favorites').child(userId).child(name).set(false)
  }
}

function drawCard() {
    var id = 0

    function Program(name, link, image, info) {
        id = id + 1
        this.id = id
        this.name = name
        this.link = link
        this.image = image
        this.info = info
    }

    var prepForPrep = new Program('Prep for Prep', 'https://www.prepforprep.org/page', 'prep-for-prep.png', 'Prep for Prep identifies New York City’s most promising students of color and prepares them for success at independent schools throughout the Northeast. Once placed, Prep supports the academic and personal growth of our students through college.')
    var abc = new Program('A Better Chance', 'http://abetterchance.org/index.aspx', 'abc.png', 'A Better Chance is the oldest and only national organization of its kind changing the life trajectory for academically talented youth of color via access to rigorous and prestigious educational opportunities for students in grades 6–12. Our mission is to substantially increase the number of well-educated young people of color who are capable of assuming positions of responsibility and leadership in American society. We carry out our mission through our signature College Preparatory Schools Program, which annually recruits, refers, and supports about 500 Scholars at more than 300 Member Schools in 27 states.')
    var teak = new Program('TEAK', 'https://teakfellowship.org/', 'teak.png', 'TEAK is a free program that helps talented students from low-income families achieve their potential. Through intensive after school and summer classes, TEAK prepares middle school students to get into the nation’s most selective high schools and colleges. TEAK’s strong support system ensures that students thrive in their independent (day and boarding) high schools and graduate from college, ready to pursue their professional goals and positively impact the world.')
    var oliverScholars = new Program("Olivers Scholars", 'https://www.oliverscholars.org/', 'oliver.png', 'Oliver Scholars prepares high-achieving Black and Latino students from underserved New York City communities for success at top independent schools and prestigious colleges. We provide crucial support for our scholars so they can realize their full potential and ultimately give back to the city, the nation, and the world.')
    var reachPrep = new Program('Reach Prep', 'http://www.reachprep.org/about/mission.html', 'reach-prep.png', 'REACH Prep helps motivated and talented Black and Latino students from underserved communities in Fairfield and Westchester Counties and the Bronx gain admission to and thrive in rigorous independent schools. Upon placement, students benefit from a twelve-year educational continuum, including comprehensive academic enrichment, leadership training and supplementary individual and family guidance, which prepares them to succeed at competitive colleges.')

    var arr = [prepForPrep, abc, teak, oliverScholars, reachPrep]
    var finalHTML = ''
    for (var i = 0; i < arr.length; i++) {
        finalHTML +=
            `<div style="margin-right: 25px" class="card col l5 s12 m5">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="images/${arr[i].image}">
                    </div>
                    <div class="card-content">
                        <span class=" card-title activator grey-text text-darken-4">${arr[i].name}<i class="material-icons right">more_vert</i></span>
                        <p><a id = "link" href="${arr[i].link}">Link to their website</a></p>
                        <!--<p><a href="/example-page">link to page on program</a></p>-->
                        <td>
                            <input type="checkbox" name="${arr[i].id}-heart" id="${arr[i].id}-heart" onclick="favorite('${arr[i].id}-heart', '${arr[i].name}')" class="css-checkbox" />
                            <label for="${arr[i].id}-heart" class="css-label">Click to save to your favorites page</label>
                        </td>

                        <div class="stars">
                            <input value="5" class="star star-5" id="${arr[i].id}-star-5" type="radio" name="star" /> 
                            <label class="star star-5" for="${arr[i].id}-star-5"></label> 
                            <input value="4"class="star star-4" id="${arr[i].id}-star-4" type="radio" name="star" /> 
                            <label class="star star-4" for="${arr[i].id}-star-4"></label> 
                            <input value="3"class="star star-3" id="${arr[i].id}-star-3" type="radio" name="star" /> 
                            <label class="star star-3" for="${arr[i].id}-star-3"></label> 
                            <input value="2"class="star star-2" id="${arr[i].id}-star-2" type="radio" name="star" /> 
                            <label class="star star-2" for="${arr[i].id}-star-2"></label> 
                            <input value="1"class="star star-1" id="${arr[i].id}-star-1" type="radio" name="star" /> 
                            <label class="star star-1" for="${arr[i].id}-star-1"></label> 
                            <center>
                            <button type="button" id = "${arr[i].id}-submit" onclick={}>Submit</button>
                            </center>
                        </div>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${arr[i].name}<i class="material-icons right">close</i></span>
                        <p>${arr[i].info}</p>
                        <center>
                            <button class = "btn #94C47D" type="button" id = "${arr[i].id}-submit" onclick={}>Submit</button>
                        </center>
                    </div>
            </div>`
            // col s12 m6

    }
    document.getElementById('card').innerHTML = finalHTML
    for (var u = 0; u < arr.length; u++) {
        document.getElementById(`${arr[u].id}-submit`).onclick = function() {
            for (var i = 0; i < arr.length; i++) {
                var id = arr[i].id
                for (var n = 1; n < 6; n++) {
                    var el = document.getElementById(`${id}-star-${n}`)
                        // console.log(el)
                        // console.log(el.checked)
                    if (el.checked) {
                        addRating(document.getElementById(`${id}-star-${n}`).value, arr[i].name)
                        console.log(document.getElementById(`${id}-star-${n}`).value)
                    }
                }
            }
        }
    }
}
