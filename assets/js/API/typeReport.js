const url = `/admin/typesreports`

export const findAllTypeReportAPI = function($axios){
  return $axios.get(url)
    .then(result =>
    {
      return result
    })
}

export default {
  findAll: findAllTypeReportAPI
}
