// services/postService.ts

import { db } from '@/firebase/config';
import { collection, query, where, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  Author_Academic_Status: string;
  Author_Course: string;
  Author_Level: number;
  Author_Name: string;
  Author_Profile_Picture: string;
  Author_School: string;
  Author_Type_Of_Study: string;
  Author_UID: string;
  Author_Username: string;
  Number_Of_Comments: number;
  Number_Of_Likes: number;
  Number_Of_Shares: number;
  Post_Content: string;
  Post_Create_At: Timestamp;
  Post_Media: string;
  Post_Media_Type: string;
  Post_Types: string;
  // Add other post fields as necessary
}

const POSTS_PAGE_SIZE = 3;

export const fetchPosts = async (lastDoc: QueryDocumentSnapshot<DocumentData> | null = null): Promise<{ data: Post[], lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  try {
    let q = query(
      collection(db, "Posts"),
      where("Author_School", "==", "university of lagos"),
      orderBy("Number_Of_Shares", "desc"),
      limit(POSTS_PAGE_SIZE)
    );

    if (lastDoc) {
      q = query(
        collection(db, "Posts"),
        where("Author_School", "==", "university of lagos"),
        orderBy("Number_Of_Shares", "desc"),
        startAfter(lastDoc),
        limit(POSTS_PAGE_SIZE)
      );
    }

    const querySnapshot = await getDocs(q);
    const data: Post[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as Post);
    });

    const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { data, lastDoc: newLastDoc || null };
  } catch (error) {
    throw error;
  }
};