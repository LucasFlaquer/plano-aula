<template>
  <div class="dashboard">
    <div class="dashboard--header">
      <nav class="sidenav">
        <h1>PA CRM</h1>
        <p class="sidenav--user">Usuário: <span>{{user.name}}</span></p>

        <ul class="sidenav--list">
          <li class="sidenav--item">
            <router-link class="btn btn-dark" :to="{name:'Home'}">Home</router-link>
          </li>
        </ul>
      </nav>
      <p><a href="#'" class="btn btn-danger" @click.prevent="logout">Sair</a></p>
    </div>
    <div class="dashboard--body">
      <b-container>
        <slot></slot>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
  export default {
    name:'Dashboard',
    computed:mapState({
      user: state=> state.user
    }),
    methods: {
      ...mapActions(['logout'])
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    height: 100vh;
    overflow: hidden;
    &--header {
      background-color: #0098b7;
      color: #fff;
      flex-basis: 20%;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &--body {
      flex: 1 0 0;
      background-color: #fff;
    }
  }
  .sidenav {
    //background: red;
    h1 {
      font-family: 'Balsamiq Sans', cursive;
      text-align: center;
    }
    &--list {
      list-style: none;
      padding-left: 0;
      
    }
    &--item {
      .btn-dark {
        width: 100%;
        text-align: left;
        font-weight: bold;
        text-transform:uppercase;

      }
    }
  }
</style>