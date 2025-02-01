import { auth } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useStore } from "vuex";


export const observeAuthState = () => {
  const store = useStore(); // Usamos el store aquí

  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit('setUser', { user, isAuthenticated: true });
    } else {
      store.commit('setUser', { user: null, isAuthenticated: false });
    }
  });
};


export const registerFirebase = async (credentials) => {
  const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  return userCredential.user;
}

export const loginFirebase = async (credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return userCredential.user;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error en el logout:", error);
  }
};


