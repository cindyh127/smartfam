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
 

var programs = 
    {
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

    var bridgeUp = new Program('Bridge Up Stem','http://www.amnh.org/learn-teach/adults/bridgeup-stem/','bridge-up.png','AMNH’s newest education program, BridgeUp: STEM is focused on the intersection of computer science and science. This portfolio of programs includes:tuition-free intensive 3-year Brown Scholars program for high school girls introductory middle school camps covering a range of computational topics, like climate change (full-tuition scholarships are available; email institutes@amnh.org for more information) the Helen Fellowship, a one-year post-baccalaureate fellowship for women an annual overnight hackathon in November for professional developers addressing computational challenges in a given scientific discipline')
    var blackGirlsCode = new Program('Black Girls Code','http://www.blackgirlscode.com/','black-girls-code.png',"Black Girls CODE is devoted to showing the world that black girls can code, and do so much more. By reaching out to the community through workshops and after school programs, Black Girls CODE introduces computer coding lessons to young girls from underrepresented communities in programming languages such as Scratch or Ruby on Rails. Black Girls CODE has set out to prove to the world that girls of every color have the skills to become the programmers of tomorrow. By promoting classes and programs we hope to grow the number of women of color working in technology and give underprivileged girls a chance to become the masters of their technological worlds. Black Girls CODE's ultimate goal is to provide African-American youth with the skills to occupy some of the 1.4 million computing job openings expected to be available in the U.S. by 2020, and to train 1 million girls by 2040.")
    var madeWithCode = new Program('Made with Code','https://www.madewithcode.com/','made-with-code.png','Made With Code aims to get young women excited about learning to code and close the gender gap in the tech industry. The idea behind it is to show young girls that the things they love, from apps on their smartphones to their favorite movies are made with code, and they can apply the skills they learn to their own individual passions.')
    var girlsWhoCode = new Program('Girls Who Code','https://girlswhocode.com/','girls-who-code.png','Girls Who Code Clubs are FREE after-school programs for 6-12th grade girls to use computer science to impact their community and join our sisterhood of supportive peers and role models. They can be hosted in schools, universities, libraries, community centers, faith-based organizations, or nonprofits.Clubs are led by Facilitators, who can be teachers, computer scientists, librarians, parents, or volunteers from any background or field. Many Facilitators have NO technical experience and learn to code alongside their Club members.')
    var step = new Program('Step','http://www.stepforleaders.org/step/','step.png','The Science and Technology Entry Program (STEP) increases the number of historically under-represented and economically disadvantaged students pursuing careers leading to professional licensure or professions in mathematics, science, technology, and health-related fields. STEP Programs provide students with academic enrichment and research experience in science, mathematics, and technology content areas. Programs consist of summer and academic year components. There are sixty STEP Programs housed at institutions of higher education and/or professional schools across New York State.')
    
    var arr = [bridgeUp,blackGirlsCode,madeWithCode,girlsWhoCode,step]
    
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