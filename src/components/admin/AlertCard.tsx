import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

type AlertType = 'warning' | 'error' | 'success' | 'info';

interface AlertCardProps {
  type: AlertType;
  title: string;
  message: string;
  className?: string;
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-warning/10 border-warning/30',
    iconClass: 'text-warning',
  },
  error: {
    icon: XCircle,
    bgClass: 'bg-destructive/10 border-destructive/30',
    iconClass: 'text-destructive',
  },
  success: {
    icon: CheckCircle,
    bgClass: 'bg-success/10 border-success/30',
    iconClass: 'text-success',
  },
  info: {
    icon: Info,
    bgClass: 'bg-primary/10 border-primary/30',
    iconClass: 'text-primary',
  },
};

export const AlertCard = ({ type, title, message, className }: AlertCardProps) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg border",
        config.bgClass,
        className
      )}
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconClass)} />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  );
};
