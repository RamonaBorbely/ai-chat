import { db } from '../../firebaseConfig'
import { 
    collection,
    addDoc, 
    updateDoc, 
    doc, 
    getDoc, 
    getDocs, 
    deleteDoc,
    query, 
    where, 
    orderBy, 
    serverTimestamp,
    arrayUnion,
    limit
} from 'firebase/firestore'

export const createChat = async (userId, character) => {
    try {
        const chatRef = await addDoc(collection(db, 'chats'), {
            userId,
            characterId: character.id,
            characterName: character.name,
            messages: [],
            createdAt: serverTimestamp(),
            lastMessageAt: serverTimestamp()
        })
        return chatRef.id
    } catch (error) {
        throw error
    }
}

export const addMessage = async (chatId, message, sender) => {
    try {
        const chatRef = doc(db, 'chats', chatId);
        
        const messageData = {
            text: message,
            sender: sender,
            timestamp: new Date().toISOString() 
        };

        await updateDoc(chatRef, {
            messages: arrayUnion(messageData),
            lastMessageAt: serverTimestamp() 
        });
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
}

export const getRecentChats = async (userId) => {
    try {
        const q = query(
            collection(db, 'chats'),
            where('userId', '==', userId),
            orderBy('lastMessageAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const chats = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            messages: doc.data().messages || [] 
        }));
        return chats;
    } catch (error) {
        console.error('Error getting recent chats:', error);
        throw error;
    }
};

export const getChat = async (chatId) => {
    try {
        const chatDoc = await getDoc(doc(db, 'chats', chatId));
        if (chatDoc.exists()) {
            return {
                id: chatDoc.id,
                ...chatDoc.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting chat:', error);
        throw error;
    }
};

export const getChatWithCharacter = async (userId, characterId) => {
    try {
        const q = query(
            collection(db, 'chats'),
            where('userId', '==', userId),
            where('characterId', '==', characterId),
            orderBy('lastMessageAt', 'desc'),
            limit(1)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting chat with character:', error);
        throw error;
    }
};

export const deleteChat = async (chatId) => {
    try {
        const chatRef = doc(db, 'chats', chatId);
        await deleteDoc(chatRef);
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
};