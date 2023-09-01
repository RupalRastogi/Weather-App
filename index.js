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
            //if local coordinates are present

        }
    }