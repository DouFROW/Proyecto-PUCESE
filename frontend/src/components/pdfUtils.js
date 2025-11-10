// src/components/pdfUtils.js
// src/components/pdfUtils.js
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportHtmlToPdf = async (elementId, fileName = 'documento.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemento con ID ${elementId} no encontrado.`);
    return;
  }

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgProps = {
    width: pdfWidth,
    height: (canvas.height * pdfWidth) / canvas.width,
  };

  let position = 0;

  // Agrega la imagen en partes si excede el alto de la página
  while (position < imgProps.height) {
    pdf.addImage(
      imgData,
      'PNG',
      0,
      -position,
      imgProps.width,
      imgProps.height
    );

    position += pdfHeight;

    if (position < imgProps.height) {
      pdf.addPage();
    }
  }

  pdf.save(fileName);
};
