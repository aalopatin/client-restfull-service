<template>
  <td v-if="!editableCell">{{ cellText }}</td>
  <td v-else>
    <template v-if="editor == 'text'">
      <b-input v-model="row[column.field]" type="text"></b-input>
    </template>
    <template v-else-if="editor == 'autocomplete'">
      <b-select v-model="row[column.field]" :options="optionsDatalist" ></b-select>
<!--      <b-input v-model="row[column.field]" :formatter="format" :list="idDatalist"></b-input>-->
<!--      <datalist :id="idDatalist" @autocomplete="autocomplete($event)">-->
<!--        <option v-for="option in optionsDatalist">{{ option }}</option>-->
<!--      </datalist>-->
<!--      <b-datalist :id="idDatalist" :options="optionsDatalist"></b-datalist>-->
    </template>
  </td>
</template>

<script>
  export default {
    name: "wl-table-body-row-cell",
    props: {
      row: {
        type: Object,
        required: true
      },
      column: {
        type: Object,
        required: true
      },
      editableRow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      cellText() {
        if (this.column.hasOwnProperty("formatter")) {

          let formatter = this.column.formatter

          if (typeof(formatter) == "function") {
            return formatter(this.row, this.column)
          }
          if (typeof(formatter) == "string") {
            switch(formatter) {
              case 'lookup':
                return this.lookup(this.row[this.column.field], this.column.formatterParams)
            }
          }
        } else {
          return this.row[this.column.field]
        }
      },
      editableCell() {
        return this.editableRow && (!this.column.hasOwnProperty("editor") || this.column.editor !== false)
      },
      editor() {
        if (!this.column.hasOwnProperty("editor")) {
          return "text"
        } else {
          return this.column.editor
        }
      },
      optionsDatalist() {
        let options = this.column.editorParams.values
        return options
      },
      idDatalist() {
        return 'datalist-' + this.column.field
      }
    },
    methods: {
      lookup(value, formatterParams) {
        let findParam = formatterParams.find(param => param.value === value)
        if(findParam === undefined) {
          return "Not found"
        } else {
          return findParam.text
        }
      },
      autocomplete(event) {
        console.log(event)
      },
      format() {
        return '111'
      }
    }
  }
</script>

<style scoped>

</style>
