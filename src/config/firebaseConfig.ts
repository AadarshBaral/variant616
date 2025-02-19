// // firebaseConfig.js
// import { Post } from "@/utils/types";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import {
//   DocumentData,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from "firebase/firestore";
// import { getDownloadURL, getStorage } from "firebase/storage";
// import { ref as storageRef } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// const generateUrl = async (data: DocumentData) => {
//   const imageRef = storageRef(storage, `${data.headerImage}`);
//   const imageUrl = await getDownloadURL(imageRef);
//   return imageUrl;
// };

// const returnData = async (doc: DocumentData, data: DocumentData) => {
//   const imageUrl = await generateUrl(data);
//   return {
//     id: doc.id,
//     title: data.title || "",
//     slug: data.slug || "",
//     headerImage: imageUrl,
//     featured: data.featured || false,
//     heroFeatured: data.heroFeatured || false,
//     content: data.content || "",
//     category: data.category || [],
//     date: data.date || "",
//     author: data.author || "",
//   };
// };

// export async function fetchPosts(): Promise<Post[]> {
//   const postsCollection = collection(db, "posts");
//   const snapshot = await getDocs(postsCollection);

//   return Promise.all(
//     snapshot.docs.map(async (doc) => {
//       const data = doc.data();
//       return returnData(doc, data);
//     })
//   );
// }
// export async function fetchPostById(id: string): Promise<Post | null> {
//   try {
//     const docRef = doc(db, "posts", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const data = docSnap.data();
//       return returnData(docSnap, data);
//     } else {
//       console.log("No such document!");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching document:", error);
//     return null;
//   }
// }
// // export async function fetchHeroPosts(): Promise<Post[]> {
// //   const postsCollection = collection(db, "posts");
// //   const snapshot = await getDocs(postsCollection);

// //   return Promise.all(
// //     snapshot.docs.map(async (doc) => {
// //       const data = doc.data();
// //       const filteredData = data.filter((item: any) => item.category === true);
// //       return returnData(doc, filteredData[0]);
// //     })
// //   );
// // }

// export const fetchPostsByCategory = async (category: string) => {
//   const postsCollection = collection(db, "posts");
//   if (category === "all") {
//     const snapshot = await getDocs(postsCollection);
//     return Promise.all(
//       snapshot.docs.map(async (doc) => {
//         const data = doc.data();
//         return returnData(doc, data);
//       })
//     );
//   } else {
//     const q = query(
//       postsCollection,
//       where("category", "array-contains", category)
//     );
//     const querySnapshot = await getDocs(q);

//     // Generate image URLs and return post data
//     return Promise.all(
//       querySnapshot.docs.map(async (doc) => {
//         const data = doc.data();
//         return returnData(doc, data);
//       })
//     );
//   }
// };

import { Client, Databases, Storage, Query } from "appwrite";
import { Post } from "@/utils/types";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);
const storage = new Storage(client);

const generateUrl = async (fileId: string) => {
  return storage.getFilePreview(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
    fileId
  );
};

const returnData = async (doc: any) => {
  const imageUrl = await generateUrl(doc.headerImage);
  return {
    id: doc.$id,
    title: doc.title || "",
    slug: doc.slug || "",
    headerImage: imageUrl,
    featured: doc.featured || false,
    heroFeatured: doc.heroFeatured || false,
    content: doc.content || "",
    category: doc.category || [],
    date: doc.date || "",
    author: doc.author || "",
    likes: doc.likes || 0,
  };
};

export async function fetchPosts(): Promise<Post[]> {
  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string
  );

  return Promise.all(response.documents.map(returnData));
}

export async function fetchPostById(id: string): Promise<Post | null> {
  try {
    const doc = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      id
    );
    return returnData(doc);
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [Query.equal("slug", slug)]
    );

    if (response.documents.length > 0) {
      return returnData(response.documents[0]);
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document by slug:", error);
    return null;
  }
}

export const fetchPostsByCategory = async (category: string) => {
  let queries = [];
  if (category !== "all") {
    queries.push(Query.contains("category", category));
  }

  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
    queries
  );

  return Promise.all(response.documents.map(returnData));
};
