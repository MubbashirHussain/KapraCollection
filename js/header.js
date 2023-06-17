import { auth, onAuthStateChanged, db, dbRef, dbset, onValue ,signOut} from "../js/firebase.js";


var CART_BTN = document.querySelector('.CART_BTN')
let Cart_Count = CART_BTN.querySelector('.Cart_Count')
let cart_side_bar = document.createElement('div')
let cart_sidebar_bg = document.createElement('div')
cart_side_bar.className = "cart_side_bar"
// cart_sidebar_bg.className = "hide"
document.body.insertBefore(cart_side_bar, document.body.childNodes[0])
document.body.insertBefore(cart_sidebar_bg, document.body.childNodes[0])
cart_side_bar.innerHTML = `
    <div class="container pt-4 h-100 d-flex flex-column justify-content-between" >
    <div class="row px-3 head" >
      <div class="col-12 d-flex justify-content-between align-items-ceneter">
        <div class="">
          <i class="fa-solid fa-cart-shopping" style="font-size:calc(100% + 10px);"></i>
        </div>
        <h3 class="text-center">Quik Cart</h3>
        <div class="">
          <i class="fa-solid fa-xmark close_sidebar"  style="font-size:calc(100% + 15px);"></i>
        </div>
      </div>
    </div>

    <div class=" row px-3 py-3 border-top  flex-nowrap Cart_box d-flex flex-column gap-2" style="height: 100%;">
      
    </div>
    
    <div class="row px-3 border-top py-3 ">
      <div class="SubTotal_quick_Cart fs-6"> Subtotal : <span>12,000<span></div>
    </div>
    <div class="row px-3 py-3 d-flex flex-column border-top">
      <div class="d-flex flex-column gap-3">
        <button class="btn btn-primary"> View Cart  </button>
        <button class="btn btn-primary">  Checkout Cart  </button>
      </div>
    </div>

  </div>`

let login_logout_btn = document.querySelector('.login_logout_btn')
onAuthStateChanged(auth, (user) => {
  if (user) {
    login_logout_btn.href = ''
    login_logout_btn.querySelector('i').style.transform = "rotate(180deg)"
    login_logout_btn.addEventListener("click", () => {
      signOut(auth).then((sec) => {
        window.reload()
      })
    })
  }else{
    login_logout_btn.querySelector('i').style.transform = "rotate(0deg)"
    login_logout_btn.href = 'pages/user-login.html'
  }
})

let Cart_box = cart_side_bar.querySelector('.Cart_box')
let Cart_item;
const cart_itme_create = () => {
  Cart_item = []
  Cart_item = JSON.parse(localStorage.getItem('cart_items'))

  if (Cart_item == undefined) return
  Cart_box.innerHTML = ""
  let SubTotalPrice = 0;
  for (let i = 0; i < Cart_item.length; i++) {
    let Cart_card = document.createElement('div')
    Cart_card.className = 'cart_card col-12 d-flex gap-2 border border-muted p-1'
    Cart_card.innerHTML += `
        <div class="img"><img src="${Cart_item[i].Card_preivew_img}"></div>

        <div class="Card_details w-100">
          <div class=" fw-bold d-flex justify-content-between"> ${Cart_item[i].Card_title} <span class="mx-auto"> #${Cart_item[i].Card_id_no}</span></div>
          <div class="">Rs ${Cart_item[i].Card_Price} <span class="Product_quantity text-muted ms-2">x${Cart_item[i].quantity}</span></div>
        </div>

        <div class="mb-auto">
          <i class="fa-regular fa-square-minus text-muted delete_btn" ></i>
        </div>`
    Cart_box.appendChild(Cart_card)
    // console.log(Cart_card)
    Cart_Count.innerText = Cart_item.length
    SubTotalPrice += parseInt(Cart_item[i].Card_Price * Cart_item[i].quantity);
    let delete_btn = Cart_card.querySelector('.delete_btn')
    delete_btn.onclick = (e) => {
      Cart_item.splice(i, 1);
      localStorage.setItem("cart_items", JSON.stringify(Cart_item))

    }
  }
  if (Cart_item.length < 1 || Cart_item == undefined) {
    Cart_Count.innerText = "0"
  }
  let SubTotal_quick_Cart = cart_side_bar.querySelector('.SubTotal_quick_Cart span')
  SubTotal_quick_Cart.innerText = SubTotalPrice.toLocaleString('PKR')
}

setInterval(cart_itme_create, 1000)
cart_itme_create()
CART_BTN.onclick = (e) => {
  e.preventDefault()
  e.stopPropagation()
  cart_sidebar_bg.classList.remove("hide")
  cart_side_bar.classList.remove("hide")
  document.body.classList.add('stop-scrolling')
  cart_sidebar_bg.classList.add("modal_bg_on")
  setTimeout(() => { cart_side_bar.classList.add("open_side_bar_anim") }, 100)
  cart_sidebar_bg.onclick = () => {
    cart_side_bar.classList.remove("open_side_bar_anim")
    cart_sidebar_bg.classList.remove('modal_bg_on')
    document.body.classList.remove("stop-scrolling")
  }
}

cart_side_bar.querySelector(".close_sidebar").onclick = () => { cart_sidebar_bg.click() }





















