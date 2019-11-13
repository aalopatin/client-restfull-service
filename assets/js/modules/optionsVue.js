import { OPTIONS_STANDARD } from '~/assets/js/constants/options';

export function getOptionsGroupParameters(groups, typesReport){
  return groups.map(
    (group) => {
      let typeReport = typesReport.find(type => type.id === group.typeReportId)
      let standard = OPTIONS_STANDARD.find(standard => standard.value === typeReport.standard).text
      return {
        value: group.id,
        text: typeReport.title + " (" + standard + ") - " + group.title
      }
    }
  )
}

export function getOptionsTypesReport(typesReport) {
  return typesReport.map(
    function(typeReport){
      return {
        value: typeReport.id,
        text: getTextTypeReport(typeReport)
      }
    }
  )
}

export function getTextTypeReport(typeReport) {
  return typeReport.title + ' (' + OPTIONS_STANDARD.find(standard => standard.value === typeReport.standard).text  + ')'
}
