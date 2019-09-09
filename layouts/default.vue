<template>
  <div>
    <NavbarBrand></NavbarBrand>
    <b-container fluid class="mt-3">
      <b-row>
        <b-col md order-md="first">
          ЛЕВАЯ КОЛОНКА
        </b-col>
        <b-col md="8" order="first">
          <nuxt />
        </b-col>
        <b-col md>
          ПРАВАЯ КОЛОНКА
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavbarBrand from '../components/navbar-brand'
export default {
  components: { NavbarBrand }
}
</script>
