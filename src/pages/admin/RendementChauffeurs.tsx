import { useState, useMemo } from "react";
import { TrendingUp, Filter, Download, Brain, Bell, Users, Car } from "lucide-react";
import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatCard } from "@/components/admin/StatCard";
import { RendementBadge } from "@/components/admin/RendementBadge";
import { RendementProgressBar } from "@/components/admin/RendementProgressBar";
import { rendementChauffeurs, RendementChauffeur } from "@/data/rendementData";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

type PeriodFilter = 'jour' | 'semaine' | 'mois';
type StatusFilter = 'tous' | 'rentable' | 'moyen' | 'risque';

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FC';
};

const RendementChauffeurs = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('mois');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('tous');

  const filteredData = useMemo(() => {
    let data = [...rendementChauffeurs];

    // Apply period multiplier (simulation)
    const periodMultiplier = periodFilter === 'jour' ? 0.033 : periodFilter === 'semaine' ? 0.23 : 1;
    data = data.map(item => ({
      ...item,
      montantEstime: Math.round(item.montantEstime * periodMultiplier),
      montantVerse: Math.round(item.montantVerse * periodMultiplier),
      resteAPayer: Math.round(item.resteAPayer * periodMultiplier),
    }));

    // Apply status filter
    if (statusFilter !== 'tous') {
      data = data.filter(item => {
        if (statusFilter === 'rentable') return item.tauxRendement >= 85;
        if (statusFilter === 'moyen') return item.tauxRendement >= 60 && item.tauxRendement < 85;
        return item.tauxRendement < 60;
      });
    }

    return data;
  }, [periodFilter, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalEstime = filteredData.reduce((sum, item) => sum + item.montantEstime, 0);
    const totalVerse = filteredData.reduce((sum, item) => sum + item.montantVerse, 0);
    const avgRendement = filteredData.length > 0
      ? filteredData.reduce((sum, item) => sum + item.tauxRendement, 0) / filteredData.length
      : 0;
    const rentableCount = filteredData.filter(item => item.tauxRendement >= 85).length;

    return { totalEstime, totalVerse, avgRendement, rentableCount };
  }, [filteredData]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderAdmin
        title="Rendement Chauffeurs"
        subtitle="Suivi des performances et versements"
      />

      <div className="flex-1 p-4 lg:p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Estimé"
            value={formatMoney(stats.totalEstime)}
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Versé"
            value={formatMoney(stats.totalVerse)}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Rendement Moyen"
            value={`${stats.avgRendement.toFixed(1)}%`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: stats.avgRendement >= 70 }}
          />
          <StatCard
            title="Chauffeurs Rentables"
            value={`${stats.rentableCount}/${filteredData.length}`}
            icon={Car}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtres:</span>
            </div>
            
            <Select value={periodFilter} onValueChange={(v) => setPeriodFilter(v as PeriodFilter)}>
              <SelectTrigger className="w-32 bg-card border-border">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jour">Jour</SelectItem>
                <SelectItem value="semaine">Semaine</SelectItem>
                <SelectItem value="mois">Mois</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-36 bg-card border-border">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous</SelectItem>
                <SelectItem value="rentable">Rentable</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="risque">À risque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Future Extensions */}
          <div className="flex gap-2">
            <button
              disabled
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm cursor-not-allowed opacity-60"
              title="Bientôt disponible"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">IA Prédictive</span>
            </button>
            <button
              disabled
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm cursor-not-allowed opacity-60"
              title="Bientôt disponible"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button
              disabled
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm cursor-not-allowed opacity-60"
              title="Bientôt disponible"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alertes</span>
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block card-premium rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Chauffeur</th>
                  <th>Véhicule</th>
                  <th className="text-right">Montant Estimé</th>
                  <th className="text-right">Montant Versé</th>
                  <th className="text-right">Reste à Payer</th>
                  <th className="w-48">Rendement</th>
                  <th className="text-center">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="animate-fade-in hover:bg-muted/30 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <div>
                        <p className="font-medium text-foreground">{item.nom}</p>
                        <p className="text-xs text-muted-foreground">{item.chauffeurId}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className={cn(
                          "text-sm",
                          item.vehicule === 'Non attribué' ? 'text-muted-foreground italic' : 'text-foreground'
                        )}>
                          {item.vehicule}
                        </p>
                        {item.vehiculeId && (
                          <p className="text-xs text-muted-foreground">{item.vehiculeId}</p>
                        )}
                      </div>
                    </td>
                    <td className="text-right font-medium text-foreground">
                      {formatMoney(item.montantEstime)}
                    </td>
                    <td className="text-right text-success font-medium">
                      {formatMoney(item.montantVerse)}
                    </td>
                    <td className="text-right text-destructive font-medium">
                      {formatMoney(item.resteAPayer)}
                    </td>
                    <td>
                      <RendementProgressBar value={item.tauxRendement} />
                    </td>
                    <td className="text-center">
                      <RendementBadge taux={item.tauxRendement} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun chauffeur ne correspond aux critères
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredData.map((item, index) => (
            <Card
              key={item.id}
              className="card-premium p-4 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{item.nom}</h3>
                  <p className="text-xs text-muted-foreground">{item.chauffeurId}</p>
                </div>
                <RendementBadge taux={item.tauxRendement} />
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm">
                <Car className="w-4 h-4 text-muted-foreground" />
                <span className={cn(
                  item.vehicule === 'Non attribué' ? 'text-muted-foreground italic' : 'text-foreground'
                )}>
                  {item.vehicule}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimé:</span>
                  <span className="font-medium text-foreground">{formatMoney(item.montantEstime)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Versé:</span>
                  <span className="font-medium text-success">{formatMoney(item.montantVerse)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reste:</span>
                  <span className="font-medium text-destructive">{formatMoney(item.resteAPayer)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Rendement</span>
                </div>
                <RendementProgressBar value={item.tauxRendement} />
              </div>
            </Card>
          ))}
          
          {filteredData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun chauffeur ne correspond aux critères
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RendementChauffeurs;
