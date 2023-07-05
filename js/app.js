import { db, dbRef, onValue, } from "../js/firebase.js";


let Home_featured_container = document.querySelector('.Home_featured_container')


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
    Rendering_card(Featured_Products_data, Home_featured_container ,main_data)
}

const Rendering_card = (Data_for_Render, CARD_area) => {
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
            elm.addEventListener("click", () => {
                let click_id = elm.querySelector('.card_id').innerText.split("#").join("")
                for (let j = 0; j < Data_for_Render.length; j++) {
                    if (Data_for_Render[j].Card_id_no == click_id) {
                        Open_big_card(Data_for_Render[j])

                    }
                }
            })
        })
    }
}



window.Open_big_card = (card) => {
    window.location.pathname = "pages/card.html"
    let daa = []
    daa.push(card)
    // console.log(daa)
    localStorage.setItem("card", JSON.stringify(daa))
}