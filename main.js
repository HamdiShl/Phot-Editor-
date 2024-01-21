//get the input by ID
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let huerotate = document.getElementById('hue-rotate');

//get img by ID

let img = document.getElementById('img');

//get the button by ID

let download = document.getElementById('download');
let upload = document.getElementById('upload');

// get the button Reset by element span 
let reset = document.querySelector('span');

// get the div img_box by class
let imgBox = document.querySelector('.img-box');

// get the canvas element by id 

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')
// this function runs in the first of onchange function to make the filter by default 
function resetValue() {
    img.style.filter='none';
    saturate.value='100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value ='0';
    blur.value = '0';
    huerotate.value = '0';
}


// make this element hidden when the page loaded
window.onload= function(){
    download.style.display='none';
    reset.style.display='none';
    imgBox.style.display='none';

}


upload.onchange = function() {

    resetValue();

    // when i select an image the button download and reset appears
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block';

    // create a class file reader can read the input file
    let file = new FileReader ();

    // read the data from upload,  
    file.readAsDataURL(upload.files[0]);

    // check if the file has been uploaded
    file.onload = function(){
        img.src=file.result;
    }

    // draw an image with canvas 
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0, canvas.width,canvas.height);
        img.style.display ='none';
    }

}

// get all of the input by element ul li input
let filters = document.querySelectorAll("ul li input");

// make all filters in forEach and make it work
filters.forEach( filter => {
    filter.addEventListener('input', function(){
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
        `
        ctx.drawImage(img,0,0, canvas.width,canvas.height);
    })
});

download.onclick = function() {
    download.href=canvas.toDataURL();
}