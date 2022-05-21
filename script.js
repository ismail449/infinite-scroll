
import apiKey from "./apiKey.js";
//getting elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0; 
let totalImages = 0;

//Unsplash API
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const onImageLoaded = ()=>{
	imagesLoaded++;
	if(imagesLoaded === totalImages){
		ready = true;
		loader.hidden = true;
	}
}

//creating elements for an a tag and an img tag and adding them to the DOM
const displayPhotos = () => {
	totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const aTag = document.createElement('a');
    aTag.href = photo.links.html;
    aTag.target = '_blank';

    const img = document.createElement('img');
    img.src = photo.urls.regular;
    img.alt = photo.alt_description || 'image';
    img.title = photo.alt_description || 'image';

		img.addEventListener('load', onImageLoaded)

    aTag.appendChild(img);
    imageContainer.appendChild(aTag);
  });
};

//Getting photos from unsplash api

const fetchPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

//check if we get to the end of the page

window.addEventListener('scroll', ()=>{
	if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready ){
		ready = false;
		imagesLoaded = 0;
		fetchPhotos();
	}
})

//when page loades
fetchPhotos();
