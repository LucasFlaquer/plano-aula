<template>
  <Dashboard>
    <h1>Listagema de Cursos</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <td>Nome</td>
          <td>Turno</td>
          <td>Coordenador</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(curso) in cursos" :key="curso.id">
          <td>{{curso.nome}}</td>
          <td>{{curso.turno}}</td>
          <td>{{curso.coordenador}}</td>
        </tr>
      </tbody>
    </table>
  </Dashboard>
</template>

<script>
  import Dashboard from '../components/Dashboard'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'ListCursos',
    created() {
      console.log('listagem de cursos:', this.cursos)
    },
    computed: {
      ...mapState({
        cursos: state=>state.cursoModule.cursos
      }),
      ...mapActions(['cursoModule/fetchCursos'])
    },
    components: {
      Dashboard
    }
  }
</script>

<style lang="scss">

</style>