import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import { ChartType } from 'chart.js';
// import { MultiDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
// import { Label } from 'ng2-charts';
// import { ChoroplethController } from 'chartjs-chart-geo';

import * as Chart from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";
import { CountryMapService } from '../../services/country-map.service';
import { RestService } from 'src/app/services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class DashboardComponent implements OnInit {

geoMap;

barChartOptions: ChartOptions = {
  responsive: true,
};

barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
barChartType: ChartType = 'bar';

// barChartLegend = true;
// barChartPlugins = [];

barChartData: ChartDataSets[] = [
  { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
];
results;
upcomming :string[] = [];
past :string[] = [];
launchpad :string[] = [];;


  constructor(private _geoMap : CountryMapService, private _restService : RestService,     private toaster : ToastrService,) { }

  ngOnInit(): void {
    this._geoMap.__geo.subscribe((data) => { this.geoMap = data });
    // this.generateMap();
    this.getAllLaunch();
    this.getLaunchPad();
    
  }

  generateMap(dataList) {
        var geoData = ChartGeo.topojson.feature(this.geoMap, this.geoMap.objects.usa).features;
        for (let i in geoData) {
          if(dataList.includes(geoData[i].properties.name)){
            geoData[i].properties.deploy = 0.03;
          }else{
            geoData[i].properties.deploy = 0.028;
          }
      
          
        }

        let dts = {
          labels: geoData.map(i => i.properties.name),
          datasets: [
            {
              outline: geoData,
              data: geoData.map(i => ({
                feature: i,
                value: i.properties.deploy
              }))
            }
          ]
        };

        let configOptions = {
          maintainAspectRatio: true,
          responsive: true,
          showOutline: false,
          showGraticule: false,
          labels :false,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
       },
          // scale: {
          //   projection: "mercator"
          // } as any,
          // geo: {
          //   colorScale: {
          //     display: false,
          //     // interpolate: "reds",
          //     missing: "white",
          //     legend: {
          //       display: false,
          //     }
          //   }
          // }
        };

        new Chart(
          <HTMLCanvasElement>document.getElementById("confirmedGeoCanvas"),
          {
            type: "choropleth",
            data: dts,
            options: configOptions
          }
        );
  }

getAllLaunch(){
  this._restService.getAll('launches').subscribe(
    (data)=>{
     this.results = data;
     this.results.forEach(element => {
        if(element.upcoming === false){
          this.past.push('dd');
        }else{
          this.upcomming.push(element);
        }

     });
      // this.upcomming;
      // this.past;
      // this.total
      console.log(data);
    },
    (error)=>{
      this.toaster.error(error.error);
      console.log(error)
    },
 );
}

getLaunchPad(){
  this._restService.getAll('launchpads').subscribe(
    (data)=>{
    let launch : any = data;
    console.log(launch);
     launch.forEach(element => {
      const stateName = this.closestLocation(element.location, this.geoMap.statesName);
        this.launchpad.push(stateName['state']);
     
     });
     this.generateMap(this.launchpad)
    //  console.log(this.launchpad);
    },
    (error)=>{
      this.toaster.error(error.error);
      console.log(error)
    },
 );
}

  ConvertString(value){
    return parseFloat(value)
  }


closestLocation(targetLocation, locationData) {
    function vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    function locationDistance(location1, location2) {
        var dx = location1.latitude - location2.latitude,
            dy = location1.longitude - location2.longitude;

        return vectorDistance(dx, dy);
    }

    return locationData.reduce(function(prev, curr) {
        var prevDistance = locationDistance(targetLocation , prev),
            currDistance = locationDistance(targetLocation , curr);
        return (prevDistance < currDistance) ? prev : curr;
    });
} 


  
}
