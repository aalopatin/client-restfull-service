<template>
  <tr >
    <wl-table-body-row-cell v-for="column in columns" :row="row" :column="column" :key="column.field" :editableRow="editableRow"></wl-table-body-row-cell>
    <td v-if="editable" >
      <b-btn-toolbar v-if="!editableRow">
        <b-btn variant="link" :disabled="editRowIdx !== undefined" @click="editRow"><font-awesome-icon icon="pen" ></font-awesome-icon></b-btn>
        <b-btn variant="link" :disabled="editRowIdx !== undefined" @click="deleteRow"><font-awesome-icon icon="times" ></font-awesome-icon></b-btn>
      </b-btn-toolbar>
      <b-btn-toolbar v-else>
        <b-btn variant="link" @click="saveRow"><font-awesome-icon icon="save" ></font-awesome-icon></b-btn>
        <b-btn variant="link" @click="undoEdit"><font-awesome-icon icon="times" ></font-awesome-icon></b-btn>
      </b-btn-toolbar>
    </td>
  </tr>
</template>

<script>
  import WlTableBodyRowCell from "./wl-table-body-row-cell";
  import {clone, fillDeep} from "../../assets/js/modules/utils";

  export default {
    name: "wl-table-body-row",
    components: {WlTableBodyRowCell},
    props: {
      row: {
        type: Object,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      idx: {
        type: Number,
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      },
      editRowIdx: {
        type: Number,
        default: undefined
      }
    },
    data() {
      return {
        rowBeforeEditing: undefined
      }
    },
    methods: {
      editRow() {
        this.rowBeforeEditing = clone(this.row)
        this.$emit('editRow', this.idx)
      },
      deleteRow() {
        this.$emit('deleteRow', this.idx)
      },
      saveRow() {

      },
      undoEdit() {

        fillDeep(this.rowBeforeEditing, this.row)
        this.$emit('undoEdit')
      }
    },
    computed:{
      editableRow() {
        return this.editRowIdx === this.idx
      }
    }
  }
</script>

<style scoped>

</style>
