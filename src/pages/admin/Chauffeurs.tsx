import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionButton } from "@/components/admin/ActionButton";
import { DataTable } from "@/components/admin/DataTable";
import { chauffeurs, vehicules } from "@/data/mockData";
import { Plus, Eye, Edit, Mail, Phone } from "lucide-react";
import { useState } from "react";

const Chauffeurs = () => {
  const [selectedChauffeur, setSelectedChauffeur] = useState<string | null>(null);

  const getVehiculeInfo = (vehiculeId: string | null) => {
    if (!vehiculeId) return "Non assigné";
    const vehicule = vehicules.find(v => v.id === vehiculeId);
    return vehicule ? `${vehicule.marque} ${vehicule.modele}` : "Non trouvé";
  };

  const columns = [
    {
      key: "nom",
      header: "Chauffeur",
      render: (chauffeur: typeof chauffeurs[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 gold-border flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {chauffeur.prenom[0]}{chauffeur.nom[0]}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">
              {chauffeur.prenom} {chauffeur.nom}
            </p>
            <p className="text-sm text-muted-foreground">{chauffeur.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (chauffeur: typeof chauffeurs[0]) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-3.5 h-3.5" />
            {chauffeur.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-3.5 h-3.5" />
            {chauffeur.telephone}
          </div>
        </div>
      ),
    },
    {
      key: "vehicule",
      header: "Véhicule",
      render: (chauffeur: typeof chauffeurs[0]) => (
        <span className={chauffeur.vehiculeId ? "text-foreground" : "text-muted-foreground"}>
          {getVehiculeInfo(chauffeur.vehiculeId)}
        </span>
      ),
    },
    {
      key: "stats",
      header: "Performance",
      render: (chauffeur: typeof chauffeurs[0]) => (
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Courses: </span>
            <span className="font-medium text-foreground">{chauffeur.courses}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Revenus: </span>
            <span className="font-medium text-primary">{chauffeur.revenus.toLocaleString()} FC</span>
          </p>
        </div>
      ),
    },
    {
      key: "statut",
      header: "Statut",
      render: (chauffeur: typeof chauffeurs[0]) => (
        <StatusBadge status={chauffeur.statut} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (chauffeur: typeof chauffeurs[0]) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedChauffeur(chauffeur.id);
            }}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Edit className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Chauffeurs"
        subtitle={`${chauffeurs.length} chauffeurs enregistrés`}
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {chauffeurs.filter(c => c.statut === 'actif').length} actifs
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {chauffeurs.filter(c => c.statut === 'inactif').length} inactifs
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {chauffeurs.filter(c => c.statut === 'suspendu').length} suspendus
            </span>
          </div>
          <ActionButton
            label="Ajouter un chauffeur"
            icon={Plus}
            variant="primary"
          />
        </div>

        {/* Data Table */}
        <div className="card-premium rounded-xl overflow-hidden">
          <DataTable
            data={chauffeurs}
            columns={columns}
            onRowClick={(chauffeur) => setSelectedChauffeur(chauffeur.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Chauffeurs;
