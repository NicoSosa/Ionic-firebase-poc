import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.scss'],
})
export class ChartsViewComponent implements OnInit {
  public tittleToolbar: string = 'Chart Info';
    
  lineChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: 'Meet Empanada',
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: false,
      data: [12,5,32,30,26,12,25],
      yAxisID: 'y-axis-1',
    }, {
      label: 'Alfajor',
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: false,
      data: [32,12,30,20,6,12,25],
      yAxisID: 'y-axis-2'
    }, {
      label: 'Chicken Empanada',
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      fill: false,
      data: [2,6,12,46,23,15,8],
      yAxisID: 'y-axis-3'
    }, {
      label: 'Soup',
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
      data: [36,5,12,25,5,20,23],
      yAxisID: 'y-axis-4'
    }]
  };
  options = {
    responsive: true,
    interaction: {
      mode: 'index'
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
      }
    },
    scales: {
      yAxes:[
        {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
          stacked: true
        },
        {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          position: 'right',
          id: 'y-axis-2',
          stacked: true,
  
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
        {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          stacked: true
        },
        {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: false,
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          stacked: true
        },
      ]
    }
  }


  constructor() { }

  ngOnInit() {
    var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: this.lineChartData,
    options: this.options
});
  //   var myLineChart = new Chart(ctx, {
  //     type: 'line',
  //     data: data,
  //     options: options
  // });
  }

  setDataChart() {

		
  }
}
