<template>
  <form 
    @submit.prevent="submit"
    ref="form"
    class="form-curso"
    novalidate
  >
    <div class="form-group">	
      <label for="">Nome</label>
      <input type="text" class="form-control" v-model="nome" required>
    </div>
    
    <div class="form-group">	
      <label for="">Turno</label>
      <select name="" id="" class="form-control" v-model="turno" required>
        <option value="">Selecione</option>
        <option value="M">Diurno</option>
        <option value="V">Vespertino</option>
        <option value="N">Noturno</option>
      </select>
    </div>
    <div class="form-group">
      <label for="">Coordenador</label>
      <select name="" id="" class="form-control" v-model="user_id">
        <option value="">Selecione</option>
        <option 
          v-for="user in users" 
          :key="user.id"
          :value="user.id">{{user.name}}</option>
      </select>
    </div>
    <button class="btn btn-primary">{{cursoId.length>1? 'Atualizar' : 'Adicionar' }}</button>
  </form>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name:'FormCurso',
    props: {
      cursoId: {
        default: '',
        type: String
      }
    },
    data() {
      return {
        nome:'',
        turno:'',
        user_id:''

      }
    },
    computed: {
      ...mapState({
        users: state=> state.userModule.users,
        curso: state=> state.cursoModule.curso
      })
    },
    methods: {
      ...mapActions({
        getAllUsers: 'userModule/fetchUsers',
        fetchCurso: 'cursoModule/fetchCurso',
        addCurso: 'cursoModule/addNewCurso'

      }),
      submit() {
        const form = this.$refs.form
        if(form.checkValidity())
          this.send()
        else
          this.validaForm(form)
      },
      send() {
        this.addCurso({ nome:this.nome, turno:this.turno, user_id:this.user_id })
        this.$bvModal.hide('modal-curso')
      },
      validaForm(form) {
        let campos = form.querySelectorAll('.form-control')
        campos.forEach(index => {
          if(!index.checkValidity())
            index.parentNode.classList.add('required')
        })
        let invalidos = form.querySelectorAll('.required')
        invalidos[0].focus()
        invalidos.forEach(function(el) {
          el.addEventListener('keyup', function() {
            if(!el.checkValidity)
              el.classList.remove('required')
          });
          el.addEventListener('change', function() {
            el.classList.remove('required')
          })
        })
      }

    },
    created() {
      this.getAllUsers()
      if(this.cursoId.length>1) {
        this.fetchCurso(this.cursoId)
        this.nome = this.curso.nome
        this.turno = this.curso.turno
        if(this.curso.coordenador)
          this.user_id = this.curso.coordenador.id
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>