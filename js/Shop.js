
// Filer js start 
// Price Range Filer  start



let priceGap = 1000, Price_range = []
const Price_range_filer_wrapper = document.querySelector('.Price_range_filer_wrapper'),
rangeInput = Price_range_filer_wrapper.querySelectorAll(".range-input input"),
priceInput = Price_range_filer_wrapper.querySelectorAll(".price-input input"),
range = Price_range_filer_wrapper.querySelector(".slider .progress");

const filterBtn =  document.querySelector('.filters .Our_btn')
console.log(filterBtn)
filterBtn.onclick =()=>{
    Price_range_filer_wrapper.parentElement.classList.toggle('hide')
}


console.log(Price_range_filer_wrapper)


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





// Creating Cards start 

const FETCH_data = async () =>{
    console.log("feting")
    await fetch('https://dl.dropboxusercontent.com/s/2k3ntz30plxu0zy/card_data_for_kapra_col.json?dl=0')
    .then(res => res.json() )
    .then(ress => CreatngCards(ress))
    .catch(er => console.log(er))
    
}
window.onload = FETCH_data()
const CreatngCards = (data)=>{
console.log(data)
}

// CreatngCards(data)


// Creating Cards end