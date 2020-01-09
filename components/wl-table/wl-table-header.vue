<template>
  <thead>
    <tr>
      <th v-for="column in columns" :key="column.field">{{ column.title }}</th>
      <th v-if="editable">Действия</th>
    </tr>
  </thead>
</template>

<script>
  export default {
    name: "wl-table-header",
    props:{
      columns: {
        type: Array,
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
