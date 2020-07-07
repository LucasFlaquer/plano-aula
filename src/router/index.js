import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ListagemCursos from '../views/ListagemCusos.vue'
import ListagemDisciplinas from '@/views/ListagemDisciplinas'
import ListagemBibliografias from '@/views/ListagemBibliografias'
import AddDisciplina from '@/views/AddDisciplina'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cursos',
    name: 'ListagemCursos',
    component: ListagemCursos
  },
  {
    path: '/disciplinas',
    name: 'ListagemDisciplinas',
    component: ListagemDisciplinas
  },
  { path: '/bibliografias', name: 'ListagemBibliografias', component: ListagemBibliografias },
  {path:'/disciplinas/nova', name: 'AddDisciplina', component:AddDisciplina }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router