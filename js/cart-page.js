let cart_tottal_box = document.querySelector('.cart_tottal_box'),
Cart_sub_total = cart_tottal_box.querySelector('.Cart_sub_total span'),
Cart_total =  cart_tottal_box.querySelector('.Cart_total'),
CHECOUT_btn  = cart_tottal_box.querySelector('.CHECOUT_btn')
let LS_items = JSON.parse(localStorage.getItem('cart_items'))

let Cart_sub_total_value =0
let Shipping_charges = 0
let order_obj = {}
CHECOUT_btn.onclick = ()=>{
      window.location.pathname = "pages/Checkout.html"
}

let cart_pro_table = document.querySelector('.cart_Table')
cart_pro_table.innerHTML = `
<thead class="table-dark">
    <tr>
        <td></td>
        <td></td>
        <td>product</td>
        <td>Price</td>
        <td>Quantity</td>
        <td>subtotal</td>
    </tr>
</thead> 
<tbody>
    
</tbody>
<tfoot class="table-dark">
<tr>

    <td colspan="5"></td>
    <td class="text-end"><button class="btn btn-primary me-3">Update Cart</button></td>
</tr>
</tfoot>

`
let tbody = cart_pro_table.querySelector('tbody')
let Update_btn = cart_pro_table.querySelector('tfoot td button')
// console.log(LS_items)
if(LS_items == undefined || LS_items.length < 1){
    cart_pro_table.innerHTML = 'no list...'
} 

const cartBOX_total = ()=>{
    Cart_sub_total_value = 0
    for (let i = 0; i < LS_items.length; i++) {
        Cart_sub_total_value = Cart_sub_total_value + (LS_items[i].Card_Price * LS_items[i].quantity)
        // console.log(Cart_sub_total_value)
    }
    Cart_sub_total.innerHTML = Cart_sub_total_value.toLocaleString('PKR')
    Cart_total.innerHTML = (parseInt(Shipping_charges) + parseInt(Cart_sub_total_value)).toLocaleString("PKR")
    }

const Creating_cart_products =()=>{
    tbody.innerHTML  = ""
    for (let i = 0; i < LS_items.length; i++) {
    let subTotal = (LS_items[i].Card_Price * LS_items[i].quantity).toLocaleString('PKR')
    let tr = document.createElement('tr')
        tr.innerHTML +=  `
        <tr>
            <td class="delete_btn"><i class="fa-regular fa-square-minus text-muted delete_btn" ></i></td>
            <td><img src="${LS_items[i].Card_preivew_img}" style="height:50px; width:50px;"></td>
            <td>${LS_items[i].Card_title}</td>
            <td>${LS_items[i].Card_Price}</td>
            <td><input type="number" class="p-1 input_reset quantity_input  border border-secondary rounded " min="1" value="${LS_items[i].quantity}" style="width:50px;"></td>
            <td>${subTotal}</td>
        </tr>
        `
        tr.querySelector('.delete_btn').onclick = () => {
            LS_items.splice(i, 1);
            localStorage.setItem("cart_items", JSON.stringify(LS_items))
        }
        let quantity_input =  tr.querySelector('.quantity_input')
        // console.log(quantity_input.value)
        quantity_input.addEventListener('input',(e)=>{
            
            // console.log(quantity_input.value)
            LS_items[i].quantity = quantity_input.value
            localStorage.setItem("cart_items", JSON.stringify(LS_items))
        })
        tbody.append(tr)
    }
cartBOX_total()


}
Update_btn.onclick =()=>{
    Creating_cart_products()
}
Creating_cart_products()


// console.log(Cart_sub_total_value)





