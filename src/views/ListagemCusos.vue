<template>
  <Dashboard>
    <h1>Listagema de Cursos</h1>
    <p class="text-right">
      <router-link class="btn btn-primary" :to="{ name: 'AddCurso' }">
        Adicionar Curso
      </router-link>
    </p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Grade Atual(ano)</th>
          <th>Coordenador</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cursos.length > 0">
          <tr v-for="curso in cursos" :key="curso.id">
            <td>{{ curso.nome }}</td>
            <td>{{ curso.grades[0].ano }}</td>
            <td>
              {{
                curso.coordenador ? curso.coordenador.nome : 'Sem Coordenador'
              }}
            </td>
            <td>
              <router-link
                class="btn btn-primary"
                :to="{ name: 'EditCurso', params: { id: curso.id } }"
                >Editar</router-link
              >
              <a href="#" class="btn btn-danger" @click="deleteCurso(curso.id)"
                >Deletar</a
              >
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </Dashboard>
</template>

<script>
import Dashboard from '../components/Dashboard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListCursos',
  data() {
    return {
      modalTitle: 'Adicionar Curso',
      idCursoSelecionado: '',
    }
  },
  created() {
    this.$store.dispatch('cursoModule/fetchAll')
  },
  computed: {
    ...mapState({
      cursos: (state) => state.cursoModule.cursos,
    }),
  },
  methods: {
    ...mapActions({
      deleteCurso: 'cursoModule/deleteCurso',
    }),
    handleFormOpen(id) {
      this.idCursoSelecionado = id
      if (id.length > 1) this.modalTitle = 'Editar Curso'
      else this.modalTitle = 'Adicionar Curso'
    },
  },
  components: {
    Dashboard,
  },
}
</script>

<style lang="scss"></style>
