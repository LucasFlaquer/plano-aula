<template>
  <dashboard>
    <h1>Adicionar um novo Plano de Aula</h1>
    <form @submit.prevent="submit" ref="form" novalidate>
      <fieldset>
        <legend>Turma</legend>
        <div class="row">
          <div class="form-group col-3">
            <label for="professor">Professor:</label>
            <input
              class="form-control"
              type="text"
              name="professor"
              id="professor"
              v-model="professor.name"
              disabled
            />
          </div>
          <div class="form-group col-3">
            <label for="curso">Curso:</label>
            <select
              class="form-control"
              name="curso"
              id="curso"
              v-model="curso_id"
              @change="handleCursoSelected"
            >
              <option value="">Selecione um curso</option>
              <option
                v-for="curso in cursos"
                :key="curso.id"
                :value="curso.id"
                >{{ curso.nome }}</option
              >
            </select>
          </div>
          <div class="form-group col-3">
            <label for="disciplina">Disciplina</label>
            <select
              class="form-control"
              name="disciplina"
              id="disciplina"
              v-model="disc_id"
              @change="handleDiscSelected"
            >
              <option value="">Selecione</option>
              <option
                v-for="disc in disciplinas"
                :key="disc.id"
                :value="disc.id"
                >{{ disc.nome }}</option
              >
            </select>
          </div>
          <div class="form-group col-3">
            <label for="codigo">Códgio</label>
            <input
              class="form-control"
              type="text"
              placeholder="código"
              v-model="codigo"
              required
            />
          </div>
          <div class="form-group col-3">
            <label for="">Turno</label>
            <select name="" id="" class="form-control" v-model="turno">
              <option value="">Selecione</option>
              <option value="D">Diurno</option>
              <option value="V">Vespertino</option>
              <option value="N">Noturno</option>
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Cronograma</legend>
        <div v-if="aulas.length > 0" class="cronograma">
          <div
            v-for="(aula, index) in aulas"
            :key="index"
            class="cronograma--item"
          >
            <b-button v-b-toggle="`collapse-${index}`" variant="info">
              {{ aula.titulo }}
              <!-- <span class="text-right">{{ aula.data }}</span> -->
            </b-button>
            <b-collapse visible :id="`collapse-${index}`">
              <b-card>
                <b-row>
                  <div class="form-group col-4">
                    <label for="titulo">Titulo</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="aula.titulo"
                      required
                    />
                  </div>
                  <div class="form-group col-4">
                    <label for="data">Data:</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="aula.data"
                    />
                  </div>
                  <div class="form-group col-4">
                    <label for="tipo">Tipo da aula</label>
                    <select
                      class="form-control"
                      name=""
                      id=""
                      v-model="aula.tipo"
                    >
                      <option value="">Selecione</option>
                      <option value="Teoria">Teoria</option>
                      <option value="Pratica">Prática</option>
                    </select>
                  </div>
                  <div class="form-group col-6">
                    <label for="objetivos">Objetivos de aprendizagem</label>
                    <multiselect
                      v-model="aula.objetivos"
                      :options="objetivos"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="escolha 1 ou mais objetivos"
                      label="nome"
                      track-by="nome"
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, search, isOpen }"
                        ><span
                          class="multiselect__single"
                          v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} objetivos</span
                        ></template
                      >
                    </multiselect>
                  </div>
                  <div class="form-group col-6">
                    <label for="competencias">Competencias</label>
                    <multiselect
                      v-model="aula.competencias"
                      :options="competencias"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Selecione 1 ou mais competencias"
                      label="nome"
                      track-by="nome"
                    >
                      <template
                        slot="selection"
                        slot-scope="{ values, search, isOpen }"
                        ><span
                          class="multiselect__single"
                          v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} Competencias</span
                        ></template
                      >
                    </multiselect>
                  </div>
                  <div class="form-group col-3">
                    <label for="estrategia">Estratégia de Ensino</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="aula.estrategia"
                    />
                  </div>
                  <div class="form-group col-3">
                    <label for="estrategia">Avaliação formativa</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="aula.avaliacao"
                    />
                  </div>
                  <div class="form-group col-3">
                    <label for="estrategia">recursos</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="aula.recursos"
                    />
                  </div>
                  <div class="form-group col-3">
                    <label for="roteiro">Roteiro de Prática</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="aula.roteiro"
                    />
                  </div>
                </b-row>
              </b-card>
            </b-collapse>
          </div>
        </div>
        <div class="jumbotron" v-else>
          <p>Clique em Adicionar para cadastrar uma aula</p>
        </div>
        <p class="text-right mt-3">
          <b-button
            class="mr-3"
            variant="danger"
            @click.prevent="removeLastAula"
            :disabled="aulas.length == 0"
            title="Remover"
          >
            <b-icon icon="dash"></b-icon>
          </b-button>
          <b-button
            @click.prevent="addAula"
            variant="info"
            class="mr-2"
            title="Adicionar"
          >
            <b-icon icon="plus"></b-icon>
          </b-button>
        </p>
      </fieldset>
      <button class="btn btn-primary">Cadastrar</button>
    </form>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { mapState, mapActions } from 'vuex'
import validaForm from '../functions/validaForm'
export default {
  name: 'AddPlanoAula',
  data() {
    return {
      curso_id: '',
      codigo: '',
      disc_id: '',
      turno: '',
      disciplinas: [],
      aulas: [],
      value: [],
      objetivos: [],
      competencias: []
    }
  },
  computed: mapState({
    professor: state => state.userModule.userLogged,
    cursos: state => state.cursoModule.cursos,
    disciplina: state => state.disciplinaModule.disciplina
  }),
  methods: {
    submit() {
      const form = this.$refs.form
      if (form.checkValidity()) this.send()
      else validaForm(form)
    },
    send() {
      // eslint-disable-next-line object-curly-newline
      const { curso_id, disc_id, turno, aulas } = this
      const aulas_list = aulas.map(aula => {
        // eslint-disable-next-line object-curly-newline
        const { objetivos, competencias, ...rest } = aula
        const objetivos_list = aula.objetivos.map(el => el.nome)
        const competencias_list = aula.competencias.map(el => el.id)
        return {
          objetivos: objetivos_list,
          competencias: competencias_list,
          ...rest
        }
      })
      console.log(aulas_list)
      const data = {
        curso_id,
        disc_id,
        turno,
        aulas: aulas_list
      }
      this.addPlano(data)
      console.log(data)
    },
    handleCursoSelected() {
      const curso = this.cursos.find(curso => curso.id === this.curso_id)
      console.log('disciplinas do curso -->', curso.grades[0].disciplinas)
      console.log(
        'disciplinas do professor-->',
        this.professor.disciplinas_ministradas
      )
      const arr = curso.grades[0].disciplinas.filter(
        a1 =>
          this.professor.disciplinas_ministradas.filter(a2 => a1.id == a2.id)
            .length
      )
      console.log(arr)
      this.disciplinas = arr
    },
    handleDiscSelected() {
      this.fetchDisciplina(this.disc_id).then(() => {
        this.objetivos = this.disciplina.ementa.objetivos.map((el, index) => {
          return {
            id: index,
            nome: el
          }
        })
        this.competencias = this.disciplina.ementa.competencias.map(
          (el, index) => {
            return {
              id: index,
              nome: el
            }
          }
        )
      })
    },
    addAula() {
      this.aulas.push({
        titulo: 'Preencha o campo titulo',
        data: null,
        objetivos: [],
        competencias: [],
        estrategia: '',
        avaliacao: '-',
        recursos: '-',
        tipo: '',
        roteiro: 'Não se aplica'
      })
    },
    removeLastAula() {
      this.aulas.pop()
    },
    ...mapActions({
      fetchCursos: 'cursoModule/fetchAll',
      fetchDisciplina: 'disciplinaModule/fetchOne',
      addPlano: 'planoAulaModule/addNew'
    })
  },
  created() {
    this.fetchCursos()
  },
  components: {
    Dashboard,
    Multiselect
  }
}
</script>

<style lang="scss" scoped>
form {
  margin-top: 30px;
}
fieldset {
  padding: 30px;
}
.cronograma {
  &--item {
    border: 1px solid #3fd1ef;
    border-radius: 8px;
    margin-bottom: 20px;
    .btn {
      width: 100%;
      text-align: left;
      &.not-collapsed {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>
