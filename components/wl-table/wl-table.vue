<template>
  <div>
    <b-btn-toolbar class="my-1" v-if="editable">
      <b-btn  size="sm" @click="addRow" :disabled="editRowIdx !== undefined">Добавить</b-btn>
    </b-btn-toolbar>
    <table class="table table-sm">
      <wl-table-header
        :columns="columns"
        :editable="editable"
      ></wl-table-header>
      <wl-table-body
        v-model="value"
        :columns="columns"
        :editable="editable"
        :editRowIdx="editRowIdx"
        @editRow="editRow"
        @undoEdit="undoEdit"
      ></wl-table-body>
    </table>
  </div>
</template>

<script>
  import WlTableBody from "./wl-table-body";
  import WlTableHeader from "./wl-table-header";
  export default {
    name: "wl-table",
    components: {WlTableHeader, WlTableBody},
    props: {
      value: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editRowIdx: undefined,
        editNewRow: false
      }
    },
    methods: {
      addRow() {

        let row = {}
        this.columns.forEach(column => {
          row[column.field] = undefined
        })
        this.value.push(row)
        this.editRowIdx = this.value.length - 1
        this.editNewRow = true
        this.$emit('addRow', this.editRowIdx)

      },
      editRow(editRowIdx) {
        this.editRowIdx = editRowIdx
      },
      undoEdit() {
        if (this.editNewRow) {
          this.value.splice(this.editRowIdx, 1)
        }
        this.editRowIdx = undefined
      }
    }
  }
</script>

<style scoped>

</style>
