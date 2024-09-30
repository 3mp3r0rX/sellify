'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Hook to navigate
import { useSearchParams } from 'next/navigation'; // Hook to get query parameters

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const ws = useRef<WebSocket | null>(null);
  const searchParams = useSearchParams(); // Extract search params
  const roomId = searchParams.get('roomId'); // Get roomId from query params
  const userId = searchParams.get('userId');
 
  // Get the dynamic postId from the route
  const router = useRouter();
  
  // postId should be passed as a prop if this is a dynamic route
  const postId = roomId; // Use roomId from query params

  useEffect(() => {
    // if (!postId) {
    //   console.warn('No postId found in the query parameters.');
    //   return;
    // }

    if (roomId == userId) {
      console.log("You cannot start a chat with yourself");

      alert("You cannot start a chat with yourself");
      return;
    }

    if(!roomId || !userId) {
      console.log('No roomId or userId found in the query parameters')
    }

    // Establish WebSocket connection
    ws.current = new WebSocket(`ws://localhost:8000/ws/${roomId}-${userId}`);

    ws.current.onopen = () => {
      console.log('WebSocket connection established for room:', roomId, 'and user:', userId);
    };

    ws.current.onmessage = (event) => {
      const newMessage = event.data;
      console.log('Received message:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.current.onerror = (error) => {
    console.log('Error type:', error.BUBBLING_PHASE); 
};


    return () => {
      ws.current?.close();
    };
  }, [postId]);


  
  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && ws.current) {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(input);
        setInput('');
      } else {
        console.warn('WebSocket is not open. ReadyState:', ws.current.readyState);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Chat Room for Room ID: {roomId} - User ID: {userId}</h1>
      <div className="h-64 overflow-y-scroll border border-gray-300 rounded-lg p-4 mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="p-2 mb-2 bg-gray-200 rounded-md">
              {msg}
            </div>
          ))
        )}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </form>
    </div>
  </div>
  );
};

export default ChatPage;
