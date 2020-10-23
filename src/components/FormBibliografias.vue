<template>
  <form
    ref="form"
    class="form"
    @submit.prevent="submit"
    id="form-bibliografia"
    novalidate
  >
    <div class="form-group">
      <label for="nome">Nome</label>
      <input type="text" class="form-control" required v-model="nome" />
    </div>
    <div class="form-group">
      <label for="conteudo">Conteudo</label>
      <input type="text" class="form-control" required v-model="conteudo" />
    </div>
    <button class="btn btn-primary">
      {{ bibliografiaId.length == 0 ? 'Adicionar' : 'Editar' }}
    </button>
    <!-- <b-button variant="primary"></b-button> -->
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import validaForm from '../functions/validaForm'
export default {
  name: 'FormBibliografia',
  props: {
    bibliografiaId: {
      type: String,
      default: null,
    },
    inModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nome: '',
      conteudo: '',
    }
  },
  methods: {
    submit() {
      const form = this.$refs.form
      if (form.checkValidity())
        if (this.bibliografiaId.length > 0) this.update()
        else this.addNew()
      else validaForm(form)
    },
    addNew() {
      this.addBibliografia({
        nome: this.nome,
        conteudo: this.conteudo,
      })
        .then(() => {
          if (this.inModal) {
            this.$emit('closeModal')
          }
        })
        .catch((err) => {
          alert(err.satus, err.message)
        })
    },
    update() {
      this.updateBibliografia({
        bibliografia: {
          nome: this.nome,
          conteudo: this.conteudo,
        },
        id: this.bibliografiaId,
      })
        .then(() => {
          if (this.inModal) this.$emit('closeModal')
        })
        .catch((err) => {
          alert(err.satus, err.message)
        })
    },
    ...mapActions({
      fetchBibliografia: 'bibliografiaModule/fetchOne',
      addBibliografia: 'bibliografiaModule/add',
      updateBibliografia: 'bibliografiaModule/update',
    }),
  },
  created() {
    if (this.bibliografiaId.length > 1) {
      this.fetchBibliografia(this.bibliografiaId).then(() => {
        this.nome = this.bibliografia.nome
        this.conteudo = this.bibliografia.conteudo
      })
    }
  },
  computed: {
    ...mapState({
      bibliografia: (state) => state.bibliografiaModule.bibliografia,
    }),
  },
}
</script>

<style lang="sass"></style>
