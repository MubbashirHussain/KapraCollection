import { auth, signInWithEmailAndPassword, onAuthStateChanged, dbremove, signOut, db, dbRef, dbset, onValue, dbUpdate } from "../js/firebase.js";

let Dref = dbRef(db, 'Admin/')
onValue(Dref, (snap) => {
    let data = Object.values(snap.val())
    //   checkforAdminpage(data, undefined)
})


// window.checkforAdminpage = (data, Logger) => {
//   if (Logger != undefined) {
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].Admin_uid == Logger.uid) {
//         document.body.style.display ="block"
//       }
//     }
//   }else{
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         checkforAdminpage(data, user)
//       }else{
//         window.location.pathname = "pages/admin-login.html"
//       }
//     })

//   }

// }

let Card_tag_data = [];
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
    li_admin_logout = Admin_sidebar_ul.querySelector('.li_admin_logout'),
    Featured_Products = admin_Home.querySelector('.Featured_Products .AllCards'),
    AddFeatured_btn = admin_Home.querySelector('.AddFeatured_btn button'),
    DELETE_BTN = admin_Shop.querySelector('.DELETE_BTN button'),
    Edit_card_container = admin_Shop.querySelector('.Edit_card_container .AllCards')

console.log(Edit_card_container)

let modal = document.createElement('div')
let modal_bg = document.createElement('div')
modal.className = "modal hide"
modal_bg.className = "hide"
document.body.insertBefore(modal, document.body.childNodes[0])
document.body.insertBefore(modal_bg, document.body.childNodes[0])


AddFeatured_btn.disabled = true


let prodref = dbRef(db, 'Products/')
onValue(prodref, (snap) => {
    Create_Featured_Products(snap.val())
})
let Featured_Products_data = [];

let Create_Featured_Products = (main_data) => {

    let data = Object.values(main_data)
    data.forEach(card => {
        if (card.Is_featured == 1) {
            Featured_Products_data.push(card)
        }
    })

    if (Featured_Products_data.length >= 6) {
        AddFeatured_btn.disabled = true
    } else {
        AddFeatured_btn.disabled = false

    }
    console.log(Featured_Products_data.length)
    Rendering_card(Featured_Products_data, Featured_Products, ADD_and_remove, main_data)
    Rendering_card(data, Edit_card_container, Edit_card_function, main_data)

    AddFeatured_btn.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        modal_bg.classList.remove("hide")
        modal.classList.remove("hide")
        document.body.classList.add('stop-scrolling')
        modal_bg.classList.add("modal_bg_on")
        modal.innerHTML = ''
        Rendering_card(data, modal, ADD_and_remove, main_data)
        modal_bg.onclick = () => {
            modal.classList.add("hide")
            modal_bg.classList.remove('modal_bg_on')
            document.body.classList.remove("stop-scrolling")
        }
    }
    DELETE_BTN.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        modal_bg.classList.remove("hide")
        modal.classList.remove("hide")
        document.body.classList.add('stop-scrolling')
        modal_bg.classList.add("modal_bg_on")
        modal.innerHTML = ''
        Rendering_card(data, modal, getting_key, main_data)
        modal_bg.onclick = () => {
            modal.classList.add("hide")
            modal_bg.classList.remove('modal_bg_on')
            document.body.classList.remove("stop-scrolling")
        }
    }

}

const Rendering_card = (Data_for_Render, CARD_area, CARD_click_func, main_data, border) => {
    if (Data_for_Render.length < 1) return;
    CARD_area.innerHTML = "";
    for (let i = 0; i < Data_for_Render.length; i++) {
        CARD_area.innerHTML += `
      <div class="col-3 p-2 width-18-rem card_parent">
              <div class="card w-100 Product_card">
              <img class="" style="object-fit: cover; height: 200px; width: 100%;" src="${Data_for_Render[i].Card_preivew_img}" class="card-img-top" alt="...">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between my-2"> <h5 class="card-title d-inline-block m-0">${Data_for_Render[i].Card_title}</h5><div class="tag bg-dark text-white px-2 py-1 rounded d-inline-block me-3 card_id">#${Data_for_Render[i].Card_id_no}</div></div>
                <p class="card-text text-secondary">${Data_for_Render[i].Card_Description}</p>
                <div class="text-secondary Card_tag_box"></div>
              </div>
              <div class="w-100 h-100 mx-3">
                  <div class="text-white "><span class="Discounted_price fw-bold text-decoration-line-through text-secondary">${Data_for_Render[i].Card_Discounted_price}</span> <strong class="bg-dark d-inline px-3 py-2 rounded">Rs : <span class="Product_price">${Data_for_Render[i].Card_Price}</span></strong></div>
              </div>
            </div>
           </div>
           `
        let Card_tag_box = CARD_area.querySelectorAll('.Card_tag_box')
        if (Data_for_Render[i].Card_Tags != undefined) {
            for (let j = 0; j < Data_for_Render[i].Card_Tags.length; j++) {
                let Tagspan = document.createElement('span')
                Tagspan.innerHTML = `${Data_for_Render[i].Card_Tags[j]}`
                //  console.log(Tagspan)

                Card_tag_box[i].appendChild(Tagspan)
            }
        }
        let allCard = CARD_area.querySelectorAll('.card_parent')
        allCard.forEach(elm => {
            elm.addEventListener("dblclick", () => {
                let click_id = elm.querySelector('.card_id').innerText.split("#").join("")
                for (let j = 0; j < Data_for_Render.length; j++) {
                    if (Data_for_Render[j].Card_id_no == click_id) {

                        CARD_click_func(Data_for_Render[j], main_data)
                    }
                }
            })
        })
    }
}

const Edit_card_function = (one_card, main_data) => {
    // getting_key(one_card , main_data , undefined)

    modal_bg.classList.remove("hide")
    modal.classList.remove("hide")
    document.body.classList.add('stop-scrolling')
    modal_bg.classList.add("modal_bg_on")
    modal_bg.onclick = () => {
        modal.classList.add("hide")
        modal_bg.classList.remove('modal_bg_on')
        document.body.classList.remove("stop-scrolling")
    }
    console.log(one_card.Card_Description)
    // let main_card_editer_Modal = document.createElement('div')
    // main_card_editer_Modal.className = "main_card_editer container m-0 p-0 w-100 h-100"
    modal.innerHTML = ''
    modal.innerHTML = `
        <div class="d-flex row justify-content-between align-items-center"><h2 class="fw-bolder m-0">Card Edit</h2><span class="Modal_close_btn fs-1">&#215;</span></div>
        <div class=" row w-100 m-0 h-100 d-flex justify-content-center align-items-center">
        <div class="col-md-6 col-sm-12  Card_Edit_container h-100 d-flex  justify-content-center align-items-center ">

        <div class="Card_data row d-flex flex-wrap justify-content-center align-items-center">
            <h2 class="text-center my-3">Card Details</h2>
            <div class="data_for_card px-4 h-100 ">

               <div class="text writing">
                   <input type="text" id="Card_Title" maxlength="20" value="${one_card.Card_title}" />
                   <label for="Card_Title" class=" fw-bold">Card Title</label>
                      <span></span>
                 </div>
                 <div class="textarea writing">
                     <textarea type="text" id="Card_Description">${one_card.Card_Description}</textarea>
                     <label for="Card_Description" class fw-bold">Card Description</label>
                   <span></span>
                 </div>
                 <div class="text writing">
                     <input type="number" id="Card_discounted_price" value="${one_card.Card_Discounted_price}"/>
                       <label for="Card_discounted_price" class=" fw-bold">Card discounted price</label>
                         <span></span>
                 </div>
                 <div class="text writing">
                     <input type="number" id="Card_price" value="${one_card.Card_Price}" />
                     <label for="Card_price" class=" fw-bold">Card price</label>
                     <span></span>
                   </div>
                   <div class="text writing">
                           <input type="text" id="Card_tag"/>
                           <label for="Card_tag">Add Tag</label>
                           <span></span>
                           <button class="btn h-100  my-3 text-white bg-success ms-2" onclick="AddTagIntoCard(this)">add</button>
                    </div>

            <div class="Btn_box w-100 d-flex justify-content-end my-2 "onclick="update_card()">
                <button class="btn btn-primary next me-3">updatde Card</button>
            </div>
            </div>
        </div>
    </div>
    `

    modal.querySelectorAll('.writing :is(input , textarea)').forEach(writinginput => {
        let edit_inputs = () => {
            //   if (writinginput.value.trim() !== '') {
            if (writinginput.value.length > 0) {
                writinginput.classList.add('has-text');
            } else {
                writinginput.classList.remove('has-text');
            }
        }
        writinginput.addEventListener('input', edit_inputs);
        if (writinginput.value.length > 0) {
            edit_inputs()
        }
    });

    /* Alto de textarea */
    modal.querySelectorAll('.textarea textarea').forEach(textarea => {
        textarea.addEventListener('input', () => {
            textarea.style.height = '1em';
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        });
    });




    window.AddTagIntoCard = (e) => {
        let tag = e.previousElementSibling.previousElementSibling.previousElementSibling
        if (tag.value.length <= 0) return;
        let tag_for_card = document.createElement('span')
        tag_for_card.innerHTML = tag.value
        one_card.Card_Tags.push(tag.value)
        tag.value = ""
        // console.log(tag.value)
    }


    console.log(Card_Title)
    window.update_card = () => {
        let Card_Title = modal.querySelector('#Card_Title').value
        let Card_Description = modal.querySelector('#Card_Description').innerText
        let Card_discounted_price = modal.querySelector('#Card_discounted_price').value
        let Card_price = modal.querySelector('#Card_price').value
        let obj_for_update = {
            Card_title: Card_Title,
            Card_Description: Card_Description,
            Card_Discounted_price: Card_discounted_price,
            Card_Price: Card_price,
            Card_Tags: one_card.Card_Tags,
        }
        getting_key(one_card, main_data, obj_for_update)
    }

}



const ADD_and_remove = (card_data, main_data) => {
    console.log(card_data.Is_featured)
    for (const key in main_data) {
        if (card_data.Card_id_no === main_data[key].Card_id_no) {
            if (card_data.Is_featured == 1) {
                let UpRef = dbRef(db, `Products/${key}`)
                dbUpdate(UpRef, {
                    Is_featured: 0
                })
                window.location.reload()
            } else if (card_data.Is_featured == 0) {
                modal_bg.click()
                let UpRef = dbRef(db, `Products/${key}`)
                console.log(UpRef)
                dbUpdate(UpRef, {
                    Is_featured: 1
                })
                window.location.reload()
            }

        }
    }
}



const getting_key = (card_data, main_data, obj) => {
    for (const key in main_data) {
        if (card_data.Card_id_no === main_data[key].Card_id_no) {
            let UpRef = dbRef(db, `Products/${key}`)
            if (obj != undefined) {
                dbUpdate(UpRef, obj)
            } else {
                dbremove(UpRef)
            }
            window.location.reload()
        }
    }
}




























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

