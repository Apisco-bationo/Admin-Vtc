import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { ActionButton } from "@/components/admin/ActionButton";
import { vehicules, chauffeurs } from "@/data/mockData";
import { ArrowLeft, Save, Car } from "lucide-react";

const AjouterVehicule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marque: "",
    modele: "",
    immatriculation: "",
    annee: new Date().getFullYear(),
    etat: "operationnel" as const,
    kilometrage: 0,
    dernierEntretien: new Date().toISOString().split('T')[0],
    chauffeurId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "annee" || name === "kilometrage" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout du véhicule (à implémenter avec l'API)
    console.log("Véhicule ajouté:", formData);
    navigate("/admin/vehicules");
  };

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Ajouter un véhicule"
        subtitle="Ajoutez un nouveau véhicule à la flotte"
      />

      <div className="p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/vehicules")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux véhicules</span>
          </button>
        </div>

        {/* Formulaire */}
        <div className="card-premium rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Icône et titre */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 gold-border flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Informations du véhicule
                </h2>
                <p className="text-sm text-muted-foreground">
                  Remplissez les détails du véhicule
                </p>
              </div>
            </div>

            {/* Grille de formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Marque */}
              <div className="space-y-2">
                <label
                  htmlFor="marque"
                  className="text-sm font-medium text-foreground"
                >
                  Marque <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="marque"
                  name="marque"
                  value={formData.marque}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Mercedes"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Modèle */}
              <div className="space-y-2">
                <label
                  htmlFor="modele"
                  className="text-sm font-medium text-foreground"
                >
                  Modèle <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="modele"
                  name="modele"
                  value={formData.modele}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Classe E"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Immatriculation */}
              <div className="space-y-2">
                <label
                  htmlFor="immatriculation"
                  className="text-sm font-medium text-foreground"
                >
                  Immatriculation <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="immatriculation"
                  name="immatriculation"
                  value={formData.immatriculation}
                  onChange={handleChange}
                  required
                  placeholder="Ex: CI-ABC-1234"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Année */}
              <div className="space-y-2">
                <label
                  htmlFor="annee"
                  className="text-sm font-medium text-foreground"
                >
                  Année <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  id="annee"
                  name="annee"
                  value={formData.annee}
                  onChange={handleChange}
                  required
                  min={1990}
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* État */}
              <div className="space-y-2">
                <label
                  htmlFor="etat"
                  className="text-sm font-medium text-foreground"
                >
                  État <span className="text-destructive">*</span>
                </label>
                <select
                  id="etat"
                  name="etat"
                  value={formData.etat}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                >
                  <option value="operationnel">Opérationnel</option>
                  <option value="maintenance">En maintenance</option>
                  <option value="immobilise">Immobilisé</option>
                </select>
              </div>

              {/* Kilométrage */}
              <div className="space-y-2">
                <label
                  htmlFor="kilometrage"
                  className="text-sm font-medium text-foreground"
                >
                  Kilométrage (km) <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  id="kilometrage"
                  name="kilometrage"
                  value={formData.kilometrage}
                  onChange={handleChange}
                  required
                  min={0}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Dernier entretien */}
              <div className="space-y-2">
                <label
                  htmlFor="dernierEntretien"
                  className="text-sm font-medium text-foreground"
                >
                  Dernier entretien <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  id="dernierEntretien"
                  name="dernierEntretien"
                  value={formData.dernierEntretien}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Chauffeur assigné */}
              <div className="space-y-2">
                <label
                  htmlFor="chauffeurId"
                  className="text-sm font-medium text-foreground"
                >
                  Chauffeur assigné
                </label>
                <select
                  id="chauffeurId"
                  name="chauffeurId"
                  value={formData.chauffeurId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                >
                  <option value="">Non assigné</option>
                  {chauffeurs
                    .filter((c) => c.statut === "actif")
                    .map((chauffeur) => (
                      <option key={chauffeur.id} value={chauffeur.id}>
                        {chauffeur.prenom} {chauffeur.nom} ({chauffeur.id})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <ActionButton
                label="Annuler"
                variant="secondary"
                onClick={() => navigate("/admin/vehicules")}
              />
              <ActionButton
                label="Enregistrer le véhicule"
                icon={Save}
                variant="primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterVehicule;

