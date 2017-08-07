window.onload = function() {
    checkIfLoggedIn()
    getFavorites()
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
var userFavorites = []
var id = 0


function Program(name, link, image, info) {
    id = id + 1
    this.id = id
    this.name = name
    this.link = link
    this.image = image
    this.info = info
}

function getFavorites() {
    var prepForPrep = new Program('Prep for Prep', 'https://www.prepforprep.org/page', 'prep-for-prep.png', 'Prep for Prep identifies New York City’s most promising students of color and prepares them for success at independent schools throughout the Northeast. Once placed, Prep supports the academic and personal growth of our students through college.')
    var abc = new Program('A Better Chance', 'http://abetterchance.org/index.aspx', 'abc.png', 'A Better Chance is the oldest and only national organization of its kind changing the life trajectory for academically talented youth of color via access to rigorous and prestigious educational opportunities for students in grades 6–12. Our mission is to substantially increase the number of well-educated young people of color who are capable of assuming positions of responsibility and leadership in American society. We carry out our mission through our signature College Preparatory Schools Program, which annually recruits, refers, and supports about 500 Scholars at more than 300 Member Schools in 27 states.')
    var teak = new Program('TEAK', 'https://teakfellowship.org/', 'teak.png', 'TEAK is a free program that helps talented students from low-income families achieve their potential. Through intensive after school and summer classes, TEAK prepares middle school students to get into the nation’s most selective high schools and colleges. TEAK’s strong support system ensures that students thrive in their independent (day and boarding) high schools and graduate from college, ready to pursue their professional goals and positively impact the world.')
    var oliverScholars = new Program("Oliver's Scholars", 'https://www.oliverscholars.org/', 'oliver.png', 'Oliver Scholars prepares high-achieving Black and Latino students from underserved New York City communities for success at top independent schools and prestigious colleges. We provide crucial support for our scholars so they can realize their full potential and ultimately give back to the city, the nation, and the world.')
    var reachPrep = new Program('Reach Prep', 'http://www.reachprep.org/about/mission.html', 'reach-prep.png', 'REACH Prep helps motivated and talented Black and Latino students from underserved communities in Fairfield and Westchester Counties and the Bronx gain admission to and thrive in rigorous independent schools. Upon placement, students benefit from a twelve-year educational continuum, including comprehensive academic enrichment, leadership training and supplementary individual and family guidance, which prepares them to succeed at competitive colleges.')
    var bridgeUp = new Program('Bridge Up Stem', 'http://www.amnh.org/learn-teach/adults/bridgeup-stem/', 'bridge-up.png', 'AMNH’s newest education program, BridgeUp: STEM is focused on the intersection of computer science and science. This portfolio of programs includes:tuition-free intensive 3-year Brown Scholars program for high school girls introductory middle school camps covering a range of computational topics, like climate change (full-tuition scholarships are available; email institutes@amnh.org for more information) the Helen Fellowship, a one-year post-baccalaureate fellowship for women an annual overnight hackathon in November for professional developers addressing computational challenges in a given scientific discipline')
    var blackGirlsCode = new Program('Black Girls Code', 'http://www.blackgirlscode.com/', 'black-girls-code.png', "Black Girls CODE is devoted to showing the world that black girls can code, and do so much more. By reaching out to the community through workshops and after school programs, Black Girls CODE introduces computer coding lessons to young girls from underrepresented communities in programming languages such as Scratch or Ruby on Rails. Black Girls CODE has set out to prove to the world that girls of every color have the skills to become the programmers of tomorrow. By promoting classes and programs we hope to grow the number of women of color working in technology and give underprivileged girls a chance to become the masters of their technological worlds. Black Girls CODE's ultimate goal is to provide African-American youth with the skills to occupy some of the 1.4 million computing job openings expected to be available in the U.S. by 2020, and to train 1 million girls by 2040.")
    var madeWithCode = new Program('Made with Code', 'https://www.madewithcode.com/', 'made-with-code.png', 'Made With Code aims to get young women excited about learning to code and close the gender gap in the tech industry. The idea behind it is to show young girls that the things they love, from apps on their smartphones to their favorite movies are made with code, and they can apply the skills they learn to their own individual passions.')
    var girlsWhoCode = new Program('Girls Who Code', 'https://girlswhocode.com/', 'girls-who-code.png', 'Girls Who Code Clubs are FREE after-school programs for 6-12th grade girls to use computer science to impact their community and join our sisterhood of supportive peers and role models. They can be hosted in schools, universities, libraries, community centers, faith-based organizations, or nonprofits.Clubs are led by Facilitators, who can be teachers, computer scientists, librarians, parents, or volunteers from any background or field. Many Facilitators have NO technical experience and learn to code alongside their Club members.')
    var step = new Program('Step', 'http://www.stepforleaders.org/step/', 'step.png', 'The Science and Technology Entry Program (STEP) increases the number of historically under-represented and economically disadvantaged students pursuing careers leading to professional licensure or professions in mathematics, science, technology, and health-related fields. STEP Programs provide students with academic enrichment and research experience in science, mathematics, and technology content areas. Programs consist of summer and academic year components. There are sixty STEP Programs housed at institutions of higher education and/or professional schools across New York State.')
    var frickForum = new Program('Frick Forum', 'http://www.frick.org/programs/students/frick_forum ', 'frick.png', "This free afternoon program for high school students promotes close looking and the exchange of ideas. Forum members study great works of art from the Frick's permanent collection and special exhibitions.")
    var ArtstoGrow = new Program('Arts to Grow', 'http://www.artstogrow.org/', 'arts-grow.png', "Arts to Grow was a nonprofit arts education organization that partnered with New York City metro area public schools and community-based organizations to bring performing, visual and literary arts classes to inner-city students. From our inception in 2005 until our closing in 2017, we served over 3,000 students between the ages of 5 and 18. Our programs offered young people an in-depth, hands-on opportunity to work in small groups with a professional teaching artist. Children created original artwork during classes that met 1-2 hours per session for eight weeks to a year, during and after school, on weekends and through the summer. Arts to Grow’s programs were offered free to kids and took place right in their own neighborhoods.")
    var JoanMitchellFoundation = new Program('Joan Mitchell Foundation', 'http://joanmitchellfoundation.org/education-programs', 'joan-mitchell-foundation.png', "Each summer from 2007–2017, the Foundation’s Art Education Program provided portfolio development workshops for middle and high school students. Led by the Foundation's Artist-Teachers, participants explored the myriad cultural resources of New York City, developed their skills in drawing from observation, and created works to cultivate their portfolio. Middle school participants developed a portfolio for applying to NYC specialized art high schools. High school participants began to craft a portfolio for art and design college admission.")
    var NYArtsProgram = new Program('NY Arts Program', 'http://nyartsprogram.org/', 'ny-arts-program.png', 'Founded in 1967,  NYAP is the premiere off-campus domestic program specializing in providing students with opportunities in the arts and creative  industries. Deeply connected to its location in a global cultural capital the NYAP semester advances students’ creative and critical skills, and helps them define and launch on a professional path through.')
    var TeenArtsProgram = new Program('Teen Arts Program', 'http://www.freeartsnyc.org/teen-arts-program', 'teen-arts-program.png', 'The Teen Arts Program strives to level the playing field by providing high-quality arts and youth development programs to teens who do not have the economic privilege to access them. Youth are paired 1 on 1 with an experienced mentor to guide them through the complicated process of applying to art schools, visiting artist studios and cultural institutions, and exploring professions in creative fields.')

    var arr = [prepForPrep, abc, teak, oliverScholars, reachPrep, bridgeUp, blackGirlsCode, madeWithCode, girlsWhoCode, step, frickForum, ArtstoGrow, JoanMitchellFoundation, NYArtsProgram, TeenArtsProgram]

    var user = firebase.auth().currentUser

    if (user) {
        var database = firebase.database()
        var userId = user.uid
        var favoritesRef = database.ref('/favorites').child(userId)
        var finalHTML = ''
        favoritesRef.once("value", function(snapshot) {
                var favorites = snapshot.val()
                var favoritesKeys = Object.keys(favorites)
                favoritesKeys.forEach(function(key) {
                        if (favorites[key]) {
                            var program = arr.find(function(program) {
                                    return program.name === key
                                })
                                finalHTML+=
                                `<div style="margin-right: 25px" class="card col l5 s12 m5">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="images/${program.image}">
                    </div>
                    <div class="card-content">
                        <span class=" card-title activator grey-text text-darken-4">${program.name}<i class="material-icons right">more_vert</i></span>
                        <p><a id = "link" href="${program.link}">link to their website</a></p>
                        <p><a style = "color: grey" href="/example-page">This is one of your favorites</a></p>
                         

                        <div class="stars">
                            <input value="5" class="star star-5" id="${program.id}-star-5" type="radio" name="star" /> 
                            <label class="star star-5" for="${program.id}-star-5"></label> 
                            <input value="4"class="star star-4" id="${program.id}-star-4" type="radio" name="star" /> 
                            <label class="star star-4" for="${program.id}-star-4"></label> 
                            <input value="3"class="star star-3" id="${program.id}-star-3" type="radio" name="star" /> 
                            <label class="star star-3" for="${program.id}-star-3"></label> 
                            <input value="2"class="star star-2" id="${program.id}-star-2" type="radio" name="star" /> 
                            <label class="star star-2" for="${program.id}-star-2"></label> 
                            <input value="1"class="star star-1" id="${program.id}-star-1" type="radio" name="star" /> 
                            <label class="star star-1" for="${program.id}-star-1"></label> 
                            <button type="button" id = "${program.id}-submit" onclick={}>Submit</button>
                        </div>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${program.name}<i class="material-icons right">close</i></span>
                        <p>${program.info}</p>
                    </div>
            </div>`
                                console.log(finalHTML)
                             document.getElementById('favorited-programs').innerHTML = finalHTML
                            }
                        })
                })
        }
        
    }
