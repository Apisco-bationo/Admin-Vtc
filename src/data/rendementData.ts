// Rendement data for driver performance tracking
// All monetary values are in Franc CFA (XOF)

export interface RendementChauffeur {
  id: string;
  chauffeurId: string;
  nom: string;
  vehicule: string;
  vehiculeId: string;
  montantEstime: number; // Estimated amount from Yango rides
  montantVerse: number;  // Amount paid
  resteAPayer: number;   // Remaining to pay
  tauxRendement: number; // Performance rate (%)
}

export const rendementChauffeurs: RendementChauffeur[] = [
  {
    id: 'RND001',
    chauffeurId: 'CHF001',
    nom: 'Yao Koffi',
    vehicule: 'Mercedes Classe E',
    vehiculeId: 'VEH001',
    montantEstime: 850000,
    montantVerse: 780000,
    resteAPayer: 70000,
    tauxRendement: 91.8,
  },
  {
    id: 'RND002',
    chauffeurId: 'CHF002',
    nom: 'Boubacar Diarrassouba',
    vehicule: 'BMW Série 5',
    vehiculeId: 'VEH002',
    montantEstime: 720000,
    montantVerse: 545000,
    resteAPayer: 175000,
    tauxRendement: 75.7,
  },
  {
    id: 'RND003',
    chauffeurId: 'CHF004',
    nom: 'Souleymane Coulibaly',
    vehicule: 'Audi A6',
    vehiculeId: 'VEH003',
    montantEstime: 680000,
    montantVerse: 620000,
    resteAPayer: 60000,
    tauxRendement: 91.2,
  },
  {
    id: 'RND004',
    chauffeurId: 'CHF003',
    nom: 'Aminata Koné',
    vehicule: 'Non attribué',
    vehiculeId: '',
    montantEstime: 450000,
    montantVerse: 245000,
    resteAPayer: 205000,
    tauxRendement: 54.4,
  },
  {
    id: 'RND005',
    chauffeurId: 'CHF005',
    nom: 'Fatou Bamba',
    vehicule: 'Non attribué',
    vehiculeId: '',
    montantEstime: 380000,
    montantVerse: 180000,
    resteAPayer: 200000,
    tauxRendement: 47.4,
  },
  {
    id: 'RND006',
    chauffeurId: 'CHF006',
    nom: 'Ibrahim Traoré',
    vehicule: 'Tesla Model S',
    vehiculeId: 'VEH004',
    montantEstime: 920000,
    montantVerse: 750000,
    resteAPayer: 170000,
    tauxRendement: 81.5,
  },
  {
    id: 'RND007',
    chauffeurId: 'CHF007',
    nom: 'Marie Kouassi',
    vehicule: 'Mercedes Classe S',
    vehiculeId: 'VEH005',
    montantEstime: 560000,
    montantVerse: 350000,
    resteAPayer: 210000,
    tauxRendement: 62.5,
  },
];
