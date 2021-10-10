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

          graphs  :{
        "nodes": [
          {
            "id": "0",
            "name": "Myriel",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "1",
            "name": "Napoleon",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "2",
            "name": "MlleBaptistine",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "3",
            "name": "MmeMagloire",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "4",
            "name": "CountessDeLo",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "5",
            "name": "Geborand",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "6",
            "name": "Champtercier",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "7",
            "name": "Cravatte",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "8",
            "name": "Count",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "9",
            "name": "OldMan",
            "symbolSize": 8,
            "category": 0
          },
          {
            "id": "10",
            "name": "Labarre",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "11",
            "name": "Valjean",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "12",
            "name": "Marguerite",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "13",
            "name": "MmeDeR",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "14",
            "name": "Isabeau",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "15",
            "name": "Gervais",
            "symbolSize": 8,
            "category": 1
          },
          {
            "id": "16",
            "name": "Tholomyes",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "17",
            "name": "Listolier",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "18",
            "name": "Fameuil",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "19",
            "name": "Blacheville",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "20",
            "name": "Favourite",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "21",
            "name": "Dahlia",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "22",
            "name": "Zephine",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "23",
            "name": "Fantine",
            "symbolSize": 8,
            "category": 2
          },
          {
            "id": "24",
            "name": "MmeThenardier",
            "symbolSize": 8,
            "category": 7
          },
          {
            
            "id": "25",
            "name": "Thenardier",
            "symbolSize": 8,
            "category": 7
          },
          {
            "id": "26",
            "name": "Cosette",
            "symbolSize": 8,
            "category": 6
          },
          {
            "id": "27",
            "name": "Javert",
            "symbolSize":8,
            "category": 7
          },
        
          {
            "id": "40",
            "name": "Boulatruelle",
            "symbolSize": 8,
            "category": 7
          },
          {
            "id": "41",
            "name": "Eponine",
            "symbolSize":8,
            "category": 7
          },
         
        ],
        "links": [
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "6",
            "target": "0"
          },
          {
            "source": "7",
            "target": "0"
          },
          {
            "source": "8",
            "target": "0"
          },
          {
            "source": "9",
            "target": "0"
          },
          {
            "source": "11",
            "target": "0"
          },
          {
            "source": "11",
            "target": "2"
          },
          {
            "source": "11",
            "target": "3"
          },
          {
            "source": "11",
            "target": "10"
          },
          {
            "source": "12",
            "target": "11"
          },
          {
            "source": "13",
            "target": "11"
          },
          {
            "source": "14",
            "target": "11"
          },
          {
            "source": "15",
            "target": "11"
          },
          {
            "source": "17",
            "target": "16"
          },
          {
            "source": "18",
            "target": "16"
          },
          {
            "source": "18",
            "target": "17"
          },
          {
            "source": "19",
            "target": "16"
          },
          {
            "source": "19",
            "target": "17"
          },
          {
            "source": "19",
            "target": "18"
          },
          {
            "source": "20",
            "target": "16"
          },
          {
            "source": "20",
            "target": "17"
          },
          {
            "source": "20",
            "target": "18"
          },
          {
            "source": "20",
            "target": "19"
          },
          {
            "source": "21",
            "target": "16"
          },
          {
            "source": "21",
            "target": "17"
          },
          {
            "source": "21",
            "target": "18"
          },
          {
            "source": "21",
            "target": "19"
          },
          {
            "source": "21",
            "target": "20"
          },
          {
            "source": "22",
            "target": "16"
          },
          {
            "source": "22",
            "target": "17"
          },
          {
            "source": "22",
            "target": "18"
          },
          {
            "source": "22",
            "target": "19"
          },
          {
            "source": "22",
            "target": "20"
          },
          {
            "source": "22",
            "target": "21"
          },
          {
            "source": "23",
            "target": "11"
          },
          {
            "source": "23",
            "target": "12"
          },
          {
            "source": "23",
            "target": "16"
          },
          {
            "source": "23",
            "target": "17"
          },
          {
            "source": "23",
            "target": "18"
          },
          {
            "source": "23",
            "target": "19"
          },
          {
            "source": "23",
            "target": "20"
          },
          {
            "source": "23",
            "target": "21"
          },
          {
            "source": "23",
            "target": "22"
          },
          {
            "source": "24",
            "target": "11"
          },
          {
            "source": "24",
            "target": "23"
          },
          {
            "source": "25",
            "target": "11"
          },
          {
            "source": "25",
            "target": "23"
          },
          {
            "source": "25",
            "target": "24"
          },
          {
            "source": "26",
            "target": "11"
          },
          {
            "source": "26",
            "target": "16"
          },
          {
            "source": "26",
            "target": "24"
          },
          {
            "source": "26",
            "target": "25"
          },
          {
            "source": "27",
            "target": "11"
          },
          {
            "source": "27",
            "target": "23"
          },
          {
            "source": "27",
            "target": "24"
          },
          {
            "source": "27",
            "target": "25"
          },
          {
            "source": "27",
            "target": "26"
          },
          {
            "source": "28",
            "target": "11"
          },
          {
            "source": "28",
            "target": "27"
          },
          {
            "source": "29",
            "target": "11"
          },
          {
            "source": "29",
            "target": "23"
          },
          {
            "source": "29",
            "target": "27"
          },
          {
            "source": "30",
            "target": "23"
          },
          {
            "source": "31",
            "target": "11"
          },
          {
            "source": "31",
            "target": "23"
          },
          {
            "source": "31",
            "target": "27"
          },
          {
            "source": "31",
            "target": "30"
          },
          {
            "source": "32",
            "target": "11"
          },
          {
            "source": "33",
            "target": "11"
          },
          {
            "source": "33",
            "target": "27"
          },
          {
            "source": "34",
            "target": "11"
          },
          {
            "source": "34",
            "target": "29"
          },
          {
            "source": "35",
            "target": "11"
          },
          {
            "source": "35",
            "target": "29"
          },
          {
            "source": "35",
            "target": "34"
          },
          {
            "source": "36",
            "target": "11"
          },
          {
            "source": "36",
            "target": "29"
          },
          {
            "source": "36",
            "target": "34"
          },
          {
            "source": "36",
            "target": "35"
          },
          {
            "source": "37",
            "target": "11"
          },
          {
            "source": "37",
            "target": "29"
          },
          {
            "source": "37",
            "target": "34"
          },
          {
            "source": "37",
            "target": "35"
          },
          {
            "source": "37",
            "target": "36"
          },
          {
            "source": "38",
            "target": "11"
          },
          {
            "source": "38",
            "target": "29"
          },
          {
            "source": "38",
            "target": "34"
          },
          {
            "source": "38",
            "target": "35"
          },
          {
            "source": "38",
            "target": "36"
          },
          {
            "source": "38",
            "target": "37"
          },
          {
            "source": "39",
            "target": "25"
          },
          {
            "source": "40",
            "target": "25"
          },
          {
            "source": "41",
            "target": "24"
          },
          {
            "source": "41",
            "target": "25"
          },
          {
            "source": "42",
            "target": "24"
          },
          {
            "source": "42",
            "target": "25"
          },
          {
            "source": "42",
            "target": "41"
          },
          {
            "source": "43",
            "target": "11"
          },
          {
            "source": "43",
            "target": "26"
          },
          {
            "source": "43",
            "target": "27"
          },
          {
            "source": "44",
            "target": "11"
          },
          {
            "source": "44",
            "target": "28"
          },
          {
            "source": "45",
            "target": "28"
          },
          {
            "source": "47",
            "target": "46"
          },
          {
            "source": "48",
            "target": "11"
          },
          {
            "source": "48",
            "target": "25"
          },
          {
            "source": "48",
            "target": "27"
          },
          {
            "source": "48",
            "target": "47"
          },
          {
            "source": "49",
            "target": "11"
          },
          {
            "source": "49",
            "target": "26"
          },
          {
            "source": "50",
            "target": "24"
          },
          {
            "source": "50",
            "target": "49"
          },
          {
            "source": "51",
            "target": "11"
          },
          {
            "source": "51",
            "target": "26"
          },
          {
            "source": "51",
            "target": "49"
          },
          {
            "source": "52",
            "target": "39"
          },
          {
            "source": "52",
            "target": "51"
          },
          {
            "source": "53",
            "target": "51"
          },
          {
            "source": "54",
            "target": "26"
          },
          {
            "source": "54",
            "target": "49"
          },
          {
            "source": "54",
            "target": "51"
          },
          {
            "source": "55",
            "target": "11"
          },
          {
            "source": "55",
            "target": "16"
          },
          {
            "source": "55",
            "target": "25"
          },
          {
            "source": "55",
            "target": "26"
          },
          {
            "source": "55",
            "target": "39"
          },
          {
            "source": "55",
            "target": "41"
          },
          {
            "source": "55",
            "target": "48"
          },
          {
            "source": "55",
            "target": "49"
          },
          {
            "source": "55",
            "target": "51"
          },
          {
            "source": "55",
            "target": "54"
          },
          {
            "source": "56",
            "target": "49"
          },
          {
            "source": "56",
            "target": "55"
          },
          {
            "source": "57",
            "target": "41"
          },
          {
            "source": "57",
            "target": "48"
          },
          {
            "source": "57",
            "target": "55"
          },
          {
            "source": "58",
            "target": "11"
          },
          {
            "source": "58",
            "target": "27"
          },
          {
            "source": "58",
            "target": "48"
          },
          {
            "source": "58",
            "target": "55"
          },
          {
            "source": "58",
            "target": "57"
          },
          {
            "source": "59",
            "target": "48"
          },
          {
            "source": "59",
            "target": "55"
          },
          {
            "source": "59",
            "target": "57"
          },
          {
            "source": "59",
            "target": "58"
          },
          {
            "source": "60",
            "target": "48"
          },
          {
            "source": "60",
            "target": "58"
          },
          {
            "source": "60",
            "target": "59"
          },
          {
            "source": "61",
            "target": "48"
          },
          {
            "source": "61",
            "target": "55"
          },
          {
            "source": "61",
            "target": "57"
          },
          {
            "source": "61",
            "target": "58"
          },
          {
            "source": "61",
            "target": "59"
          },
          {
            "source": "61",
            "target": "60"
          },
          {
            "source": "62",
            "target": "41"
          },
          {
            "source": "62",
            "target": "48"
          },
          {
            "source": "62",
            "target": "55"
          },
          {
            "source": "62",
            "target": "57"
          },
          {
            "source": "62",
            "target": "58"
          },
          {
            "source": "62",
            "target": "59"
          },
          {
            "source": "62",
            "target": "60"
          },
          {
            "source": "62",
            "target": "61"
          },
          {
            "source": "63",
            "target": "48"
          },
          {
            "source": "63",
            "target": "55"
          },
          {
            "source": "63",
            "target": "57"
          },
          {
            "source": "63",
            "target": "58"
          },
          {
            "source": "63",
            "target": "59"
          },
          {
            "source": "63",
            "target": "60"
          },
          {
            "source": "63",
            "target": "61"
          },
          {
            "source": "63",
            "target": "62"
          },
          {
            "source": "64",
            "target": "11"
          },
          {
            "source": "64",
            "target": "48"
          },
          {
            "source": "64",
            "target": "55"
          },
          {
            "source": "64",
            "target": "57"
          },
          {
            "source": "64",
            "target": "58"
          },
          {
            "source": "64",
            "target": "59"
          },
          {
            "source": "64",
            "target": "60"
          },
          {
            "source": "64",
            "target": "61"
          },
          {
            "source": "64",
            "target": "62"
          },
          {
            "source": "64",
            "target": "63"
          },
          {
            "source": "65",
            "target": "48"
          },
          {
            "source": "65",
            "target": "55"
          },
          {
            "source": "65",
            "target": "57"
          },
          {
            "source": "65",
            "target": "58"
          },
       
        
          {
            "source": "72",
            "target": "27"
          },
          {
            "source": "73",
            "target": "48"
          },
          {
            "source": "74",
            "target": "48"
          },
          {
            "source": "74",
            "target": "73"
          },
          {
            "source": "75",
            "target": "25"
          },
          {
            "source": "75",
            "target": "41"
          },
          {
            "source": "75",
            "target": "48"
          },
          {
            "source": "75",
            "target": "68"
          },
          {
            "source": "75",
            "target": "69"
          },
          {
            "source": "75",
            "target": "70"
          },
          {
            "source": "75",
            "target": "71"
          },
          {
            "source": "76",
            "target": "48"
          },
          {
            "source": "76",
            "target": "58"
          },
          {
            "source": "76",
            "target": "62"
          },
          {
            "source": "76",
            "target": "63"
          },
          {
            "source": "76",
            "target": "64"
          },
          {
            "source": "76",
            "target": "65"
          },
          {
            "source": "76",
            "target": "66"
          }
        ],
        "categories": [
          {
            "name": "A",
            "id" : "id",     
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",

          },
          {
            "name": "B",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "C",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "D",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "E",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "F",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "G",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "H",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          },
          {
            "name": "I",
            "id" : "id",
            "description": "description",
            "created_at": "created_at",
            "updated_at": "updated_at",
          }
        ]
      },
      option : {
            // title: {
            //   text: 'Les Miserables',
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
                name: 'Les Miserables',
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
           this.graphs = localStorage.getItem("graphs");
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
         this.graphs.nodes.forEach(function (node) {
            node.symbolSize = 8;
           });
        console.log(this.graphs);
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