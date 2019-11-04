<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">The Watch List</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Найти"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Найти</b-button>
        </b-nav-form>
        <template v-if="!$auth.$state.loggedIn">
          <b-nav-item href="/login">Войти</b-nav-item>
        </template>
        <template v-else>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <b>{{ $auth.user.username }}</b>
            </template>
            <b-dropdown-item href="/profile">Профиль</b-dropdown-item>
            <b-dropdown-item href="/profile/edit">Настройки</b-dropdown-item>
            <b-dropdown-item v-if="$auth.hasScope('ADMIN')" href="/admin">Администрирование</b-dropdown-item>
            <b-dropdown-item @click="$auth.logout()">Выйти</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavbarBrand'
}
</script>
