export const findParameterByTerm = (term, parameters) => {
  return parameters.filter(parameter => {
    return parameter.title.includes(term)
  }).map(parameter => String(parameter.id))
}

