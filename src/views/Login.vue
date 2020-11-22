<template>
  <div class="login">
    <v-card
      :loading="sending"
      elevation="2"
      outlined
      width="400"
      class="login--body"
    >
      <v-card-title>
        <h1>GERENCIAMENTO DE PLANO DE AULA</h1>
      </v-card-title>
      <v-card-text>
        <!-- Login -->
        <v-form
          ref="form"
          class="form"
          lazy-validation
          v-model="valid"
          v-if="!newUser"
        >
          <template>
            <v-text-field
              :rules="[rules.required, rules.email]"
              label="E-mail"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Senha"
              type="password"
              v-model="user.password"
            ></v-text-field>
            <v-btn
              :loading="sending"
              :disabled="sending"
              block
              large
              elevation="2"
              color="secondary"
              @click="submit"
            >
              Entrar
            </v-btn>
          </template>
        </v-form>
        <!-- Cadastro -->
        <v-form ref="form" class="form" lazy-validation v-else v-model="valid">
          <template>
            <v-text-field
              :rules="[rules.required]"
              label="Nome completo"
              v-model="user.name"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.email]"
              label="E-mail"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.password]"
              label="Senha"
              type="password"
              v-model="user.password"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.password, rules.confirmPassword]"
              label="Confirme a senha"
              type="password"
            ></v-text-field>
            <v-btn
              :loading="sending"
              :disabled="sending"
              block
              large
              elevation="2"
              color="secondary"
              type="submit"
              @click="submit"
            >
              Cadastrar
            </v-btn>
          </template>
        </v-form>
        <v-divider></v-divider>
        <v-row align="center" justify="space-around">
          <v-btn
            v-if="!newUser"
            :disabled="sending"
            dark
            elevation="2"
            large
            type="button"
            @click="AddNewUser"
          >
            Criar nova conta
          </v-btn>
          <v-btn
            v-else
            :disabled="sending"
            dark
            elevation="2"
            large
            type="button"
            @click="AddNewUser"
          >
            Já sou cadastrado
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="error">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import validateEmail from '../functions/validateEmail'

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      error: false,
      errorMessage: '',
      user: {
        name: null,
        email: 'lucas.teste@teste.com',
        password: '123456',
      },
      newUser: false,
      sending: false,
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
        email: (value) => validateEmail(value) || 'Formato de email inválido.',
        password: (v) => (v && v.length >= 6) || 'Mínimo de 6 caracteres.',
        confirmPassword: (v) =>
          v === this.user.password || 'As senhas precisam ser identicas.',
      },
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault()
      try {
        await this.$refs.form.validate()
        if (!this.valid) {
          return
        }
        this.sending = true

        await this.$store.dispatch('userModule/makeLogin', this.user)
        console.log('------- retorno da action para a view -----')
      } catch (err) {
        console.warn(err)
        this.error = true
        this.errorMessage = 'Ocorreu um erro, tente novamente mais tarde.'
      } finally {
        this.sending = false
      }
    },
    AddNewUser() {
      this.newUser = !this.newUser
      this.$refs.form.resetValidation()
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
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    h1 {
      font-size: 30px;
      font-weight: bolder;
      margin-bottom: 30px;
      word-break: break-word;
    }
    form {
      margin: 0;
      padding: 0;
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
