import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionButton } from "@/components/admin/ActionButton";
import { DataTable } from "@/components/admin/DataTable";
import { vehicules, chauffeurs } from "@/data/mockData";
import { Plus, Eye, Edit, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vehicules = () => {
  const navigate = useNavigate();

  const getChauffeurInfo = (chauffeurId: string | null) => {
    if (!chauffeurId) return "Non assigné";
    const chauffeur = chauffeurs.find(c => c.id === chauffeurId);
    return chauffeur ? `${chauffeur.prenom} ${chauffeur.nom}` : "Non trouvé";
  };

  const columns = [
    {
      key: "vehicule",
      header: "Véhicule",
      render: (vehicule: typeof vehicules[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center gold-border">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {vehicule.marque} {vehicule.modele}
            </p>
            <p className="text-sm text-muted-foreground">{vehicule.immatriculation}</p>
          </div>
        </div>
      ),
    },
    {
      key: "annee",
      header: "Année",
      render: (vehicule: typeof vehicules[0]) => (
        <span className="text-foreground">{vehicule.annee}</span>
      ),
    },
    {
      key: "chauffeur",
      header: "Chauffeur",
      render: (vehicule: typeof vehicules[0]) => (
        <span className={vehicule.chauffeurId ? "text-foreground" : "text-muted-foreground"}>
          {getChauffeurInfo(vehicule.chauffeurId)}
        </span>
      ),
    },
    {
      key: "kilometrage",
      header: "Kilométrage",
      render: (vehicule: typeof vehicules[0]) => (
        <span className="text-foreground">{vehicule.kilometrage.toLocaleString()} km</span>
      ),
    },
    {
      key: "entretien",
      header: "Dernier entretien",
      render: (vehicule: typeof vehicules[0]) => (
        <span className="text-muted-foreground">{vehicule.dernierEntretien}</span>
      ),
    },
    {
      key: "etat",
      header: "État",
      render: (vehicule: typeof vehicules[0]) => (
        <StatusBadge status={vehicule.etat} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Edit className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Véhicules"
        subtitle={`${vehicules.length} véhicules dans la flotte`}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-success">
              {vehicules.filter(v => v.etat === 'operationnel').length}
            </p>
            <p className="text-sm text-muted-foreground">Opérationnels</p>
          </div>
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-warning">
              {vehicules.filter(v => v.etat === 'maintenance').length}
            </p>
            <p className="text-sm text-muted-foreground">En maintenance</p>
          </div>
          <div className="card-premium rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-semibold text-destructive">
              {vehicules.filter(v => v.etat === 'immobilise').length}
            </p>
            <p className="text-sm text-muted-foreground">Immobilisés</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-end">
          <ActionButton
            label="Ajouter un véhicule"
            icon={Plus}
            variant="primary"
            onClick={() => navigate("/admin/vehicules/ajouter")}
          />
        </div> 

        {/* Data Table */}
        <div className="card-premium rounded-xl overflow-hidden">
          <DataTable
            data={vehicules}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default Vehicules;