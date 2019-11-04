<template>
  <div>
    <navbar-brand></navbar-brand>
    <b-container fluid class="mt-3">
      <nuxt></nuxt>
    </b-container>
  </div>
</template>

<script>
  import NavbarBrand from '~/components/NavbarBrand'
  export default {
    name: 'admin',
    middleware: 'admin',
    components: {NavbarBrand}
  }
</script>
