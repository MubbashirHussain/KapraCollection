import { db , dbRef ,onValue} from "../js/firebase.js";


let Cart_details_box = document.querySelector('.Cart_details_box'),
Cart_details_box_inner= document.querySelector('.Cart_details_box_inner'),
Check_products = Cart_details_box.querySelector('.Check_products'),
Check_price = Cart_details_box.querySelector('.Check_price'),
Check_total = Cart_details_box.querySelector('.Check_total'),
Check_Subtotal_products = Cart_details_box.querySelector('.Check_Subtotal_products'),
Shipping_charges = 0

console.log(Check_products)
let Subtotal = 0


let LS_items = JSON.parse(localStorage.getItem('cart_items'))

Subtotal = 0
const show_cart_details =()=>{
    for (let i = 0; i < LS_items.length; i++) {
        let Prod = document.createElement('div')
        Prod.className = "row m-0 px-4 py-3 border-top"
        Prod.innerHTML = `
        <div class="d-flex justify-content-between">
        <div class="Check_products">${LS_items[i].Card_title} </div><div class="Check_price">${LS_items[i].Card_Price * LS_items[i].quantity}</div></div></div>
        `
        Cart_details_box_inner.insertBefore(Prod,Cart_details_box_inner.children[2])
        Subtotal =  parseInt(Subtotal) + parseInt(LS_items[i].Card_Price * LS_items[i].quantity)
        console.log(Subtotal)
        
    }
    Check_Subtotal_products.innerHTML = (parseInt(Subtotal)).toLocaleString("PKR")
    Check_total.innerHTML = (parseInt(Shipping_charges) + parseInt(Subtotal)).toLocaleString("PKR")
}
show_cart_details()
// const Plase_order = {
    
// }