<template>
  <div>
    <h3>{{ $auth.user.username }}</h3>
    <hr>
    <b-form class="align-middle" @submit.stop.prevent="save">
      <h6>Изменить основные данные</h6>
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
      <h6>Изменить пароль</h6>
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
          {{ error.error }}
        </b-alert>
      </template>
      <b-button type="submit" variant="dark">Сохранить</b-button>
    </b-form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    middleware: ['auth'],
    mixins: [validationMixin],
    data() {
      return {
        errors: []
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    },
    asyncData({$auth}){
      return {
        form: {
            email: $auth.user.email,
            password: "",
            passwordConfirm: ""
          }
      };
    },
    methods: {
      save(event) {
        this.errors = []
        this.$v.form.$touch()

        if (this.$v.form.$anyError) {
          return
        }

        this.$axios.post('/profile/edit', this.form).then((response) => {
          if (response.data.errors) {
            this.errors = response.data.errors
          }
        })
      }
    }
  }

</script>
