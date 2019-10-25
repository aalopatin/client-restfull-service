<template>
  <div>
    <b-row>
      <b-col cols="2">
        <b-nav vertical>
          <b-nav-item to="/admin/" exact exact-active-class="active">Основное</b-nav-item>
          <b-nav-item to="/admin/users" exact exact-active-class="active">Пользователи</b-nav-item>
          <b-nav-item to="/admin/companies" exact exact-active-class="active">Компании</b-nav-item>
          <b-nav-item v-b-toggle="'reports'">Отчетность</b-nav-item>
          <b-collapse id="reports" class="ml-3">
            <b-nav-item to="/admin/periods" exact exact-active-class="active">Периоды</b-nav-item>
            <b-nav-item to="/admin/typesreports" exact exact-active-class="active">Типы отчетов</b-nav-item>
            <b-nav-item to="/admin/groupsparameters" exact exact-active-class="active">Группы параметров</b-nav-item>
            <b-nav-item to="/admin/parameters" exact exact-active-class="active">Параметры</b-nav-item>
          </b-collapse>
        </b-nav>
      </b-col>
      <b-col cols="10">
        <b-breadcrumb v-if="items.length" :items="items"></b-breadcrumb>
        <nuxt-child></nuxt-child>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    layout: 'admin',
    computed: mapState({
      items: state => state.breadcrumb.items
    })
  }
</script>
