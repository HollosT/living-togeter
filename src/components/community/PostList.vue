<template>
  <ul>
    <li v-for="post in posts" :key="post.postId">
        <p>{{post.post}}</p> 
        <p>{{post.date[0]}} - {{post.date[1]}}</p>
        <p>{{post.firstName}}</p>
    </li>
  </ul>
</template>

<script>
export default {
    props: ['posts']

}
</script>

<style>

</style>