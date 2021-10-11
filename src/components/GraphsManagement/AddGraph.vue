<template>
<div>
   <b-container fluid>
    <b-card title="Add Graph ">
      <div style="height: 450px;">
        <IEcharts  :option="option" :loading="loadingGraph"></IEcharts>
     </div>
        <!-- User Interface controls -->
        <div>
        <b-card title="Graph Information">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Graph ID :"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.graph_id"
              :disabled ="true"
              type="text"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Description :" label-for="input-3">
              <b-form-textarea
                id="textarea"
                v-model="form.description"
                placeholder="Enter Description..."
                rows="3"
                max-rows="6"
                required
              ></b-form-textarea>
          </b-form-group>
         
            <b-row>
          <b-col lg="6" class="my-1">
             <b-card sub-title="Add Nodes">
                 <b-card-text>
                    <b-button v-b-modal.modal-1 variant="info">Add Node</b-button>
                </b-card-text>
                <b-table
                    :items="nodes_list"
                    :fields="nodes_columns"
                    stacked="md"
                    show-empty
                    small
                  >
                    <template #cell(name)="row">
                      {{ row.value.first }} {{ row.value.last }}
                    </template>

                    <template #cell(actions)="row">
                      <div>
                        <b-button class="text-light mr-1" pill  @click="RemoveNode(row.item, row.index, $event.target)" variant="danger">Remove</b-button>
                      </div>
                    </template>
                  </b-table>
            </b-card>


          <!--Add node model -->
         
              <b-modal id="modal-1" title="Add Node :" @ok="handleSubmitNode">
                <b-form-group
                  label="Node ID :"
                >
                  <b-form-input
                    v-model="node_id"
                    :disabled ="true"
                    type="text"
                  ></b-form-input>
              </b-form-group>
               <b-form-group id="input-group-2" label="Node tooltip:" label-for="input-2">
                  <b-form-input
                    v-model="node_name"
                    placeholder="Enter tooltip"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-modal>
          <!------------------->
          </b-col>

          <b-col lg="6" class="my-1">
             <b-card sub-title="Add Links" >
                <b-card-text>
                    <b-button v-b-modal.modal-2 variant="info">Add Link</b-button>
                </b-card-text>
                 <b-table
                    :items="links_list"
                    :fields="links_columns"
                    stacked="md"
                    show-empty
                    small
                  >
                    <template #cell(actions)="row">
                      <div>
                        <b-button class="text-light mr-1" pill  @click="RemoveLink(row.item, row.index, $event.target)" variant="danger">Remove</b-button>
                      </div>
                    </template>
                  </b-table>
            </b-card>
              <!--Add node model -->
         
              <b-modal id="modal-2" title="Add Link " @ok="handleSubmitLink">
                <b-form-group
                  label="Node Source :"
                >
                    <b-form-select v-model="selected_node_source" :options="nodes_list"></b-form-select>
                 </b-form-group>
                  <b-form-group
                    label="Node Target :"
                  >
                      <b-form-select v-model="selected_node_target" :options="nodes_list"></b-form-select>
                  </b-form-group>
              </b-modal>
          
          <!------------------->
          </b-col>
        </b-row>

        <b-button  style="margin-top:10px;margin-right:10px" type="submit" variant="primary">Submit</b-button>
        <b-button style="margin-top:10px" type="reset" variant="danger">Reset</b-button>
      </b-form>
        </b-card>
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
        selected_node_source : null,
        selected_node_target : null,
        //////////
        node_id : 0,
        node_categorie : 0,
        node_name : "",
        ///////////////////////////////:
        nodes_list : [],
        nodes_columns :  [
          { key: 'node_id', label: 'Node ID', sortable: true, sortDirection: 'desc',class: 'text-center' },
          { key: 'node_name', label: 'Node tooltip', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        links_list : [],
        links_columns : [
          { key: 'node_source', label: 'Node Source', sortable: true, sortDirection: 'desc',class: 'text-center' },
          { key: 'node_target', label: 'Node Target', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],

        //////////////graph draw info ////////////
        loadingGraph: true,
        ///////////////////

          form: {
            graph_id: 0,
            name: '',
            description: null,
          },
     
          show: true,
        ////////////
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
        // this.getGraphId();
          this.getGraphId()
      },
      /////
      mounted() {
      },
      methods: { 
            handleSubmitNode(){
              this.nodes_list.push({
                node_id : this.node_id,
                node_name : this.node_name && this.node_name!=""?this.node_name :"default name",
                value: this.node_id,
                text : this.node_id + "#" +this.node_name
              });
              
              this.option.series[0].data.push({id: this.node_id , name: this.node_name , symbolSize: 10, category: 0,graph_id : this.form.graph_id})
              this.node_id = this.node_id+1;
              this.node_name = "";
              // Add To Graph////
              ///////////////////////
              this.$vToastify.success("the node has been added with success!");
            },
            handleSubmitLink(){
                if(this.selected_node_source===null ){
                  this.$vToastify.error("source node are required!")
                  return;
                }
                if( this.selected_node_target===null ){
                  this.$vToastify.error("target node are required!")
                  return;
                }  
              
                if(this.selected_node_source == this.selected_node_target){
                 this.$vToastify.error("source and target are the same!")
                 return;
              }

              let result = this.links_list.filter(link => (link.node_source == this.selected_node_source &&  link.node_target == this.selected_node_target)
                  || (link.node_source == this.selected_node_target &&  link.node_target == this.selected_node_source)
              );
              if(result && result.length >0) 
              {  
                this.$vToastify.error("this link exist!")
                return;
              }
              this.links_list.push({
                node_source : this.selected_node_source,
                node_target : this.selected_node_target
              });

              this.option.series[0].links.push({source: this.selected_node_source+"", target: this.selected_node_target +"", graph_id : this.form.graph_id})

            },
            getGraphId(){
                  this.loadingGraph = true;
                    if(!localStorage.getItem("graphs") ){
                        this.$vToastify.error("il ya un problème , réessayez plus tard!");
                        this.$router.push({ name: 'graphs'})
                      return;
                    }
                      let graphs = JSON.parse(localStorage.getItem("graphs"));
                      this.graphs = graphs;
                      if(graphs.categories.length == 0){
                        this.form.graph_id =0;
                      }else{
                        ///get the maxId
                        let maxId =  Math.max.apply(Math, graphs.categories.map(function(categorie) { return categorie.id; }))+1;
                        this.form.graph_id = maxId;
                      }
                      if(graphs.nodes.length== 0){
                         this.node_id= 0;
                      }else{
                         let maxNodeId =  Math.max.apply(Math, this.graphs.nodes.map(function(node) { return node.id; }))+1;
                         this.node_id = maxNodeId;
                      }
                        this.option.series[0].data=[];
                        this.option.series[0].links=[];
                        this.option.series[0].categories=[];
                        this.option.legend[0]= graphs.categories.map(function (a) {
                                  return a.name;
                        })
                       this.option.series[0].categories.push({
                          id: 0+"",
                          name: "default name",
                          description: this.form.description,
                          created_at: "",
                          updated_at: ""      
                        });
                  this.loadingGraph = false;
              },

            ////////////////////////////
             RemoveNode(item, index, button){
                this.nodes_list =  this.nodes_list.filter(node => node.node_id !=item.node_id);
                this.option.series[0].data=  this.option.series[0].data.filter(node => node.id !=item.node_id);
                this.links_list = this.links_list.filter(link => (link.node_source != item.node_id &&  link.node_target != item.node_id));
              },
              RemoveLink(item, index, button){
                
              
              },

            //////////////////////////////:::
      
            onSubmit(event) {
              event.preventDefault()
                const format = "YYYY-MM-DD HH:mm:ss"
                var date = new Date();
                this.graphs.categories.push({
                    id: this.form.graph_id,
                    name: this.form.name && this.form.name!=""?this.form.name : "default name",
                    description: this.form.description,
                    created_at: moment(date).format(format),
                    updated_at: ""      
                });
                this.option.series[0].data.forEach(element => {
                  element.category = element.graph_id;
                });
                this.graphs.nodes = this.graphs.nodes.concat(this.option.series[0].data);
                this.graphs.links = this.graphs.links.concat(this.option.series[0].links);
               
                localStorage.setItem("graphs", JSON.stringify(this.graphs));

                ///////// display  alert succes
                this.$vToastify.success("the graph has been added with success!");
                this.$router.push({ name: 'graphs'})
              return;
            },
            onReset(event) {
              event.preventDefault()
              // Reset our form values
                this.form.name= "",
                this.form.description= "",
              // Trick to reset/clear native browser form validation state
              this.show = false
              this.$nextTick(() => {
                this.show = true
              })
            }

      ///////////////
    
     



    }
  }
</script>