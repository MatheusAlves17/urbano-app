import { useCallback, useEffect, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';
import { format, isToday } from 'date-fns';
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  arrayUnion,
  setDoc,
  query,
  collection,
  getDocs,
  addDoc,
  where,
} from 'firebase/firestore';

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { firestore, storage } from '../services/firebase';
import { useAuth } from './useAuth';

export interface ChatDoc {
  responsible: string;
  messages: IMessagesBefore[];
  userToken: string;
  enfermeiraToken: string;
  enfermeiroRead: boolean;
  pacienteRead: boolean;
}

export interface IMessagesBefore {
  id: string;
  message: string;
  author: string;
  author_id: string;
  created_at: Timestamp;
  image?: string;
}

export interface IMessages {
  id: string;
  message: string;
  author: string;
  author_id: string;
  created_at: string;
  image?: string;
  self?: boolean;
}

export interface IChatsResponse {
  id: string;
  last_message: IMessages & {
    author: string;
    author_id: string;
    created_at: BackendTimestamp;
  };
  other_user: {
    id?: string;
    name?: string;
    avatar?: string;
    role?: string;
  };
}

export interface BackendTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export const useMessage = (chatId?: string) => {
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [chats, setChats] = useState<IChatsResponse[]>([]);
  const { user } = useAuth();

  const otherUser = useMemo(() => {
    const found = messages.find(message => message.author_id !== user.id);
    return found?.author;
  }, [messages, user.id]);

  const chatRef = useMemo(() => {
    return chatId ? doc(firestore, `/chats/${chatId}`) : null;
  }, [chatId]);

  const convertTime = (time: Timestamp) => {
    const date = time.toDate();
    const timeFormat = isToday(date) ? 'HH:mm' : 'dd/MM HH:mm';
    return format(date, timeFormat);
  };

  /**
   *  Get messages from backend containing user inside
   */
  // const getChats = async () => {
  //   try {
  //     const { data } = await api.get<IChatsResponse[]>('/user/chats');
  //     setChats(data);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

  const handleCreateChat = async (other_user_id: string) => {
    const sortedUsers = [user.id, other_user_id].sort();
    const chatCollection = collection(firestore, 'chats');
    const chatQuery = query(
      chatCollection,
      where('user_ids', 'in', [sortedUsers]),
    );

    const chatQuerySnapshot = await getDocs(chatQuery);
    const chatQueryDoc = chatQuerySnapshot.docs[0];

    if (chatQueryDoc) {
      return chatQueryDoc.id;
    }

    const chatDoc = await addDoc(chatCollection, {
      messages: [],
      user_ids: sortedUsers,
    });

    return chatDoc.id;
  };

  useEffect(() => {
    if (chatRef) {
      const unsubscribe = onSnapshot(chatRef, _doc => {
        const data = _doc.data() as ChatDoc;
        if (!data?.messages?.length) {
          return;
        }

        const sortedMessagesByTime = data?.messages?.sort(
          (a, b) => b.created_at.seconds - a.created_at.seconds,
        );

        const mappedMessages = sortedMessagesByTime.map(message => ({
          ...message,
          created_at: convertTime(message.created_at),
          self: message.author_id === user.id,
        }));

        setMessages(mappedMessages);
      });

      return unsubscribe;
    }
    // getChats();
  }, [chatRef, user]);

  const sendMessage = useCallback(
    (message: string) => {
      const trimmedMessage = message.trim();
      if (!trimmedMessage) {
        return;
      }

      if (chatRef) {
        setDoc(
          chatRef,
          {
            messages: arrayUnion({
              message: trimmedMessage,
              id: uuid.v4(),
              author: user.name,
              author_id: user.id,
              created_at: Timestamp.now(),
            }),
          },
          {
            merge: true,
          },
        );
      }
    },
    [chatRef, user],
  );

  const sendImage = useCallback(
    async (uri: string) => {
      const imageName = uri.split('/').pop();
      const imageRef = storageRef(storage, `chats/${chatId}/${imageName}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);
      if (chatRef) {
        updateDoc(chatRef, {
          messages: arrayUnion({
            message: '',
            image: imageUrl,
            id: uuid.v4(),
            created_at: Timestamp.now(),
            author: user.name,
            author_id: user.id,
          }),
        });
      }
    },
    [chatRef, user, chatId],
  );

  return {
    messages,
    sendMessage,
    sendImage,
    otherUser,
    handleCreateChat,
    chats,
  };
};
