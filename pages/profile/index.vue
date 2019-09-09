<template>
  <div>
    <h3>{{ $auth.user.username }}</h3>
    <hr>
    <b-tabs pills vertical>
      <b-tab title="Основное" active>
        <b-row>
          <b class="mr-2">Email:</b> <span>{{ $auth.user.email }}</span>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>
