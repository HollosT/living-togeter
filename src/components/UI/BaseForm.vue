<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {

}
</script>

<style scoped>
    form {
      display: flex;
      flex-direction: column;
      width: 80%;
      margin: auto;
    }


</style>