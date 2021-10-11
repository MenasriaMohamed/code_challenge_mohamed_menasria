<template>
<div>
   <b-container fluid>
    <b-card title="View Graph" :sub-title="graph_name">
      <div style="height: 450px;">
        <IEcharts  :option="option" :loading="loadingGraph"></IEcharts>
     </div>
        <!-- User Interface controls -->
        <div>
  <b-card :title="graph_name">
    <b-card-text>Nodes  Number :<strong> {{nb_nodes}}</strong></b-card-text>
    <b-card-text>Links  Number : <strong>{{nb_links}}</strong></b-card-text>
  </b-card>
</div>
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
        graph_name : "",
        nb_nodes :0,
        nb_links:0,
        //////////////graph draw info ////////////
        loadingGraph: true,
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
      }
    },
    computed: {

    },
    created(){
         this.getSelectedGraphInfo()
    },
    mounted() {
    },
    methods: {
      getSelectedGraphInfo(){
         this.loadingGraph =true;
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
        this.option.series[0].categories=this.graphs.categories;
        this.option.legend[0]= this.graphs.categories.map(function (a) {
                  return a.name;
        })

        let nodes = this.graphs.nodes.filter(node => node.category ==this.$route.params.id);
        this.option.series[0].data= nodes??[];
        
        let links = this.graphs.links.filter(link => link.graph_id ==this.$route.params.id);
        this.option.series[0].links= links??[];


        //////////// Detail Info  //////////////////
        this.graph_name = "Graph : "+categorie[0].name
        this.nb_nodes=nodes.length;
        this.nb_links= links.length;
        //////////////

        this.loadingGraph =false;
      },
     



    }
  }
</script>