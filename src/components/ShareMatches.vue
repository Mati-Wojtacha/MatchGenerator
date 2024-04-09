<template>
  <div>
    <button class="btn" @click="generatePDF"><i class="fas fa-file-pdf"></i> Generuj PDF</button>
    <button class="btn" @click="sharePDF"><i class="fas fa-share-square"></i> Udostępnij plik PDF</button>
  </div>

</template>
<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: ["length"],

  methods: {
    generatePDF() {
      this.generateFilePDF(this.length).open();
    },
    async sharePDF() {
      const PDF = this.generateFilePDF(this.length);
      PDF.getBuffer(async (buffer) => {
        const blob = new Blob([buffer], {type: 'application/pdf'});
        const files = [new File([blob], 'document.pdf', {type: 'application/pdf'})];
        try {
          if (navigator.canShare({files})) await navigator.share({files});
          console.log('Shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
        }
      });
    },

    getTableData(tableElement) {
      const body = []
      const headers = [...tableElement.querySelectorAll('th')].map(header => ({
        text: header.innerText,
        alignment: 'center',
        bold: true,
        fillColor: '#04AA6D',
        color: 'white',
        fontSize: 13,

      }));

      body.push(headers);

      const rows = tableElement.querySelectorAll('tr')
      rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td');

        cells.forEach(cell => {
          const cellData = {
            text: cell.innerText,
            colSpan: cell.hasAttribute('colspan') ? parseInt(cell.getAttribute('colspan'), 10) : 1,
            alignment: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan'), 10) > 1 ? 'center' : 'left',
            fillColor: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan'), 10) > 1 ? '#04AA6D' : 'white',
            bold: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan'), 10) > 1,
            color: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan'), 10) > 1 ? 'white' : 'black',
            fontSize: cell.hasAttribute('colspan') && parseInt(cell.getAttribute('colspan'), 10) > 1 ? '13' : '12',

          };

          rowData.push(cellData);
          if (cellData.colSpan > 1) {
            for (let i = 1; i < cellData.colSpan; i++) {
              rowData.push({});
            }
          }
        });

        if (rowData.length > 0) {
          body.push(rowData);
        }
      });
      console.log(body);
      return body
    },

    generateFilePDF(lengthData) {
      const docDefinition = {
        content: [
          {
            text: 'Zestawienie punktowe graczy:',
            fontSize: 16,
            bold: true,
            margin: [20, 5, 20, 5]
          },
        ]
      };
      const summaryTableElement = document.getElementById('summary-table');
      if (summaryTableElement) {
        docDefinition.content.push({
          bold: false, fontSize: 0, text: "",
          table: {
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],

            body: this.getTableData(summaryTableElement)
          },
          margin: [20, 5, 20, 5]
        });
      }

      for (let i = 0; i < lengthData; i++) {
        const tableElementId = `myTable-${i + 1}`;
        const originalTableElement = document.getElementById(tableElementId);

        const tableElement = originalTableElement.cloneNode(true);
        const inputs = tableElement.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
          const value = input.value;
          const textNode = document.createTextNode(value);
          const parent = input.parentNode;
          parent.replaceChild(textNode, input);
        });
        console.log("table element" + tableElement);
        if (tableElement) {
          const tableData = this.getTableData(tableElement);

          docDefinition.content.push({
            text: `Wyniki z meczu ${i + 1}:`,
            fontSize: 12,
            bold: true,
            margin: [20, 10, 20, 0]
          });

          docDefinition.content.push({
            table: {
              widths: ['*', '*'],
              body: tableData
            },
            margin: [20, 5, 20, 5]
          });
        }
      }
      return pdfMake.createPdf(docDefinition);
    },
  }
};
</script>