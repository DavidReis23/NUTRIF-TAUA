
import { Meal, Notification, User, FAQ, Alert } from '../types/types';

export const CURRENT_USER: User = {
  id: '123',
  name: 'Marília Silva',
  enrollment: '2023123456',
  course: 'Bacharelado em Sistemas de Informação',
  photoUrl: 'https://picsum.photos/seed/marilia/200/200'
};

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', mealType: 'Almoço', date: '20/10/2023', status: 'pending' },
  { id: 'a2', mealType: 'Lanche da Manhã', date: '15/10/2023', status: 'accepted', reason: 'Médico' },
];

export const MOCK_MEALS: Meal[] = [
  { id: '1', type: 'Lanche da Manhã', day: 'Seg', fullDate: '2023-10-23', menu: 'Fruta e Iogurte', time: '09:25 - 10:00', status: 'confirmed', consumed: true },
  { id: '2', type: 'Almoço', day: 'Seg', fullDate: '2023-10-23', menu: 'Feijoada, arroz e couve', time: '11:45 - 13:00', status: 'confirmed', consumed: true },
  { id: '3', type: 'Lanche da Tarde', day: 'Seg', fullDate: '2023-10-23', menu: 'Bolo e vitamina de abacate', time: '15:30 - 16:00', status: 'confirmed', consumed: false },
  { id: '4', type: 'Lanche da Manhã', day: 'Ter', fullDate: '2023-10-24', menu: 'Cuscuz com ovo', time: '09:25 - 10:00', status: 'pending', consumed: false },
  { id: '5', type: 'Almoço', day: 'Ter', fullDate: '2023-10-24', menu: 'Frango assado e salada', time: '11:45 - 13:00', status: 'pending', consumed: false },
  { id: '6', type: 'Lanche da Manhã', day: 'Qua', fullDate: '2023-10-25', menu: 'Fruta e Iogurte', time: '09:25 - 10:00', status: 'confirmed', consumed: false },
  { id: '7', type: 'Almoço', day: 'Qua', fullDate: '2023-10-25', menu: 'Macarronada', time: '11:45 - 13:00', status: 'restricted', consumed: false },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n0', title: 'Novo Alerta de Falta', message: 'Você não compareceu ao Almoço no dia 20/10. Clique aqui para enviar uma justificativa.', priority: 'high', date: 'Hoje', type: 'alert' },
  { id: 'n1', title: 'Cardápio Lançado', message: 'O cardápio da próxima semana já está disponível para confirmação.', priority: 'medium', date: 'Hoje' },
  { id: 'n2', title: 'Aviso Importante', message: 'Não haverá aula no dia 30/10 devido ao feriado.', priority: 'medium', date: 'Ontem' },
];

export const MOCK_FAQS: FAQ[] = [
  { id: 'f1', question: 'Como confirmo minha refeição?', answer: 'Vá na aba Cardápio Semanal e selecione Confirmar ou Recusar para cada refeição da próxima semana.' },
  { id: 'f2', question: 'Qual o prazo de confirmação?', answer: 'As refeições da próxima semana devem ser confirmadas até sexta-feira da semana atual.' },
  { id: 'f3', question: 'Posso cancelar uma refeição confirmada?', answer: 'Sim, desde que esteja dentro do prazo de confirmação da semana.' },
];
