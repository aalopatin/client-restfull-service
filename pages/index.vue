<template>
  <div>
    Содержимое главной страницы
    <nuxt-link to="/registration">Зарегистрироваться</nuxt-link>
    <b-button @click="$auth.logout()">Выйти</b-button>
    <p>{{ $auth.hasScope('USER') }}</p>
  </div>
</template>
