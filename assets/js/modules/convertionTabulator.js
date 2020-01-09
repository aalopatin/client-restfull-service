export const parametersValues = (parameters) => {
  let values = {}
  for(let parameter of parameters) {
    values[parameter.id] = parameter.title
  }
  return values
}

export default {
  parametersValues: parametersValues
}
