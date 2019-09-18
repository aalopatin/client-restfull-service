<template>
  <div>
    <h3>{{ $auth.user.username }}</h3>
    <hr>
    <b-form @submit.stop.prevent="changeEmail">
      <h6>Изменить Email</h6>
      <b-alert v-if="successEmail" variant="success" show>Email успешно изменен!</b-alert>
      <b-form-group id="email-group" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="$v.formEmail.email.$model"
          type="email"
          :state="$v.formEmail.email.$dirty ? !$v.formEmail.email.$error : null"
          aria-describedby="email-live-feedback"
          placeholder="Введите email"
        ></b-form-input>
        <b-form-invalid-feedback id="email-live-feedback">
          <div v-if="!$v.formEmail.required">Email обязателен для ввода!</div>
          <div v-if="!$v.formEmail.email.email">Email содержит ошибки!</div>
        </b-form-invalid-feedback>
      </b-form-group>
      <template v-if="errorsEmail.length">
        <b-alert v-for="error in errorsEmail" :key="error.code" show variant="danger">
          {{ error.message }}
        </b-alert>
      </template>
      <b-btn type="submit" variant="dark">Сохранить</b-btn>
    </b-form>
    <b-form class="mt-3" @submit.stop.prevent="changePassword">
      <h6>Изменить пароль</h6>
      <b-alert v-if="successPassword" variant="success" show>Пароль успешно изменен!</b-alert>
      <b-form-group id="password-group" label="Пароль:" label-for="password">
        <b-form-input
          id="password"
          v-model="$v.formPassword.password.$model"
          type="password"
          :state="$v.formPassword.password.$dirty ? !$v.formPassword.password.$error : null"
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
          v-model="$v.formPassword.passwordConfirm.$model"
          type="password"
          :state="$v.formPassword.passwordConfirm.$dirty ? !$v.formPassword.passwordConfirm.$error : null"
          aria-describedby="password-confirm-live-feedback"
          placeholder="Введите подтверждение пароля"
        ></b-form-input>
        <b-form-invalid-feedback id="password-confirm-live-feedback">
          <div v-if="!$v.formPassword.passwordConfirm.required">Подтверждение пароля не может быть пустым!</div>
          <div v-if="!$v.formPassword.passwordConfirm.sameAsPassword">Пароль и подтверждение не совпадают!</div>
        </b-form-invalid-feedback>
      </b-form-group>
      <template v-if="errorsPassword.length">
        <b-alert v-for="error in errorsPassword" :key="error.code" show variant="danger">
          {{ error.message }}
        </b-alert>
      </template>
      <b-btn type="submit" variant="dark">Сохранить</b-btn>
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
        formEmail: {},
        formPassword: {
          password: '',
          passwordConfirm: ''
        },
        successEmail: false,
        successPassword: false,
        errorsEmail: [],
        errorsPassword: []
      }
    },
    validations: {
      formEmail: {
        email: {
          required,
          email
        },
      },
      formPassword: {
        password: {
          required
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    },
    async asyncData({$auth, $axios}) {

      let {data} = await $axios.get('/profile/' + $auth.user.id);
      return {formEmail: data}

    },
    methods: {
      changeEmail(event) {
        this.errorsEmail = []
        this.successEmail = false
        this.$v.formEmail.$touch()

        if (this.$v.formEmail.$anyError) {
          return
        }

        this.$axios.put('/profile/' + this.$auth.user.id + '/email', this.formEmail)
          .then((response) => {
            this.successEmail = true
          }).catch(({response}) => {
            this.errorsEmail = response.data.subErrors
        })
      },
      changePassword(event) {
        this.errorsPassword = []
        this.successPassword = false
        this.$v.formPassword.$touch()

        if (this.$v.formPassword.$anyError) {
          return
        }

        this.$axios.put('/profile/' + this.$auth.user.id + '/password', this.formPassword)
          .then((response) => {
            this.successPassword = true
          }).catch((e) => {
          this.errorsPassword = response.data.subErrors
        })
      }
    }
  }

</script>
