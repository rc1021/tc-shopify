<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="fun1">Fun1</button>
  </div>
</template>

<script setup lang="ts">
  import $http from '@/api/http';
  import apiUrl from '@/api/url';
  function fun1() {
    $http.get(`${apiUrl.fun1}`).then(response => console.log(response));
  }
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
