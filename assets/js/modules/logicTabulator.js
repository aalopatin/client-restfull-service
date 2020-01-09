import parameter from "../API/parameter";

const isEmptyCell = (row, key) => {
  return row[key] === '' || row[key] === undefined
}

export const findParameterByTerm = (term, parameters) => {
  return parameters.filter(parameter => {
    return checkParameterByTerm(term, parameter)
  }).map(parameter => String(parameter.id))
}

export const checkParameterByTerm = (term, parameter) => {

  let lowerTerm = term.toLowerCase()
  let lowerTitle = parameter.title.toLowerCase()

  return lowerTitle.includes(lowerTerm)
}

export const filterEmptyRows = (data) => {
  return data.filter(row => {
    let emptyRow = true
    for(let key in row) {
      if(key === 'titleParameter') {
        emptyRow = isEmptyCell(row, key)
        break
      } else {
        if(emptyRow) {
          emptyRow = !isEmptyCell(row, key)
        }
      }
    }
    return !emptyRow
  })
}

export default {
  findParameterByTerm: findParameterByTerm,
  checkParameterByTerm: checkParameterByTerm,
  filterEmptyRows: filterEmptyRows
}

