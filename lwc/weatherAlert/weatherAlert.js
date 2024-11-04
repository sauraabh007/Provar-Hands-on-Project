import { LightningElement, track } from 'lwc';

export default class WeatherAlert extends LightningElement {
    @track weatherMain;
    @track showWarning;
    @track showCityNotFound;
    @track cityName = '';

    setValue(event){
        this.cityName = event.target.value;
        this.showCityNotFound = false;
        this.showWarning = false;
    }

    openWeatherCallout(event) {
        console.log(this.cityName);

        let endPoint = "https://api.openweathermap.org/data/2.5/weather?q="+this.cityName+"&appid=0d8005c4d835c4c9cd83f066560e5351";
        fetch(endPoint,{method: 'GET'})
        .then(resp => resp.json())
        .then(resp => {
            console.log(">>>"+JSON.stringify(resp));
            this.weatherMain = resp.weather[0].main;
            //if(this.weatherMain == 'Thunderstorm' || this.weatherMain == 'Snow'){
            if(this.weatherMain == 'Clouds'){
                this.showWarning = true;
            }else{
                this.showWarning = false;
            }
            this.showCityNotFound = false;
        })
        .catch(error => {
            this.showCityNotFound = true;
            this.showWarning = false;
        })
    }
}