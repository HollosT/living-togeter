<template>
  <button v-if="!link" :class="type">
    <slot></slot>
  </button>

  <router-link v-else :to="to" :class="type">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
    props: {
       type: {
            type: String,
            required: false,
            default: null,
       },

       link: {
        type: Boolean,
        required: false,
        default: false
       },

       to: {
        type: String,
        required: false,
        default: '/'
       }
    }

}
</script>

<style scoped>

button,
a {
    border: none;
    border-radius: .5vw;
    padding: .2vw 3vw;
    box-shadow: rgba(23, 23, 23, 0.25) 0px 2px 2px;
    transition: all 350ms ease-in-out;
    text-decoration: none;
}

button:hover,
button:active,
a:hover,
a:active {
    cursor: pointer;
}
.filled {
    background-color: var(--light-suplementar);
    color: var(--white);

}

.grey {
  background: var(--primarly);
  transition: all 350ms ease-in-out;
}

.grey:hover {
  background: var(--mildgrey);
  color: white;
}

.reverse {
  background: transparent;
  box-shadow: none;
}
.reverse:hover {
  cursor: pointer;
  transition: all 250ms ease-in-out;
  transform: translateY(-3px);
}

.filled:hover,
.filled:active {
    background-color: var(--blue);
}
</style>