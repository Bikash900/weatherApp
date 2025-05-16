// This is a simple weather API fetch example using the WeatherAPI.

// http://api.weatherapi.com/v1/current.json?key=31753b1d82204def97a25404250205&q=akron,oh&aqi=no

let apiKey ="31753b1d82204def97a25404250205";


//this get temperature 
const temperatureField = document.querySelector(".temp");
//this get location name
const locationField =  document.getElementById("location_Name");
//this get date and time
const dateAndTimeField = document.getElementById("dateAndTime");
//this get condition
const conditioinField = document.querySelector(".conditionField");


//this get search field
const searchField = document.querySelector(".search_Area");
//this get search button
const form = document.querySelector('form');







form.addEventListener('submit', searchForLocation)


//default location
let searchLocation = "akron,oh";

//this is the function that will be called to fetch the weather data
const fetchResults = async (placeSearch) => {
    //this is the url that will be used to fetch the weather data
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${placeSearch}&aqi=no`;
        const res = await fetch(url);
        const data = await res.json();

        console.log(data)
        const locationName = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        const locationTime = data.location.localtime;
        const locationTemp = data.current.temp_f;
        const locationCondition = data.current.condition.text;
        console.log(locationCondition);

        updateUI(locationTemp, locationName, locationTime, locationCondition);

        


    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
    }

    
};

function updateUI(locationTemp, locationName, locationTime, locationCondition) {

    // spliting the date and time to get the neme of the day
    let splitTime = locationTime.split(' ')[1];
    let splitDate = locationTime.split(' ')[0];
    //geting the day name from the date
    let currentDay = getDayName(new Date(splitDate).getDay()) ;

    //updating the UI with the data
    temperatureField.innerHTML = "Temp: " +  locationTemp + "°F";
    locationField.innerHTML = "Loction: " + locationName;
    dateAndTimeField.innerHTML = ` Time:  ${splitTime}, ${currentDay}, ${splitDate}`;
    conditioinField.innerHTML = "Conditoin: " + locationCondition;
    
}

//this is the function that will be called when the user clicks the search button
function searchForLocation(e) {
    e.preventDefault(); 
    searchLocation = searchField.value;
    fetchResults(searchLocation);
}

//this is the function that will be called when the page loads
fetchResults(searchLocation);

//this is the function that will be called to get the name of the day from the date
function getDayName(dayIndex) { 
    switch (dayIndex) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    } 
    return "Invalid day index";
}