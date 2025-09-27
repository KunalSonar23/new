import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageCircle, Car, MapPin, Star, Users } from "lucide-react";
import autoBuddyAvatar from "@/assets/autobuddy-avatar.png";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickActions = [
  { icon: Car, label: "Find Dealers", action: "find-dealers" },
  { icon: Star, label: "Read Reviews", action: "read-reviews" },
  { icon: MapPin, label: "By Location", action: "by-location" },
  { icon: Users, label: "Sign Up", action: "sign-up" },
];

const AutoBuddyChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm AutoBuddy 😄. I can help you find your favorite car dealers or show you the latest reviews. What would you like to do today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AutoBuddy response
    setTimeout(() => {
      const response = getAutoBuddyResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getAutoBuddyResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes("dealer") || text.includes("find")) {
      return "Great! I can help you find dealers in your area. You can search by state or city. Try saying something like 'Find dealers in California' or 'Show me dealers near Chicago'. 🚗";
    }
    
    if (text.includes("review")) {
      return "Looking to read or write reviews? Reviews help other car buyers make informed decisions! I can guide you through reading existing reviews or help you write your own experience with a dealer. What would you prefer? ⭐";
    }
    
    if (text.includes("sign up") || text.includes("register") || text.includes("account")) {
      return "I'd be happy to help you create an account! With an account, you can write reviews, save favorite dealers, and get personalized recommendations. Would you like me to guide you through the sign-up process? 📝";
    }
    
    if (text.includes("location") || text.includes("state") || text.includes("city")) {
      return "I can help you find dealers by location! Just tell me which state or city you're interested in, and I'll show you all the available dealers in that area with their ratings and contact information. 🗺️";
    }
    
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello there! 👋 I'm so glad you're here! I'm AutoBuddy, your friendly car dealership assistant. I'm here to help you navigate our platform, find great dealers, read reviews, and much more. What can I help you with today?";
    }
    
    return "That's a great question! I'm here to help you with finding dealers, reading and writing reviews, creating accounts, and navigating our platform. Could you tell me more about what you're looking for? I want to make sure I give you the most helpful information! 🤝";
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      "find-dealers": "I want to find car dealers",
      "read-reviews": "Show me dealer reviews",
      "by-location": "Find dealers by location",
      "sign-up": "Help me sign up for an account"
    };
    
    handleSendMessage(actionMessages[action as keyof typeof actionMessages]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-bg">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 shadow-sm">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AutoBuddy</h1>
            <p className="text-sm text-muted-foreground">Your Car Dealership Assistant</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              {!message.isUser && (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-primary flex-shrink-0">
                  <img 
                    src={autoBuddyAvatar} 
                    alt="AutoBuddy" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div
                className={`max-w-md p-4 rounded-2xl ${
                  message.isUser
                    ? "bg-chat-bubble-user text-chat-bubble-user-foreground ml-4"
                    : "bg-chat-bubble text-chat-bubble-foreground mr-4"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              {message.isUser && (
                <div className="w-10 h-10 rounded-full bg-chat-bubble-user flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-chat-bubble-user-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-primary flex-shrink-0">
                <img 
                  src={autoBuddyAvatar} 
                  alt="AutoBuddy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-chat-bubble text-chat-bubble-foreground p-4 rounded-2xl mr-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                className="flex items-center gap-2 h-auto p-3"
                onClick={() => handleQuickAction(action.action)}
              >
                <action.icon className="w-4 h-4" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask AutoBuddy anything about dealers and reviews..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(inputValue);
                }
              }}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-accent hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoBuddyChat;