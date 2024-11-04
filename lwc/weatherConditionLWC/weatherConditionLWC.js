import { api, LightningElement, track, wire } from 'lwc';
import forecast from "@salesforce/label/c.FORECAST";
import description from "@salesforce/label/c.DESCRIPTION";
import cityNotFound from "salesforce/label/c.CITYNOTFOUND";
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CITY from '@salesforce/schema/Opportunity.City__c';

const FIELDS = [
    'Opportunity.City__c'
]

export default class WeatherConditionLWC extends LightningElement {

    @api recordId;
    cityName;
    @track showCityNotFound;
    @track weatherMain;
    @track weatherDescription;

    label = {
        forecast,
        description,
        cityNotFound,
    };

    @wire(getRecord, { recordId: '$recordId', fields: [CITY] })
    wiredRecord({data}) {
        if (data) {
            this.cityName = getFieldValue(data, CITY);
            console.log("++"+JSON.stringify(data));
            this.openWeatherCallout();
        }
    }

    openWeatherCallout() {

        let endPoint = "https://api.openweathermap.org/data/2.5/weather?q="+this.cityName+"&appid=0d8005c4d835c4c9cd83f066560e5351";
        fetch(endPoint,{method: 'GET'})
        .then(resp => resp.json())
        .then(resp => {
            console.log(JSON.stringify(resp));
            this.weatherDescription = resp.weather[0].description;
            this.weatherMain = resp.weather[0].main;
            this.showCityNotFound = false;
        })
        .catch(error => {
            this.weatherDescription = '...';
            this.weatherMain = '...';
            this.showCityNotFound = true;
        })

        //this.handleFetch()
    }

    /*async connectedCallback() {

        console.log(">>>>"+this.cityName);

        let endPoint = "https://api.openweathermap.org/data/2.5/weather?q="+this.cityName+"&appid=0d8005c4d835c4c9cd83f066560e5351";
        console.log("endP:"+endPoint);
        fetch(endPoint,{method: 'GET'})
        .then(resp => resp.json())
        .then(resp => {
            console.log(JSON.stringify(resp));
            this.weatherDescription = resp.weather[0].description;
            this.weatherMain = resp.weather[0].main;
        })

        //this.handleFetch()
    }*/

    /*async handleFetch() {
        try {
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=0d8005c4d835c4c9cd83f066560e5351");
            if (!response.ok) {
                throw Error(response);
            }
            this.data = await response.json();
        } catch (error) {
            console.error("There's a problem with your fetch operation:", error);
        } finally {
            // do something regardless of whether the operation was successful
        }
      }*/
}