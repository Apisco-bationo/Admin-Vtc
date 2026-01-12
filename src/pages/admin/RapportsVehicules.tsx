import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionButton } from "@/components/admin/ActionButton";
import { rapportsVehicules } from "@/data/mockData";
import { Check, Wrench, Ban, ChevronDown, ChevronUp, Fuel } from "lucide-react";
import { useState } from "react";

const RapportsVehicules = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Rapports Véhicules"
        subtitle="États des véhicules signalés par les chauffeurs"
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-foreground">
              {rapportsVehicules.length}
            </p>
            <p className="text-sm text-muted-foreground">Total rapports</p>
          </div>
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-warning">
              {rapportsVehicules.filter(r => r.statut === 'en_attente').length}
            </p>
            <p className="text-sm text-muted-foreground">En attente</p>
          </div>
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-success">
              {rapportsVehicules.filter(r => r.statut === 'valide').length}
            </p>
            <p className="text-sm text-muted-foreground">Validés</p>
          </div>
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-destructive">
              {rapportsVehicules.filter(r => r.statut === 'maintenance' || r.statut === 'immobilise').length}
            </p>
            <p className="text-sm text-muted-foreground">Nécessitent action</p>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {rapportsVehicules.map((rapport) => (
            <div
              key={rapport.id}
              className="card-premium rounded-xl overflow-hidden animate-fade-in"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(rapport.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-foreground">{rapport.vehiculeInfo}</p>
                    <p className="text-sm text-muted-foreground">
                      Par {rapport.chauffeurNom} • {rapport.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={rapport.statut} />
                  {expandedId === rapport.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === rapport.id && (
                <div className="border-t border-border p-6 space-y-6 animate-slide-up">
                  {/* État des composants */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                      État des composants
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-foreground">Freins</span>
                        <StatusBadge status={rapport.freins} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-foreground">Pneus</span>
                        <StatusBadge status={rapport.pneus} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-foreground">Moteur</span>
                        <StatusBadge status={rapport.moteur} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-foreground">Carrosserie</span>
                        <StatusBadge status={rapport.carrosserie} />
                      </div>
                    </div>
                  </div>

                  {/* Niveau carburant */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                      <Fuel className="w-4 h-4" />
                      Niveau carburant
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${rapport.niveauCarburant}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground min-w-[3rem]">
                        {rapport.niveauCarburant}%
                      </span>
                    </div>
                  </div>

                  {/* Commentaire */}
                  {rapport.commentaire && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        Commentaire
                      </h4>
                      <p className="text-foreground bg-muted/50 p-4 rounded-lg">
                        {rapport.commentaire}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {rapport.statut === 'en_attente' && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <ActionButton
                        label="Valider"
                        icon={Check}
                        variant="primary"
                      />
                      <ActionButton
                        label="Mettre en maintenance"
                        icon={Wrench}
                        variant="secondary"
                      />
                      <ActionButton
                        label="Immobiliser"
                        icon={Ban}
                        variant="danger"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RapportsVehicules;
