<template>
       <div>
        <b-row >
        
          <b-col cols="12"> 
            <b-card title="Graphs List">
              <div>
                  <b-table
                  :bordered="true"
                  :busy="isLoadingGraphs"
                  :items="items" :fields="fields" :tbody-tr-class="rowClass">
                  <template v-slot:body-cell-name="props">
                    <q-td :props="props">
                      <div>
                        <q-badge style="background :red;" />
                      </div>
                    </q-td>
                  </template>
                  </b-table>
              </div>
          </b-card>
        </b-col>
      </b-row>
  </div>
</template>

<script>

export default {
   components: {
  
  },
  data() {
    return {
        isLoadingGraphs : false,
        graph_list : [],
        fields: ['Id', 'Name', 'Description','Created_at','Updated_at' ,'Actions'],
        items: [
          { Id: 1, Name: 'Dickerson', Description:'Description', Created_at : 'created_at',Updated_at:'updated_at', status: 'awesome'},
          { Id: 2, Name: 'Dickerson', Description:'Description', Created_at : 'created_at',Updated_at:'updated_at', status: 'blue'},
          { Id: 3, Name: 'Dickerson', Description:'Description', Created_at : 'created_at',Updated_at:'updated_at', status: 'red'},
        ]
      }
  },
  created() {
      this.initGraphs();
  },
   methods: {
      initGraphs(){
        let graph_list = localStorage.getItem("graph_list")?? [];
        localStorage.setItem("graph_list", JSON.stringify(graph_list));
        this.graph_list =graph_list;
        console.log(this.graph_list)
      },
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'awesome') return 'table-success'
      }
    },
}
</script>


<style scoped>

</style>
