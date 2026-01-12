import { cn } from "@/lib/utils";

interface RendementProgressBarProps {
  value: number;
  className?: string;
}

export const RendementProgressBar = ({ value, className }: RendementProgressBarProps) => {
  const getColor = () => {
    if (value >= 85) return 'bg-success';
    if (value >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500 ease-out rounded-full", getColor())}
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground min-w-[45px] text-right">
          {value.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};
