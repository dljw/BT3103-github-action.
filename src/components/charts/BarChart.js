import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'


export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: []
                  }]
            },
            options: {
                legend: { display: false },
                title: {
                  display: true,
                  position: 'top',
                  text:"Total Number of each dish"                  
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
      },
      methods:{
          fetchItems: function (){
              database.collection('orders').get().then(querySnapShot =>{
                var orders = {"Prawn omelette":0,"Dry Beef Hor Fun":0,"Sambal Kangkung":0,"Pork Fried Rice":0,"Mapo Tofu":0,"Cereal Prawn":0}
                  querySnapShot.forEach(doc =>{
                      var order = doc.data().quantity
                      for(let i in order){
                          orders[i] += order[i]
                      }
                  })
                  this.datacollection.labels.push(...Object.keys(orders))
                  this.datacollection.datasets[0].data.push(...Object.values(orders))
                  this.renderChart(this.datacollection,this.options)
              })
          }
      },
      created(){
          this.fetchItems()
      }
    }
