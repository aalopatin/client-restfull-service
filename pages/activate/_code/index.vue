<template>
  <div>
    <b-alert v-if="!result" show variant="danger">
      При активации email произошла ошибка!
    </b-alert>
    <b-alert v-if="result" show variant="success">
      Активация email прошла успешно!
    </b-alert>
    <mainlogin />
  </div>
</template>

<script>
import mainlogin from '~/components/button/main-login'

export default {
  layout: 'empty',
  components: {
    mainlogin
  },
  asyncData({ route, $axios }) {
    return $axios
      .post(route.fullPath)
      .then((response) => {
        return { result: response.data.result }
      })
      .catch((e) => {
        return { result: false }
      })
  }
}
</script>
