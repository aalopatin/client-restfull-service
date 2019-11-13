export function getTableParameters(parameters, groups) {
  return parameters.map(
    function(parameter){
      return {
        id: parameter.id,
        title: parameter.title,
        groupId: parameter.groupId,
        typeReportId: groups.find(group => group.id === parameter.groupId).typeReportId
      }
    }
  )

}
