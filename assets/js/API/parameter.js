const url = `/admin/parameters`

export const findAll = function(fullObjects = false){

  return this.$axios.get(url, {params:{fullObjects: fullObjects}})
    .then(result =>
    {
      return result
    })

}

export default {
  findAll: findAll
}

