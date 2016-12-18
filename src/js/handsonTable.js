class HandsonTable {
  constructor(dataset) {
    this.handsonTableSpec = {
      data: dataset.records,
      colHeaders: dataset.fields,
      readOnly: true,
      width: 1136,
      height: function(){
        if (dataset.records.length > 16) {return 432;}
      },
      colWidths: 47,
      rowWidth: 27,
      stretchH: 'all',
      columnSorting: true,
      search: true
    }
  }
}

export default HandsonTable;
