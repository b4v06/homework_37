import { WEATHER_API_DOMAIN } from './constants.js';
import { PICTURE_API_DOMAIN } from './constants.js';
import { fillDetails } from './showElements.js';

function getWeatherDetails(weatherUrl) {
    fetch(weatherUrl)
        .then((data) => data.json())
        .then(fillDetails)
        .catch((error) => {
            console.log(error)
            console.error(error.message);
            alert('something went wrong, please return to us in few minutes')
        })
}

function getPhoto(photoUrl) {
    console.log(photoUrl);
    fetch(photoUrl)
    .then((data) => data.json())
    .then((response) => {
        const background = document.querySelector(".background");

        const { results } = response;
        const temp = results[0];
        const { cover_photo } = temp;
        const { urls } = cover_photo;
        const { full } = urls;
        let url = `url("${full}")`;
        background.style.backgroundImage = url;
        console.log(full);

    })
    .catch((error) => {
        console.log(error)
        console.error(error.message);
        alert('something went wrong, please return to us in few minutes')
    })
}

function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city?.length >= 1) {
        getWeatherDetails(`${WEATHER_API_DOMAIN}&q=${city}`)
        getPhoto(`${PICTURE_API_DOMAIN}&query=${city}`)
    }
}

function weatherApp() {
    const form = document.getElementById('city-form');
    form.addEventListener('submit', handleSubmit)
}

weatherApp()
