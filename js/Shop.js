
// Filer js start 
// Price Range Filer  start



let priceGap = 1000, Price_range = []
const Price_range_filer_wrapper = document.querySelector('.Price_range_filer_wrapper'),
rangeInput = Price_range_filer_wrapper.querySelectorAll(".range-input input"),
priceInput = Price_range_filer_wrapper.querySelectorAll(".price-input input"),
range = Price_range_filer_wrapper.querySelector(".slider .progress");

const filterBtn =  document.querySelector('.filters .Our_btn')
filterBtn.onclick =()=>{
    Price_range_filer_wrapper.parentElement.classList.toggle('hide')
}
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value); Price_range[0] =  priceInput[0].value
        let maxPrice = parseInt(priceInput[1].value); Price_range[1] =  priceInput[1].value
        // console.log(Price_range)
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice; console.log( maxPrice)
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal , Price_range[0] = priceInput[0].value ;
            priceInput[1].value = maxVal,  Price_range[1] = priceInput[1].value ;
            // console.log(Price_range)
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

// Price Range Filer  end
// Filer js start 





import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase  ,ref ,onValue} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
    const firebaseConfig = {
          apiKey: "AIzaSyA4nH4_anE2tXfuKc3SQsecAMfCQEGyjsU",
          authDomain: "kapra-collection.firebaseapp.com",
          databaseURL: "https://kapra-collection-default-rtdb.firebaseio.com",
          projectId: "kapra-collection",
          storageBucket: "kapra-collection.appspot.com",
          messagingSenderId: "1079091462046",
          appId: "1:1079091462046:web:0222b69aa20ed0defa608f",
          measurementId: "G-M5TZZ9CFDT"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase();
        const starCountRef = ref(db, 'Products/');
        onValue(starCountRef, (snapshot) => {
        // console.log(snapshot.val());
        Card_Crating(snapshot.val())
        });
    
        
const Product_card_container = document.querySelector('.Product_card_container')
        


const Card_Crating = (data) =>{
for (const i in data) {    
    // console.log(card.Card_title)
        let colum  = document.createElement('div')
        colum.className = "col-3 p-2 width-18-rem"
        colum.innerHTML =`
        <div class="card w-100 Product_card">
        <img class="" style="object-fit: cover; height: 200px; width: 100%;" src="${data[i].Card_preivew_img}" class="card-img-top" alt="...">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between my-2"> <h5 class="card-title d-inline-block m-0">${data[i].Card_title}</h5><div class="tag bg-dark text-white px-2 py-1 rounded d-inline-block me-3">#${data[i].Card_id_no}</div></div>
          <p class="card-text text-secondary">Some quick example text sunt!to build on the card title and make up the bulk of the card's content.</p>
          <div class="text-secondary Card_tag_box"></div>
        </div>
        <div class="w-100 h-100 mx-3">
            <div class="text-white "><span class="Discounted_price fw-bold text-decoration-line-through text-secondary">${data[i].Card_Discounted_price}</span> <strong class="bg-dark d-inline px-3 py-2 rounded">Rs : <span class="Product_price">${data[i].Card_Price}</span></strong></div>
        </div>
      </div>`
      let Discounted_price = colum.querySelector('.Discounted_price')
      if(data[i].Card_Discounted_price > 1){
        Discounted_price.innerText = `Rs : ${data[i].Card_Discounted_price}`;
      }
      let Card_tag_box = colum.querySelector('.Card_tag_box')
      if(data[i].Card_Tags != undefined){
          for (let j = 0; j < data[i].Card_Tags.length; j++) {
              let Tagspan  = document.createElement('span')
              Tagspan.innerHTML = `${data[i].Card_Tags[j]}`
              Card_tag_box.appendChild(Tagspan)
          }
      }

        colum.addEventListener("click",(e)=>{
            // console.log(e.target)
            Open_big_card(data[i])
            
        })
      Product_card_container.append(colum)
    }
}




 const Open_big_card = (card) =>{
    window.location.pathname = "pages/card.html"
    let daa = []
    daa.push(card)
    console.log(daa)
    localStorage.setItem("card" ,JSON.stringify(daa))
}



















