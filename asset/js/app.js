// import {data} from "./data.js"

const canvasElement = document.createElement("canvas");

let nameInput;
let fontFamily;
const fontFamilyList = Object.keys(data);
console.log("fontFamilyList:", fontFamilyList);

function fontFamilyListFun() {
  $(".fontfamilydiv").empty();
  const div = document.createElement("div");
  div.setAttribute("class", "mb-3");
  div.innerHTML = `
    <label for="fontFamily" class="form-label">font Family</label>
    <select class="form-select" onchange="wished()" id="fontFamily">
        ${fontFamilyList
          .map((font) => `<option value="${font}">${font}</option>`)
          .join("")}
    </select>
    `;
  $(".fontfamilydiv").append(div);
}
fontFamilyListFun();

function wished() {
  console.log("okay");
  // getting the data

  nameInput = $("#nameInput");
  console.log("nameInput:", nameInput);
  fontFamily = $("#fontFamily");

  // validate
  //   if(validator.isEmpty(nameInput.val())) return alertUser(`Please enter a name`)

  createCanvas({
    name: nameInput.val(),
    fontFamily: fontFamily.val(),
  });

  console.log("end");
}

async function createCanvas({ name, fontFamily }) {
  const meta = data[fontFamily];

  const image = new Image();
  image.src = `./asset/image/${fontFamily}.png`;
  image.onload = function () {
    $(".viewImage").empty();
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    const ctx = canvasElement.getContext("2d");
    ctx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
    const text = `${meta.fontWeight} ${meta.fontSize || 20}px ${meta.fontFamily}`;
    console.log("text:", text);
    ctx.fillStyle = `${meta.color}`;
    ctx.font = text;
    ctx.fillText(name, meta.postionX || 20, meta.postionY || 25);
    const showImage = document.createElement("img");
    showImage.src = canvasElement.toDataURL("image/png");
    showImage.width = canvasElement.width / 3;
    showImage.height = canvasElement.height / 3;
    $(".viewImage").append(showImage);
    // document.getElementById("gg").style.fontFamily = meta.fontFamily
  };
}

function alertUser(message) {
  console.log("message:", message);
  const text = `
      <div class="alert alert-danger" role="alert">
      ${message}
    </div>
      `;
  $("#alert").html(text);
  $("#alert").show();
  setTimeout(() => {
    $("#alert").empty();
  }, 3000);
}

function downloadImage(filename = "image.png") {
  var element = document.createElement("a");
  element.href = canvasElement.toDataURL("image/png");
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
