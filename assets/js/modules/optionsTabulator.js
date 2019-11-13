export function getOptionsParameters(parameters, groups) {

  let optionsParameters = []

  let uniqueGroups = groups.filter((group, index, groups) => {
      return parameters.findIndex(parameter => parameter.groupId == group.id) !== -1
  })

  uniqueGroups.forEach((group, i, groups) => {
    let parametersForGroup = parameters.filter((parameter) => {
      return parameter.groupId = group.id
    }).map((parameter) => {
      return {
        label: parameter.title,
        value: parameter.id
      }
    })
    optionsParameters.push({label: group.title, options: parametersForGroup })
  })

  return optionsParameters

}
