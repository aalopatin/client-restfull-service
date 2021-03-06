import {isEmpty} from "../modules/utils";

const url = `/admin/parameters`

export const findAllParameters = function($axios, params = {}){

  return $axios.get(url, isEmpty(params) ? {} : { params: params })
    .then(result =>
    {
      return result
    })
}

export default {
  findAll: findAllParameters
}

