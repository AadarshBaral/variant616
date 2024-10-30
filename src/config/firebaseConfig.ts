// firebaseConfig.js
import { Post } from "@/utils/types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function fetchPosts(): Promise<Post[]> {
  const postsCollection = collection(db, "posts");
  const snapshot = await getDocs(postsCollection);

  return Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const imageRef = storageRef(storage, `${data.headerImage}`);
      const imageUrl = await getDownloadURL(imageRef);

      return {
        id: doc.id,
        title: data.title || "",
        slug: data.slug || "",
        headerImage: imageUrl,
        featured: data.featured || false,
        heroFeatured: data.heroFeatured || false,
        content: data.content || "",
        category: data.category || [],
        date: data.date || "",
        author: data.author || "",
      };
    })
  );
}
export async function fetchPostById(id: string): Promise<Post | null> {
  try {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Fetch the full download URL for the image from Firebase Storage
      const imageRef = storageRef(storage, `${data.headerImage}`);
      const imageUrl = await getDownloadURL(imageRef);

      return {
        id: docSnap.id,
        title: data.title || "",
        slug: data.slug || "",
        headerImage: imageUrl, // Use the full image URL here
        featured: data.featured || false,
        heroFeatured: data.heroFeatured || false,
        content: data.content || "",
        category: data.category || [],
        date: data.date || "",
        author: data.author || "",
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
