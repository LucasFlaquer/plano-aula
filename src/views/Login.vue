<template>
  <div class="login">
    <div class="login--body">
      <h1>Gerenciamento de Plano de Aula</h1>
      <form action="">
        <div class="form-group">
          <!-- <label for="">E-mail</label> -->
          <input class="form-control" type="email" placeholder="E-mail" v-model="user.email" required>
        </div>
        <div class="form-group">
          <!-- <label for="">Senha</label> -->
          <input class="form-control" type="password" placeholder="Senha" v-model="user.password" required>
        </div>
        <button class="btn btn-dark">Entrar</button>
      </form>
      <p class="login--subscribe">Ainda não é cadastrado? Crie sua conta <a href="">aqui</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email:'',
          password:''
        }
      }
    }
  }
</script>

<style lang="scss">
  .login {
    height: 100vh;
    display: flex;
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
  }
</style>