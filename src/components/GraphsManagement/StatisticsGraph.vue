<template>
<div>
   <b-container fluid>
    <b-card title="Statistics Graph " :sub-title="'Graph : '+graph_name">
      <div style="height: 450px;">
        <IEcharts  :option="option" :loading="loadingGraph"></IEcharts>
     </div>
    
      <div>
        <b-row>
          <b-col lg="4" class="my-1">
             <b-card title="Graph Information">
                <b-card-text>
                Graph ID : <strong>{{graph_id}}</strong>
                </b-card-text>
                <b-card-text>
                Graph Name : <strong>{{graph_name}}</strong>
                </b-card-text>
                <b-card-text>
                Nodes Number : <strong>{{nodes_number}}</strong>
                </b-card-text>
                <b-card-text>
                Links Number : <strong>{{links_number}}</strong>
                </b-card-text>                
            </b-card> 
          </b-col>
          <b-col lg="8" class="my-1">
             <b-card title="Graph Nodes Information" >
                <b-table
                    :items="nodes_list"
                    :fields="nodes_columns"
                    stacked="md"
                    show-empty
                    small
                  >
                </b-table>
            </b-card>
          </b-col>
        </b-row>

      
     
      
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
        graph_id: "",
        graph_name : "",
        nodes_number : 0,
        links_number : 0,

        nodes_list : [],
        nodes_columns :  [
          { key: 'node_id', label: 'Node ID', sortable: true, sortDirection: 'desc',class: 'text-center' },
          { key: 'node_name', label: 'Node tooltip', sortable: true, class: 'text-center' },
          { key: 'node_neighbors', label: 'Node neighbors', sortable: true, class: 'text-center' },
        ],

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
                 
                      /////
                        let links = graphs.links.filter(link => link.graph_id ==this.$route.params.id);
                        let nodes = graphs.nodes.filter(node => node.graph_id ==this.$route.params.id);
                        this.nodes_list= nodes.map(function (node) {
                            let neighborsLinks = graphs.links.filter(link => link.source ==node.id || link.target ==node.id);
                            
                            let neighbors_string = "";
                           
                            neighborsLinks.forEach(function (value, index, array) {
                                if(index +1 ==array.length ){
                                    if(value.source !=node.id){  
                                        neighbors_string = neighbors_string  +value.source
                                    }else{
                                        neighbors_string = neighbors_string  +value.target
                                    }
                                }else{
                                    if(value.source !=node.id){  
                                        neighbors_string = neighbors_string  +value.source+" . "
                                    }else{
                                        neighbors_string = neighbors_string  +value.target+" . "
                                    }
                                }
                                

                                
                            });
                             console.log(neighbors_string)
                            return {
                                node_id : node.id,
                                node_name : node.name, 
                                node_neighbors : neighbors_string,                           
                                };
                        });

                        this.graph_id =  categorie[0].id;
                        this.graph_name = categorie[0].name;           
                        this.nodes_number = nodes.length,
                        this.links_number = links.length,
                     
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