const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-conatiner");
const searchform = document.querySelector("[data-searchform]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");



// current tab or default tab
let oldTab = userTab;
const API_KEY = "d00d169f2972d051d77bc2b4e97e7567";
// add current_tab (css property) properties
oldTab.classList.add("current_tab");
getfromSessionStorage();

// switching between the tabs
function switchTab(newTab){
    // both tab are different
    if(newTab != oldTab){
       oldTab.classList.remove("current_tab");
       oldTab = newTab;
       oldTab.classList.add("current_tab");
       }
 
       // if search form container is invisible make it visible
       if(!searchform.classList.contains("active")){
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        // only this will visible in UI
        searchform.classList.add("active");
       }
       else{
        // i am on search tab but now i have to visible the YourWeather tab
        searchform.classList.remove("active");
        userInfoContainer.classList.remove("active");

        // i am on weather tab , have to display whether now , so lets check local storage first for coordinates , if we hav saved them there.
          getfromSessionStorage(); 
       }
    }

 userTab.addEventListener('click' , ()=>{
    // pass clicked tab as input parameter
    switchTab(userTab);
 });
 searchTab.addEventListener('click' , ()=>{
    // pass clicked tab as input parameter
    switchTab(searchTab);
 });


 
    // check if coordinate already present in session storage
    function getfromSessionStorage(){
        const localcoordinates = sessionStorage.getItem("user-coordinates");
        if(!localcoordinates){
          //if no local coordinates
          grantAccessContainer.classList.add("active");
        }
        else{
            //if local coordinates are present then call api
            //JSON.parse ----> json string ko json object mi change karta hai
             const coordinates = JSON.parse(localcoordinates);
             fetchUserWeatherInfo(coordinates);
        }
    }

    async function fetchUserWeatherInfo(coordinates){
      const {lat,lon}= coordinates;
      // make grant container invisible
      grantAccessContainer.classList.remove("active");
      // make loding screen visible
      loadingScreen.classList.add("active");

      // API CALL
      try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const data = await response.JSON();
             
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");

      // render weather info in UI
      renderWeatherInfo(data);
      
      }
      catch(err){
      loadingScreen.classList.remove("active");
       // error     
      }
   }

   function renderWeatherInfo(weatherInfo){
      // first have to fetch the element

      const cityName  = document.querySelector("[data-cityName]");
      const countryIcon = document.querySelector("[data-country-flag]");
      const desc = document.querySelector("[data-weatherDescription]");
      const weatherIcon  = document.querySelector("[data-weatherIcon]");
      const temp  = document.querySelector("[data-temp]");
      const windSpeed  = document.querySelector("[ data-windspped]");
      const humidity  = document.querySelector("[data-humidity]");
      const cloudiness =  document.querySelector("[data-cloudiness]");
 

      // -----optional chaining operator(?.)----------- that makes easier to safely access the nested property
      //It provides a way to access properties and methods of an object without causing an error if any intermediary property or object is null or undefined. This operator is particularly useful when working with nested object structures or when dealing with optional properties that may or may not exist.

        cityName.innerText = weatherInfo?.name;

        countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

        desc.innerText = weatherInfo?.weather?.[0]?.description;

        weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

         temp.innerText = weatherInfo?.main?.temp;

         windSpeed.innerText = weatherInfo?.wind?.speed;

         humidity.innerText = weatherInfo?.main?.humidity

         cloudiness.innerText = weatherInfo?.clouds?.all;

   }

   // listner for grant access button to find current locatio of user

   function getLocation() {
      // location supported
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
   } else {
         alert("Geo Location support not available");
      }
   }

   function showPosition(position) {
          // object
      const usercoodinates = {
         lat: position.coords.latitude,
         lon: position.coords.longitude,
      }

      sessionStorage.setItem("user-coordinates" , JSON.stringify(usercoodinates));

      // show i UI
      fetchUserWeatherInfo(usercoodinates);
   }
    

   const grantAccessButton = document.querySelector("[data-grantAccess]");
   grantAccessButton.addEventListener("click" , getLocation);


   // api call function for search tab

   // 1st have to fetch input value
   const searchInput = document.querySelector("[data-search-Input]");

   searchform.addEventListener("submit" , (e)=>{
      // prevent default function of submit
        e.preventDefault();
        let cityName = searchInput.value;

        if(cityName === ""){
         return;
        }
        else{
         fetchUserWeatherInfo(cityName);
        }

   } )

   async function fetchUserWeatherInfo(city){
      loadingScreen.classList.add("active");
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");

      try{
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

         const data = await response.JSON();

         loadingScreen.classList.remove("active");
         userInfoContainer.classList.add("active");

         renderWeatherInfo(data);
      }
      catch(err){
   // error
      }
   }
