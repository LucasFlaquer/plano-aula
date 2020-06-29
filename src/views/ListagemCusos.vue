<template>
  <Dashboard>
    <h1>Listagema de Cursos</h1>
    <p class="text-right">
      <b-button v-b-modal.modal-curso variant="primary" @click="handleFormOpen('')">Adicionar Curso</b-button>
    </p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Turno</th>
          <th>Coordenador</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(curso) in cursos" :key="curso.id">
          <td>{{curso.nome}}</td>
          <td>{{curso.turno}}</td>
          <td>{{curso.coordenador ? curso.coordenador.nome : 'Sem Coordenador' }}</td>
          <td>
            <b-button v-b-modal.modal-curso @click="handleFormOpen(curso.id)" >Editar</b-button>
            <a href="#" class="btn btn-danger">Deletar</a>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal id="modal-curso" :title="modalTitle" hide-footer>
      <FormCurso
        :cursoId="idCursoSelecionado"
      />
    </b-modal>

  </Dashboard>
</template>

<script>
  import Dashboard from '../components/Dashboard'
  import FormCurso from '../components/FormCurso'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'ListCursos',
    data() {
      return {
        modalTitle: 'Adicionar Curso',
        idCursoSelecionado:''
      }
    },
    created() {
      this.$store.dispatch('cursoModule/fetchCursos');
    },
    computed: {
      ...mapState({
        cursos: state=>state.cursoModule.cursos
      }),
    },
    methods: {
      ...mapActions(['cursoModule/fetchCursos']),
      handleFormOpen(id) {
        this.idCursoSelecionado = id
        if(id.length > 1)
          this.modalTitle = 'Editar Curso'
        else
          this.modalTitle = 'Adicionar Curso'
      }

    },
    components: {
      Dashboard,
      FormCurso
    }
  }
</script>

<style lang="scss">

</style>