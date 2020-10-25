<template>
  <div class="login">
    <v-card
      elevation="2"
      outlined
      width="400"
      :loading="sending"
      class="login--body"
    >
      <h1>Gerenciamento de Plano de Aula</h1>
      <v-form @submit.prevent="submit" class="form">
        <template v-if="!newUser">
          <v-input
            :messages="['Messages']"
            type="email"
            v-model="user.email"
            required
          >
            E-mail
          </v-input>
        </template>
      </v-form>
    </v-card>
    <div class="login--body" :class="sending ? 'sending' : ''">
      <h1>Gerenciamento de Plano de Aula</h1>
      <form @submit.prevent="submit" class="form">
        <template v-if="!newUser">
          <div class="form-group">
            <!-- <label for="">E-mail</label> -->
            <input
              class="form-control"
              type="email"
              placeholder="E-mail"
              v-model="user.email"
              required
            />
          </div>
          <div class="form-group">
            <!-- <label for="">Senha</label> -->
            <input
              class="form-control"
              type="password"
              placeholder="Senha"
              v-model="user.password"
              required
            />
          </div>
          <button class="btn btn-dark">Entrar</button>
        </template>
        <template v-else>
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Nome"
              v-model="user.name"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="email"
              placeholder="E-mail"
              v-model="user.email"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="password"
              placeholder="Senha"
              v-model="user.password"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="password"
              placeholder="Confirme a Senha"
              v-model="user.confirmPassword"
              required
            />
          </div>
          <button class="btn btn-dark">Entrar</button>
        </template>
      </form>
      <p class="login--subscribe" v-if="!newUser">
        Ainda não é cadastrado? Crie sua conta
        <a href="#" @click.prevent="AddNewUser">aqui</a>
      </p>
      <p class="login--subscribe" v-else>
        Já possui conta? Faça o
        <a href="#" @click.prevent="AddNewUser">login</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: 'lucas.teste@teste.com',
        password: '123456',
        name: null,
      },
      newUser: false,
      sending: false,
    }
  },
  methods: {
    async submit() {
      this.sending = true
      await this.$store.dispatch('userModule/makeLogin', this.user)
      console.log('------- retorno da action para a view -----')
      //console.log(userState)
    },
    AddNewUser() {
      this.newUser = !this.newUser
    },
    ...mapActions(['userModule/makeLogin']),
  },
}
</script>

<style lang="scss">
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url('~@/assets/bg-login.jpg');
  background-size: cover;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    background: #272727;
    opacity: 0.4;
  }
  &--body {
    z-index: 1;
    padding: 30px 30px 0;
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    h1 {
      font-size: 40px;
      margin-bottom: 30px;
    }
    form {
      margin-bottom: 30px;
      .btn {
        width: 100%;
        // font-weight: bold;
        text-transform: uppercase;
      }
    }
    .form-control {
      text-align: left;
    }
  }
  &--subscribe {
    font-size: 12px;
  }
  .sending {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #272727;
      opacity: 0.6;
      z-index: 3;
    }
  }
}
</style>
