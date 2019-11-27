export const COLUMNS_ENTER_REPORTS = {
  columnTitleParameter: {
    title: "Название показателя", field:"titleParameter", editor:"input"
  },
  columnParameter: function(values) {

    return {title: "Показателя", field:"parameter", editor:"select", editorParams:{ values: values}, formatterParams:{values}
      // formatter: function(cell, formatterParams, onRendered) {
      //   console.log("find parameter")
      //   console.log(cell.getValue())
      //   return this.parameters.find(parameter => parameter.id === cell.getValue()).title;
      // },
    }
  },
  columnPeriod: (id) => {
    return {title: id, field: id, editor:"input"}
  }
}
