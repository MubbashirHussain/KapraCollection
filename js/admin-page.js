



const Admin_sidebar_ul = document.querySelector('.Admin_sidebar_ul'),
    Admin_pages_view = document.querySelector('.Admin_pages_view'),
    admin_ul_li = Admin_sidebar_ul.querySelectorAll('li a'),
    admin_dashborad = Admin_pages_view.querySelector('.admin_dashborad'),
    admin_Home = Admin_pages_view.querySelector('.admin_Home'),
    admin_Shop = Admin_pages_view.querySelector('.admin_Shop'),
    admin_Signup = Admin_pages_view.querySelector('.admin_Signup'),
    admin_preview = Admin_pages_view.querySelector('.admin_preview'),
    admin_logout = Admin_pages_view.querySelector('.admin_logout'),
    li_admin_dashborad = Admin_sidebar_ul.querySelector('.li_admin_dashborad'),
    li_admin_Home = Admin_sidebar_ul.querySelector('.li_admin_Home'),
    li_admin_Shop = Admin_sidebar_ul.querySelector('.li_admin_Shop'),
    li_admin_Signup = Admin_sidebar_ul.querySelector('.li_admin_Signup'),
    li_admin_preview = Admin_sidebar_ul.querySelector('.li_admin_preview'),
    li_admin_logout = Admin_sidebar_ul.querySelector('.li_admin_logout')

admin_ul_li.forEach((li) => {
    // console.log(li)
    // li.classList.remove("active");
    li.addEventListener('click', e => {
        admin_ul_li.forEach((li2) => { li2.classList.remove("active") })
        // li.classList.remove("active");
        e.target.classList.add("active")
    })
})

li_admin_dashborad.addEventListener("click", () => {

    admin_dashborad.classList.remove("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.add("hide")
    admin_logout.classList.add("hide")

})
li_admin_Home.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.remove("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.add("hide")
    admin_logout.classList.add("hide")

})
li_admin_Shop.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.remove("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.add("hide")
    admin_logout.classList.add("hide")

})
li_admin_Signup.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.remove("hide")
    admin_preview.classList.add("hide")
    admin_logout.classList.add("hide")

})
li_admin_preview.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.remove("hide")
    admin_logout.classList.add("hide")

})
li_admin_logout.addEventListener("click", () => {



})

