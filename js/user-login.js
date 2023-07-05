import { auth ,signInWithEmailAndPassword ,onAuthStateChanged,createUserWithEmailAndPassword } from "../js/firebase.js";

let AuthState = onAuthStateChanged(auth ,(user)=>{
    if(user){
      window.location.pathname = "index.html"
    }
})

document.querySelectorAll('.writing :is(input , textarea)').forEach(writinginput => {
    writinginput.addEventListener('input', () => {
      if (writinginput.value.trim() !== '') {
        writinginput.classList.add('has-text');
      } else {
        writinginput.classList.remove('has-text');
      }
    });
  });
  
  
  /* Alto de textarea */
  document.querySelectorAll('.textarea textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
      textarea.style.height = '1em';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    });
  });



const Page_container =document.querySelector('.Page_container'),
    loginSignup_page = Page_container.querySelector('.loginSignup_page'),
    page_change_btn = loginSignup_page.querySelector('.page_change'),
    Login_page = loginSignup_page.querySelector('.Login_page'),
    Signup_page = loginSignup_page.querySelector('.Signup_page'),
    login_name_input = Login_page.querySelector('#Email'),
    login_password_input =Login_page.querySelector('#Passowrd'),
    Signup_Email_input = Signup_page.querySelector('#SEmail'),
    Signup_pasword_input = Signup_page.querySelector('#SPassword'),
    login_errorBox = Login_page.querySelector('.errorBox'),
    Signup_errorBox = Signup_page.querySelector('.errorBox')


page_change_btn.onclick = ()=>{
  Login_page.classList.toggle("hide")
  Signup_page.classList.toggle("hide")
  setTimeout(() => {
        Login_page.classList.toggle("active")
        Signup_page.classList.toggle("active")
      }, 0);
      page_change_btn.querySelector('i').classList.toggle("left")
}

window.User_signup =()=>{
  createUserWithEmailAndPassword(auth , Signup_Email_input.value , Signup_pasword_input.value)
  .then(userData=>{
    // console.log(userData.user.uid)
  }).catch(error=>{
    Signup_errorBox.innerHTML = error.message
  })
}

window.User_login=()=>{
  signInWithEmailAndPassword(auth , login_name_input.value , login_password_input.value)
  .then(userData =>{
    // console.log(userData.user)
  })
  .catch(error=>{
    login_errorBox.innerHTML = error.message
  })
}
