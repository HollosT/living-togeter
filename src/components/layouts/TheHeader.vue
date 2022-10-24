<template>
  <header>
    <nav>
       <router-link to="/"><h1>Living together</h1></router-link> 
       <div>
         <router-link to="/login"><h1>Login</h1></router-link> 
         <router-link to="/signup"><h1>Signup</h1></router-link> 
       </div>
  
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

a {
  text-decoration: none;
  color: black;
  padding: .5vw 1vw;
  border-radius: 100vw;
  border:  transparent;


} 
a:active,
a:hover,
a.router-link-active {
  border: #b5b5b5;
  background-color: white;

} 

nav > div  {
  display: flex;
  gap: 5vw
}


</style>