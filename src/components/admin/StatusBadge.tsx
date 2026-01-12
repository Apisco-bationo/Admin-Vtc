import { cn } from "@/lib/utils";

type StatusType = 
  | 'actif' | 'inactif' | 'suspendu'
  | 'operationnel' | 'maintenance' | 'immobilise'
  | 'recu' | 'en_attente' | 'valide' | 'refuse'
  | 'bon' | 'moyen' | 'mauvais';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  // Chauffeur statuts
  actif: { label: 'Actif', className: 'bg-success/20 text-success border-success/30' },
  inactif: { label: 'Inactif', className: 'bg-muted text-muted-foreground border-muted' },
  suspendu: { label: 'Suspendu', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  
  // Véhicule états
  operationnel: { label: 'Opérationnel', className: 'bg-success/20 text-success border-success/30' },
  maintenance: { label: 'Maintenance', className: 'bg-warning/20 text-warning border-warning/30' },
  immobilise: { label: 'Immobilisé', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  
  // Versement statuts
  recu: { label: 'Reçu', className: 'bg-primary/20 text-primary border-primary/30' },
  en_attente: { label: 'En attente', className: 'bg-warning/20 text-warning border-warning/30' },
  valide: { label: 'Validé', className: 'bg-success/20 text-success border-success/30' },
  refuse: { label: 'Refusé', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  
  // État composants véhicule
  bon: { label: 'Bon', className: 'bg-success/20 text-success border-success/30' },
  moyen: { label: 'Moyen', className: 'bg-warning/20 text-warning border-warning/30' },
  mauvais: { label: 'Mauvais', className: 'bg-destructive/20 text-destructive border-destructive/30' },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
