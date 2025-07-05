// Add mock staff data to the existing mock.ts file
export const mockStaff = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@school.com",
    role: "Teacher",
    department: "Mathematics",
    status: "active",
    joinDate: "2023-08-15",
    phoneNumber: "(555) 123-4567"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@school.com",
    role: "Administrator",
    department: "Administration",
    status: "active",
    joinDate: "2022-06-01",
    phoneNumber: "(555) 234-5678"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@school.com",
    role: "Teacher",
    department: "Science",
    status: "inactive",
    joinDate: "2021-09-01",
    phoneNumber: "(555) 345-6789"
  }
];

export const recentAnnouncements = [
  {
    id: "1",
    date: "2023-10-26T10:00:00Z",
    title: "Réunion des parents",
    priority: "high",
    content: "Rappel : La réunion des parents aura lieu demain à 18h00 dans l'auditorium.",
  },
  {
    id: "2",
    date: "2023-10-25T14:30:00Z",
    title: "Fermeture exceptionnelle",
    priority: "medium",
    content: "L'école sera fermée le vendredi 27 octobre en raison de travaux.",
  },
  {
    id: "3",
    date: "2023-10-24T09:00:00Z",
    title: "Nouvelles activités parascolaires",
    priority: "low",
    content: "Inscription ouverte pour les clubs d'échecs et de robotique.",
  },
];

export const attendanceData = [
  { day: "Lun", present: 95, absent: 3, late: 2 },
  { day: "Mar", present: 96, absent: 2, late: 2 },
  { day: "Mer", present: 94, absent: 4, late: 2 },
  { day: "Jeu", present: 97, absent: 1, late: 2 },
  { day: "Ven", present: 93, absent: 5, late: 2 },
];

export const enrollmentTrends = [
  { month: "Janv", students: 1200 },
  { month: "Fév", students: 1210 },
  { month: "Mars", students: 1215 },
  { month: "Avr", students: 1230 },
  { month: "Mai", students: 1240 },
  { month: "Juin", students: 1250 },
  { month: "Juil", students: 1245 },
  { month: "Août", students: 1260 },
  { month: "Sept", students: 1280 },
  { month: "Oct", students: 1290 },
  { month: "Nov", students: 1300 },
  { month: "Déc", students: 1310 },
];

export const gradeDistribution = [
  { grade: "A", students: 150 },
  { grade: "B", students: 250 },
  { grade: "C", students: 300 },
  { grade: "D", students: 100 },
  { grade: "E", students: 50 },
];

export const recentActivities = [
  {
    id: "1",
    timestamp: "2023-10-26T11:00:00Z",
    user: "Alice Dupont",
    action: "a soumis",
    resource: "un devoir de mathématiques.",
    details: "Chapitre 5 - Algèbre",
  },
  {
    id: "2",
    timestamp: "2023-10-26T10:30:00Z",
    user: "Bob Martin",
    action: "a mis à jour",
    resource: "son profil.",
    details: "Informations de contact",
  },
  {
    id: "3",
    timestamp: "2023-10-26T09:45:00Z",
    user: "Charlie Leclerc",
    action: "a commenté",
    resource: "un post d'annonce.",
    details: "Concernant la réunion des parents.",
  },
];

export const studentStats = {
  total: 1300,
  trend: 2.5,
};

export const staffStats = {
  total: 85,
  trend: -0.5,
};

export const attendanceStats = {
  average: 95,
  trend: 1.2,
};

export const gradeStats = {
  averageGrade: "B+",
  averagePercentage: 88,
  trend: 0.8,
};

export const todaysEvents = [
  {
    id: "1",
    title: "Réunion d'équipe du département",
    time: "10:00 AM - 11:00 AM",
    location: "Salle de conférence A",
  },
  {
    id: "2",
    title: "Cours de soutien en physique",
    time: "2:00 PM - 3:00 PM",
    location: "Laboratoire 3",
  },
  {
    id: "3",
    title: "Entraînement de football",
    time: "4:00 PM - 5:30 PM",
    location: "Terrain de sport",
  },
];

export const mockStudents = [
  {
    id: "s1",
    name: "Alice Dubois",
    email: "alice.dubois@email.com",
    grade: "10ème",
    status: "active",
    enrollmentDate: "2022-09-01",
    parentName: "Sophie Dubois",
    phoneNumber: "(555) 111-2222",
  },
  {
    id: "s2",
    name: "Benoît Lefevre",
    email: "benoit.lefevre@email.com",
    grade: "9ème",
    status: "active",
    enrollmentDate: "2023-09-01",
    parentName: "Marc Lefevre",
    phoneNumber: "(555) 333-4444",
  },
  {
    id: "s3",
    name: "Chloé Girard",
    email: "chloe.girard@email.com",
    grade: "11ème",
    status: "archived",
    enrollmentDate: "2021-09-01",
    parentName: "Isabelle Girard",
    phoneNumber: "(555) 555-6666",
  },
];

export const mockGrades = [
  {
    id: "g1",
    studentId: "s1",
    courseName: "Mathématiques",
    term: "Trimestre 1",
    date: "2023-10-15",
    score: 85,
    type: "Examen",
  },
  {
    id: "g2",
    studentId: "s1",
    courseName: "Mathématiques",
    term: "Trimestre 1",
    date: "2023-11-20",
    score: 90,
    type: "Devoir",
  },
  {
    id: "g3",
    studentId: "s2",
    courseName: "Physique-Chimie",
    term: "Trimestre 1",
    date: "2023-10-20",
    score: 78,
    type: "Quiz",
  },
    {
    id: "g4",
    studentId: "s1",
    courseName: "Mathématiques",
    term: "Trimestre 2",
    date: "2024-01-10",
    score: 88,
    type: "Examen",
  },
  {
    id: "g5",
    studentId: "s2",
    courseName: "Physique-Chimie",
    term: "Trimestre 2",
    date: "2024-02-15",
    score: 85,
    type: "Devoir",
  },
] as const;