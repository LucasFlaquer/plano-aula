<template>
  <dashboard>
    <h1>Cadastrar nova Ementa para a disciplina {{disciplina.nome}}</h1>
    <form-ementa
      :id_disc="disciplina.id"
    />
  </dashboard>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import FormEmenta from '@/components/FormEmenta'
  import { mapState } from 'vuex'
  export default {
    name: 'AddEmenta',
    computed: {
      ...mapState({
        disciplina: state => state.disciplinaModule.disciplina
      })
    },
    created() {
      this.$store.dispatch('disciplinaModule/fetchOne', this.$route.params.id)
    },
    components: {
      Dashboard,
      FormEmenta,
    },
  }
</script>

<style lang="scss" scoped>

</style>