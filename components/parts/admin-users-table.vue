<template>
  <vue-tabulator ref="usersTable" v-model="usersTable" :options="options"></vue-tabulator>
</template>

<script>
  export default {
    props: ['usersTable'],
    data() {
      return {
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", sorter:"number"},
            {title:"Пользователь", field:"username", sorter:"string"},
            {title:"Email", field:"email", sorter:"string"},
            {title:"Код активации", field:"activationCode"},
            {title:"Активный", field:"active", align:"center", formatter:"tickCross"},
            {title: "Роли", field: "roles"},
            {title: "", field:"id", formatter:"link", formatterParams:{
                label: "ред.",
                url:(cell) => {
                  return "/admin/users/" + cell.getValue()
                }
              }
            }
          ],
        }
      }
    },
    async asyncData({$axios}) {

      let {data} = await $axios.get('/admin/users');
      return {usersTable: data}

    },
  }
</script>
