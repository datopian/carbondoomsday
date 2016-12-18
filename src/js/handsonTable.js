class HandsonTable {
  constructor(dataset) {
    this.handsonTableSpec = {
      data: dataset.slice(1, -1),
      colHeaders: dataset[0],
      readOnly: true,
      width: 1136,
      height: function(){
        if (dataset.length > 16) {return 432;}
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
