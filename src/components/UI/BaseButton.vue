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

.inactive {
    pointer-events: none;
    background: var(--mildgrey);
    box-shadow: none;
    color: var(--primarly);

}

.green {
  background: var(--blockgreen);
  color: white;
}
.green:hover {
  background: var(--darkgreen);
}

.secondary {
  border: 1px solid black;
  background: var(--white);
  transition: all 350ms ease-in-out;
  color: var(--black);
}

.secondary:hover {
  background: var(--primarly);

}

.nav {
  background: none;
  border: none;
  box-shadow: none;
  transition: all 250ms ease-in-out;
}
.nav:hover {
  color: white;
}

.reverse {
  background: transparent;
  box-shadow: none;
}

.filled:hover,
.filled:active {
    background-color: var(--blue);
}
</style>