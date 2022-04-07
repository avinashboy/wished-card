const canvasElement = document.createElement("canvas");

let nameInput;
let fontFamily;
const fontFamilyList = Object.entries(data);


async function loadFonts({fontName, fontUrl}) {
  const font = new FontFace(fontName, `url(${fontUrl})`);
  await font.load();
  document.fonts.add(font);
  return
}

function fontFamilyListFun() {
  $(".fontfamilydiv").empty();
  const div = document.createElement("div");
  div.setAttribute("class", "mb-3");
  div.innerHTML = `
    <label for="fontFamily" class="form-label">font Family</label>
    <select class="form-select" id="fontFamily">
        ${fontFamilyList
          .map((font) => {
            loadFonts({fontName:font[1].fontName, fontUrl:font[1].fontUrl})
            return `<option value="${font[0]}">${font[0]}</option>`
          })
          .join("")
        }
    </select>
    `;
  $(".fontfamilydiv").append(div);
}
fontFamilyListFun();

function addSpaceText({ string }) {
  const addSpace = Math.floor((12 - string.length) / 2);
  return `${Array(addSpace).fill("\xa0").join("")}${string}${Array(addSpace)
    .fill("\xa0")
    .join("")}`;
}

function wished() {
  // getting the data
  nameInput = $("#nameInput");
  fontFamily = $("#fontFamily");

  // validate
  if (validator.isEmpty(nameInput.val()))
    return alertUser(`Please enter a name`);

  createCanvas({
    name: addSpaceText({ string: nameInput.val() }),
    fontFamily: fontFamily.val(),
  });


}

function createCanvas({ name, fontFamily }) {
  const meta = data[fontFamily];
  $(".showUs").empty();
  $(".showUs").css("font-family", meta.fontFamily);
  $(".showUs").text(meta.fontFamily);
  const image = new Image();
  image.src = meta.url;
  image.crossOrigin = "anonymous";
  image.onload = function () {
    $(".viewImage").empty();
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    const ctx = canvasElement.getContext("2d");
    ctx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
    const text = `${meta.fontWeight} ${meta.fontSize}px ${meta.fontFamily}`;
    ctx.fillStyle = `${meta.color}`;
    ctx.font = text;
    ctx.fillText(name, meta.postionX, meta.postionY);
    const showImage = document.createElement("img");
    showImage.src = canvasElement.toDataURL("image/png");
    showImage.width = canvasElement.width / 1.5;
    showImage.height = canvasElement.height / 1.5;
    $(".viewImage").append(showImage);
  };
}

function alertUser(message) {
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
