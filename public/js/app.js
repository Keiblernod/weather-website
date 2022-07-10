const weatherForm = document.querySelector("form");
const searchElement = document.querySelector('input');

const fetchWeather = (address) => {
    fetch('/weather?address="'+address+'"').then((response) => {
        document.getElementById('weather').textContent = "Loading..."
        response.json().then((data) => {
            if(!data.error){
                document.getElementById('icon').src = data.icon;
                document.getElementById('icon').alt = data.description;
                document.getElementById('weather').textContent = "Today in "+ data.location+" it is "+data.description+" and " + data.temperature + " but it feels like "+ data.feelslike;
            } else {
                document.getElementById('icon').src = "";
                document.getElementById('icon').alt = "";
                document.getElementById('weather').textContent = data.error;
            }
            });
    });
};

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;
    fetchWeather(location);

});