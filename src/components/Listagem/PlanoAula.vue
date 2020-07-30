<template>
  <table class="table">
    <thead>
      <tr>
        <th>Turma</th>
        <th>Professor</th>
        <th>Disciplina</th>
        <th>Curso</th>
        <th>Semestre/Ano</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="plano in planos" :key="plano.id">
        <td>{{plano.turma}}</td>
        <td>{{plano.professor.nome}}</td>
        <td>{{plano.disciplina.nome}}</td>
        <td>{{plano.curso.nome}}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'ListagemPA',
  
  computed: {
    ...mapState({
      planos: state=> state.planoAulaModule.planosAula
    }),
    anoSemestre() {
      return 1
    },
  },
}
</script>

<style lang="scss" scoped>
</style>