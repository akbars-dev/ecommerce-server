const ExelJs = require('exceljs');

async function createExelFile (data, fileName) {
    const workbook = new ExelJs.Workbook();
    const worksheet = workbook.addWorkSheet('USERS SHEET');
    
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    
    data.forEach((row) => {
        worksheet.addRow(Object.values(row));
    })
    
    workbook.xlsx.writeFile(fileName);
}

module.exports = createExelFile;