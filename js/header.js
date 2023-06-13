var CART_BTN = document.querySelector('.CART_BTN')
let cart_side_bar = document.createElement('div')
    let cart_sidebar_bg = document.createElement('div')
    cart_side_bar.className = "cart_side_bar"
    // cart_sidebar_bg.className = "hide"
    document.body.insertBefore(cart_side_bar, document.body.childNodes[0] )
    document.body.insertBefore(cart_sidebar_bg , document.body.childNodes[0] )

    cart_side_bar.innerHTML = `
    <div class="container pt-4 h-100 d-flex flex-column justify-content-between" >
    <div class="row px-3 head" >
      <div class="col-12 d-flex justify-content-between align-items-ceneter">
        <div class="">
          <i class="fa-solid fa-cart-shopping" style="font-size:calc(100% + 10px);"></i>
        </div>
        <h3 tabindex="text-center">Quik Cart</h3>
        <div class="">
          <i class="fa-solid fa-xmark close_sidebar"  style="font-size:calc(100% + 15px);"></i>
        </div>
      </div>
    </div>
    <div class=" row px-3 py-3 border-top" style="height: 100%;">
      <div class="cart_card_box col-12 d-flex gap-2 border border-muted p-1">
        <div class="img"><img src="${``}"></div>
        <div class="Card_details w-100">
          <div class=" fw-bold d-flex justify-content-between"> Product Name <span class="mx-auto"> #021</span></div>
          <div class="">Rs 4,000 <span class="Product_quantity text-muted ms-2">x3</span></div>
        </div>
        <div class="mb-auto">
          <i class="fa-regular fa-square-minus text-muted delete_btn" ></i>
        </div>
      </div>
    </div>
    <div class="row px-3 border-top py-3 ">
      <div class="SubTotal_quick_Cart fs-6"> Subtotal : 12,000</div>
    </div>
    <div class="row px-3 py-3 d-flex flex-column border-top">
      <div class="d-flex flex-column gap-3">
        <button class="btn btn-primary"> View Cart  </button>
        <button class="btn btn-primary">  Checkout Cart  </button>
      </div>
    </div>

  </div>`


CART_BTN.onclick = (e)=>{
    e.preventDefault()
    cart_sidebar_bg.classList.remove("hide")
    cart_side_bar.classList.remove("hide")
    document.body.classList.add('stop-scrolling')
    cart_sidebar_bg.classList.add("modal_bg_on")
    setTimeout(()=>{cart_side_bar.classList.add("open_side_bar_anim")},100)
    cart_sidebar_bg.onclick = () =>{
        cart_side_bar.classList.remove("open_side_bar_anim")
        cart_sidebar_bg.classList.remove('modal_bg_on')
        document.body.classList.remove("stop-scrolling")
    }
}

cart_side_bar.querySelector(".close_sidebar").onclick = ()=>{cart_sidebar_bg.click()}





















