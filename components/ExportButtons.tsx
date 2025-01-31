import { Button } from "@/components/ui/button";
import { FileSpreadsheet, File as FilePdf } from "lucide-react";

interface ExportButtonsProps {
  onExportXLSX: () => void;
  onExportPDF: () => void;
}

export function ExportButtons({ onExportXLSX, onExportPDF }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={onExportXLSX}
        className="flex items-center gap-2"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Export XLSX
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={onExportPDF}
        className="flex items-center gap-2"
      >
        <FilePdf className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
}
