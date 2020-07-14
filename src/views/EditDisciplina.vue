<template>
  <dashboard>
    <h1>Editar Disciplina</h1>
    <form-disciplina
      v-if="discFound"
      :id_disc="$route.params.id"
    />
  </dashboard>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import FormDisciplina from '@/components/FormDisciplina'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'EditDisciplina',
    data() {
      return {
        discFound:false
      }
    },
    computed: {
      ...mapState({
        disciplina: state=> state.disciplinaModule.disciplina
      })
    },
    methods: {
      ...mapActions({
        fetchDisciplina: 'disciplinaModule/fetchOne'
      })
    },
    created () {
      this.fetchDisciplina(this.$route.params.id).then(()=> {
        this.discFound=true
      })
    },
    components: {
      Dashboard,
      FormDisciplina
    }
  }
</script>

<style lang="scss" scoped>

</style>