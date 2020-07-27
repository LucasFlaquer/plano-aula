import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ListagemCursos from '../views/ListagemCusos.vue'
import AddCurso from '@/views/AddCurso'
import ListagemDisciplinas from '@/views/ListagemDisciplinas'
import ListagemBibliografias from '@/views/ListagemBibliografias'
import AddDisciplina from '@/views/AddDisciplina'
import DetalheDisciplina from '@/views/DetalheDisciplina'
import AddEmenta from '@/views/AddEmenta'
import EditDisciplina from '@/views/EditDisciplina'
import EditCurso from '@/views/EditCurso'
import DisciplinasProfessor from '@/views/DisciplinasProfessor'
import AddPlanoAula from '@/views/AddPlanoAula'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      secure: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cursos',
    name: 'ListagemCursos',
    component: ListagemCursos,
    meta: {
      secure: true
    }
  },
  {
    path: '/cursos/novo',
    name: 'AddCurso',
    component: AddCurso,
    meta: {
      secure: true
    }
  },
  {
    path: '/cursos/:id/editar',
    name: 'EditCurso',
    component: EditCurso,
    meta: {
      secure: true
    }
  },
  {
    path: '/disciplinas',
    name: 'ListagemDisciplinas',
    component: ListagemDisciplinas,
    meta: {
      secure: true
    }
  },
  {
    path: '/disciplinas/nova',
    name: 'AddDisciplina',
    component: AddDisciplina,
    meta: {
      secure: true
    }
  },
  {
    path: '/disciplinas/:id',
    name: 'DetalheDisciplina',
    component: DetalheDisciplina,
    meta: {
      secure: true
    }
  },
  {
    path: '/disciplinas/:id/editar',
    name: 'EditDisciplina',
    component: EditDisciplina,
    meta: {
      secure: true
    }
  },
  {
    path: '/disciplinas/:id/ementa',
    name: 'AddEmenta',
    component: AddEmenta,
    meta: {
      secure: true
    }
  },
  {
    path: '/bibliografias',
    name: 'ListagemBibliografias',
    component: ListagemBibliografias,
    meta: {
      secure: true
    }
  },
  {
    path: '/professor/disciplinas',
    name: 'AssociarDisciplinasProfessor',
    component: DisciplinasProfessor,
    meta: {
      secure: true
    }
  },
  {
    path: '/plano-aula',
    name: 'AddPlanoAula',
    component: AddPlanoAula,
    meta: {
      secure: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.meta.secure)
    await store.dispatch('userModule/Authenticate', null)
  next()
})

export default router