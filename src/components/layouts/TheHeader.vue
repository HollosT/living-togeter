<template>
  <header>
    <nav>
       <router-link to="/"><h1>Living together</h1></router-link> 
       <router-link to="/residents"><h1>Residents</h1></router-link> 
  
    </nav>

  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
header {
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .25);
  background-color: #f3f3f3;
  width: 100%;
  
}
nav {
  padding: 2vw 0;
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: auto;
}

nav > a {
  text-decoration: none;
  color: black;
  padding: .5vw 1vw;

} 
a:active,
a:hover,
a.router-link-active {
  text-decoration: none;
  border: 1px solid #b5b5b5;
  border-radius: 100vw;
  background-color: white;
} 


</style>