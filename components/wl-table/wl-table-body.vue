<template>
  <tbody>
    <wl-table-body-row
      v-for="(row, idx) in value"
      :key="idx"
      :idx="idx"
      :row="row"
      :columns="columns"
      :editable="editable"
      :editRowIdx="editRowIdx"
      @editRow="editRow"
      @deleteRow="deleteRow"
      @undoEdit="undoEdit"
    ></wl-table-body-row>
  </tbody>
</template>

<script>
  import WlTableBodyRow from "./wl-table-body-row";
  export default {
    name: 'wl-table-body',
    components: {WlTableBodyRow},
    props: {
      value: {
        type: Array,
        default: []
      },
      columns: {
        type: Array,
        required: true
      },
      groupRow: {
        type: Array,
      },
      editable: {
        type: Boolean,
        default: false
      },
      editRowIdx: {
        type: Number,
        default: undefined
      },

    },
    methods: {
      editRow(editRowIdx) {
        this.$emit('editRow', editRowIdx)
      },
      undoEdit() {
        this.$emit('undoEdit')
      },
      deleteRow(idx) {
        this.value.splice(idx,1)
      }
    }
  }
</script>

<style scoped>

</style>
