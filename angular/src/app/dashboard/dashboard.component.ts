import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AppService } from '../app.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sourceA: string = "C:~~~Workplace~~~Python~~~GrantData_processing~~~UTMB_liver~~~Complete_Isotopes_02_22_2022";
  sourceB: string = "C:~~~Workplace~~~Python~~~GrantData_processing~~~UTMB_liver~~~Complete_Isotopes_02_22_2022";
  public chart: any;
  public proteins_count: number = 0;
  public proteins_cor: number = 0;
  public proteins_pval: number = 0;
  public proteins_stat: number = 0;


  constructor(private appService: AppService) {
    Chart.register(...registerables);
  }

  // startAnimationForLineChart(chart) {
  //   let seq: any, delays: any, durations: any;
  //   seq = 0;
  //   delays = 80;
  //   durations = 500;

  //   chart.on('draw', function (data) {
  //     if (data.type === 'line' || data.type === 'area') {
  //       data.element.animate({
  //         d: {
  //           begin: 600,
  //           dur: 700,
  //           from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //           to: data.path.clone().stringify(),
  //           easing: Chartist.Svg.Easing.easeOutQuint
  //         }
  //       });
  //     } else if (data.type === 'point') {
  //       seq++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq * delays,
  //           dur: durations,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq = 0;
  // };
  // startAnimationForBarChart(chart) {
  //   let seq2: any, delays2: any, durations2: any;

  //   seq2 = 0;
  //   delays2 = 80;
  //   durations2 = 500;
  //   chart.on('draw', function (data) {
  //     if (data.type === 'bar') {
  //       seq2++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq2 * delays2,
  //           dur: durations2,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq2 = 0;
  // };

  ngOnInit() {


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    // const dataDailySalesChart: any = {
    //   labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    //   series: [
    //     [12, 17, 7, 17, 23, 18, 38]
    //   ]
    // };

    // const optionsDailySalesChart: any = {
    //   lineSmooth: Chartist.Interpolation.cardinal({
    //     tension: 0
    //   }),
    //   low: 0,
    //   high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //   chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    // }

    // var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    // this.startAnimationForLineChart(dailySalesChart);


    // /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    // const dataCompletedTasksChart: any = {
    //   labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //   series: [
    //     [230, 750, 450, 300, 280, 240, 200, 190]
    //   ]
    // };

    // const optionsCompletedTasksChart: any = {
    //   lineSmooth: Chartist.Interpolation.cardinal({
    //     tension: 0
    //   }),
    //   low: 0,
    //   high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //   chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    // }

    // var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // // start animation for the Completed Tasks Chart - Line Chart
    // this.startAnimationForLineChart(completedTasksChart);



    // /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    // var datawebsiteViewsChart = {
    //   labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    //   series: [
    //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    //   ]
    // };
    // var optionswebsiteViewsChart = {
    //   axisX: {
    //     showGrid: false
    //   },
    //   low: 0,
    //   high: 1000,
    //   chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    // };
    // var responsiveOptions: any[] = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 5,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];
    // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);
  }

  on_load_click() {

    const optionsDailySalesChart: any = {
      showLine: false,

    }

    var data = this.appService.load_proteins_rate(this.sourceA, this.sourceB);

    var exp_res: any;
    data.subscribe((data) => {
      console.log("==>", data); 

      exp_res = data
      this.proteins_count = exp_res["A_rateconst"].length;
      this.proteins_cor = exp_res["r"];
      this.proteins_pval = exp_res["p"];
      this.proteins_stat = exp_res["stat"];

      var list = [];

      for (let i = 0; i < exp_res["A_rateconst"].length; i++) {
        list.push({
          'x': exp_res["A_rateconst"][i],
          'y': exp_res["B_rateconst"][i]
        })
      }

      console.log("==>", list)
      const dataDailySalesChart: any = {
        labels: [],
        series: [
          exp_res["A_rateconst"],
          exp_res["B_rateconst"]
        ]
      };

      
      // var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart)



      this.chart = new Chart("MyChart", {
        data: {
          labels: exp_res["A_rateconst"],
          datasets: [

            {
              label: 'Scatter Dataset',
              type: 'scatter',
              data: list,
              backgroundColor: 'rgb(255, 99, 132)'
            },
            {
              type: 'line',
              label: 'Line Dataset',
              data: exp_res["A_rateconst"],
              borderColor: 'rgb(75, 192, 192)'
            }]
        },
        options: {
          aspectRatio: 2.5,
          plugins: {
            legend: {
              display: false
            }
          }
        }

      });




    });
    // var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart)
    console.log("***", exp_res);
  }

}
