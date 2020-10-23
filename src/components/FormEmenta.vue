<template>
  <form ref="form" @submit.prevent="submit" novalidate>
    <fieldset>
      <div class="row">
        <div class="col-12 form-group">
          <label for="descricao">Descricao</label>
          <textarea
            name="descricao"
            id="descricao"
            cols="30"
            rows="10"
            class="form-control"
            v-model="descricao"
          ></textarea>
        </div>
        <div class="col-4">
          <h3>Conteúdo</h3>
          <list-control list_name="conteudo" @updateList="updateList" />
        </div>
        <div class="col-4">
          <h3>Competencias</h3>
          <list-control list_name="competencias" @updateList="updateList" />
        </div>
        <div class="col-4">
          <h3>Objetivos</h3>
          <list-control list_name="objetivos" @updateList="updateList" />
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend>Bibliografias</legend>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label class="typo__label">Básica</label>
            <multiselect
              v-model="basica"
              :options="bibliografias"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Selecione as bibliografias básicas"
              label="nome"
              track-by="nome"
            >
              <template
                slot="selection"
                slot-scope="{ values, search, isOpen }"
              >
                <span
                  class="multiselect__single"
                  v-if="values.length &amp;&amp; !isOpen"
                  >{{ values.length }} bibliografias selecionadas</span
                >
              </template>
            </multiselect>
            <p class="mt-3"><strong>Selecionados</strong></p>
            <ul class="list">
              <li v-for="bibliografia in basica" :key="bibliografia.id">
                <label for="">{{ bibliografia.nome }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="typo__label">Complementar</label>
            <multiselect
              v-model="complementar"
              :options="bibliografias"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Selecione as bibliografias Complementares"
              label="nome"
              track-by="nome"
            >
              <template
                slot="selection"
                slot-scope="{ values, search, isOpen }"
              >
                <span
                  class="multiselect__single"
                  v-if="values.length &amp;&amp; !isOpen"
                  >{{ values.length }} bibliografias selecionadas</span
                >
              </template>
            </multiselect>
            <p class="mt-3"><strong>Selecionados</strong></p>
            <ul class="list">
              <li v-for="bibliografia in complementar" :key="bibliografia.id">
                <label for="">{{ bibliografia.nome }}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </fieldset>
    <button class="btn btn-primary">Cadastrar</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ListControl from '@/components/ListControl'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import validaForm from '../functions/validaForm'

export default {
  name: 'FormEmenta',
  props: {
    id_disc: {
      required: true,
    },
  },
  data() {
    return {
      descricao: '',
      conteudo: [],
      competencias: [],
      objetivos: [],
      basica: [],
      complementar: [],
    }
  },
  methods: {
    submit() {
      const form = this.$refs.form
      if (form.checkValidity()) this.send()
      else validaForm(form)
    },
    send() {
      const libs_basicas = this.basica.map((el) => el.id)
      const libs_complementares = this.complementar.map((el) => el.id)
      const data = {
        descricao: this.descricao,
        conteudo: this.conteudo,
        competencias: this.competencias,
        objetivos: this.objetivos,
        basica: libs_basicas,
        complementar: libs_complementares,
      }
      console.log(data)
      this.addEmenta({
        id: this.id_disc,
        ementa: data,
      })
    },
    updateList(data) {
      console.log('atualizei lista')
      console.log(data)
      this[data.list_name] = data.items.map((item) => item)
    },
    ...mapActions({
      fetchBibliografias: 'bibliografiaModule/fetchAll',
      addEmenta: 'disciplinaModule/addEmenta',
    }),
  },
  computed: {
    ...mapState({
      bibliografias: (state) => state.bibliografiaModule.bibliografias,
    }),
  },
  created() {
    this.fetchBibliografias()
  },
  components: {
    ListControl,
    Multiselect,
  },
}
</script>

<style lang="scss" scoped></style>
