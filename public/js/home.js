const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

if (data && data.user) {
    checkUserOnDatabase(data.user);
} else {
    document.getElementById("profile_nav").style.display = 'none'
}

async function checkUserOnDatabase(user) {
    console.log('here')
    

    await firebase.database().ref(`users/tutors/${user.uid}`).once("value").then(snapshot => {
        if (data && !snapshot.exists()) {
            logOut();
        }
        if (data && snapshot.exists()) {
            const json = JSON.parse(data)
        
            const displayName = json['displayName']
            const photoURL = json['photoURL']
        
            console.log(displayName)
            console.log(photoURL)
        
            document.getElementById("student_login").style.display = 'none'
            document.getElementById("tutor_login").style.display = 'none'
            document.getElementById("profile_pic").src = photoURL
            document.getElementById("display_name").innerText = displayName
        
        } else {
            document.getElementById("profile_nav").style.display = 'none'
        }
    });

    await firebase.database().ref(`users/students/${user.uid}`).once("value").then(snapshot => {
        if (data && !snapshot.exists()) {
            logOut();
        }
        if (data && snapshot.exists()) {
            const json = JSON.parse(data)
        
            const displayName = json['displayName']
            const photoURL = json['photoURL']
        
            console.log(displayName)
            console.log(photoURL)
        
            document.getElementById("student_login").style.display = 'none'
            document.getElementById("tutor_login").style.display = 'none'
            document.getElementById("profile_pic").src = photoURL
            document.getElementById("display_name").innerText = displayName
        
        } else {
            document.getElementById("profile_nav").style.display = 'none'
        }
    });
}

function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
}