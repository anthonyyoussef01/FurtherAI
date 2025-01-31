import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}

export function StatCard({ title, Icon, children }: StatCardProps) {
  return (
    <Card className="p-6 shadow-lg bg-white/95 backdrop-blur">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </Card>
  );
}
