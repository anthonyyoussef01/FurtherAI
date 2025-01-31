import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

interface ExportData {
  tasksPerDay: number;
  minutesPerTask: number;
  dailyManualHours: number;
  dailyAIHours: number;
  annualHoursSaved: number;
  annualCostSaved: number;
}

export const exportToXLSX = (data: ExportData) => {
  const worksheet = XLSX.utils.json_to_sheet([{
    'Tasks Per Day': data.tasksPerDay,
    'Minutes Per Task': data.minutesPerTask,
    'Daily Manual Hours': data.dailyManualHours.toFixed(1),
    'Daily AI Hours': data.dailyAIHours.toFixed(1),
    'Annual Hours Saved': Math.round(data.annualHoursSaved),
    'Annual Cost Saved': `$${Math.round(data.annualCostSaved).toLocaleString()}`
  }]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Efficiency Report');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(dataBlob, 'efficiency-report.xlsx');
};

export const exportToPDF = (data: ExportData) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Insurance Workflow Efficiency Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text([
    `Tasks Per Day: ${data.tasksPerDay}`,
    `Minutes Per Task: ${data.minutesPerTask}`,
    `Daily Manual Hours: ${data.dailyManualHours.toFixed(1)}`,
    `Daily AI Hours: ${data.dailyAIHours.toFixed(1)}`,
    `Annual Hours Saved: ${Math.round(data.annualHoursSaved)}`,
    `Annual Cost Saved: $${Math.round(data.annualCostSaved).toLocaleString()}`
  ], 20, 40);

  doc.save('efficiency-report.pdf');
};
