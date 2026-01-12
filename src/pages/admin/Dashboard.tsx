import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatCard } from "@/components/admin/StatCard";
import { AlertCard } from "@/components/admin/AlertCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Users, Car, CreditCard, AlertTriangle, TrendingUp, Wrench } from "lucide-react";
import { chauffeurs, vehicules, versements, rapportsVehicules } from "@/data/mockData";

const Dashboard = () => {
  const chauffeursActifs = chauffeurs.filter(c => c.statut === 'actif').length;
  const vehiculesActifs = vehicules.filter(v => v.etat === 'operationnel').length;
  const versementsJour = versements
    .filter(v => v.date === '2024-01-12')
    .reduce((sum, v) => sum + v.montant, 0);
  const versementsEnAttente = versements.filter(v => v.statut === 'en_attente').length;
  const rapportsNonTraites = rapportsVehicules.filter(r => r.statut === 'en_attente').length;
  const vehiculesEnMaintenance = vehicules.filter(v => v.etat === 'maintenance' || v.etat === 'immobilise');

  return (
    <div className="flex-1">
      <HeaderAdmin 
        title="Dashboard" 
        subtitle="Vue d'ensemble de votre activité" 
      />
      
      <div className="p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Chauffeurs Actifs"
            value={chauffeursActifs}
            subtitle={`sur ${chauffeurs.length} total`}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Versements du jour"
            value={`${versementsJour.toLocaleString()} FC`}
            subtitle="3 transactions"
            icon={CreditCard}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Versements en attente"
            value={versementsEnAttente}
            subtitle="À valider"
            icon={TrendingUp}
          />
          <StatCard
            title="Véhicules Actifs"
            value={vehiculesActifs}
            subtitle={`sur ${vehicules.length} total`}
            icon={Car}
          />
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rapports non traités */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Alertes
              </h2>
            </div>
            <div className="space-y-3">
              {rapportsNonTraites > 0 && (
                <AlertCard
                  type="warning"
                  title="Rapports en attente"
                  message={`${rapportsNonTraites} rapport(s) de véhicule nécessite(nt) votre attention`}
                />
              )}
              {versementsEnAttente > 0 && (
                <AlertCard
                  type="info"
                  title="Versements à valider"
                  message={`${versementsEnAttente} versement(s) en attente de validation`}
                />
              )}
              {rapportsNonTraites === 0 && versementsEnAttente === 0 && (
                <AlertCard
                  type="success"
                  title="Tout est en ordre"
                  message="Aucune action requise pour le moment"
                />
              )}
            </div>
          </div>

          {/* Véhicules en maintenance */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Véhicules en maintenance
              </h2>
            </div>
            <div className="space-y-3">
              {vehiculesEnMaintenance.length > 0 ? (
                vehiculesEnMaintenance.map((vehicule) => (
                  <div
                    key={vehicule.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {vehicule.marque} {vehicule.modele}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicule.immatriculation}
                      </p>
                    </div>
                    <StatusBadge status={vehicule.etat} />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Aucun véhicule en maintenance
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-premium rounded-xl p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
            Derniers versements
          </h2>
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Chauffeur</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Période</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {versements.slice(0, 5).map((versement, index) => (
                  <tr
                    key={versement.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="font-medium text-foreground">
                      {versement.chauffeurNom}
                    </td>
                    <td className="text-primary font-semibold">
                      {versement.montant.toLocaleString()} FC
                    </td>
                    <td className="text-muted-foreground">
                      {versement.date}
                    </td>
                    <td className="text-muted-foreground">
                      {versement.periode}
                    </td>
                    <td>
                      <StatusBadge status={versement.statut} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
