<template>
  <dashboard>
    <h1>Editar Curso</h1>
    <form
      class="form form__curso"
      ref="form"
      @submit.prevent="submit"
      novalidate
    >
      <fieldset>
        <div class="row">
          <div class="form-group col-4">
            <label for>Nome</label>
            <input type="text" class="form-control" v-model="nome" required />
          </div>
          <div class="form-group col-4">
            <label for="coordenador">Coordenador</label>
            <select
              name="coordenador"
              id="coordenador"
              class="form-control"
              v-model="user_id"
            >
              <option value>Selecione</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Grade:</legend>
        <div class="form-row align-items-end">
          <div class="form-group col-auto">
            <label for="ano">Ano:</label>
            <input
              class="form-control"
              type="number"
              id="ano"
              name="ano"
              v-model.number="grade.ano"
            />
          </div>
          <div class="form-group col-auto">
            <label for="semestres"
              >Quantidade de Semestres: {{ grade.semestres.length }}</label
            >
          </div>
          <div class="form-group col">
            <b-button
              @click.prevent="addSemestre"
              variant="info"
              class="mr-2"
              :disabled="grade.semestres.length == 10"
            >
              <b-icon icon="plus"></b-icon>
            </b-button>
            <b-button
              variant="danger"
              @click.prevent="removeLastSemestre"
              :disabled="grade.semestres == 0"
            >
              <b-icon icon="dash"></b-icon>
            </b-button>
          </div>
        </div>
        <div class="grade">
          <div
            class="grade--item"
            v-for="(semestre, index) in grade.semestres"
            :key="index"
          >
            <div class="row align-items-center">
              <div class="col-4">
                <label>Semestre {{ semestre.id }}</label>
                <div class="form-group">
                  <label for="disciplinas">Disciplinas</label>
                  <multiselect
                    v-model="semestre.disciplinas"
                    :options="
                      disciplinas.filter((el) => el.semestre === semestre.id)
                    "
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
                        >{{ values.length }} Disciplinas selecionadas</span
                      >
                    </template>
                  </multiselect>
                </div>
              </div>
              <div class="col-8">
                <ul class="grade--disciplinas">
                  <li
                    v-for="disciplina in semestre.disciplinas"
                    :key="disciplina.id"
                  >
                    {{ disciplina.nome }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <p>
        <button class="btn btn-primary">Atualizar</button>
      </p>
    </form>
  </dashboard>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Dashboard from '@/components/Dashboard'
import { mapActions, mapState } from 'vuex'
import validaForm from '../functions/validaForm'
export default {
  name: 'EditCurso',
  data() {
    return {
      nome: '',
      user_id: '',
      grade: {
        ano: 0,
        semestres: [],
      },
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.userModule.users,
      disciplinas: (state) => state.disciplinaModule.disciplinas,
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
      let disc_list = []
      this.grade.semestres.forEach((el) => {
        el.disciplinas.forEach((disc) => {
          disc_list.push(disc.id)
        })
      })
      console.log(disc_list)
      const data = {
        nome: this.nome,
        user_id: this.user_id,
        grade: {
          ano: this.grade.ano,
          disciplinas: disc_list,
        },
      }
      this.updateCurso({
        curso: data,
        id: this.curso.id,
      }).then(() => {
        this.$router.push({
          name: 'ListagemCursos',
        })
      })
    },
    addSemestre() {
      this.grade.semestres.push({
        id: this.grade.semestres.length + 1,
        disciplinas: [],
      })
    },
    removeLastSemestre() {
      this.grade.semestres.pop()
    },
    ...mapActions({
      getDataforUpdate: 'cursoModule/getDataForUpdate',
      updateCurso: 'cursoModule/update',
    }),
  },
  created() {
    this.getDataforUpdate(this.$route.params.id).then(() => {
      this.nome = this.curso.nome
      this.user_id = this.curso.coordenador.id
      this.grade.ano = this.curso.grades[0].ano
      this.curso.grades[0].disciplinas.forEach((dc) => {
        const disc = this.disciplinas.find((d) => d.id === dc.id)
        const sem = this.grade.semestres.find((el) => el.id === disc.semestre)
        if (sem) {
          const index = this.grade.semestres.indexOf(sem)
          this.grade.semestres[index].disciplinas.push(disc)
        } else {
          this.grade.semestres.push({
            id: disc.semestre,
            disciplinas: [disc],
          })
        }
      })
    })
  },
  components: {
    Dashboard,
    Multiselect,
  },
}
</script>

<style lang="scss" scoped></style>
