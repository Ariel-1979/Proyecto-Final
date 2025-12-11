import { db } from "../../utils/firebase.js";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const usersCollection = collection(db, "users");

const register = async (userData) => {
  const { username, password } = userData;
  try {
    const docRef = await addDoc(usersCollection, { username, password });
    return { id: docRef.id, username };
  } catch (error) {
    console.log("Model error - register:", error);
    throw error;
  }
};

const findUserByUsername = async (username) => {
  try {
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.log("Model error - findUserByUsername:", error);
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const user = await findUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  } catch (error) {
    console.log("Model error - login:", error);
    throw error;
  }
};

export const authModel = {
  register,
  findUserByUsername,
  login,
};
