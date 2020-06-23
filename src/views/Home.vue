<template>
  <Dashboard>
    <p>hahahahah</p>
  </Dashboard>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
  </div> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Dashboard from '@/components/Dashboard.vue'
import { mapActions } from 'vuex';
export default {
  name: 'Home',
  computed: {
    // token() {
      //   return this.$store.state.user.token
    // },
    // ...mapState(['count'])
  },
  methods: {
    ...mapActions(['fetchUser'])
  },
  created() {
    //buscar pelo usuario
    this.fetchUser()
    
  },
  components: {
    Dashboard
  },
}
</script>
