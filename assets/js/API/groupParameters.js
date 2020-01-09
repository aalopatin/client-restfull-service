import {isEmpty} from "../modules/utils";

const url = `/admin/groupsparameters`

export const findAllGroupParametersAPI = function($axios, params = {}){

  return $axios.get(url, isEmpty(params) ? {} : { params: params })
    .then(result =>
    {
      return result
    })
}

export default {
  findAll: findAllGroupParametersAPI
}
