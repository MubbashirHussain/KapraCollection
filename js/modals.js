let Obj;
export const Create_main_card_editer_Modal = () => {
    Create_modal_bg()
    let main_card_editer_Modal = document.createElement('div')
    main_card_editer_Modal.className = "main_card_editer_Modal"
    main_card_editer_Modal.innerHTML = `
     <div class="d-flex justify-content-between align-items-center w-100"><h2 class="fw-bolder m-0">Card Edit</h2><span class="Modal_close_btn fs-1">&#215;</span></div>
     <div class="d-flex flex-wrap w-100 flex-direction-row border p-2 border-muted rounded justify-content-center align-items-center" style="gap:20px 0;" >
         <div class="Card_Edit_container overflowScroll" style="height: inherit;">
             
             <div class="Card_Crop_img_box  d-flex justify-content-center align-items-center m-auto Drop_box">
                 <input type="file" id="Crop_Img_Upload" hidden>
                 <label for="Crop_Img_Upload" class="py-1 px-2 text-white bg-info rounded"> Upload image </label>
             </div>
             <div class="container hide Selete_For_frot_img py-2 px1 d-flex flex-wrap justify-content-center align-items-center">
                 <h2 class="text-center my-3">Select Front Img</h2>
                 <div class="py-2 px1 d-flex selecting_img_Area flex-wrap justify-content-center align-items-center"></div>
                 
             </div>
             <div class="img_croping_area w-100 hide">
             <img src="" class="h-75 w-100 mb-3">
                 <div class="Btn_box w-100 d-flex justify-content-end my-2">
                     <button class="btn btn-primary back me-3">back</button>
                     <button class="btn btn-primary next me-3">Next ></button>
                 </div>
 
             </div>
             <div class="Card_data row d-flex flex-wrap justify-content-center align-items-center hide">
                 <h2 class="text-center my-3">Card Details</h2>
                 <div class="data_for_card px-4 h-100 ">
                     <label for="Card_Title" class=" fw-bold">Card Title</label>
                     <input type="text" id="Card_Title" maxlength="20" class="w-100 p-1 my-1"/>
                     <label for="Card_Description" class=" fw-bold">Card Description</label>
                     <input type="text" id="Card_Description" maxlength="180" class="w-100 p-1 my-1"/>
                     <label for="Card_discounted_price" class=" fw-bold">Card discounted price</label>
                     <input type="number" id="Card_discounted_price" class="w-100 p-1 my-1"/>
                     <label for="Card_price" class=" fw-bold">Card price</label>
                     <input type="number" id="Card_price" class="w-100 p-1 my-1"/>
                     <label for="Card_price" class=" fw-bold">Add Tag</label>
                     <div class="w-100 border rounded d-flex justify-content-between align-items-center ">
                         <input type="text" id="Card_tag" class="border-0 p-1 my-1 d-inline" style="width: calc(100% - 70px);"/>
                         <button class="btn h-100 text-white bg-secondary ms-2 Card_tag_btn">add</button>
                     </div>
                 <div class="Btn_box w-100 d-flex justify-content-end my-2">
                     <button class="btn btn-primary back me-3">back</button>
                     <button class="btn btn-primary next me-3">Create Card</button>
                 </div>
                 </div>
             </div>
         </div>
         <div class="Card_preview_container  h-100">
             <h3 class="text-center my-2">Preview</h3>
             <div class="row d-flex flex-wrap p-2 justify-content-center align-items-center">
                 <div class=" col-11">
                 <div class="card" style="width:310px;">
                    <div class="img-preview" style="height:200px; width: 310px;" class="card-img-top"></div>
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between my-2"> <h5 class="card-title d-inline-block m-0">Card title</h5><div class="tag bg-dark text-white px-2 py-1 rounded d-inline-block me-3">#021</div></div>
                        <p class="card-text Card_Description text-secondary">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div class="text-secondary Card_tag_box"></div>
                    </div>
                    <div class="w-100 h-100 mx-3">
                        <div class="text-white "><span class="Discounted_price fw-bold text-decoration-line-through text-secondary">Rs : 200</span> <strong class="bg-dark d-inline px-3 py-2 rounded">Rs : <span class="Product_price">20000</span></strong></div>
                    </div>
                    </div>
                 </div>
             </div>
         </div>
     </div>
     `
    let cropper, Card_tag_data = [], All_Images_For_Card = [], selected_img
    const Card_edit_Data = main_card_editer_Modal.querySelectorAll(".data_for_card input"),
        Card_preview_container = main_card_editer_Modal.querySelector('.Card_preview_container'),
        Card_Edit_container = main_card_editer_Modal.querySelector('.Card_Edit_container'),
        Card_Title = Card_preview_container.querySelector('.card-title'),
        Card_Description = Card_preview_container.querySelector('.Card_Description'),
        Product_price = Card_preview_container.querySelector('.Product_price'),
        Card_discounted_price = Card_preview_container.querySelector('.Discounted_price'),
        Card_tag_box = Card_preview_container.querySelector('.Card_tag_box'),
        Card_tag_btn = Card_Edit_container.querySelector('.Card_tag_btn'),
        Drop_box = Card_Edit_container.querySelector('.Drop_box'),
        Drop_box_input = Card_Edit_container.querySelector('.Drop_box input'),
        img_croping_area = Card_Edit_container.querySelector('.img_croping_area'),
        Btn_box_btn_next = Card_Edit_container.querySelector('.img_croping_area .next'),
        Btn_box_btn_back = Card_Edit_container.querySelector('.img_croping_area .back'),
        Selete_For_frot_img = Card_Edit_container.querySelector('.Selete_For_frot_img'),
        selecting_img_Area = Card_Edit_container.querySelector('.selecting_img_Area'),
        Card_data = Card_Edit_container.querySelector('.Card_data'),
        Card_data_next = Card_Edit_container.querySelector('.Card_data .next'),
        Card_data_back = Card_Edit_container.querySelector('.Card_data .back'),
        Modal_close_btn = main_card_editer_Modal.querySelector('.Modal_close_btn'),
        imgContainer = Card_Edit_container.querySelector('.img_croping_area img')

    // console.log(Selete_For_frot_img)
    const Card_input_preview = (e) => {
        if (e.target.id == "Card_Title") { Card_Title.innerHTML = `${e.target.value}` }
        if (e.target.id == "Card_Description") { Card_Description.innerHTML = `${e.target.value}` }
        if (e.target.id == "Card_price") { Product_price.innerHTML = `${e.target.value}` }
        if (e.target.id == "Card_discounted_price") {
            Card_discounted_price.innerHTML = `${(e.target.value.length <= 0) ? Card_discounted_price.innerHTML = "" : 'Rs :' + e.target.value}`
            Card_discounted_price.style.padding = (e.target.value.length <= 0) ? "0" : "auto 8px"
        }
    }
    Card_edit_Data.forEach(element => {
        element.addEventListener("keyup", Card_input_preview)
        element.addEventListener("change", Card_input_preview)
    });

    const fileHandle = (file, File_name, type) => {
        if (type.split('/')[0] !== "image") return;
        Drop_box.classList.add("hide")
        Selete_For_frot_img.classList.remove("hide")
        let F_reader = new FileReader()
        F_reader.readAsDataURL(file)
        F_reader.onloadend = () => {
            All_Images_For_Card.push(F_reader.result)

            selecting_img_Area.innerHTML +=
                `<img class="rounded p-3 SelectedImg" src="${F_reader.result}" style="height: 200px; width: 200px; object-fit: cover;">`

            selected_img = selecting_img_Area.querySelectorAll('.SelectedImg');

            selected_img.forEach(elm => {
                elm.addEventListener("click", _ => {
                    seletingImg(elm)
                })

            })


        }
    }

    let seletingImg = (e) => {
        imgContainer.src = e.src;
        Selete_For_frot_img.classList.add("hide")
        img_croping_area.classList.remove("hide")

        if (cropper) {
            cropper.destroy();
        }

        var options = {
            dragMode: 'move',
            preview: '.img-preview',
            // viewMode: 2,
            modal: false,
            // background: false,
            ready: function () {
                cropper.setDragMode("move")
            },
            aspectRatio: 31 / 20,
            cropBoxResizable: false,
            cropBoxMovable: false,
            toggleDragModeOnDblclick: false,
        }
        cropper = new Cropper(imgContainer, options)

    }


    Btn_box_btn_next.addEventListener('click', () => {
        img_croping_area.classList.add("hide")
        Card_data.classList.remove("hide")
    })
    Btn_box_btn_back.addEventListener('click', () => {
        // cropper.destroy();
        img_croping_area.classList.add("hide")
        Drop_box.classList.remove("hide")
    })
    Card_data_back.addEventListener('click', () => {
        Card_data.classList.add("hide")
        img_croping_area.classList.remove("hide")
    })
    Card_data_next.addEventListener('click', () => {
        main_card_editer_Modal.classList.add("hide")
        document.querySelector('.modal_bg').classList.add('hide')
        cropper.getCroppedCanvas().toBlob((blob) => {
            let Blob_reader = new FileReader()
            Blob_reader.readAsDataURL(blob)
            Blob_reader.onloadend = () => {
                Card_created(Blob_reader.result, All_Images_For_Card, Card_Title, Card_Description, Card_discounted_price, Product_price, Card_tag_data, "021")
            }
        })
    })
    Drop_box.addEventListener("dragenter", e => {
        e.preventDefault()
        e.stopPropagation()
        e.target.style.border = "1px solid"
    })
    Drop_box.addEventListener("dragover", e => {
        e.preventDefault()
        e.stopPropagation()
        e.target.style.border = "1px solid"
    })
    Drop_box.addEventListener("drop", e => {
        e.preventDefault()
        e.stopPropagation()
        let DraggedData = e.dataTransfer;
        let Files = DraggedData.files;
        Array.from(Files).forEach((file) => {
            fileHandle(file, file.name, file.type)
        })
    })
    Drop_box_input.addEventListener("change", e => {
        console.log(e.target.files[0])
        e.preventDefault()
        e.stopPropagation()
        let DraggedData = e.target;
        let Files = DraggedData.files;
        Array.from(Files).forEach((file) => {
            fileHandle(file, file.name, file.type)
        })
    })


    Drop_box.addEventListener("dragleave", e => {
        e.preventDefault()
        e.stopPropagation()
        e.target.style.border = "1px dashed"
    })

    Modal_close_btn.onclick = () => {
        main_card_editer_Modal.classList.add("hide")
        document.querySelector('.modal_bg').classList.add('hide')
    }
    document.body.append(main_card_editer_Modal)


    const AddTagIntoCard = (e) => {

        let tag = e.target.previousElementSibling
        if (tag.value.length <= 0) return;
        let tag_for_card = document.createElement('span')
        tag_for_card.innerHTML = tag.value
        Card_tag_box.append(tag_for_card)
        Card_tag_data.push(tag.value)
        tag.value = ""
        console.log(tag.value)

    }
    Card_tag_btn.addEventListener("click", AddTagIntoCard)
}


const Create_modal_bg = () => {
    let modal_bg = document.createElement("div")
    modal_bg.classList.add("modal_bg")
    document.body.appendChild(modal_bg)
}
let Data_array = []
let Card_created = (forntIMG, AllImg, title, description, discount, price, tag, card_id) => {

    let Card_data = {
        Card_preivew_img: forntIMG,
        Card_all_imgs: AllImg,
        Card_title: title,
        Card_Description: description,
        Card_Discounted_price: discount,
        Card_Price: price,
        Card_Tags: tag,
        Card_id_no: card_id,
    }

    Data_array.push(Card_data)
    console.log(Data_array)

}
//  function Card_created  (forntIMG, AllImg, title, description, discount, price, tag , Card_id_no){

//     this.Card_preivew_img = forntIMG
//     this.Card_all_imgs = AllImg
//     this.Card_title = title
//     this.Card_Description = description
//     this.Card_Discounted_price = discount
//     this.Card_Price = price
//     this.Card_Tags = tag
//     this.Card_id_no = Card_id_no
//  }


const Open_modal = () => {
    Create_main_card_editer_Modal()
}
