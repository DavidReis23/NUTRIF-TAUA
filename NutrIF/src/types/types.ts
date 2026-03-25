
export type MealType = 'Lanche da Manhã' | 'Almoço' | 'Lanche da Tarde' | 'Jantar';
export type MealStatus = 'confirmed' | 'declined' | 'restricted' | 'pending';

export interface Meal {
  id: string;
  type: MealType;
  day: string; 
  fullDate: string;
  menu: string;
  description?: string;
  time: string;
  status: MealStatus;
  consumed: boolean;
}

export interface Alert {
  id: string;
  mealType: MealType;
  date: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  reason?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  type?: 'alert' | 'general';
}

export interface User {
  id: string;
  name: string;
  enrollment: string;
  course: string;
  photoUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
