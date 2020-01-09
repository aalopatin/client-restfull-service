const url = `/admin/companies`

export const findAllCompany = function($axios){

  return $axios.get(url)
    .then(result =>
    {
      return result
    })

}

export default {
  findAll: findAllCompany
}
