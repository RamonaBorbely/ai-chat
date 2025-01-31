import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, MessageSquare, History, PlusCircle, Trash2, Settings, X } from 'lucide-react';
import { characterData } from '../../text';
import { getAIResponse } from '../../services/aiService';
import { createChat, addMessage, getRecentChats, deleteChat } from '../../services/chatService';
import TypingIndicator from '../../components/TypingIndicator';

const UserDashboard = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentChats, setRecentChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load recent chats
  useEffect(() => {
    const loadRecentChats = async () => {
      if (user) {
        try {
          const chats = await getRecentChats(user.uid);
          setRecentChats(chats);
        } catch (error) {
          console.error('Error loading recent chats:', error);
        }
      }
    };
    loadRecentChats();
  }, [user]);

  const handleStartNewChat = async () => {
    setSelectedCharacter(null);
    setMessages([]);
    setCurrentChatId(null);
    setChatInput('');
  };

  const handleSelectChat = async (chat) => {
    try {
      setCurrentChatId(chat.id);
      const character = characterData.find(c => c.id === chat.characterId);
      setSelectedCharacter(character);
      setMessages(chat.messages || []);
  } catch (error) {
      console.error('Error loading chat:', error);
  }
  };

  const handleDeleteChat = async (chatId) => {
    try {
        if (chatId === currentChatId) {
            // If deleting current chat, reset states
            setSelectedCharacter(null);
            setMessages([]);
            setCurrentChatId(null);
            setChatInput('');
        }
        await deleteChat(chatId);
        // Refresh chat list
        const updatedChats = await getRecentChats(user.uid);
        setRecentChats(updatedChats);
    } catch (error) {
        console.error('Error deleting chat:', error);
    }
};

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !selectedCharacter || isLoading) return;

    try {
        setIsLoading(true);
        
        // Create new chat if needed and get chat ID
        let activeChatId = currentChatId;
        if (!activeChatId) {
            activeChatId = await createChat(user.uid, selectedCharacter);
            setCurrentChatId(activeChatId);
        }

        // Prepare user message
        const userMessage = {
            text: chatInput,
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        // Add user message to local state
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setChatInput('');

        // Show typing indicator
        setIsAiTyping(true);

        // Get AI response
        const aiResponseText = await getAIResponse(selectedCharacter, chatInput, messages);

        // Simulate typing effect
        setCurrentAiMessage('');
        const words = aiResponseText.split('');
        
        for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 30));
            setCurrentAiMessage(prev => prev + words[i]);
        }

        // Prepare AI message
        const aiMessage = {
            text: aiResponseText,
            sender: 'ai',
            timestamp: new Date().toISOString()
        };

        // Update local messages with both user and AI messages
        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages);
        setIsAiTyping(false);
        setCurrentAiMessage('');

        // Save messages to Firestore
        await addMessage(activeChatId, userMessage.text, 'user');
        await addMessage(activeChatId, aiMessage.text, 'ai');

        // Refresh recent chats
        const updatedChats = await getRecentChats(user.uid);
        setRecentChats(updatedChats);

    } catch (error) {
        console.error('Error sending message:', error);
        setIsAiTyping(false);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-primary p-4 ">
   {/* Header */}
      <div className="bg-secondary rounded-lg p-4 mb-6 flex justify-between items-center drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
        <div className="flex items-center gap-3">
            <button onClick={() => setIsSettingsOpen(true)}>
                <Settings className="text-white hover:scale-110" size={24}/>
            </button>
            <button onClick={() => setIsProfileOpen(true)}>
                <User className="text-white hover:scale-110" size={24} />
            </button>
            <div>
                <h2 className="text-white font-bold text-xl">
                    Welcome, {user?.displayName || 'User'}
                </h2>
            </div>
        </div>
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white hover:opacity-90 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]"
        >
            <LogOut size={20} />
            Logout
        </button>
</div>

{/* Profile Modal */}
{isProfileOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-secondary p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold">Profile</h2>
                <button onClick={() => setIsProfileOpen(false)} className="text-white">
                    <X size={24} />
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-white block mb-2">Display Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        className="w-full bg-gray-700 text-white rounded p-2"
                        disabled
                    />
                </div>
                <div>
                    <label className="text-white block mb-2">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full bg-gray-700 text-white rounded p-2"
                        disabled
                    />
                </div>
            </div>
        </div>
    </div>
)}

{/* Settings Modal */}
{isSettingsOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-primary p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold">Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)} className="text-white">
                    <X size={24} />
                </button>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between text-white">
                    <span>Dark Mode</span>
                    <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between text-white">
                    <span>Notifications</span>
                    <input type="checkbox" className="toggle" />
                </div>
                <button 
                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    onClick={() => {
                        // Need to add clear funtionality later !!!!
                    }}
                >
                    Clear Chat History
                </button>
            </div>
        </div>
    </div>
)}

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-180px)] drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
        {/* Recent Chats Sidebar */}
        <div className="w-1/4 bg-secondary rounded-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <History size={20} />
              Recent Chats
            </h3>
            <button
              onClick={handleStartNewChat}
              className="bg-primary p-2 rounded-lg text-white hover:scale-110 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]"
              title="Start New Chat"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentChats.length > 0 ? (
              recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`bg-primary p-3 rounded-lg cursor-pointer hover:scale-110 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]
                    ${currentChatId === chat.id ? 'ring-2 ring-white' : ''} relative group`}
                >
                  <div 
                    className="flex items-center gap-3"
                    onClick={() => handleSelectChat(chat)}
                  >
                    <img
                      src={characterData.find(c => c.id === chat.characterId)?.image}
                      alt={chat.characterName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-white font-medium">{chat.characterName}</h4>
                      <p className="text-gray-300 text-sm truncate">
                        {chat.messages[chat.messages.length - 1]?.text.substring(0, 30)}...
                      </p>
                    </div>
                  </div>

                  <button
                      onClick={(e) => {
                      e.stopPropagation(); 
                      handleDeleteChat(chat.id);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full 
                        opacity-0 group-hover:opacity-100 transition-opacity
                        hover:bg-red-500 hover:text-white text-gray-300"
                      title="Delete chat"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-center py-8">
                No recent chats
              </p>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-secondary rounded-lg overflow-hidden">
          {/* Character Selection */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Choose a Character
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {characterData.map((character) => (
                <div
                  key={character.id}
                  onClick={() => setSelectedCharacter(character)}
                  className={`flex-shrink-0 bg-primary rounded-lg p-3 cursor-pointer transition-all drop-shadow-[3px_3px_3px_rgba(255,255,255,1)]
                    ${selectedCharacter?.id === character.id ? 'ring-4 ring-secondary' : 'hover:scale-110'}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h4 className="text-white font-medium">{character.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

         {/* Chat Messages Area */}
          <div className="flex-1 bg-gray-800 p-4 overflow-y-auto">
            {messages.length > 0 || isAiTyping ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                    <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-lg bg-gray-700 text-white">
                        {currentAiMessage || <TypingIndicator />}
                    </div>
                </div>
                )}
              </div>
            ) : selectedCharacter ? (
              <div className="text-center text-gray-300">
                Start chatting with {selectedCharacter.name}
              </div>
            ) : (
              <div className="text-center text-gray-300">
                Select a character to start chatting
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                 type="text"
                 value={chatInput}
                 onChange={(e) => setChatInput(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                 placeholder={selectedCharacter ? "Type your message..." : "Select a character first"}
                 disabled={!selectedCharacter || isLoading}
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]"
              />
               <button
                  onClick={handleSendMessage}
                  disabled={!selectedCharacter || !chatInput.trim() || isLoading}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default UserDashboard