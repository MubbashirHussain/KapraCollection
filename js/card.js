if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  window.location.pathname = "pages/Shop.html"
}
let data_from;
const main_card_container = document.querySelector('.main_card_container'),
  card_area = main_card_container.querySelector('.row')

const gettingData = () => {
  data_from = JSON.parse(localStorage.getItem("card"))[0]
  localStorage.removeItem("card")
}
gettingData()
const printing_main_Card = (card) => {
  card_area.innerHTML = `
    <div class="container col-md-6 col-sm-12">
    <div id="carouselExampleControls" class="carousel slide h-100 big_card_igm_slider" data-bs-ride="carousel">
      <div class="open_full_screen"><i class="fa-solid fa-magnifying-glass"></i></div>
      <div class="carousel-inner h-100 ">

      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div> 
  <div class="container col-md-6 col-sm-12">
    <div class="row p-1">
      <div class="col-12">
        <div class="Big_card_details d-flex flex-column justify-content-between gap-3 py-5">
          <div class="card_name d-flex justify-content-between align-items-center"><h5>${card.Card_title}</h5> <div class="card_id_no py-2 px-3 rounded">#${card.Card_id_no}</div></div>
          <div class="card_price d-flex align-items-center"><div class="Discounted_price text-decoration-line-through fw-bold">${card.Card_Discounted_price}</div><div class=" py-2 px-3 rounded bg-dark text-white"> Rs : ${card.Card_Price}</div> <div class="any_adition text-secondary">+Shipping Charges</div></div>
          <div class="card_description">${card.Card_Description}</div>
          <div class="text-secondary Card_tag_box"></div>
        </div>
        <div class="quantity_checkout_btn d-flex">
          <div class=""><input type="number" class="p-1 input_reset border border-secondary rounded " min="1" value="1" style="width:50px;">&nbsp; Select Quantity</div>
          <button class="btn btn-primary ms-auto Add_TO_Cart_btn"> ADD TO CARD <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
  </div>`


  let Discounted_price = card_area.querySelector('.Discounted_price')
  Discounted_price.style.padding = "0" 
      if(card.Card_Discounted_price > 1){
        Discounted_price.innerText = `Rs : ${card.Card_Discounted_price}`;
        Discounted_price.style.padding = "0 12px" 
      }
  let Card_tag_box = card_area.querySelector('.Card_tag_box')

  if(card.Card_Tags != undefined){
    for (let j = 0; j < card.Card_Tags.length; j++) {
        let Tagspan  = document.createElement('span')
        Tagspan.innerHTML = `${card.Card_Tags[j]}`
        Card_tag_box.appendChild(Tagspan)
    }
}
  let slider_img = card_area.querySelector('.carousel-inner')
  // console.log(card.Card_all_imgs == undefined)
  // if (card.Card_all_imgs == undefined)
    for (let i = 0; i < card.Card_all_imgs.length; i++) {
      slider_img.innerHTML += `
    <div class="carousel-item h-100">
        <img class="h-100 object_fit_cover w-100" class="d-block w-100" alt="...">
    </div>
    `
      let img = slider_img.querySelectorAll('img')

      img[i].src = card.Card_all_imgs[i]
      // console.log(slider_img)
    }

  let active = slider_img.querySelectorAll('.carousel-item')
  active[0].classList.add('active')
  let Cart_data = [];
  let Add_to_cart = card_area.querySelector('.Add_TO_Cart_btn')
  Add_to_cart.onclick = () => {
    card.quantity = Add_to_cart.previousElementSibling.firstChild.value
    let LS_item = JSON.parse(localStorage.getItem("cart_items"))
    if (LS_item != undefined || LS_item > 0) {
      let flag = true;
      for (let j = 0; j < LS_item.length; j++) {
        if (card.Card_id_no == LS_item[j].Card_id_no) {
          LS_item[j].quantity = parseInt(LS_item[j].quantity) + parseInt(card.quantity)
          localStorage.setItem("cart_items", JSON.stringify(LS_item))
          flag = false;

        } else {
          flag = true;
        }
      }
      console.log(flag)
      if (flag) {
        Cart_data = LS_item
        Cart_data.push(card)
        console.log("if pass")
        localStorage.setItem("cart_items", JSON.stringify(Cart_data))
      }

    } else {

      Cart_data.push(card)
      // console.log(Cart_data)
      localStorage.setItem("cart_items", JSON.stringify(Cart_data))

    }
    document.querySelector('.Cart_Count').innerText = JSON.parse(localStorage.getItem("cart_items")).length

  }











}
printing_main_Card(data_from)

// console.log()
// console.log(anywaladata)













