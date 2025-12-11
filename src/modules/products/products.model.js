import { db } from "../../utils/firebase.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

const getAll = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.log("Model error - getAll:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const docSnap = await getDoc(productRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.log("Model error - getById:", error);
    throw error;
  }
};

const create = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.log("Model error - create:", error);
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const docSnap = await getDoc(productRef);

    if (!docSnap.exists()) {
      return false;
    }

    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.log("Model error - deleteById:", error);
    throw error;
  }
};

const update = async (id, updateData) => {
  try {
    const productRef = doc(productsCollection, id);
    const docSnap = await getDoc(productRef);

    if (!docSnap.exists()) {
      return null;
    }

    await updateDoc(productRef, updateData);
    return { id, ...docSnap.data(), ...updateData };
  } catch (error) {
    console.log("Model error - update:", error);
    throw error;
  }
};

export const productsModel = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
