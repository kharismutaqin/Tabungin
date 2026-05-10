import { useState, useEffect } from 'react';
import { generateId } from './utils';

export interface GoalSavings {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  description?: string;
  deadline?: string;
  icon?: string;
  createdAt: string;
  color?: string;
}

export interface Deposit {
  id: string;
  goalId: string;
  amount: number;
  note?: string;
  date: string;
}

const GOALS_KEY = 'tabungin_goals';
const DEPOSITS_KEY = 'tabungin_deposits';

export const useStore = () => {
  const [goals, setGoals] = useState<GoalSavings[]>([]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  useEffect(() => {
    const storedGoals = localStorage.getItem(GOALS_KEY);
    const storedDeposits = localStorage.getItem(DEPOSITS_KEY);
    if (storedGoals) setGoals(JSON.parse(storedGoals));
    if (storedDeposits) setDeposits(JSON.parse(storedDeposits));
  }, []);

  const saveGoals = (newGoals: GoalSavings[]) => {
    setGoals(newGoals);
    localStorage.setItem(GOALS_KEY, JSON.stringify(newGoals));
  };

  const saveDeposits = (newDeposits: Deposit[]) => {
    setDeposits(newDeposits);
    localStorage.setItem(DEPOSITS_KEY, JSON.stringify(newDeposits));
  };

  const addGoal = (goal: Omit<GoalSavings, 'id' | 'createdAt' | 'currentAmount'>) => {
    const newGoal: GoalSavings = {
      ...goal,
      id: generateId(),
      createdAt: new Date().toISOString(),
      currentAmount: 0,
    };
    saveGoals([...goals, newGoal]);
    return newGoal;
  };

  const updateGoal = (id: string, updates: Partial<GoalSavings>) => {
    const updatedGoals = goals.map((g) => (g.id === id ? { ...g, ...updates } : g));
    saveGoals(updatedGoals);
  };

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter((g) => g.id !== id));
    saveDeposits(deposits.filter((d) => d.goalId !== id));
  };

  const addDeposit = (deposit: Omit<Deposit, 'id' | 'date'>) => {
    const newDeposit: Deposit = {
      ...deposit,
      id: generateId(),
      date: new Date().toISOString(),
    };
    saveDeposits([newDeposit, ...deposits]);
    
    // Update goal currentAmount
    const goal = goals.find(g => g.id === deposit.goalId);
    if (goal) {
      updateGoal(goal.id, { currentAmount: goal.currentAmount + deposit.amount });
    }
  };

  return {
    goals,
    deposits,
    addGoal,
    updateGoal,
    deleteGoal,
    addDeposit,
  };
};
