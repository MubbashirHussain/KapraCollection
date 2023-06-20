import { db , dbRef ,onValue} from "../js/firebase.js";

const starCountRef = dbRef(db, 'Products/');
onValue(starCountRef, (snapshot) => {
    Card_Crating(snapshot.val())
});


const Product_card_container = document.querySelector('.Product_card_container'),
    SearchInput = document.querySelector('.SearchInput'),
    pagination_box = document.querySelector(".pagination_box ul")
let data_for_render = [], data_for_search = [], emtpyAara = [], pageIndex = 0, ArrData = [];
let page = 4;
let totalPages;
SearchInput.disabled = true
const Card_Crating = (data) => {
    for (const key in data) {
        ArrData.push(data[key])
    }

    SearchInput.disabled = false

    let data_divid_for_paging = (AaraData, retara) => {
        for (let i = 0; i < AaraData.length; i += 15) {
            let DP = AaraData.slice(i, i + 15);
            retara.push(DP);
        }
    };
    data_divid_for_paging(ArrData, data_for_render)
    data_divid_for_paging(ArrData, data_for_search)
    Rendering_card(data_for_render)
    totalPages = data_for_render.length;
    pagination_box.innerHTML = createPagination(totalPages, page);

    const Searching_card = (e) => {
        let IntupValue = e.target.value.toUpperCase().split(" ").join("").split(".").join("");
        if (IntupValue.length <= 0) {
            data_for_render = data_for_search;
            Rendering_card(data_for_render);
            page_no(data_for_render.length, 4);
        }
        if (IntupValue.length < 1) return;
        data_for_render = [];
        emtpyAara = [];
        Product_card_container.innerHTML = "";
        for (let i = 0; i < data_for_search.length; i++) {
            for (let j = 0; j < data_for_search[i].length; j++) {
                let card_name = data_for_search[i][j].Card_title.toUpperCase().split(" ").join("").split(".").join("");
                let card_desc = data_for_search[i][j].Card_Description.toUpperCase().split(" ").join("").split(".").join("");
                let card_ID = "#" + (data_for_search[i][j].Card_id_no.toString())
                if (
                    card_name.indexOf(IntupValue) >= 0 ||
                    card_desc.indexOf(IntupValue) >= 0 ||
                    card_ID.indexOf(IntupValue) >= 0
                ) {
                    emtpyAara.push(data_for_search[i][j]);
                }
            }
        }
        if (emtpyAara.length > 0) {
            data_divid_for_paging(emtpyAara, data_for_render);
            Rendering_card(data_for_render);
            page_no(data_for_render.length, 1);
        }
    };

    SearchInput.addEventListener("input", Searching_card);
    SearchInput.addEventListener("keyup", Searching_card);
    SearchInput.addEventListener("keypress", Searching_card);
}


const Rendering_card = (Data_for_Render) => {
    if (Data_for_Render.length < 1) return;
    Product_card_container.innerHTML = "";
    for (let i = 0; i < Data_for_Render[pageIndex].length; i++) {
        Product_card_container.innerHTML += `
      <div class="col-3 p-2 width-18-rem card_parent">
              <div class="card w-100 Product_card">
              <img class="" style="object-fit: cover; height: 200px; width: 100%;" src="${Data_for_Render[pageIndex][i].Card_preivew_img}" class="card-img-top" alt="...">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between my-2"> <h5 class="card-title d-inline-block m-0">${Data_for_Render[pageIndex][i].Card_title}</h5><div class="tag bg-dark text-white px-2 py-1 rounded d-inline-block me-3 card_id">#${Data_for_Render[pageIndex][i].Card_id_no}</div></div>
                <p class="card-text text-secondary">${Data_for_Render[pageIndex][i].Card_Description}</p>
                <div class="text-secondary Card_tag_box"></div>
              </div>
              <div class="w-100 h-100 mx-3">
                  <div class="text-white "><span class="Discounted_price fw-bold text-decoration-line-through text-secondary">${Data_for_Render[pageIndex][i].Card_Discounted_price}</span> <strong class="bg-dark d-inline px-3 py-2 rounded">Rs : <span class="Product_price">${Data_for_Render[pageIndex][i].Card_Price}</span></strong></div>
              </div>
            </div>
           </div>
           `
           let Card_tag_box = Product_card_container.querySelectorAll('.Card_tag_box')
           if(Data_for_Render[pageIndex][i].Card_Tags != undefined){
             for (let j = 0; j < Data_for_Render[pageIndex][i].Card_Tags.length; j++) {
                 let Tagspan  = document.createElement('span')
                 Tagspan.innerHTML = `${Data_for_Render[pageIndex][i].Card_Tags[j]}`
                 Card_tag_box[i].appendChild(Tagspan)
             }
         }
        let allCard = Product_card_container.querySelectorAll('.card_parent')
        allCard.forEach(elm => {
            elm.addEventListener("click", () => {
                let click_id = elm.querySelector('.card_id').innerText.split("#").join("")
                for (let j = 0; j < Data_for_Render[pageIndex].length; j++) {
                    if (Data_for_Render[pageIndex][j].Card_id_no == click_id) {
                        Open_big_card(Data_for_Render[pageIndex][j])

                    }
                }
            })
        })
    }
}

window.page_no = (a, b) => {
    createPagination(a, b);
    pageIndex = b - 1;
    Rendering_card(data_for_render);
};
window.paging_next_page = (a, b) => {
    createPagination(a, b);
    if (data_for_search.length == pageIndex + 1) return;
    pageIndex = pageIndex + 1;
    Rendering_card(data_for_render);
};

window.paging_Previous_page = (a, b) => {
    createPagination(a, b);
    if (pageIndex <= 0) return;
    pageIndex = pageIndex - 1;
    Rendering_card(data_for_render);
};
//  pagintion function
function createPagination(totalPages, page) {
    let liTag = "";
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
        liTag += `<li class="btn prev"  onclick="paging_Previous_page(${totalPages}, ${page - 1
            })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    }

    if (page > 2) {
        liTag += `<li class="first numb" onclick="page_no(${totalPages}, 1)"><span>1</span></li>`;
        if (page > 3) {
            liTag += `<li class="dots"><span>...</span></li>`;
        }
    }
    if (page == totalPages) {
        // 81
        beforePage = beforePage - 2; // 79
    } else if (page == totalPages - 1) {
        // 80
        beforePage = beforePage - 1;
    }
    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage = afterPage + 1;
    }

    for (var plength = beforePage; plength <= afterPage; plength++) {
        if (plength < 0) break;
        if (plength > totalPages) {
            continue;
        }
        if (plength == 0) {
            plength = plength + 1;
        }
        if (page == plength) {
            active = "active";
        } else {
            active = "";
        }
        liTag += `<li class="numb ${active}" onclick="page_no(${totalPages}, ${plength})"><span>${plength}</span></li>`;
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        liTag += `<li class="last numb" onclick="page_no(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
    }

    if (page < totalPages) {
        liTag += `<li class="btn next"  onclick="paging_next_page(${totalPages}, ${page + 1
            })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    }
    pagination_box.innerHTML = liTag;
    return liTag;
}




window.Open_big_card = (card) => {
    window.location.pathname = "pages/card.html"
    let daa = []
    daa.push(card)
    localStorage.setItem("card", JSON.stringify(daa))
}
















