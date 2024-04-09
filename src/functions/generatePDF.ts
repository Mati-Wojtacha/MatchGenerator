// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//
//
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
//
// interface TableCell {
//     text: string;
//     colSpan?: number;
//     alignment?: string;
//     fillColor?: string;
//     bold?: boolean;
//     color?: string;
//     fontSize: string | number;
// }
//
// interface HeaderCell extends TableCell {
//     alignment: string;
//     bold: true;
//     fillColor: string;
//     color: string;
//     fontSize: number;
// }
//
// function getTableData(tableElement: HTMLElement): TableCell[][] {
//     const body: TableCell[][] = [];
//     const headers: HeaderCell[] = [...tableElement.querySelectorAll('th')].map((header) => ({
//         text: header.innerText,
//         alignment: 'center',
//         bold: true,
//         fillColor: '#04AA6D',
//         color: 'white',
//         fontSize: 13,
//     }));
//
//     body.push(headers);
//
//     const rows = tableElement.querySelectorAll('tr');
//     rows.forEach((row) => {
//         const rowData: TableCell[] = [];
//         const cells = row.querySelectorAll('td');
//
//         cells.forEach((cell) => {
//             const cellData: TableCell = {
//                 text: cell.innerText,
//                 colSpan: cell.hasAttribute('colspan') ? parseInt(cell.getAttribute('colspan')!, 10) : undefined,
//                 alignment: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan')!, 10) > 1 ? 'center' : 'left',
//                 fillColor: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan')!, 10) > 1 ? '#04AA6D' : 'white',
//                 bold: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan')!, 10) > 1,
//                 color: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan')!, 10) > 1 ? 'white' : 'black',
//                 fontSize: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan')!, 10) > 1 ? 13 : 12,
//             };
//
//             rowData.push(cellData);
//             if (cellData.colSpan && cellData.colSpan > 1) {
//                 for (let i = 1; i < cellData.colSpan; i++) {
//                     rowData.push({fontSize: 10, text: ""});
//                 }
//             }
//         });
//
//         if (rowData.length > 0) {
//             body.push(rowData);
//         }
//     });
//
//     console.log(body);
//     return body;
// }
//
// function generatePDF(lengthData: number): pdfMake.CreatedPdf {
//     const docDefinition: pdfMake.DocumentDefinitions = {
//         content: [
//             {
//                 text: 'Zestawienie punktowe graczy:',
//                 fontSize: 16,
//                 bold: true,
//                 margin: [20, 5, 20, 5]
//             },
//         ]
//     };
//
//     const summaryTableElement = document.getElementById('summary-table');
//     if (summaryTableElement instanceof HTMLElement) {
//         docDefinition.content.push({
//             bold: false, fontSize: 0, text: "",
//             table: {
//                 widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
//                 body: getTableData(summaryTableElement)
//             },
//             margin: [20, 5, 20, 5]
//         });
//     }
//
//     for (let i = 0; i < lengthData; i++) {
//         const tableElementId = `myTable-${i + 1}`;
//         const originalTableElement = document.getElementById(tableElementId);
//
//         if (originalTableElement instanceof HTMLElement) {
//             const tableElement = originalTableElement.cloneNode(true) as HTMLElement;
//             const inputs = tableElement.querySelectorAll('input[type="number"]');
//             inputs.forEach((inputElement) => {
//                 const input = inputElement as HTMLInputElement;
//                 const value = input.value;
//                 const textNode = document.createTextNode(value);
//                 const parent = input.parentNode!;
//                 parent.replaceChild(textNode, input);
//             });
//
//             console.log("table element", tableElement);
//             const tableData = getTableData(tableElement);
//
//             docDefinition.content.push({
//                 text: `Wyniki z meczu ${i + 1}:`,
//                 fontSize: 12,
//                 bold: true,
//                 margin: [20, 10, 20, 0]
//             });
//
//             docDefinition.content.push({
//                 table: {
//                     widths: ['*', '*'],
//                     body: tableData
//                 },
//                 margin: [20, 5, 20, 5]
//             });
//         }
//     }
//     return pdfMake.createPdf(docDefinition);
// }
//
// export { generatePDF };
