<template>
  <dashboard>
    <h1>Listagem de Disciplinas</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Carga Horária (Teorica)</th>
          <th>Carga Horária (Prática)</th>
          <th>Professor Responsável (NDE)</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nome da Disciplina</td>
          <td>40</td>
          <td>40</td>
          <td>Nome do Professor</td>
          <td>
            <a href="#" class="btn btn-info">Detalhes</a>
            <a href="#" class="btn btn-info">Editar</a>
            <a href="#" class="btn btn-danger">Excluir</a>
          </td>
        </tr>
      </tbody>
    </table>
  </dashboard>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dashboard from "@/components/Dashboard";
export default {
  name: "ListagemDisciplinas",
  methods: {
    ...mapActions({
      fetchDisciplinas: "disciplinaModule/fetchDisciplinas"
    }),
    name() {
      //definir metodos
    }
  },
  computed: {
    ...mapGetters({
      disciplinas: "disciplinaModule/getAllDisciplinas"
    })
  },
  created() {
    this.fetchDisciplinas();
    console.log(this.disciplinas);
  },
  components: {
    Dashboard
  }
};
</script>

<style lang="scss" scoped></style>
