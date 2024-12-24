import { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import { WeeklyStats, WeeklyInsights } from '../types';
import { format, subDays, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

export const useWeeklyStats = () => {
  const { tasks } = useTaskStore();
  const [stats, setStats] = useState<WeeklyStats>({
    days: [],
    completed: [],
    postponed: [],
  });
  const [insights, setInsights] = useState<WeeklyInsights>({
    achievement: '',
    productivity: '',
    tip: '',
    trend: '',
  });

  useEffect(() => {
    // Calculate last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return format(date, 'EEE', { locale: es });
    });

    // Calculate stats for each day
    const completed = Array.from({ length: 7 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 6 - i));
      return tasks.filter(task => 
        task.completed && 
        new Date(task.createdAt).getTime() >= date.getTime() &&
        new Date(task.createdAt).getTime() < date.getTime() + 86400000
      ).length;
    });

    const postponed = Array.from({ length: 7 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 6 - i));
      return tasks.filter(task => 
        !task.completed && 
        new Date(task.createdAt).getTime() >= date.getTime() &&
        new Date(task.createdAt).getTime() < date.getTime() + 86400000
      ).length;
    });

    setStats({ days, completed, postponed });

    // Calculate insights
    const totalCompleted = completed.reduce((a, b) => a + b, 0);
    const totalPostponed = postponed.reduce((a, b) => a + b, 0);
    
    const achievement = totalCompleted > totalPostponed
      ? '¡Más tareas completadas que pospuestas! 🏆'
      : 'Sigues intentándolo, ¡eso es lo importante! 💪';

    const productivity = `Completaste ${totalCompleted} tareas y pospusiste ${totalPostponed}. ${
      totalCompleted > totalPostponed ? '¡Vas por buen camino! 🚀' : 'Mañana será un mejor día 🌟'
    }`;

    const tips = [
      'Divide las tareas grandes en partes más pequeñas',
      'Empieza por la tarea más difícil del día',
      'Toma descansos regulares para mantener la energía',
      'Celebra cada pequeño logro',
    ];
    const tip = tips[Math.floor(Math.random() * tips.length)];

    const trend = totalCompleted > totalPostponed
      ? 'Tendencia positiva esta semana 📈'
      : 'Oportunidad de mejora para la próxima semana 🎯';

    setInsights({ achievement, productivity, tip, trend });
  }, [tasks]);

  return { stats, insights };
};