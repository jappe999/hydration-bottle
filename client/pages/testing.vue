<template>
<div>
  <div class="flex">
    <line-chart class="p-8"
      :chart-data="datacollection"
      :options="options"/>
    <bar-chart class="p-8" 
      :chart-data="datatoday"
      :options="options"/>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="fillData()">Randomize</button>
  </div>
  <div>
      <img id="flesmeter" src="~/static/flessen/100fles.svg" alt="" srcset="">
  </div>
  </div>
</template>

<script>
  import LineChart from '~/components/charts/linechart.js'
  import BarChart from '~/components/charts/barchart.js'

  export default {
    components: {
      LineChart,
      BarChart
    },
    data () {
      return {
        datacollection: null,
        datatoday: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          datasets: [
            {
              label: 'Times used in a week',
              backgroundColor: '#BCDEFA',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
        this.datatoday = {
          labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
          datasets: [
            {
              label: 'Times used today',
              backgroundColor: '#6574CD',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>