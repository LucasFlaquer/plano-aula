<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{count}}</p>
    <HelloWorld :msg="msg"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      msg:'quero peidar'
    }
  },
  components: {
    HelloWorld
  },
  computed: {
    couneet() {
      return this.$store.state.count
    },
    ...mapState(['count'])

  }
}
</script>
