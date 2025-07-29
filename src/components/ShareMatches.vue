<template>
  <button class="btn btn-info" @click="generatePDF">
    <i class="fas fa-file-pdf"></i><br>
    <span v-html="$t('generator.btn_generatePDF')"></span>
  </button>
  <button class="btn btn-info" @click="sharePDF">
    <i class="fas fa-share-square"></i><br>
    <span v-html="$t('generator.btn_sharePDF')"></span>
  </button>
</template>

<script>

import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

export default {
  name: 'ShareMatches',
  methods: {
    generatePDF() {
      try {
        const docDefinition = this.prepareDocumentDefinition();
        const pdf = pdfMake.createPdf(docDefinition);
        pdf.open();
      } catch (error) {
        console.error('Error while generate PDF file:', error);
      }
    },

    async sharePDF() {
      try {
        const docDefinition = this.prepareDocumentDefinition();
        const pdf = pdfMake.createPdf(docDefinition);

        pdf.getBuffer((buffer) => {
          const blob = new Blob([buffer], { type: 'application/pdf' });
          const files = [new File([blob], 'mecze.pdf', { type: 'application/pdf' })];

          if (navigator.canShare?.({ files })) {
            navigator.share({ files })
                .then(() => console.log('Share successful'))
                .catch((error) => console.error('Error while share:', error));
          } else {
            console.error('File share is unsupported');
          }
        });
      } catch (error) {
        console.error('Error while generate PDF file to share:', error);
      }
    },

    prepareDocumentDefinition() {
      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [45, 30, 45, 30],
        content: [
          {
            text: this.$t('summaryTable.title'),
            fontSize: 16,
            bold: true,
            margin: [5, 5, 5, 5]
          }
        ]
      };

      this.addSummaryTable(docDefinition);
      this.addMatchTables(docDefinition);

      return docDefinition;
    },

    addSummaryTable(docDefinition) {
      const summaryTable = document.getElementById('summary-table');
      if (summaryTable) {
        docDefinition.content.push({
          table: {
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: this.extractTableData(summaryTable)
          }
        });
      }
    },

    addMatchTables(docDefinition) {
      const matchTables = document.querySelectorAll("#match-table");

      matchTables.forEach((originalTable, index) => {
        const tableClone = this.prepareMatchTable(originalTable);
        if (!tableClone) return;

        docDefinition.content.push({
          text: `${this.$t('summaryTable.match_result')} ${index + 1}:`,
          fontSize: 13,
          bold: true,
          margin: [5, 15, 5, 5]
        });

        docDefinition.content.push({
          table: {
            widths: ['*', '*'],
            body: this.extractTableData(tableClone)
          }
        });
      });
    },

    prepareMatchTable(originalTable) {
      const tableClone = originalTable.cloneNode(true);
      const inputs = tableClone.querySelectorAll('input[type="number"]');

      for (const input of inputs) {
        if (input.value === '') return null;

        const textNode = document.createTextNode(input.value);
        input.parentNode.replaceChild(textNode, input);
      }

      return tableClone;
    },

    extractTableData(tableElement) {
      const body = [];

      // Nagłówki
      const headers = [...tableElement.querySelectorAll('th')].map(header => ({
        text: header.innerText,
        alignment: 'center',
        bold: true,
        fillColor: '#04AA6D',
        color: 'white',
        fontSize: 12
      }));

      if (headers.length) body.push(headers);

      // Wiersze
      const rows = tableElement.querySelectorAll('tr');
      rows.forEach(row => {
        const rowData = this.extractRowData(row);
        if (rowData.length) body.push(rowData);
      });

      return body;
    },

    extractRowData(row) {
      const rowData = [];
      const cells = row.querySelectorAll('td');

      cells.forEach(cell => {
        const colSpan = cell.hasAttribute('colspan') ? parseInt(cell.getAttribute('colspan'), 10) : 1;
        const isHeader = colSpan > 1;

        const cellData = {
          text: cell.innerText,
          colSpan: colSpan,
          alignment: isHeader ? 'center' : 'left',
          fillColor: isHeader ? '#04AA6D' : 'white',
          bold: isHeader,
          color: isHeader ? 'white' : 'black',
          fontSize: '12'
        };

        rowData.push(cellData);

        // Dodaj puste komórki dla colspan
        for (let i = 1; i < colSpan; i++) {
          rowData.push({});
        }
      });

      return rowData;
    }
  }
};
</script>