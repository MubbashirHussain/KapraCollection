import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, db, dbRef, dbset, onValue } from "../js/firebase.js";

let Dref = dbRef(db, 'Admin/')

onValue(Dref, (snap) => {
    let data = Object.values(snap.val())
    if (checkforAdminpage == undefined) return
    checkforAdminpage(data)
})



onAuthStateChanged(auth, (user) => {
    if (user) {
        window.checkforAdminpage = (data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].Admin_uid == user.uid) {
                    //   window.location.pathname = "pages/admin-page.html"

                } else {
                    window.location.pathname = "pages/admin-login.html"
                }
            }
        }
    } else {
        window.location.pathname = "pages/admin-login.html"
    }
})




const Admin_sidebar_ul = document.querySelector('.Admin_sidebar_ul'),
    Admin_pages_view = document.querySelector('.Admin_pages_view'),
    admin_ul_li = Admin_sidebar_ul.querySelectorAll('li a'),
    admin_dashborad = Admin_pages_view.querySelector('.admin_dashborad'),
    admin_Home = Admin_pages_view.querySelector('.admin_Home'),
    admin_Shop = Admin_pages_view.querySelector('.admin_Shop'),
    admin_Signup = Admin_pages_view.querySelector('.admin_Signup'),
    admin_preview = Admin_pages_view.querySelector('.admin_preview'),
    li_admin_dashborad = Admin_sidebar_ul.querySelector('.li_admin_dashborad'),
    li_admin_Home = Admin_sidebar_ul.querySelector('.li_admin_Home'),
    li_admin_Shop = Admin_sidebar_ul.querySelector('.li_admin_Shop'),
    li_admin_Signup = Admin_sidebar_ul.querySelector('.li_admin_Signup'),
    li_admin_preview = Admin_sidebar_ul.querySelector('.li_admin_preview'),
    li_admin_logout = Admin_sidebar_ul.querySelector('.li_admin_logout')


li_admin_logout.onclick = () => {
    signOut(auth).then(() => {

        window.location.pathname = "pages/user-login.html"
    })
}


admin_ul_li.forEach((li) => {
    li.addEventListener('click', e => {
        admin_ul_li.forEach((li2) => { li2.classList.remove("active") })
        e.target.classList.add("active")
    })
})

li_admin_dashborad.addEventListener("click", () => {

    admin_dashborad.classList.remove("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.add("hide")

})
li_admin_Home.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.remove("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.add("hide")

})
li_admin_Shop.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.remove("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.add("hide")

})
li_admin_Signup.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.remove("hide")
    admin_preview.classList.add("hide")

})
li_admin_preview.addEventListener("click", () => {

    admin_dashborad.classList.add("hide")
    admin_Home.classList.add("hide")
    admin_Shop.classList.add("hide")
    admin_Signup.classList.add("hide")
    admin_preview.classList.remove("hide")

})
li_admin_logout.addEventListener("click", () => {



})

