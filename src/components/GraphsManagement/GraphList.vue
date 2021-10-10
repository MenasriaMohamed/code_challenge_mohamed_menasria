<template>
<div>
   <b-container fluid>
    <b-card title="List graphs">
      <div title="List graphs" style="height: 450px;">
        <IEcharts  :option="option" :loading="loading"></IEcharts>
     </div>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
       <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label-cols-sm="6"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
            <b-button pill variant="outline-primary">Add New Graph</b-button>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="graph_List"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <!-- <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button> -->
        <div>
          <b-button class="mr-1" pill @click="info(row.item, row.index, $event.target)">Edit</b-button>
          <b-button class="mr-1" pill  @click="info(row.item, row.index, $event.target)" variant="primary">Details</b-button>
        </div>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

        <!--/////////////-->
        <b-row>
        <b-col sm="5" md="6" class="my-1">
                <b-form-group
                  label="Per page"
                  label-for="per-page-select"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="right"
                  label-size="sm"
                  class="mb-0"
                >
                  <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>

              <b-col sm="7" md="6" class="my-1">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
        </b-row>

        <!--/////////////-->
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    </b-card>
  </b-container>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3'
  // import 'echarts/lib/chart/Graph'
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
            // title: {
            //   text: 'Les graph',
            //   subtext: 'Default layout',
            //   top: 'bottom',
            //   left: 'right'
            // },
            tooltip: {},
            legend: [
              {
                 selectedMode: 'single',
                // data: graph.categories.map(function (a) {
                //   return a.name;
                // })
                data : null,
              }
            ],
            series: [
              {
                name: 'Les graphs',
                type: 'graph',
                 layout: 'force',
                // data: graph.nodes,
                // links: graph.links,
                // categories: graph.categories,

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
        fields: [
          { key: 'id', label: 'Graph ID', sortable: true, sortDirection: 'desc',class: 'text-center' },
          { key: 'graph_name', label: 'Graph Name', sortable: true, class: 'text-center' },
          { key: 'description', label: 'Description', sortable: true, class: 'text-center' },
          { key: 'created_at', label: 'Created at', sortable: true, class: 'text-center' },
          { key: 'updated_at', label: 'Updated at', sortable: true, class: 'text-center' },        
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {

    },
    created(){
         this.getGraphsFromLocalStorage()
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.graph_List.length
      this.initGraphs();
      this.insertGraphsInTable();
    },
    methods: {
      getGraphsFromLocalStorage(){
         if(localStorage.getItem("graphs")!=null){
           this.graphs = JSON. parse(localStorage. getItem("graphs"));

         }else{
           this.graphs = {
             nodes :[],
             links :[],
             categories:[],
           }
           localStorage.setItem("graphs", JSON.stringify(this.graphs));
         }
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

      //////////////////////
      AddGraph(){

      },
      /////////////////////
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>