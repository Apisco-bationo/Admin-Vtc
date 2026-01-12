import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { ActionButton } from "@/components/admin/ActionButton";
import { vehicules } from "@/data/mockData";
import { ArrowLeft, Save, User, CreditCard, FileText } from "lucide-react";

const AjouterChauffeur = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    statut: "actif" as const,
    vehiculeId: "",
    permis: {
      numero: "",
      dateExpiration: "",
      categories: "",
    },
    pieceIdentite: {
      type: "cni" as const,
      numero: "",
      dateExpiration: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("permis.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        permis: { ...prev.permis, [field]: value },
      }));
    } else if (name.startsWith("pieceIdentite.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pieceIdentite: { ...prev.pieceIdentite, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout du chauffeur (à implémenter avec l'API)
    console.log("Chauffeur ajouté:", formData);
    navigate("/admin/chauffeurs");
  };

  return (
    <div className="flex-1">
      <HeaderAdmin
        title="Ajouter un chauffeur"
        subtitle="Ajoutez un nouveau chauffeur à l'équipe"
      />

      <div className="p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/chauffeurs")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux chauffeurs</span>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Informations personnelles */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 gold-border flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Informations personnelles
                </h2>
                <p className="text-sm text-muted-foreground">
                  Coordonnées et informations de base
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Prénom */}
              <div className="space-y-2">
                <label
                  htmlFor="prenom"
                  className="text-sm font-medium text-foreground"
                >
                  Prénom <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Yao"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Nom */}
              <div className="space-y-2">
                <label
                  htmlFor="nom"
                  className="text-sm font-medium text-foreground"
                >
                  Nom <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Koffi"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Ex: yao.koffi@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <label
                  htmlFor="telephone"
                  className="text-sm font-medium text-foreground"
                >
                  Téléphone <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  placeholder="Ex: +225 07 12 34 56 78"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Statut */}
              <div className="space-y-2">
                <label
                  htmlFor="statut"
                  className="text-sm font-medium text-foreground"
                >
                  Statut <span className="text-destructive">*</span>
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="suspendu">Suspendu</option>
                </select>
              </div>

              {/* Véhicule assigné */}
              <div className="space-y-2">
                <label
                  htmlFor="vehiculeId"
                  className="text-sm font-medium text-foreground"
                >
                  Véhicule assigné
                </label>
                <select
                  id="vehiculeId"
                  name="vehiculeId"
                  value={formData.vehiculeId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                >
                  <option value="">Non assigné</option>
                  {vehicules
                    .filter((v) => v.etat === "operationnel")
                    .map((vehicule) => (
                      <option key={vehicule.id} value={vehicule.id}>
                        {vehicule.marque} {vehicule.modele} -{" "}
                        {vehicule.immatriculation}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section: Permis de conduire */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 gold-border flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Permis de conduire
                </h2>
                <p className="text-sm text-muted-foreground">
                  Informations du permis de conduire
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Numéro permis */}
              <div className="space-y-2">
                <label
                  htmlFor="permis.numero"
                  className="text-sm font-medium text-foreground"
                >
                  Numéro de permis <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="permis.numero"
                  name="permis.numero"
                  value={formData.permis.numero}
                  onChange={handleChange}
                  required
                  placeholder="Ex: PERM-2024-001"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Catégories permis */}
              <div className="space-y-2">
                <label
                  htmlFor="permis.categories"
                  className="text-sm font-medium text-foreground"
                >
                  Catégories <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="permis.categories"
                  name="permis.categories"
                  value={formData.permis.categories}
                  onChange={handleChange}
                  required
                  placeholder="Ex: A, B, C"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Date expiration permis */}
              <div className="space-y-2">
                <label
                  htmlFor="permis.dateExpiration"
                  className="text-sm font-medium text-foreground"
                >
                  Date d'expiration <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  id="permis.dateExpiration"
                  name="permis.dateExpiration"
                  value={formData.permis.dateExpiration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section: Pièce d'identité */}
          <div className="card-premium rounded-xl p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 gold-border flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Pièce d'identité
                </h2>
                <p className="text-sm text-muted-foreground">
                  Informations de la pièce d'identité
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Type pièce */}
              <div className="space-y-2">
                <label
                  htmlFor="pieceIdentite.type"
                  className="text-sm font-medium text-foreground"
                >
                  Type de pièce <span className="text-destructive">*</span>
                </label>
                <select
                  id="pieceIdentite.type"
                  name="pieceIdentite.type"
                  value={formData.pieceIdentite.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                >
                  <option value="cni">Carte Nationale d'Identité</option>
                  <option value="passeport">Passeport</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Numéro pièce */}
              <div className="space-y-2">
                <label
                  htmlFor="pieceIdentite.numero"
                  className="text-sm font-medium text-foreground"
                >
                  Numéro de pièce <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="pieceIdentite.numero"
                  name="pieceIdentite.numero"
                  value={formData.pieceIdentite.numero}
                  onChange={handleChange}
                  required
                  placeholder="Ex: CI123456789"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Date expiration pièce */}
              <div className="space-y-2">
                <label
                  htmlFor="pieceIdentite.dateExpiration"
                  className="text-sm font-medium text-foreground"
                >
                  Date d'expiration <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  id="pieceIdentite.dateExpiration"
                  name="pieceIdentite.dateExpiration"
                  value={formData.pieceIdentite.dateExpiration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <ActionButton
              label="Annuler"
              variant="secondary"
              onClick={() => navigate("/admin/chauffeurs")}
            />
            <ActionButton
              label="Enregistrer le chauffeur"
              icon={Save}
              variant="primary"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterChauffeur;

