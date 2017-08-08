window.onload = function() {
    checkIfLoggedIn()
    drawCard()
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

function addRating(rate, name) {
    var database = firebase.database()
    var user = firebase.auth().currentUser
    if (user) {
        var userId = user.uid
        var displayName = user.displayName
        var ratingsRef = database.ref('/ratings')
            .child(name)
            //  .child('/ratings')
            //  .child(userId)
            //  .child(displayName)
            //  .child(name)
        ratingsRef.set(rate)
            .then(function() {
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

    function Program(name,link, image,info){
        id = id + 1
         this.id = id
        this.name = name,
        this.link = link,
        this.image = image,
        this.info = info
        
        
    }

    var frickForum = new Program('Frick Forum','http://www.frick.org/programs/students/frick_forum ','frick.png',"This free afternoon program for high school students promotes close looking and the exchange of ideas. Forum members study great works of art from the Frick's permanent collection and special exhibitions.")
    var ArtstoGrow = new Program('Arts to Grow','http://www.artstogrow.org/','arts-grow.png',"Arts to Grow was a nonprofit arts education organization that partnered with New York City metro area public schools and community-based organizations to bring performing, visual and literary arts classes to inner-city students. From our inception in 2005 until our closing in 2017, we served over 3,000 students between the ages of 5 and 18. Our programs offered young people an in-depth, hands-on opportunity to work in small groups with a professional teaching artist. Children created original artwork during classes that met 1-2 hours per session for eight weeks to a year, during and after school, on weekends and through the summer. Arts to Grow’s programs were offered free to kids and took place right in their own neighborhoods.")
    var JoanMitchellFoundation = new Program('Joan Mitchell Foundation','http://joanmitchellfoundation.org/education-programs','joan-mitchell-foundation.png',"Each summer from 2007–2017, the Foundation’s Art Education Program provided portfolio development workshops for middle and high school students. Led by the Foundation's Artist-Teachers, participants explored the myriad cultural resources of New York City, developed their skills in drawing from observation, and created works to cultivate their portfolio. Middle school participants developed a portfolio for applying to NYC specialized art high schools. High school participants began to craft a portfolio for art and design college admission.")
    var NYArtsProgram = new Program('NY Arts Program','http://nyartsprogram.org/','ny-arts-program.png','Founded in 1967,  NYAP is the premiere off-campus domestic program specializing in providing students with opportunities in the arts and creative  industries. Deeply connected to its location in a global cultural capital the NYAP semester advances students’ creative and critical skills, and helps them define and launch on a professional path through.')
    var TeenArtsProgram = new Program('Teen Arts Program','http://www.freeartsnyc.org/teen-arts-program','teen-arts-program.png','The Teen Arts Program strives to level the playing field by providing high-quality arts and youth development programs to teens who do not have the economic privilege to access them. Youth are paired 1 on 1 with an experienced mentor to guide them through the complicated process of applying to art schools, visiting artist studios and cultural institutions, and exploring professions in creative fields.')
    
    var arr = [frickForum,ArtstoGrow,JoanMitchellFoundation,NYArtsProgram,TeenArtsProgram]
    
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
                            <form action="">
                                <form method="get" action="yourscript.php">
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
                                </form>
                            </form>
                        </div>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${arr[i].name}<i class="material-icons right">close</i></span>
                        <p>${arr[i].info}</p>
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
