var pos; // Data pulled from the Weather API
var lat;
var lon;
var cityName;
var wind; 
var clouds;
var temp;
var humidity;
var main;
var weatherApiKey = "f406aa62a7893a89da4fff06d213a66b";
var weather = document.getElementById("weather");// weather description
var background = document.body.style; // grabs the body's background
var units = document.getElementById("temp"); //grabs the element containing the temperature
var press = false; // default variable for the temperature button


function IP(){
	var loc = new XMLHttpRequest();
	loc.open('GET','https://ipinfo.io/geo', true)
	loc.onreadystatechange = function(){
		if (loc.readyState === XMLHttpRequest.DONE && loc.status === 200){
			info = JSON.parse(loc.responseText);
      console.log(info);
			pos = info.city + ',' + info.country;
			weatherGet();
		}
	};
	loc.send();
}

function weatherGet(){
	var weather = new XMLHttpRequest();
	weather.open('GET', "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + pos + "&units=imperial&appid=" + weatherApiKey, true);
	weather.onreadystatechange = function(){
		if (weather.readyState === XMLHttpRequest.DONE && weather.status === 200){
			var data = JSON.parse(weather.responseText);
			cityName = data.name + ", " + data.sys.country // city, country
			wind = data.wind.speed + "mph"; //wind speed
			clouds = data.clouds.all; //cloudiness %
			temp = data.main.temp; //temperature in fahrenheit
			humidity = data.main.humidity; // humidity
			main = data.weather[0].main; //weather information
			displayInfo();	
			backGround();
		}
	};
	weather.send();
}

function backGround(){ // decides the background
	var smallCaps = main.toLowerCase();
	if(smallCaps === "clear"){
		background.backgroundImage = "url('images/sunny.jpg')";
	} else if (smallCaps === "rain"){
		background.backgroundImage = "url('images/rainy.jpg')";
	} else if (smallCaps === "clouds"){
		background.backgroundImage = "url('images/cloudy.jpg')";
	} else if (smallCaps === "drizzle"){
		background.backgroundImage = "url('images/drizzle.jpeg')";
	} else if (smallCaps === "snow"){
		background.backgroundImage = "url('images/SNOW.jpg')";
	}
}

function displayInfo(){
	units.innerHTML = Math.floor(temp) + "&deg;F"; // displays the temp
	document.getElementById("city").innerHTML = cityName; // displays the location
	document.getElementById("wind").innerHTML = "Wind: " + wind; //displays the wind speed
	weather.innerHTML = main; //displays weather
}

function toggle(){ // fahrenheit/ celcius button conversion
	if (press === false){
		units.innerHTML = Math.floor((temp - 32)*5/9) + "&deg;C";
		press = true;
	} else{
		units.innerHTML = Math.floor(temp) + "&deg;F";
		press = false;
	}
}

document.getElementById("press").addEventListener("click", function(){ // listens for button click
	toggle();
});


IP();

