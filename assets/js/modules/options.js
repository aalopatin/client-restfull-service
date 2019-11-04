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
