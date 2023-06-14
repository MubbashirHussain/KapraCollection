if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  window.location.pathname = "pages/Shop.html"
} else {

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
  console.log(card)
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
          <div class="card_price d-flex align-items-center"><div class="Discounted_price text-decoration-line-through fw-bold">Rs : ${card.Card_Discounted_price}</div><div class=" ms-3 py-2 px-3 rounded bg-dark text-white"> Rs : ${card.Card_Price}</div> <div class="any_adition text-secondary">+Shipping Charges</div></div>
          <div class="card_description">${card.Card_Description}</div>
        </div>
        <div class="quantity_checkout_btn d-flex">
          <div class=""><input type="number" class="p-1 input_reset border border-secondary rounded " min="1" value="1" style="width:50px;">&nbsp; Select Quantity</div>
          <button class="btn btn-primary ms-auto Add_TO_Cart_btn"> ADD TO CARD <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
  </div>`

  let slider_img = card_area.querySelector('.carousel-inner')
  for (let i = 0; i < card.Card_all_imgs.length; i++) {
    slider_img.innerHTML += `
    <div class="carousel-item h-100">
        <img class="h-100 object_fit_cover w-100" class="d-block w-100" alt="...">
    </div>
    `
    let img = slider_img.querySelectorAll('img')

    img[i].src = card.Card_all_imgs[i]
    console.log(slider_img)
  }

  let active = slider_img.querySelectorAll('.carousel-item')
  active[0].classList.add('active')
}
printing_main_Card(data_from)


// console.log()
// console.log(anywaladata)













