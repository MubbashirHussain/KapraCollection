import { auth ,signInWithEmailAndPassword , db ,dbRef ,dbset ,sendPasswordResetEmail} from "../js/firebase.js";




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



const Page_container =document.querySelector('.Page_container'),
    loginSignup_page = Page_container.querySelector('.loginSignup_page'),
    Login_page = loginSignup_page.querySelector('.Login_page'),
    Email_input = Login_page.querySelector('#Email'),
    Password_input = Login_page.querySelector('#Password'),
    Error_Box =Login_page.querySelector('.errorBox'),
    forget_password = Login_page.querySelector('.forget_password'),
    admin_id = ["Vh2u9joO3NSleLWKp5qBxSS0fgI2","TqwZpgFIuaZMRPNrMN7XOvEu6o82"]


    
window.Admin_login =()=>{
  if(Email_input.value != "kapracollectionaw@gmail.com" || Email_input.value != "kapracollectionaw@gmail.com") {
    Error_Box.innerHTML = "only verifid admin can login in here"
    return
  }
signInWithEmailAndPassword(auth , Email_input.value , Password_input.value)
.then((userData)=>{
  let data = userData.user 
  for (let i = 0; i < admin_id.length; i++) {
    if(data.uid == admin_id[i]){
      console.log(data)
      Error_Box.style.color = '#0cb164'
      Error_Box.innerHTML = 'Yes You are admin'
  }
  }

  console.log(data.uid)
}).catch((err)=>{
    let errorMessage = err.message;
    console.log(err)
    Error_Box.innerHTML = errorMessage;
})
}

forget_password.onclick=()=>{
  if(Email_input.value != "kapracollectionaw@gmail.com" || Email_input.value != "kapracollectionaw@gmail.com") {
    Error_Box.innerHTML = "only verifid admin can login in here"
    return
  }
  sendPasswordResetEmail(auth, Email_input.value)
  .then(secc=>{
    Error_Box.style.color="green"
    Error_Box.innerHTML = "Reset Email was Sended to your Email"
  })
}










