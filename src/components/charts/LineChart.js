import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                data:[],
                label:'west',
                borderColor: "#FF0000",
                fill: false
            },{
                data:[],
                label:'national',
                borderColor: "#1E90FF",
                fill: false
            },{
                data:[],
                label:'east',
                borderColor: "#000080",
                fill: false
            },{
                data:[],
                label:'central',
                borderColor: "#87CEEB",
                fill: false
            },{
                data:[],
                label:'south',
                borderColor: "#BC8F8F",
                fill: false
            },{
                data:[],
                label:'north',
                borderColor: "#00FA9A",
                fill: false
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            // console.log(response)
            response.data.items.forEach(data => { 
                // console.log(data)
                this.datacollection.labels.push(data.timestamp)
                var readings = data.readings.psi_twenty_four_hourly
                // console.log(readings)
                this.datacollection.datasets[0].data.push(readings.west)
                this.datacollection.datasets[1].data.push(readings.national)
                this.datacollection.datasets[2].data.push(readings.east)
                this.datacollection.datasets[3].data.push(readings.central)
                this.datacollection.datasets[4].data.push(readings.south)
                this.datacollection.datasets[5].data.push(readings.north)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
