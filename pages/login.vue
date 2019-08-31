<template>
  <b-form class="align-middle" @submit.stop.prevent="onSubmit">
    <b-form-group
      id="username-group"
      label="Имя пользователя:"
      label-for="username"
    >
      <b-form-input
        id="username"
        v-model="form.username"
        type="text"
        placeholder="Введите имя пользователя"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="password-group" label="Пароль:" label-for="password">
      <b-form-input
        id="password"
        v-model="form.password"
        type="password"
        placeholder="Введите пароль"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Войти</b-button>
  </b-form>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.$auth.loginWith('local', {
        data: {
          username: this.form.username,
          password: this.form.password
        }
      })
    }
  }
}
</script>
