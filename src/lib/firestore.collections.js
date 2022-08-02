import { db } from './init-firebase';
import { collection } from 'firebase/firestore';

export const tasksCollectionRef = collection(db, 'tasks');
