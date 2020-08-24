<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="#">{{folder}}</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">{{action}}</li>
    </ol>
  </nav>
</template>
<script>
export default {
  props: ["folder", "action"]
};
</script>