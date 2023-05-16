const columnDefs = [
    { field: "Exercise Name", editable: true },
    { field: "TDY Location", editable: true }
  ];
  
  // specify the data
  const rowData = [
    { },
    { }
  ];
  
  // let the grid know which columns and what data to use
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData
  };
  
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', () => {
      const gridDiv = document.querySelector('#myGrid');
      new agGrid.Grid(gridDiv, gridOptions);
  });


