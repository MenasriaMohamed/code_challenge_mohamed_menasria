<template>
<div>
   <b-container fluid>
    <b-card title="List graphs">
      <div title="List graphs" style="height: 450px;">
        <IEcharts  :option="option" :loading="loading"></IEcharts>
     </div>
        <!-- User Interface controls -->
    </b-card>
  </b-container>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3'
  export default {
    components: {
      IEcharts
    },
    data() {
      return {
        //////////////graph draw info ////////////
        loading: false,
        ///////////////////
          graphs  : {
             nodes :[],
             links :[],
             categories:[],
           },
          option : {
            tooltip: {},
            legend: [
              {
                 selectedMode: 'single',
                 data : null,
              }
            ],
            series: [
              {
                name: 'Les graphs',
                type: 'graph',
                layout: 'force',
                data: null,
                links: null,
                categories: null,
                roam: true,
                label: {
                  position: 'right'
                },
                force: {
                  repulsion: 100
                }
              }
            ]
          },
        //////////////////////
        graph_List: [],
      }
    },
    computed: {

    },
    created(){
         this.getSelectedGraphInfo()
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.graph_List.length
      this.initGraphs();
      this.insertGraphsInTable();
    },
    methods: {
      getSelectedGraphInfo(){
         if(!localStorage.getItem("graphs") ){
              //// display error notification and back to home
            return;
         }
        this.graphs = JSON.parse(localStorage.getItem("graphs"));
        let categorie = this.graphs.categories.filter(categorie => categorie.id ==this.$route.params.id);
        if(!categorie || !categorie[0]){
            //// display error notification and back to home
            return;
        }
        let nodes = this.graphs.nodes.filter(node => node.category ==this.$route.params.id);
        
        console.log(nodes);

      },
      initGraphs(){
        this.option.series[0].data=this.graphs.nodes;
        this.option.series[0].links=this.graphs.links;
        this.option.series[0].categories=this.graphs.categories;
        this.option.legend[0]= this.graphs.categories.map(function (a) {
                  return a.name;
         })
      },
      insertGraphsInTable(){
       let graph_List= this.graphs && this.graphs.categories? this.graphs.categories :[];
       this.graph_List = graph_List.map(function (
                value,
                index
              ) {
                return {
                  id : value.id,
                  graph_name: value.name,
                  description: value.description,
                  created_at: value.created_at,
                  updated_at: value.updated_at,
                };
              });
      },

     
    }
  }
</script>