<template>
  <dashboard>
    <h1>Listagem de Disciplinas</h1>
    <p>
      <router-link class="btn btn-primary" :to="{ name: 'AddDisciplina' }"
        >Nova Disciplina</router-link
      >
    </p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Carga Horária (Teorica)</th>
          <th>Carga Horária (Prática)</th>
          <!-- <th>Professor Responsável (NDE)</th> -->
          <th>Semestre</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="disc in disciplinas" :key="disc.id">
          <td>{{ disc.nome }}</td>
          <td>{{ disc.teoria }}</td>
          <td>{{ disc.pratica }}</td>
          <!-- <td>Nome do Professor</td> -->
          <td>{{ disc.semestre }}</td>
          <td>
            <router-link
              :to="{ name: 'DetalheDisciplina', params: { id: disc.id } }"
              class="btn btn-info"
              >Detalhes</router-link
            >
            <router-link
              :to="{ name: 'EditDisciplina', params: { id: disc.id } }"
              class="btn btn-info"
              >Editar</router-link
            >
            <a
              href="#"
              class="btn btn-danger"
              @click="deleteDisciplina(disc.id)"
              >Excluir</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </dashboard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dashboard from '@/components/Dashboard'
export default {
  name: 'ListagemDisciplinas',
  methods: {
    ...mapActions({
      fetchDisciplinas: 'disciplinaModule/fetchAll',
      deleteDisciplina: 'disciplinaModule/delete',
    }),
  },
  computed: {
    ...mapGetters({
      disciplinas: 'disciplinaModule/getAll',
    }),
  },
  created() {
    this.fetchDisciplinas()
    console.log(this.disciplinas)
  },
  components: {
    Dashboard,
  },
}
</script>

<style lang="scss" scoped></style>
