<template>
  <dashboard>
    <h1>Associar Disciplinas à um Professor:</h1>
    <form novalidate ref="form" class="form" @submit.prevent="submit">
      <div class="row">
        <div class="form-group col-4">
          <label for>Professor</label>
          <select
            @change="atualizarDisciplinas"
            class="form-control"
            name="professor"
            id="professor"
            v-model="prof_id"
            required
          >
            <option value>Selecione um professor</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for>Disciplinas</label>
          <label class="typo__label">Básica</label>
          <multiselect
            v-model="disciplinasProfessor"
            :options="disciplinas"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Selecione as disciplinas do professor"
            label="nome"
            track-by="nome"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span
                class="multiselect__single"
                v-if="values.length &amp;&amp; !isOpen"
                >{{ values.length }} Disciplinas selecionadas</span
              >
            </template>
          </multiselect>
        </div>
      </div>
      <p><button class="btn btn-primary">Salvar Disciplinas</button></p>
    </form>
  </dashboard>
</template>

<script>
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Multiselect from 'vue-multiselect'
import Dashboard from '@/components/Dashboard'
import { mapState, mapActions } from 'vuex'
import validaForm from '../functions/validaForm'
export default {
  name: 'DisciplinasProfessor',
  data() {
    return {
      prof: Object,
      prof_id: '',
      disciplinasProfessor: [],
      disciplinas: [],
    }
  },
  computed: {
    ...mapState({
      loggedUser: (state) => state.userModule.userLogged,
      users: (state) => state.userModule.users,
      professor: (state) => state.userModule.user,
      curso: (state) => state.cursoModule.curso,
    }),
  },
  methods: {
    submit() {
      const form = this.$refs.form
      if (form.checkValidity()) this.send()
      else validaForm(form)
    },
    send() {
      const disc_ids = this.disciplinasProfessor.map((el) => el.id)
      console.log(disc_ids)

      this.patchDisciplinas({
        id: this.prof_id,
        disc_ids,
      })
    },
    ...mapActions({
      fetchAllUsers: 'userModule/fetchAll',
      fetchDiscCurso: 'cursoModule/fetchOneCoordenador',
      patchDisciplinas: 'userModule/patchDisciplinas',
    }),
    atualizarDisciplinas() {
      const user = this.users.find((user) => user.id === this.prof_id)
      console.log('--- professor --->:', user.name)
      console.log(user)
      console.log('------------------')
      this.disciplinasProfessor = []
      console.log(this.disciplinasProfessor)
      this.disciplinasProfessor = user.disciplinas_ministradas
      console.log(this.disciplinasProfessor)

      console.log('atualizar as disciplinas')
    },
  },
  components: {
    Dashboard,
    Multiselect,
  },
  created() {
    console.log('created')
    this.fetchAllUsers().then(() => {
      console.log('usuario->', this.loggedUser.access)
      console.log(this.users)
      if (this.loggedUser.access.coordenador)
        this.fetchDiscCurso().then(() => {
          this.disciplinas = this.curso.grades[0].disciplinas
        })
    })
  },
  async beforeRouteEnter(to, from, next) {
    console.log('entrei na rota')
    await next((vm) => {
      if (vm.loggedUser.access.coordenador || vm.loggedUser.access.admin) {
        console.log('vaidei user')
        next()
      } else {
        next('/')
      }
    })
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('entrei na rota')
  //   if (this.loggedUser.access.coordenador || this.loggedUser.access.admin) {
  //     console.log('vaidei user')
  //     next()
  //   } else {
  //     to({ name: 'Home' })
  //   }
  // },
}
</script>

<style lang="scss" scoped></style>
