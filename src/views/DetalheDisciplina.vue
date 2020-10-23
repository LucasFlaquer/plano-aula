<template>
  <dashboard>
    <h1>Detalhes da disciplina</h1>
    <p class="text-right">
      <!-- <a href="#">Editar Ementa</a> -->
      <router-link
        class="btn btn-primary"
        :to="{ name: 'EditDisciplina', params: { id: $route.params.id } }"
        >Editar</router-link
      >
      <router-link
        class="btn btn-secondary"
        :to="{ name: 'AddEmenta', params: { id: $route.params.id } }"
      >
        Nova Ementa
      </router-link>
    </p>
    <p><strong>Nome:</strong>{{ disciplina.nome }}</p>
    <p><strong>Semestre:</strong>{{ disciplina.semestre }}</p>
    <p>
      <strong>Carga Horária:</strong> teoria: {{ disciplina.teoria }} pratica:
      {{ disciplina.pratica }}
    </p>
    <h2>Ementa:</h2>
    <template v-if="disciplina.ementa">
      <p><strong>Ano da Ementa:</strong> {{ disciplina.ementa.data }}</p>
      <p><strong>Descricao:</strong> {{ disciplina.ementa.descricao }}</p>
      <div class="row">
        <div class="col-3">
          <h2>Conteúdo</h2>
          <ul>
            <li
              v-for="(item, index) in disciplina.ementa.conteudo"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="col-3">
          <h2>Compentencias</h2>
          <ol>
            <li
              v-for="(item, index) in disciplina.ementa.competencias"
              :key="index"
            >
              {{ item }}
            </li>
          </ol>
        </div>
        <div class="col-6">
          <h2>Objetivos de Aprendizagem</h2>
          <ol>
            <li
              v-for="(item, index) in disciplina.ementa.objetivos"
              :key="index"
            >
              {{ item }}
            </li>
          </ol>
        </div>
        <div class="col-6">
          <h2>Bibliografias Básicas</h2>
          <ul>
            <li v-for="lib in disciplina.ementa.basica" :key="lib.id">
              {{ lib.conteudo }}
            </li>
          </ul>
        </div>
        <div class="col-6">
          <h2>Bibliografias Complementares</h2>
          <ul>
            <li v-for="lib in disciplina.ementa.complementar" :key="lib.id">
              {{ lib.conteudo }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DetalheDisciplina',
  methods: {
    ...mapActions({
      fetchDisciplina: 'disciplinaModule/fetchOne',
    }),
  },
  computed: {
    ...mapState({
      disciplina: (state) => state.disciplinaModule.disciplina,
    }),
  },
  async created() {
    await this.fetchDisciplina(this.$route.params.id).then(() => {
      console.log('finalizada a busca da disciplina')
    })
  },
  components: {
    Dashboard,
  },
}
</script>

<style lang="scss" scoped>
strong {
  display: block;
}
</style>
