import { db } from "../../utils/firebase.js";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

const productsCollection = collection(db, "products");

const getAll = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching products: " + error.message);
  }
};

const getById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const docSnap = await getDoc(productRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching product by ID: " + error.message);
  }
};

const create = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.log(error);
    throw new Error("Error creating product: " + error.message);
  }
};

export const productsModel = {
  getAll,
  getById,
  create,
};
