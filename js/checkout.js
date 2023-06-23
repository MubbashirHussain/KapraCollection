import { db , dbRef ,onValue , dbpush ,dbset } from "../js/firebase.js";


let Cart_details_box = document.querySelector('.Cart_details_box'),
Cart_details_box_inner= document.querySelector('.Cart_details_box_inner'),
Check_products = Cart_details_box.querySelector('.Check_products'),
Check_price = Cart_details_box.querySelector('.Check_price'),
Check_total = Cart_details_box.querySelector('.Check_total'),
Check_Subtotal_products = Cart_details_box.querySelector('.Check_Subtotal_products'),
payment_method = document.querySelector('.payment_method'),
Shipping_charges = 0

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

let Order_details_form = document.querySelector('.Order_details')
let Order_details = document.querySelectorAll('.Order_details input , select , textarea')
let Place_order_btn = document.querySelector('.Place_order_btn')
let input_details = []
let arra = []
let obj = {}
Order_details.required = true

Order_details.forEach(element => {
    element.addEventListener("input",()=>{
        if(element.value.length  < 1 && element.required) {
        element.style.boxShadow = "0 0 0 1px red "
        }else{
            element.style.boxShadow = "0 0 0 0 "
        }
    })
});

Place_order_btn.addEventListener('click',()=>{
for (let i = 0; i < Order_details.length; i++) {
    console.log(Order_details[i].required) 
    if(Order_details[i].value.length  < 1 && Order_details[i].required) {
        Order_details[i].style.boxShadow = "0 0 0 1px red "
        return
    }
}    
let payment_method_select = payment_method.querySelector('.payment_method input[type = radio]:checked')
let oredr_ref =  dbpush(dbRef(db ,'Order/'))
  let Subtotal = 0
    for (let i = 0; i < LS_items.length; i++) {
         obj = {
            "Product" :  LS_items[i].Card_title ,
            "price" :  LS_items[i].Card_Price ,
            "quantity" :  LS_items[i].quantity ,
            "card_id_no" : LS_items[i].Card_id_no,
            "previewIMG" : LS_items[i].Card_preivew_img,
            "OBJ_id" : LS_items[i].id
        }   
        arra.push(obj)
        Subtotal =  parseInt(Subtotal) + parseInt(obj.price* obj.quantity).toLocaleString("PKR")
    }
    
    localStorage.setItem("place_order",JSON.stringify([oredr_ref.key  , Subtotal , payment_method_select.id]))
    

       let input_obj = {
            First_name  : Order_details[0].value,
            Last_name : Order_details[1].value,
            Email_address : Order_details[2].value,
            Select_country : Order_details[3].value,
            Select_State : Order_details[4].value,
            City_name : Order_details[6].value,
            Post_code : Order_details[7].value,
            Order_notes : Order_details[8].value,
        } 
        let Order_card_details = {
            ordered_cards : JSON.stringify(arra),
            Order_key : oredr_ref.key,
            payment_method : payment_method_select.id

        }   


        dbset(oredr_ref ,{
            Customer_details : input_obj,
            Order_details  : Order_card_details,
        })

        Place_order_btn.disabled = true
        setInterval(()=>{
         window.location.pathname = "pages/Thanks-for-purchasing.html"
        },1000)    
})
Order_details_form.addEventListener("submit",(e)=>{
    e.preventDefault()
})
