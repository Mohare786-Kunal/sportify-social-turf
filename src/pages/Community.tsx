
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Send, 
  Users, 
  Calendar, 
  MessageSquare, 
  Clock, 
  MapPin,
  ChevronDown,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockMessages, mockPolls, mockTurfs } from "@/data/mockData";

type Message = {
  id: number;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
};

type Poll = {
  id: number;
  userId: string;
  userName: string;
  turfId: number;
  turfName: string;
  sportType: string;
  slotDate: string;
  playersNeeded: number;
  status: string;
};

const Community = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [inputMessage, setInputMessage] = useState("");
  const [showPolls, setShowPolls] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      userId: "currentUser", // In a real app, this would be the current user's ID
      userName: "You", // In a real app, this would be the current user's name
      message: inputMessage,
      createdAt: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };
  
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
  const formatPollDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Community Chat
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chat Section */}
          <div className="lg:flex-grow glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <h2 className="font-semibold">Public Chat</h2>
              </div>
              <span className="text-xs px-2 py-1 bg-turfGreen/20 dark:bg-turfGold/20 rounded-full">
                27 Online
              </span>
            </div>
            
            {/* Messages */}
            <div className="p-4 h-[calc(70vh-10rem)] overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.userId === "currentUser" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${
                    message.userId === "currentUser" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-md px-4 py-2 rounded-lg ${
                      message.userId === "currentUser"
                        ? "glass bg-turfGreen/20 dark:bg-turfGold/20"
                        : "glass"
                    }`}
                  >
                    {message.userId !== "currentUser" && (
                      <div className="font-semibold text-sm mb-1">{message.userName}</div>
                    )}
                    <div className="text-sm">{message.message}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {formatMessageTime(message.createdAt)}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow glass"
                />
                <Button
                  type="submit"
                  className="bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Side Section */}
          <div className="lg:w-80">
            {/* Player Polls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl overflow-hidden mb-6"
            >
              <div 
                className="flex items-center justify-between p-4 border-b border-white/10 cursor-pointer"
                onClick={() => setShowPolls(!showPolls)}
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <h2 className="font-semibold">Player Polls</h2>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${showPolls ? "transform rotate-180" : ""}`}
                />
              </div>
              
              {showPolls && (
                <div className="p-4 space-y-4">
                  {polls.map((poll) => (
                    <motion.div
                      key={poll.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="glass p-3 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-sm">{poll.userName}</div>
                        <div className="text-xs px-2 py-1 bg-turfGreen/20 dark:bg-turfGold/20 rounded-full">
                          {poll.sportType}
                        </div>
                      </div>
                      <div className="text-sm mb-2">
                        <Link
                          to={`/turfs/${poll.turfId}`}
                          className="text-turfGreen dark:text-turfGold hover:underline"
                        >
                          {poll.turfName}
                        </Link>
                      </div>
                      <div className="flex items-center text-xs mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="mr-3">{formatPollDate(poll.slotDate)}</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>19:00 - 20:00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-turfGreen-light dark:text-turfYellow">
                          <Users className="h-3 w-3 mr-1" />
                          <span>Need {poll.playersNeeded} players</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="h-8 text-xs bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  
                  <Button 
                    variant="outline"
                    className="w-full mt-4 border-turfGreen dark:border-turfGold text-turfGreen dark:text-turfGold"
                  >
                    Create New Poll
                  </Button>
                </div>
              )}
            </motion.div>
            
            {/* Community Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10">
                <h2 className="font-semibold flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Community Guidelines
                </h2>
              </div>
              <div className="p-4">
                <ul className="text-sm space-y-2 list-disc pl-5">
                  <li>Be respectful to other community members</li>
                  <li>No spam or promotional content</li>
                  <li>Stay on topic (sports, turfs, games)</li>
                  <li>Share constructive feedback about turfs</li>
                  <li>Have fun and make new playing connections!</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
