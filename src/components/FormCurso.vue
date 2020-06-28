<template>
  <form>
    <div class="form-group">	
      <label for="">Nome</label>
      <input type="text" class="form-control">
    </div>
    
    <div class="form-group">	
      <label for="">Turno</label>
      <select name="" id="" class="form-control">
        <option value="">Selecione</option>
        <option value="">Diurno</option>
        <option value="">Vespertino</option>
        <option value="">Noturno</option>
      </select>
    </div>
    <div class="form-group">
      <label for="">Coordenador</label>
      <select name="" id="">
        <option value="">Selecione</option>
        <option value="">{{}}</option>
      </select>
    </div>
    <button class="btn btn-primary">Adicionar</button>
  </form>
</template>

<script>
  
  export default {
    name:'FormCurso',

  }
</script>

<style lang="scss" scoped>

</style>