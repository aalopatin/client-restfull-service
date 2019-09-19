<template>
    <vue-tabulator ref="userTable" v-model="userTable" :options="options"></vue-tabulator>
</template>

<script>
  export default {
    props: ['userTable'],
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
  }
</script>
