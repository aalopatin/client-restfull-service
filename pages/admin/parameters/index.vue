<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="parameters"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Добавить</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-text>
                <v-container>
                  <v-row>
                    row
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="Название"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.groupId" label="Группа параметров"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.typeReportId" label="Тип отчета"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
<!--                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>-->
<!--                <v-btn color="blue darken-1" text @click="save">Save</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:item.groupId="{ value }">
        {{ textByValue(value, selectOptionsGroups) }}
      </template>
      <template v-slot:item.typeReportId="{ value }">
        {{ textByValue(value, selectOptionsTypesReports) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { ADMIN_PARAMETERS } from '~/assets/js/constants/breadcrumb'
  import { getTableParameters } from '~/assets/js/modules/tables'

  import { findAllTypeReportAPI } from '~/assets/js/API/typeReport'
  import { findAllGroupParametersAPI } from '~/assets/js/API/groupParameters'
  import { findAllParameters } from '~/assets/js/API/parameter'

  import { selectOptionsAny, selectOptionsTypeReport } from '~/assets/js/modules/convertion'

  export default {
    data() {
      return {
        dialog: false,
        headers: [
          { text:"#", value:"id" },
          { text:"Наименование", value:"title" },
          { text:"Группа параметров", value:"groupId" },
          { text:"Тип отчета", value:"typeReportId" },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
          title: "",
          groupId: undefined,
          typeReportId: undefined,
        },
        defaultItem: {
          title: "",
          groupId: undefined,
          typeReportId: undefined,
        },

        parameters: [],
        groups: [],
        typesReports: [],
      }
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_PARAMETERS)

      let resultParameters = await findAllParameters($axios)

      let resultTypesReports = await findAllTypeReportAPI($axios)

      let resultGroupsParameters = await findAllGroupParametersAPI($axios)

      return {
        parameters: getTableParameters(resultParameters.data, resultGroupsParameters.data),
        groups: resultGroupsParameters.data,
        typesReports: resultTypesReports.data,
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      selectOptionsGroups() {
        return selectOptionsAny(this.groups, true, "Выберите группу параметров")
      },
      selectOptionsTypesReports() {
        return selectOptionsTypeReport(this.typesReports, true)
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      textByValue(value, selectOptions) {
        let option = selectOptions.find(param => param.value === value)
        if(option === undefined) {
          return "Not found"
        } else {
          return option.text
        }
      },
      editItem (item) {
        this.editedIndex = this.parameters.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.parameters.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.parameters.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.parameters[this.editedIndex], this.editedItem)
        } else {
          this.parameters.push(this.editedItem)
        }
        this.close()
      },

    }
  }
</script>



