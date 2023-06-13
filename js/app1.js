
import { dataShow } from "../js/modals";

let datashowign = document.querySelector('.data_container')
document.addEventListener("click",()=>{
    let Data =  dataShow()
    console.log(Data)
    datashowign.innerHTML = Data
})
console.log()
