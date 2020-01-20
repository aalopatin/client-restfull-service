export function getTableParameters(parameters, groups, typesReports) {
  return parameters.map((parameter) => {
    let group = groups.find(group => group.id === parameter.groupId)
    let typeReport = typesReports.find(typeReport => typeReport.id === group.typeReportId)
    console.log(group)
    console.log(typeReport)
    return {
      id: parameter.id,
      title: parameter.title,
      groupId: parameter.groupId,
      typeReportId: typeReport.id,
      standard: typeReport.standard
    }
  })
}
