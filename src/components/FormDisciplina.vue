<template>
  <form class="form" ref="form" novalidate @submit.prevent="submit">
    <fieldset>
      <legend>Disciplina</legend>
      <div class="form-row">
        <div class="form-group col-8">
          <label for="nome">Nome da Disciplina</label>
          <input type="text" id="nome" class="form-control" v-model="nome" required>
        </div>
        <div class="form-group col-4">
          <label for="semestre">Semestre</label>
          <select class="form-control" name="semestre" id="semestre" v-model="semestre" required>
            <option value="0">Selecione</option>
            <option v-for="n in 10" :key="n" :value="n">
              {{n}}
            </option>
          </select>
        </div>
        <div class="form-group col-4">
          <label for="teoria">Carga Horária Teoria</label>
          <select class="form-control" name="teoria" id="" v-model.number="teoria" required>
            <option value="">Selecione</option>
            <option value="0">00</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
          </select>
        </div>
        <div class="form-group col-4">
          <label for="pratica">Carga Horária Pratica</label>
          <select class="form-control" name="pratica" v-model.number="pratica" required>
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
      <div class="row">
        <div class="col-12 form-group">
          <label for="descricao">Descricao</label>
          <textarea name="descricao" id="descricao" cols="30" rows="10" class="form-control" v-model="descricao"></textarea>
        </div>
        <div class="col-4">
          <h3>Conteúdo</h3>
          <list-control list_name="conteudo" @updateList="updateList" v-if="!id_disc"/>
          <list-control list_name="conteudo" @updateList="updateList" :initialList="disciplina.ementa.conteudo" v-else/>
        </div>
        <div class="col-4">
          <h3>Competencias</h3>
          <list-control list_name="competencias"  @updateList="updateList" v-if="!id_disc"/>
          <list-control list_name="competencias"  @updateList="updateList" v-else :initialList="disciplina.ementa.competencias"/>
        </div>
        <div class="col-4">
          <h3>Objetivos</h3>
          <list-control list_name="objetivos" @updateList="updateList" v-if="!id_disc"/>
          <list-control list_name="objetivos" @updateList="updateList" v-else :initialList="disciplina.ementa.objetivos"/>
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
              :preserve-search="true" placeholder="Selecione as bibliografias básicas" 
              label="nome" track-by="nome"
              >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} bibliografias selecionadas</span>
              </template>
            </multiselect>
            <p class="mt-3"><strong>Selecionados</strong></p>
            <ul class="list">
              <li v-for="bibliografia in basica" :key="bibliografia.id">
                <label for="">{{bibliografia.nome}}</label>
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
              :preserve-search="true" placeholder="Selecione as bibliografias Complementares" 
              label="nome" track-by="nome"
              >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} bibliografias selecionadas</span>
              </template>
            </multiselect>
            <p class="mt-3"><strong>Selecionados</strong></p>
            <ul class="list">
              <li v-for="bibliografia in complementar" :key="bibliografia.id">
                <label for="">{{bibliografia.nome}}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </fieldset>
    <button class="btn btn-primary">Enviar</button>
  </form>
</template>

<script>
  import ListControl from '@/components/ListControl'
  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import validaForm from '../functions/validaForm'
  export default {
    name: 'FormDisciplina',
    props: {
      id_disc: {
        type:String,
        default: null,
      }
    },
    data() {
      return {
        nome: '',
        pratica: 0,
        teoria: 0,
        semestre: 0,
        descricao: '',
        conteudo:[],
        competencias:[],
        objetivos:[],
        basica:[],
        complementar: [],

      }
    },
    methods: {
      submit() {
        const form = this.$refs.form
        const libs_basicas = this.basica.map(el=> el.id)
        const libs_complementares = this.complementar.map(el=> el.id)
        const data = {
          nome: this.nome,
          teoria: this.teoria,
          pratica: this.pratica,
          semestre: this.semestre,
          ementa: {
            descricao: this.descricao,
            conteudo:this.conteudo,
            competencias:this.competencias,
            objetivos: this.objetivos
          },
          basica: libs_basicas,
          complementar: libs_complementares
        }
        if(form.checkValidity()) {
          if(this.id_disc)
            this.update(data)
          else
            this.send(data)
        }
        else
          validaForm(form)
      },
      send(data){
        //add Disciplina
        this.addDisciplina(data).then(()=> {
          console.log('sucesss---------')
          this.$router.push({name:'ListagemDisciplina'})

        })  
      },
      update(data) {
        this.updateDisciplina({id: this.id_disc, disciplina: data})

      },
      updateList(data) {
        console.log('atualizei lista')
        console.log(data)
        this[data.list_name] = data.items.map(item=>item)
      },
      ...mapActions({
        fetchBibliografias: 'bibliografiaModule/fetchAll',
        addDisciplina: 'disciplinaModule/add',
        updateDisciplina: 'disciplinaModule/update',
        fetchDisciplina: 'disciplinaModule/fetchOne'
      })
    },
    computed: {
      ...mapState({
        bibliografias: state=> state.bibliografiaModule.bibliografias,
        disciplina: state=> state.disciplinaModule.disciplina
      }),
    },
    created () {
      this.fetchBibliografias()
      if(this.id_disc) {
        this.nome = this.disciplina.nome
        this.semestre = this.disciplina.semestre
        this.pratica = this.disciplina.pratica
        this.teoria = this.disciplina.teoria
        this.descricao = this.disciplina.ementa.descricao
        this.basica = this.disciplina.ementa.basica
        this.complementar = this.disciplina.ementa.complementar
      }
        
    },
    components: {
      Multiselect,
      ListControl
    },
  }
</script>

<style lang="scss">

</style>