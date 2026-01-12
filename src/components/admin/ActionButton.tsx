import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  label: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const ActionButton = ({
  label,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
};
