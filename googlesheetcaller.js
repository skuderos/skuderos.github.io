function googlesheetcaller(){
  const sheetId = '1qVfO_FvJFTVzKkOWO8hMhlUg41JiNRDkjq0skuntrKA';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'user-data';
  const query = encodeURIComponent('Select *')
  const url = `${base}&sheet=${sheetName}&tq=${query}`
  const data = [];

  fetch(url)
         .then(res => res.text())
         .then(rep => {
             //Remove additional text and extract only JSON:
             const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
             console.log(jsonData)

             const colz = [];
             const tr = document.createElement('tr');
             //Extract column labels
             jsonData.table.cols.forEach((heading) => {
                 if (heading.label) {
                     let column = heading.label;
                     colz.push(column);
                     const th = document.createElement('th');
                     th.innerText = column;
                     tr.appendChild(th);
                 }
             })
             output.appendChild(tr);

             //extract row data:
             jsonData.table.rows.forEach((rowData) => {
                 const row = {};
                 colz.forEach((ele, ind) => {
                     row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                 })
                 data.push(row);
             })
             processRows(data);
             console.log(data);
         })
}
