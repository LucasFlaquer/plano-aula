<template>
  <dashboard>
    <h1>Meus Planos de Aula</h1>
    <router-link class="btn btn-primary" :to="{name:'AddPlanoAula'}">Adicionar</router-link>
    <planos-aula v-if="loading" />
  </dashboard>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import PlanosAula from '@/components/Listagem/PlanoAula'
import { mapActions } from 'vuex'
export default {
  name: 'ListagemPlanoAulaProfessor',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      fetchByUser: 'planoAulaModule/fetchByUser',
    }),
  },
  created() {
    this.fetchByUser().then(() => {
      console.log('yessssssss')
      this.loading = !this.loading
    })
  },
  components: {
    Dashboard,
    PlanosAula,
  },
}
</script>

<style lang="scss" scoped>
</style>