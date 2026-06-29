import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

import { db } from "../firebase";

export async function getGoals(userId) {
  const snapshot = await getDocs(collection(db, "users", userId, "goals"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function createGoal(userId, goal) {
  const docRef = await addDoc(collection(db, "users", userId, "goals"), goal);

  return docRef.id;
}

export async function updateGoal(userId, goalId, data) {
  await updateDoc(doc(db, "users", userId, "goals", goalId), data);
}

export async function deleteGoal(userId, goalId) {
  await deleteDoc(doc(db, "users", userId, "goals", goalId));
}
