<template>
  <div>
    <h3>{{ user.username }}</h3>
    <hr>
    <b-form @submit.stop.prevent="saveUser">
      <b-alert v-if="success" variant="success" show>Изменения успешно сохранены!</b-alert>
      <b-form-group><b>Пользователь: </b> {{ user.username }}</b-form-group>
      <b-form-group><b>Email: </b> {{ user.email }}</b-form-group>
      <b-form-group><b>Код активации: </b> {{ user.activationCode }} <b-btn variant="link" @click="setActivationCode">Установить</b-btn></b-form-group>
      <b-form-checkbox id="user-active" v-model="user.active" name="active">
        Активный
      </b-form-checkbox>
      <b-form-group label="Роли:">
        <b-form-checkbox-group v-model="user.roles" :options="roles" name="roles" stacked></b-form-checkbox-group>
      </b-form-group>
      <b-btn type="submit" variant="dark">Сохранить</b-btn>
    </b-form>

  </div>
</template>
<script>
  import { ADMIN_USERS } from '~/assets/js/constants/breadcrumb'

  export default {
    layout: 'admin',
    data() {
      return {
        user: {},
        success: false,
        roles: [
          {text: 'Администратор', value: 'ADMIN'},
          {text: 'Пользователь', value: 'USER'}
        ]
      }
    },
    asyncData({params, $axios, store, error}) {
      return $axios.get(`/admin/users/${params.id}`)
        .then((result) => {

          store.commit('breadcrumb/set', ADMIN_USERS)
          store.commit('breadcrumb/pushActive', result.data.username)

          return {user: result.data}
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'User not found' })
        })
    },
    methods: {
      saveUser() {
        this.success = false;
        this.$axios.put(`/admin/users/${this.user.id}`, this.user)
          .then((response) => {
              this.success = true;
            }
          )
      },
      setActivationCode() {
        this.$axios.get(`/admin/users/${this.user.id}/activationCode`)
          .then((response) => {
            this.user.activationCode = response.data.activationCode
          })
      }
    }
  }
</script>
