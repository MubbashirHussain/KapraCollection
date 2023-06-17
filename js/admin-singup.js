import { auth, createUserWithEmailAndPassword, dbpush, db, dbRef, dbset,onValue,onAuthStateChanged } from "../js/firebase.js";

let Dref = dbRef(db, 'Admin/')

onValue(Dref, (snap) => {
  let data = Object.values(snap.val())
  checkforAdminpage(data, undefined)

})


window.checkforAdminpage = (data, Logger) => {
  if (Logger != undefined) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].Admin_uid == Logger.uid) {

      }
    }
  }else{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkforAdminpage(data, user)
      }else{
        // window.location.pathname = "pages/admin-login.html"
      }
    })

  }

}


document.querySelectorAll('.writing :is(input , textarea)').forEach(writinginput => {
    writinginput.addEventListener('input', () => {
        if (writinginput.value.trim() !== '') {
            writinginput.classList.add('has-text');
        } else {
            writinginput.classList.remove('has-text');
        }
    });
});


document.querySelectorAll('.textarea textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
        textarea.style.height = '1em';
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${scrollHeight}px`;
    });
});



const Page_container = document.querySelector('.Page_container'),
    loginSignup_page = Page_container.querySelector('.loginSignup_page'),
    Signup_page = loginSignup_page.querySelector('.Signup_page'),
    Email_input = Signup_page.querySelector('#Email'),
    Password_input = Signup_page.querySelector('#Password'),
    Error_Box = Signup_page.querySelector('.errorBox')

window.Admin_signup = () => {

    // console.log(Email_input.value, Password_input.value)

    createUserWithEmailAndPassword(auth, Email_input.value, Password_input.value)
        .then((userData) => {
            let data = userData.user
            let Dbpush = dbpush(dbRef(db, "Admin/"))
            dbset(Dbpush, {
                Admin_uid: data.uid,
                Admin_email: data.email,
            })
            alert("New Admin was Created")
        }).catch((err) => {
            let errorMessage = err.message.message;
            Error_Box.innerHTML = errorMessage;
        })
}











