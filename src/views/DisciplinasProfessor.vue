<template>
  <dashboard>
    <h1>Associar Disciplinas à um Professor:</h1>
    <form novalidate ref="form" @submit.prevent="submit">
      <select name id v-model="prof_id" required>
        <option value>Selecione um professor</option>
      </select>
    </form>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DisciplinasProfessor',
  data() {
    return {
      prof_id: '',
      disciplinas_professor: []
    }
  },
  computed: {
    ...mapState({
      loggedUser: state => state.userModule.userLogged
    })
  },
  methods: {
    submit() {
      const form = this.$refs.form
    },
    getDisciplinas() {},
    ...mapActions({
      fetchAllDisciplinas: 'disciplinaModule/fetchAll'
    })
  },
  components: {
    Dashboard
  },
  beforeRouterEnter(to, from, next) {
    if (this.loggedUser.access.coordenador || this.loggedUser.access.admin) {
      next()
    } else {
      to({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>