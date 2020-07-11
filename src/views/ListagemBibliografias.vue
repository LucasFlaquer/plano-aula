<template>
  <Dashboard>
    <h1>Listagem de Bibliografias Gerais:</h1>
    <b-button v-b-modal.modal-bibliografia variant="primary" @click="handleFormOpen('')">Adicionar</b-button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th style="width:35%">Conteúdo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bibliografia in bibliografias" :key="bibliografia.id">
          <td>{{bibliografia.nome}}</td>
          <td>{{bibliografia.conteudo}}</td>
          <td>
            <b-button 
            v-b-modal.modal-bibliografia 
            variant="info" 
            @click="handleFormOpen(bibliografia.id)"
            >Editar</b-button>
            <a href="#" @click.prevent="deleteBibliografia(bibliografia.id)" class="btn btn-danger">Deletar</a>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal 
      id="modal-bibliografia" 
      :title="modalTitle"
      hide-footer>
      <form-bibliografias
        :bibliografiaId="idBibliografia"
        :inModal="true"
        @closeModal="handleModalClose"
      />
    </b-modal>
  </Dashboard>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  import Dashboard from '@/components/Dashboard'
  import FormBibliografias from '@/components/FormBibliografias'
  export default {
    name:'ListagemBibliografias',
    data() {
      return {
        modalTitle: '',
        idBibliografia: '0'
      }
    },
    methods: {
      handleFormOpen(id) {
        this.idBibliografia = id
        if(id.length>1)
          this.modalTitle = 'Editar Bibliografia'
        else
          this.modalTitle = 'Adicionar Bibliografia'
      },
      handleModalClose() {
        this.$bvModal.hide('modal-bibliografia')
      },

      ...mapActions({
        fetchBibliografias: 'bibliografiaModule/fetchAll',
        deleteBibliografia: 'bibliografiaModule/delete'
      }),
      
    },
    created () {
      this.fetchBibliografias()
    },
    computed: {
      ...mapGetters({
        bibliografias: 'bibliografiaModule/getAll'
      })
    },
    components: {
      Dashboard,
      FormBibliografias
    },
  }
</script>

<style lang="scss">

</style>