// Mock data for VTC Admin Dashboard
// Note: All monetary values (revenus, montants) are in Franc CFA (XOF)
// Format example: 1,250,000 FC = 1,250,000 XOF

export interface Permis {
  numero: string;
  dateExpiration: string;
  categories: string;
}

export interface PieceIdentite {
  type: 'cni' | 'passeport' | 'autre';
  numero: string;
  dateExpiration: string;
}

export interface Chauffeur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  vehiculeId: string | null;
  dateInscription: string;
  courses: number;
  revenus: number;
  permis: Permis;
  pieceIdentite: PieceIdentite;
}

export interface Vehicule {
  id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  annee: number;
  etat: 'operationnel' | 'maintenance' | 'immobilise';
  chauffeurId: string | null;
  kilometrage: number;
  dernierEntretien: string;
}

export interface Versement {
  id: string;
  chauffeurId: string;
  chauffeurNom: string;
  montant: number;
  date: string;
  periode: string;
  statut: 'recu' | 'en_attente' | 'valide' | 'refuse';
  methode: string;
}

export interface RapportVehicule {
  id: string;
  vehiculeId: string;
  vehiculeInfo: string;
  chauffeurId: string;
  chauffeurNom: string;
  date: string;
  freins: 'bon' | 'moyen' | 'mauvais';
  pneus: 'bon' | 'moyen' | 'mauvais';
  moteur: 'bon' | 'moyen' | 'mauvais';
  carrosserie: 'bon' | 'moyen' | 'mauvais';
  niveauCarburant: number;
  commentaire: string;
  statut: 'en_attente' | 'valide' | 'maintenance' | 'immobilise';
}

export const chauffeurs: Chauffeur[] = [
  {
    id: 'CHF001',
    nom: 'Koffi',
    prenom: 'Yao',
    email: 'yao.koffi@email.com',
    telephone: '+225 07 12 34 56 78',
    statut: 'actif',
    vehiculeId: 'VEH001',
    dateInscription: '2023-03-15',
    courses: 1247,
    revenus: 4568000,
    permis: {
      numero: 'PERM-2023-001',
      dateExpiration: '2028-03-15',
      categories: 'A, B, C',
    },
    pieceIdentite: {
      type: 'cni',
      numero: 'CI123456789',
      dateExpiration: '2030-01-01',
    },
  },
  {
    id: 'CHF002',
    nom: 'Diarrassouba',
    prenom: 'Boubacar',
    email: 'boubacar.diarrassouba@email.com',
    telephone: '+225 05 23 45 67 89',
    statut: 'actif',
    vehiculeId: 'VEH002',
    dateInscription: '2023-05-20',
    courses: 892,
    revenus: 3245000,
    permis: {
      numero: 'PERM-2023-002',
      dateExpiration: '2027-05-20',
      categories: 'A, B',
    },
    pieceIdentite: {
      type: 'passeport',
      numero: 'PA987654321',
      dateExpiration: '2028-06-15',
    },
  },
  {
    id: 'CHF003',
    nom: 'Koné',
    prenom: 'Aminata',
    email: 'aminata.kone@email.com',
    telephone: '+225 07 34 56 78 90',
    statut: 'inactif',
    vehiculeId: null,
    dateInscription: '2023-07-10',
    courses: 456,
    revenus: 1678000,
    permis: {
      numero: 'PERM-2023-003',
      dateExpiration: '2026-07-10',
      categories: 'A, B, D',
    },
    pieceIdentite: {
      type: 'cni',
      numero: 'CI987654321',
      dateExpiration: '2029-12-31',
    },
  },
  {
    id: 'CHF004',
    nom: 'Coulibaly',
    prenom: 'Souleymane',
    email: 'souleymane.coulibaly@email.com',
    telephone: '+225 05 45 67 89 01',
    statut: 'actif',
    vehiculeId: 'VEH003',
    dateInscription: '2023-09-01',
    courses: 678,
    revenus: 2456000,
    permis: {
      numero: 'PERM-2023-004',
      dateExpiration: '2029-09-01',
      categories: 'A, B, C, D, E',
    },
    pieceIdentite: {
      type: 'cni',
      numero: 'CI456789123',
      dateExpiration: '2031-03-20',
    },
  },
  {
    id: 'CHF005',
    nom: 'Bamba',
    prenom: 'Fatou',
    email: 'fatou.bamba@email.com',
    telephone: '+225 07 56 78 90 12',
    statut: 'suspendu',
    vehiculeId: null,
    dateInscription: '2023-04-25',
    courses: 234,
    revenus: 890000,
    permis: {
      numero: 'PERM-2023-005',
      dateExpiration: '2025-04-25',
      categories: 'A, B',
    },
    pieceIdentite: {
      type: 'cni',
      numero: 'CI789123456',
      dateExpiration: '2028-08-10',
    },
  },
];

export const vehicules: Vehicule[] = [
  {
    id: 'VEH001',
    marque: 'Mercedes',
    modele: 'Classe E',
    immatriculation: 'CI-ABC-1234',
    annee: 2022,
    etat: 'operationnel',
    chauffeurId: 'CHF001',
    kilometrage: 45000,
    dernierEntretien: '2024-01-05',
  },
  {
    id: 'VEH002',
    marque: 'BMW',
    modele: 'Série 5',
    immatriculation: 'CI-DEF-5678',
    annee: 2023,
    etat: 'operationnel',
    chauffeurId: 'CHF002',
    kilometrage: 28000,
    dernierEntretien: '2024-01-10',
  },
  {
    id: 'VEH003',
    marque: 'Audi',
    modele: 'A6',
    immatriculation: 'CI-GHI-9012',
    annee: 2021,
    etat: 'maintenance',
    chauffeurId: 'CHF004',
    kilometrage: 67000,
    dernierEntretien: '2023-12-20',
  },
  {
    id: 'VEH004',
    marque: 'Tesla',
    modele: 'Model S',
    immatriculation: 'CI-JKL-3456',
    annee: 2023,
    etat: 'operationnel',
    chauffeurId: null,
    kilometrage: 15000,
    dernierEntretien: '2024-01-08',
  },
  {
    id: 'VEH005',
    marque: 'Mercedes',
    modele: 'Classe S',
    immatriculation: 'CI-MNO-7890',
    annee: 2022,
    etat: 'immobilise',
    chauffeurId: null,
    kilometrage: 52000,
    dernierEntretien: '2023-11-15',
  },
];

export const versements: Versement[] = [
  {
    id: 'VRS001',
    chauffeurId: 'CHF001',
    chauffeurNom: 'Yao Koffi',
    montant: 125000,
    date: '2024-01-12',
    periode: 'Semaine 2',
    statut: 'valide',
    methode: 'Virement',
  },
  {
    id: 'VRS002',
    chauffeurId: 'CHF002',
    chauffeurNom: 'Boubacar Diarrassouba',
    montant: 98000,
    date: '2024-01-12',
    periode: 'Semaine 2',
    statut: 'recu',
    methode: 'Espèces',
  },
  {
    id: 'VRS003',
    chauffeurId: 'CHF004',
    chauffeurNom: 'Souleymane Coulibaly',
    montant: 110000,
    date: '2024-01-11',
    periode: 'Semaine 2',
    statut: 'en_attente',
    methode: 'Virement',
  },
  {
    id: 'VRS004',
    chauffeurId: 'CHF001',
    chauffeurNom: 'Yao Koffi',
    montant: 135000,
    date: '2024-01-05',
    periode: 'Semaine 1',
    statut: 'valide',
    methode: 'Virement',
  },
  {
    id: 'VRS005',
    chauffeurId: 'CHF002',
    chauffeurNom: 'Boubacar Diarrassouba',
    montant: 89000,
    date: '2024-01-05',
    periode: 'Semaine 1',
    statut: 'valide',
    methode: 'Virement',
  },
  {
    id: 'VRS006',
    chauffeurId: 'CHF003',
    chauffeurNom: 'Aminata Koné',
    montant: 45000,
    date: '2024-01-04',
    periode: 'Semaine 1',
    statut: 'refuse',
    methode: 'Chèque',
  },
];

export const rapportsVehicules: RapportVehicule[] = [
  {
    id: 'RAP001',
    vehiculeId: 'VEH001',
    vehiculeInfo: 'Mercedes Classe E - CI-ABC-1234',
    chauffeurId: 'CHF001',
    chauffeurNom: 'Yao Koffi',
    date: '2024-01-12',
    freins: 'bon',
    pneus: 'bon',
    moteur: 'bon',
    carrosserie: 'bon',
    niveauCarburant: 85,
    commentaire: 'Véhicule en parfait état.',
    statut: 'valide',
  },
  {
    id: 'RAP002',
    vehiculeId: 'VEH002',
    vehiculeInfo: 'BMW Série 5 - CI-DEF-5678',
    chauffeurId: 'CHF002',
    chauffeurNom: 'Boubacar Diarrassouba',
    date: '2024-01-12',
    freins: 'moyen',
    pneus: 'bon',
    moteur: 'bon',
    carrosserie: 'moyen',
    niveauCarburant: 60,
    commentaire: 'Petite rayure sur le pare-chocs arrière.',
    statut: 'en_attente',
  },
  {
    id: 'RAP003',
    vehiculeId: 'VEH003',
    vehiculeInfo: 'Audi A6 - CI-GHI-9012',
    chauffeurId: 'CHF004',
    chauffeurNom: 'Souleymane Coulibaly',
    date: '2024-01-11',
    freins: 'mauvais',
    pneus: 'moyen',
    moteur: 'bon',
    carrosserie: 'bon',
    niveauCarburant: 45,
    commentaire: 'Freins à remplacer de toute urgence.',
    statut: 'maintenance',
  },
  {
    id: 'RAP004',
    vehiculeId: 'VEH005',
    vehiculeInfo: 'Mercedes Classe S - CI-MNO-7890',
    chauffeurId: 'CHF001',
    chauffeurNom: 'Yao Koffi',
    date: '2024-01-10',
    freins: 'mauvais',
    pneus: 'mauvais',
    moteur: 'moyen',
    carrosserie: 'moyen',
    niveauCarburant: 20,
    commentaire: 'Véhicule nécessitant une révision complète.',
    statut: 'immobilise',
  },
];

export const statistiques = {
  revenus: {
    jour: 345000,
    semaine: 1876000,
    mois: 7245000,
  },
  chauffeursPerformants: [
    { nom: 'Yao Koffi', courses: 42, revenus: 328000 },
    { nom: 'Boubacar Diarrassouba', courses: 38, revenus: 289000 },
    { nom: 'Souleymane Coulibaly', courses: 35, revenus: 265000 },
  ],
  vehiculesPerformants: [
    { vehicule: 'Mercedes Classe E', courses: 42, kilometrage: 1250 },
    { vehicule: 'BMW Série 5', courses: 38, kilometrage: 1120 },
    { vehicule: 'Tesla Model S', courses: 28, kilometrage: 890 },
  ],
};
