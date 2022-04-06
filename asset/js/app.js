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
    <select class="form-select" id="fontFamily">
        ${fontFamilyList
          .map((font) => `<option value="${font}">${font}</option>`)
          .join("")}
    </select>
    `;
  $(".fontfamilydiv").append(div);
}
fontFamilyListFun();

function addSpaceText({string}) {
  console.log('string:', string)
  const addSpace = Math.floor((12 - string.length) / 2)
  console.log('addSpace:', addSpace)
  return `${Array(addSpace).fill('\xa0').join('')}${string}${Array(addSpace).fill('\xa0').join('')}`
}

function wished() {
  // getting the data

  nameInput = $("#nameInput");
  fontFamily = $("#fontFamily");

  // validate
  //   if(validator.isEmpty(nameInput.val())) return alertUser(`Please enter a name`)

   createCanvas({
    name: addSpaceText({string: nameInput.val()}),
    fontFamily: fontFamily.val(),
  });

  // const gg = addSpaceText({string: nameInput.val()})
  // console.log('gg:', gg)

  console.log("end");
}

// function showUs(){
//   fontFamily = $("#fontFamily")
//   const meta = data[fontFamily.val()];
//   $(".showUs").css("font-family",meta.fontFamily)
// }

function createCanvas({ name, fontFamily }) {
  const meta = data[fontFamily];
  $(".showUs").empty()
  $(".showUs").css("font-family",meta.fontFamily)
  $(".showUs").text(meta.fontFamily)
  const image = new Image();
  image.src = meta.url;
  image.crossOrigin="anonymous"
  image.onload = function () {
    $(".viewImage").empty();
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    const ctx = canvasElement.getContext("2d");
    ctx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
    const text = `${meta.fontWeight} ${meta.fontSize}px ${meta.fontFamily}`;
    console.log("text:", text);
    ctx.fillStyle = `${meta.color}`;
    ctx.font = text;
    ctx.fillText(name, meta.postionX, meta.postionY);
    const showImage = document.createElement("img");
    showImage.src = canvasElement.toDataURL("image/png");
    showImage.width = canvasElement.width / 1.5;
    showImage.height = canvasElement.height / 1.5;
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
