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
      <input type="text" class="form-control" required v-model="nome">
    </div>
    <div class="form-group">
      <label for="conteudo">Conteudo</label>
      <input type="text" class="form-control" required v-model="conteudo">
    </div>
    <b-button>{{ bibliografiaId ? 'Adicionar': 'Editar' }}</b-button>
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
        default: null
      },
      inModal: {
        type: Boolean,
        default:false
      }
    },
    data() {
      return {
        nome: '',
        conteudo:''
      }
    },
    methods: {
      submit() {
        const form = this.$refs.form
        console.log(form.id)
        if(form.checkValidity())
          if(this.bibliografiaId)
            this.update()
          else
            this.addNew()
        else
          validaForm(form)
      },
      addNew() {
        this.addBibliografia({ nome:this.nome, autor:this.autor, editora:this.editora })
        .then(()=> {
          console.log('-------retornei para a view')
          if(this.inModal)
            this.$emit('closeModal')
        }).catch(err=> {
          alert(err.satus, err.message)
        })
      },
      update() {
        this.updateBibliografia({
          bibliografia: { nome:this.nome, autor:this.autor, editora:this.editora },
          id: this.bibliografiaId
          }).then(()=> {
            console.log('-----------------retornei para a view')
            if(this.inModal)
              this.$emit('closeModal')
          }).catch(err=> {
            alert(err.satus, err.message)
          })
      },
      ...mapActions({
        fetchBibliografia: 'bibliografiaModule/fetchOne',
        addBibliografia: 'bibliografiaModule/add',
        updateBibliografia: 'bibliografiaModule/update'
      })
    },
    created () {
      if(this.bibliografiaId) {
        this.fetchBibliografia(this.bibliografiaId)
        .then(()=> {
          this.nome = this.bibliografia.nome
          this.autor = this.bibliografia.autor
          this.editora = this.bibliografia.editora
        })
      }
    },
    computed: {
      ...mapState({
        bibliografia:state=> state.bibliografiaModule.bibliografia
      })
    }
  }
</script>

<style lang="sass">

</style>