<template>
  <Dashboard>
    <h1>Listagem de Bibliografias Gerais:</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Autor</th>
          <th>Editora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bibliografia in bibliografias" :key="bibliografia.id">
          <td>{{bibliografia.nome}}</td>
          <td>{{bibliografia.autor}}</td>
          <td>{{bibliografia.editora}}</td>
        </tr>
      </tbody>
    </table>
  </Dashboard>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import Dashboard from '@/components/Dashboard'
  export default {
    name:'ListagemBibliografias',
    methods: {
      ...mapActions({
        fetchBibliografias: 'bibliografiaModule/fetchBibliografias'
      })
    },
    created () {
      this.fetchBibliografias()
    },
    computed: {
      ...mapGetters({
        bibliografias: 'bibliografiaModule/getAllBibliografias'
      })
    },
    components: {
      Dashboard,
    },
  }
</script>

<style lang="scss" scoped>

</style>