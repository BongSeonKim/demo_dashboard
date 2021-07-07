<template>
  <div>
    <!--Charts-->
    <div class="row">
      <canvas id="chart1"></canvas>
      <!-- <h1>{{message}}</h1> -->
    </div>
  </div>
</template>
<script>
//import { StatsCard, ChartCard } from "@/components/index";
import Chart from "chart.js/auto";
import axios from "axios";
import axiosCros from "vue-axios-cors";
//import Chartist from 'chartist';

export default {
  // components: {
  //   StatsCard,
  //   ChartCard
  // },
  data() {
    return {
      //message: 'chart'
      chartdata1: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      } //chartdata1
    };
    //return
  },

  mounted() {
    //this.drawChart('chart1', this.chartdata1);
    this.chartdata1.data.labels = ["1", "2", "3", "4"];
    this.chartdata1.data.datasets[0].label = "실시간 데이터";
    this.chartdata1.data.datasets[0].data = [10, 20, 30, 40];
    this.drawChart("chart1", this.chartdata1);
    //this.message = "data"
    this.fillData(20, 0);
  },
  methods: {
    drawChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const chartObj = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },

    fillData(limit, offset) {
      axios
        .get(
          "http://localhost:8081/api/chart1"
          // , {
          //   headers: {
          //     "Access-Control-Allow-Origin": "*"
          //   }
          // }
        )
        .then(
          res => {
            if (offset === 0) {
              // if first request let's receive 20 rows of data/labels
              //this.chartData.labels = res.body.chart_data.labels;
              //this.chartData.datasets = res.body.chart_data.datasets;
              this.chartdata1.data.labels = ["1", "2", "3", "4"];
              this.chartdata1.data.datasets[0].label = "실시간 데이터";
              this.chartdata1.data.datasets[0].data = [10, 20, 30, 40];
            } else {
              this.chartData1.data.labels.splice(0, limit); // remove the first label
              this.chartData1.data.labels.push(...res.body.chart_data.labels); // like python unpack
              for (var i = 0; i < res.body.chart_data.datasets.length; i++) {
                this.chartData.datasets[i].data.splice(0, limit);
                this.chartData.datasets[i].data.push(
                  ...res.body.chart_data.datasets[i].data
                );
              }
            }
            this.chartData.update_flag ^= 1; // toggle 0 or 1 just to trigger watch in line-chart component
          },
          err => {
            console.log(err);
          }
        )
        .then(() => {
          // this will happen always
          setTimeout(this.fillData, 1000, 1, offset + limit); // preparing next request
        });
    },

    updateChart(chartId, xLabel, dataLabel, vData) {
      const ctx = document.getElementById(chartId);
      const chartObj = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
};
</script>
<style></style>
