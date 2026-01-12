import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionButton } from "@/components/admin/ActionButton";
import { DataTable } from "@/components/admin/DataTable";
import { versements } from "@/data/mockData";
import { Check, X, Eye, Filter } from "lucide-react";
import { useState } from "react";

const Versements = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredVersements = filterStatus === "all" 
    ? versements 
    : versements.filter(v => v.statut === filterStatus);

  const totalRecu = versements
    .filter(v => v.statut === 'valide' || v.statut === 'recu')
    .reduce((sum, v) => sum + v.montant, 0);

  const columns = [
    {
      key: "chauffeur",
      header: "Chauffeur",
      render: (versement: typeof versements[0]) => (
        <div>
          <p className="font-medium text-foreground">{versement.chauffeurNom}</p>
          <p className="text-sm text-muted-foreground">{versement.chauffeurId}</p>
        </div>
      ),
    },
    {
      key: "montant",
      header: "Montant",
      render: (versement: typeof versements[0]) => (
        <span className="font-semibold text-primary text-lg">
          {versement.montant.toLocaleString()} FC
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (versement: typeof versements[0]) => (
        <span className="text-foreground">{versement.date}</span>
      ),
    },
    {
      key: "periode",
      header: "Période",
      render: (versement: typeof versements[0]) => (
        <span className="text-muted-foreground">{versement.periode}</span>
      ),
    },
    {
      key: "methode",
      header: "Méthode",
      render: (versement: typeof versements[0]) => (
        <span className="text-muted-foreground">{versement.methode}</span>
      ),
    },
    {
      key: "statut",
      header: "Statut",
      render: (versement: typeof versements[0]) => (
        <StatusBadge status={versement.statut} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (versement: typeof versements[0]) => (
        <div className="flex items-center gap-2">
          {versement.statut === 'en_attente' || versement.statut === 'recu' ? (
            <>
              <button className="p-2 rounded-lg hover:bg-success/20 transition-colors">
                <Check className="w-4 h-4 text-success" />
              </button>
              <button className="p-2 rounded-lg hover:bg-destructive/20 transition-colors">
                <X className="w-4 h-4 text-destructive" />
              </button>
            </>
          ) : (
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Eye className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Versements"
        subtitle="Réception et suivi des paiements"
      />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card-premium rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Total reçu</p>
            <p className="text-2xl font-serif font-semibold gold-text-gradient">
              {totalRecu.toLocaleString()} FC
            </p>
          </div>
          <div className="card-premium rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Validés</p>
            <p className="text-2xl font-serif font-semibold text-success">
              {versements.filter(v => v.statut === 'valide').length}
            </p>
          </div>
          <div className="card-premium rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">En attente</p>
            <p className="text-2xl font-serif font-semibold text-warning">
              {versements.filter(v => v.statut === 'en_attente').length}
            </p>
          </div>
          <div className="card-premium rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Refusés</p>
            <p className="text-2xl font-serif font-semibold text-destructive">
              {versements.filter(v => v.statut === 'refuse').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2">
            {['all', 'en_attente', 'recu', 'valide', 'refuse'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {status === 'all' ? 'Tous' : 
                 status === 'en_attente' ? 'En attente' :
                 status === 'recu' ? 'Reçu' :
                 status === 'valide' ? 'Validé' : 'Refusé'}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="card-premium rounded-xl overflow-hidden">
          <DataTable
            data={filteredVersements}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default Versements;
