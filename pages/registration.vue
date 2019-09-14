<template>
  <b-card>
    <b-form @submit.stop.prevent="onSubmit">
    <b-form-group id="username-group" label="Имя пользователя:" label-for="username">
      <b-form-input
        id="username"
        v-model="$v.form.username.$model"
        type="text"
        :state="$v.form.username.$dirty ? !$v.form.username.$error : null"
        aria-describedby="username-live-feedback"
        placeholder="Введите имя пользователя"
      ></b-form-input>
      <b-form-invalid-feedback id="username-live-feedback">
        Имя пользователя обязательно для ввода!
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="email-group" label="Email:" label-for="email">
      <b-form-input
        id="email"
        v-model="$v.form.email.$model"
        type="email"
        :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
        aria-describedby="email-live-feedback"
        placeholder="Введите email"
      ></b-form-input>
      <b-form-invalid-feedback id="email-live-feedback">
        <div v-if="!$v.form.email.required">Email обязателен для ввода!</div>
        <div v-if="!$v.form.email.email">Email содержит ошибки!</div>
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="password-group" label="Пароль:" label-for="password">
      <b-form-input
        id="password"
        v-model="$v.form.password.$model"
        type="password"
        :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
        aria-describedby="password-live-feedback"
        placeholder="Введите пароль"
      ></b-form-input>
      <b-form-invalid-feedback id="password-live-feedback">
        Пароль не может быть пустым!
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="password-confirm-group" label="Подтверждение пароля:" label-for="password-confirm">
      <b-form-input
        id="password-confirm"
        v-model="$v.form.passwordConfirm.$model"
        type="password"
        :state="$v.form.passwordConfirm.$dirty ? !$v.form.passwordConfirm.$error : null"
        aria-describedby="password-confirm-live-feedback"
        placeholder="Введите подтверждение пароля"
      ></b-form-input>
      <b-form-invalid-feedback id="password-confirm-live-feedback">
        <div v-if="!$v.form.passwordConfirm.required">Подтверждение пароля не может быть пустым!</div>
        <div v-if="!$v.form.passwordConfirm.sameAsPassword">Пароль и подтверждение не совпадают!</div>
      </b-form-invalid-feedback>
    </b-form-group>
    <template v-if="errors.length">
      <b-alert v-for="error in errors" :key="error.code" show variant="danger">
        {{ error.message }}
      </b-alert>
    </template>
    <b-button type="submit" variant="dark">Зарегистрироваться</b-button>
  </b-form>
  </b-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    layout: 'emptyForm',
    mixins: [validationMixin],
    data() {
      return {
        form: {
          username: "",
          email: "",
          password: "",
          passwordConfirm: ""
        },
        errors: []
      }
    },
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAs('password')
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      onSubmit(event) {
        this.errors = []
        this.$v.form.$touch()

        if (this.$v.form.$anyError) {
          return
        }

        this.$axios.post('/registration', this.form)
          .then((response) => {
            this.$router.push('/')
          }).catch(({response}) => {
            this.errors = response.data.subErrors
          })
      }
    }
  }
</script>
