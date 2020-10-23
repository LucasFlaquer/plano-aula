const validaForm = (form) => {
  let campos = form.querySelectorAll('.form-control')
  let invalidos = []
  campos.forEach((index) => {
    if (!index.checkValidity()) {
      index.classList.add('required')
      invalidos.push(index)
    }
  })
  invalidos[0].focus()
  invalidos.forEach((el) => {
    el.addEventListener('keyup', () => {
      el.classList.remove('required')
    })
  })
}
export default validaForm
