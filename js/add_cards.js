import { dbremove, db, dbRef, dbset, onValue, dbUpdate ,Storage , StoreRef ,uploadBytesResumable , getDownloadURL, dbpush} from "../js/firebase.js";



const Create_main_card_editer_Modal = () => {
    let modal_bg = document.createElement("div")
    modal_bg.classList.add("modal_bg_on")
    document.body.append(modal_bg)
    let main_card_editer_Modal = document.createElement('div')
    main_card_editer_Modal.className = "main_card_editer container m-0 p-0 w-100 h-100"
    main_card_editer_Modal.innerHTML = `
    <div class="d-flex row justify-content-between align-items-center p-3"><h2 class="fw-bolder w-25 m-0">Card Edit</h2><span class="Modal_close_btn  fs-1 px-2"  style="width: fit-content;">&#215;</span></div>
    <div class=" row w-100 m-0 h-100 d-flex justify-content-center align-items-center">
    <div class="col-md-6 col-sm-12  Card_Edit_container h-100 d-flex  justify-content-center align-items-center ">
        
        <div class="Card_Crop_img_box border w-100 d-flex justify-content-center align-items-center Drop_box ">
            <input type="file" id="Crop_Img_Upload" hidden>
            <label for="Crop_Img_Upload" class="py-1 px-2 text-white bg-info rounded"> Upload image </label>
        </div>
        <div class="container Selete_For_frot_img py-2 px1 d-flex flex-column justify-content-center align-items-center hide">
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

               <div class="text writing">
                   <input type="text" id="Card_Title" maxlength="20" />
                   <label for="Card_Title" class=" fw-bold">Card Title</label>
                      <span></span>
                 </div>
                 <div class="textarea writing">
                     <textarea type="text" id="Card_Description"></textarea>
                     <label for="Card_Description" class=" fw-bold">Card Description</label>
                   <span></span>
                 </div>
                 <div class="text writing">
                     <input type="number" id="Card_discounted_price"/>
                       <label for="Card_discounted_price" class=" fw-bold">Card discounted price</label>
                         <span></span>
                 </div>
                 <div class="text writing">
                     <input type="number" id="Card_price" />
                     <label for="Card_price" class=" fw-bold">Card price</label>
                     <span></span>
                   </div>
                   <div class="text writing">
                           <input type="text" id="Card_tag"/>
                           <label for="Card_tag">Add Tag</label>
                           <span></span>
                           <button class="btn h-100  my-3 text-white bg-success ms-2 Card_tag_btn">add</button>
                    </div>

            <div class="Btn_box w-100 d-flex justify-content-end my-2">
                <button class="btn btn-primary back me-3">back</button>
                <button class="btn btn-primary next me-3">Create Card</button>
            </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-12 d-flex flex-column align-items-center Card_preview_container  h-100" style="min-width: 320px;">
        <h3 class="text-center my-2">Preview</h3>
        <div class="row d-flex flex-wrap p-2 justify-content-center align-items-center">
            <div class=" col-11">
            <div class="card" style="width:310px;">
               <div class="img-preview" style="height:200px; width: 310px;" class="card-img-top"></div>
               <div class="card-body">
                   <div class="d-flex align-items-center justify-content-between my-2"> <h5 class="card-title d-inline-block m-0">Card title</h5><div class="tag Card_id_no bg-dark text-white px-2 py-1 rounded d-inline-block me-3">ID No</div></div>
                   <p class="card-text Card_Description text-secondary">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                   <div class="text-secondary Card_tag_box"></div>
               </div>
               <div class="w-100 h-100 m-3">
                   <div class="text-white "><span class="Discounted_price fw-bold text-decoration-line-through text-secondary">Rs : 200</span> <strong class="bg-dark d-inline px-3 py-2 rounded">Rs : <span class="Product_price">20000</span></strong></div>
               </div>
               </div>
            </div>
        </div>
    </div>
</div>
     `
    let cropper, Card_tag_data = [], All_Images_For_Card = [], selected_img , MAX_id_no = [] 
    const Card_edit_Data = main_card_editer_Modal.querySelectorAll(".data_for_card input , textarea"),
        Card_preview_container = main_card_editer_Modal.querySelector('.Card_preview_container'),
        Card_Edit_container = main_card_editer_Modal.querySelector('.Card_Edit_container'),
        Card_Title = Card_preview_container.querySelector('.card-title'),
        Card_id_no = Card_preview_container.querySelector('.Card_id_no'),
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

    main_card_editer_Modal.querySelectorAll('.writing :is(input , textarea)').forEach(writinginput => {
        writinginput.addEventListener('input', () => {
          if (writinginput.value.trim() !== '') {
            writinginput.classList.add('has-text');
          } else {
            writinginput.classList.remove('has-text');
          }
        });
      });
      
      
      /* Alto de textarea */
      main_card_editer_Modal.querySelectorAll('.textarea textarea').forEach(textarea => {
        textarea.addEventListener('input', () => {
          textarea.style.height = '1em';
          const scrollHeight = textarea.scrollHeight;
          textarea.style.height = `${scrollHeight}px`;
        });
      });



    const Card_input_preview = (e) => {
        if (e.target.id == "Card_Title") { Card_Title.innerHTML = `${e.target.value}` }
        if (e.target.id == "Card_Description") { Card_Description.innerText = `${e.target.value}`}
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
        All_Images_For_Card.push(file)

        let F_reader = new FileReader()
        F_reader.readAsDataURL(file)
        F_reader.onloadend = () => {
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
        document.querySelector('.modal_bg_on').classList.add('hide')
        cropper.getCroppedCanvas().toBlob((blob) => {
                 let im =  new File([blob], "image" , {type : blob.type})

                let Ref = dbRef(db , "Products/")
                onValue(Ref , (snap)=>{
                    let data = Object.values(snap.val())
                    for (let i = 0; i < data.length; i++) {
                        MAX_id_no.push(data[i].Card_id_no)
                    }
                })
                let ID_no  = Math.max(...MAX_id_no) + 1;
                Card_created(im, All_Images_For_Card, Card_Title, Card_Description, Card_discounted_price, Product_price, Card_tag_data, ID_no)
                
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
        modal_bg.classList.add('hide')
    }
    modal_bg.onclick = () => {
        Modal_close_btn.click()
    }
    document.body.append(main_card_editer_Modal)


    const AddTagIntoCard = (e) => {
        let tag = e.target.previousElementSibling.previousElementSibling.previousElementSibling
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


}

// let Data_array = []
let Card_created  = async (forntIMG, AllImg, Card_title, description, discount, price, tag, card_id) => {
    console.log(forntIMG)
    console.log(AllImg)


let uploadfile = (file) => {
    return new Promise((resolve, reject) => {
      console.log(file);
      const storageRef = StoreRef(Storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
    
  let ALL_IMAGES = []
  console.log(AllImg)
for (let i = 0; i < AllImg.length; i++) {
    let Al_Img   = await uploadfile(AllImg[i])
    ALL_IMAGES.push(Al_Img)
}


 let fonTimg  = await uploadfile(forntIMG)



 let dBRef = dbpush(dbRef(db , "Products/"))



    let Card_data = {
        Card_preivew_img: fonTimg,
        Card_all_imgs: ALL_IMAGES,
        Card_title: Card_title.innerText,
        Card_Description: description.innerText,
        Card_Discounted_price: discount.innerText,
        Card_Price: price.innerText,
        Card_Tags: tag,
        Card_id_no: card_id,
        id: dBRef.key
    }
    console.log(Card_data)
    dbset(dBRef , Card_data)


}

let Open_modal_btn = document.querySelector('.ADD_NEW_CARD_BTN button')

Open_modal_btn.addEventListener("click", () => {
    Create_main_card_editer_Modal()
})


