<template>
  <form class="form" ref="form" novalidate>
    <fieldset>
      <legend>Disciplina</legend>
      <div class="form-row">
        <div class="form-group col-8">
          <label for="nome">Nome da Disciplina</label>
          <input type="text" id="nome" required class="form-control" v-model="nome">
        </div>
        <div class="form-group col-4">
          <label for="semestre">Semestre</label>
          <select class="form-control" name="semestre" id="semestre" v-model="semestre">
            <option value="0">Selecione</option>
            <option v-for="n in 10" :key="n" :value="n">
              {{n}}
            </option>
          </select>
        </div>
        <div class="form-group col-4">
          <label for="teoria">Carga Horária Teoria</label>
          <select class="form-control" name="teoria" id="">
            <option value="">Selecione</option>
            <option value="0">00</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
          </select>
        </div>
        <div class="form-group col-4">
          <label for="pratica">Carga Horária Pratica</label>
          <select class="form-control" name="pratica" id="">
            <option value="">Selecione</option>
            <option value="0">00</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
          </select>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend>Ementa</legend>
      
    </fieldset>
    <fieldset>
      <legend>Bibliografias</legend>
      <div class="form-group">
        <label class="typo__label">Simple select / dropdown</label>
        <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
          </template>
        </multiselect>
        <pre class="language-json"><code>{{ value  }}</code></pre>
      </div>
    </fieldset>
  </form>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'
  export default {
    name: 'FormDisciplina',
    data() {
      return {
        nome: '',
        pratica: 0,
        teoria: 0,
        semestre: 0,
        value: [],
        options: [
          { name: 'Vue.js', language: 'JavaScript' },
          { name: 'Adonis', language: 'JavaScript' },
          { name: 'Rails', language: 'Ruby' },
          { name: 'Sinatra', language: 'Ruby' },
          { name: 'Laravel', language: 'PHP' },
          { name: 'Phoenix', language: 'Elixir' }
        ]
      }
    },
    components: {
      Multiselect,
    },
  }
</script>

<style lang="scss">

</style>