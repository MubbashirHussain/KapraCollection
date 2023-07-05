if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    localStorage.removeItem("cart_items")
    localStorage.removeItem("place_order")
  }

  
let iban = document.querySelector(".iban")
iban.parentElement.addEventListener("click",()=>{
    navigator.clipboard.writeText(iban.innerText)
    alert(`IBAN : ${iban.innerText} \n has copyed on clipboard`)
})
let WhatAPP_link = document.querySelector(".WhatAPP_link")
let Order_details = document.querySelector('.Order_details'),
    order_id = Order_details.querySelector('.order_id'),
    Total_Rs = Order_details.querySelector('.Total_Rs'),
    Payment_method = Order_details.querySelector('.Payment_method'),
    Bank_Transfer = document.querySelector("#Bank-Transfer"),
    COD = document.querySelector("#COD")

    let LS_order = JSON.parse(localStorage.getItem('place_order'))

    
const Show_data=()=>{
    // console.log(LS_order)
        if(LS_order != undefined){
            if(LS_order[2] == "COD"){
                Bank_Transfer.classList.add("hide")
                COD.classList.remove("hide")
            }else{
                COD.classList.add("hide")
                Bank_Transfer.classList.remove("hide")
            }
            order_id.innerHTML = LS_order[0]        
            Total_Rs.innerHTML = LS_order[1]        
            Payment_method.innerHTML = LS_order[2]
            WhatAPP_link.href = `https://wa.me/+923062969491?text=*_My Order ID_* ( ${LS_order[0]} ) *_Total Bill_* Rs : ${Number(LS_order[1]).toLocaleString("PKR")}`

        } 

}
Show_data()
















