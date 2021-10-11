<template>
<div>
   <b-container fluid>
    <b-card title="Statistics Graph " :sub-title="'Graph : '+node_name">
      <div style="height: 450px;">
        <IEcharts  :option="option" :loading="loadingGraph"></IEcharts>
     </div>
    </b-card>
  </b-container>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3'
  import moment from 'moment'
  export default {
    components: {
      IEcharts
    },
    data() {
      return {
        
        node_name : "",
        

        //////////////graph draw info ////////////
        loadingGraph: true,
       
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
                name: 'Add Graph',
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
          this.initGraph();
      },
      /////
      mounted() {
      },
      methods: {
              initGraph(){
                    this.loadingGraph = true;
                    if(!localStorage.getItem("graphs") ){
                        this.$vToastify.error("il ya un problème , réessayez plus tard!");
                        this.$router.push({ name: 'graphs'})
                        return;
                      }
                      let graphs = JSON.parse(localStorage.getItem("graphs"));
                    
                      let categorie = graphs.categories.filter(categorie => categorie.id ==this.$route.params.id);
                      if(!categorie || !categorie[0]){
                          this.$vToastify.error("il ya un problème , réessayez plus tard!");
                          this.$router.push({ name: 'graphs'})
                          return;
                      }
                      this.node_name =categorie[0].name;
                      /////
                      let nodes = graphs.nodes.filter(node => node.graph_id ==this.$route.params.id);
                      this.nodes_list= nodes.map(function (node) {
                          return {
                              node_id : node.id,
                              node_name : node.name,
                              value: node.id,
                              text : node.id + "#" +node.name
                            };
                      });
                      ///
                      let links = graphs.links.filter(link => link.graph_id ==this.$route.params.id);
                      this.links_list= links.map(function (link) {
                          return {
                              node_source : link.source,
                              node_target : link.target,
                            };
                      });
                     
                        this.option.series[0].data= nodes.map(function (node) {
                                  node.category = 0;
                                  return node;
                        })
                        this.option.series[0].links= links;
                        categorie[0].id = 0+"";
                        this.option.series[0].categories=categorie;
                        this.loadingGraph = false;
              },
            
            
      
            
           

      ///////////////
    }
  }
</script>