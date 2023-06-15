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
    Signup_page = loginSignup_page.querySelector('.Signup_page')

    page_change_btn.onclick = ()=>{
        Login_page.classList.toggle("active")
        Signup_page.classList.toggle("active")
        // if(Login_page.className == "active"){
            page_change_btn.querySelector('i').classList.toggle("left")
        // }
            // e.target.children[0].style.transform = "rotate(-180deg)"

    }