import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { db } from "../firebase";

export function useGoals() {
  const { user } = useAuth();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const goalsRef = collection(db, "users", user.uid, "goals");

    const unsubscribe = onSnapshot(goalsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGoals(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // CREATE GOAL
  async function createGoal(goal) {
    if (!user) return;

    const goalsRef = collection(db, "users", user.uid, "goals");

    await addDoc(goalsRef, {
      ...goal,
      transacoes: [],
      dataCriacao: new Date().toISOString(),
    });
  }

  // UPDATE GOAL
  async function updateGoal(goalId, updates) {
    if (!user) return;

    const goalRef = doc(db, "users", user.uid, "goals", goalId);

    await updateDoc(goalRef, updates);
  }

  // DELETE GOAL
  async function deleteGoal(goalId) {
    if (!user) return;

    const goalRef = doc(db, "users", user.uid, "goals", goalId);

    await deleteDoc(goalRef);
  }

  // ADD TRANSACTION
  async function addTransaction(goalId, transaction) {
    if (!user) return;

    const goalRef = doc(db, "users", user.uid, "goals", goalId);

    await updateDoc(goalRef, {
      transacoes: arrayUnion({
        id: crypto.randomUUID(),
        ...transaction,
      }),
    });
  }

  // DELETE TRANSACTION
  async function deleteTransaction(goalId, transaction) {
    if (!user) return;

    const goalRef = doc(db, "users", user.uid, "goals", goalId);

    await updateDoc(goalRef, {
      transacoes: arrayRemove(transaction),
    });
  }

  return {
    goals,
    loading,
    createGoal,
    updateGoal,
    deleteGoal,
    addTransaction,
    deleteTransaction,
  };
}
