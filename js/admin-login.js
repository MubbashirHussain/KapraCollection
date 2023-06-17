import { auth, signInWithEmailAndPassword, onAuthStateChanged, db, dbRef, dbset, sendPasswordResetEmail, onValue } from "../js/firebase.js";
let flag = false;

let Dref = dbRef(db, 'Admin/')
onValue(Dref, (snap) => {
  let data = Object.values(snap.val())
  checkingAdmin(data)
  checkforAdminpage(data, undefined)

})


window.checkforAdminpage = (data, Logger) => {
  if (Logger != undefined) {

    for (let i = 0; i < data.length; i++) {
      if (data[i].Admin_uid == Logger.uid) {
        window.location.pathname = "pages/admin-page.html"

      }
    }
  }else{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkforAdminpage(data, user)
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
  Login_page = loginSignup_page.querySelector('.Login_page'),
  Email_input = Login_page.querySelector('#Email'),
  Password_input = Login_page.querySelector('#Password'),
  Error_Box = Login_page.querySelector('.errorBox'),
  forget_password = Login_page.querySelector('.forget_password')
// admin_id = ["Vh2u9joO3NSleLWKp5qBxSS0fgI2","TqwZpgFIuaZMRPNrMN7XOvEu6o82"]




window.checkingAdmin = (data) => {
  window.Admin_login = () => {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (data[i].Admin_email == Email_input.value) {
        flag = true;
      }
    }
    console.log(flag)
    if(flag){
      signInWithEmailAndPassword(auth, Email_input.value, Password_input.value)
      .then((AdimData) => {
        let data = AdimData.user
        Error_Box.style.color = '#0cb164'
        Error_Box.innerHTML = 'Yes You are admin'

      }).catch((err) => {
        let errorMessage = err.message;
        // console.log(err)
        Error_Box.innerHTML = errorMessage;
      })}else{
        Error_Box.innerHTML = "Only admins can Login From here"
      }
  }
}
forget_password.onclick = () => {
  if (Email_input.value != "kapracollectionaw@gmail.com" || Email_input.value != "kapracollectionaw@gmail.com") {
    Error_Box.innerHTML = "only verifid admin can login in here"
    return
  }
  sendPasswordResetEmail(auth, Email_input.value)
    .then(secc => {
      Error_Box.style.color = "green"
      Error_Box.innerHTML = "Reset Email was Sended to your Email"
    })
}










