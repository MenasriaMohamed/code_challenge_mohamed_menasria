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
        
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
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
        //////////////graph draw info ////////////
        loadingGraph: true,
        ///////////////////

          form: {
            graph_id: 0,
            name: '',
            description: null,
          },
          foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
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
            getGraphId(){
                  this.loadingGraph = true;
                    if(!localStorage.getItem("graphs") ){
                        //// display error notification and back to home
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
                      this.option.series[0].data=[
                        // {
                        //   "id": "0",
                        //   "name": "Cravatte",
                        //   "symbolSize": 8,
                        //   "category": 0,
                        //   "graphId": this.form.graph_id,
                        //   },        
                        ];
                        this.option.series[0].links=[];
                        this.option.series[0].categories=[];
                        this.option.legend[0]= graphs.categories.map(function (a) {
                                  return a.name;
                        })
                       this.option.series[0].categories.push({
                          id: this.form.graph_id,
                          name: "default name",
                          description: this.form.description,
                          created_at: "",
                          updated_at: ""      
                        });
                  this.loadingGraph = false;
              },
           
               
       onSubmit(event) {
         event.preventDefault()
          const format = "YYYY-MM-DD HH:mm:ss"
          var date = new Date();
          this.graphs.categories.push({
              id: this.form.graph_id,
              name: this.form.name,
              description: this.form.description,
              created_at: moment(date).format(format),
              updated_at: ""      
           });
          localStorage.setItem("graphs", JSON.stringify(this.graphs));

          ///////// display  alert succes
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