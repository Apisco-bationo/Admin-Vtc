import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { StatCard } from "@/components/admin/StatCard";
import { statistiques } from "@/data/mockData";
import { TrendingUp, Calendar, Users, Car, Trophy } from "lucide-react";
import { useState } from "react";

type Period = 'jour' | 'semaine' | 'mois';

const Statistiques = () => {
  const [period, setPeriod] = useState<Period>('semaine');

  const revenusParPeriode = {
    jour: statistiques.revenus.jour,
    semaine: statistiques.revenus.semaine,
    mois: statistiques.revenus.mois,
  };

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Statistiques"
        subtitle="Analyse de performance"
      />

      <div className="p-6 space-y-8">
        {/* Period Selector */}
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2">
            {(['jour', 'semaine', 'mois'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  period === p
                    ? 'bg-primary text-primary-foreground shadow-gold'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Revenus du jour"
            value={`${statistiques.revenus.jour.toLocaleString()} FC`}
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
            className={period === 'jour' ? 'gold-glow' : ''}
          />
          <StatCard
            title="Revenus de la semaine"
            value={`${statistiques.revenus.semaine.toLocaleString()} FC`}
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            className={period === 'semaine' ? 'gold-glow' : ''}
          />
          <StatCard
            title="Revenus du mois"
            value={`${statistiques.revenus.mois.toLocaleString()} FC`}
            icon={TrendingUp}
            trend={{ value: 22, isPositive: true }}
            className={period === 'mois' ? 'gold-glow' : ''}
          />
        </div>

        {/* Performance Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Chauffeurs */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Chauffeurs performants
              </h2>
            </div>
            <div className="space-y-4">
              {statistiques.chauffeursPerformants.map((chauffeur, index) => (
                <div
                  key={chauffeur.nom}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-primary text-primary-foreground' :
                    index === 1 ? 'bg-muted-foreground/30 text-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index === 0 ? <Trophy className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{chauffeur.nom}</p>
                    <p className="text-sm text-muted-foreground">
                      {chauffeur.courses} courses
                    </p>
                  </div>
                  <p className="font-semibold text-primary">
                    {chauffeur.revenus.toLocaleString()} FC
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Véhicules */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Véhicules performants
              </h2>
            </div>
            <div className="space-y-4">
              {statistiques.vehiculesPerformants.map((vehicule, index) => (
                <div
                  key={vehicule.vehicule}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-primary text-primary-foreground' :
                    index === 1 ? 'bg-muted-foreground/30 text-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index === 0 ? <Trophy className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{vehicule.vehicule}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicule.courses} courses
                    </p>
                  </div>
                  <p className="font-semibold text-muted-foreground">
                    {vehicule.kilometrage.toLocaleString()} km
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Chart Placeholder */}
        <div className="card-premium rounded-xl p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
            Évolution des revenus
          </h2>
          <div className="h-64 flex items-center justify-center border border-border/50 rounded-lg bg-muted/20">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Graphique d'évolution
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total période : {revenusParPeriode[period].toLocaleString()} FC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;
