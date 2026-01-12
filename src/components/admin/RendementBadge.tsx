import { cn } from "@/lib/utils";

interface RendementBadgeProps {
  taux: number;
  className?: string;
}

export const RendementBadge = ({ taux, className }: RendementBadgeProps) => {
  const getConfig = () => {
    if (taux >= 85) {
      return {
        label: 'Rentable',
        bgColor: 'bg-success/20',
        textColor: 'text-success',
        borderColor: 'border-success/30',
      };
    } else if (taux >= 60) {
      return {
        label: 'Moyen',
        bgColor: 'bg-warning/20',
        textColor: 'text-warning',
        borderColor: 'border-warning/30',
      };
    } else {
      return {
        label: 'À risque',
        bgColor: 'bg-destructive/20',
        textColor: 'text-destructive',
        borderColor: 'border-destructive/30',
      };
    }
  };

  const config = getConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      {config.label}
    </span>
  );
};
