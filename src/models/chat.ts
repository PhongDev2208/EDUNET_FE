// Chat-related type definitions

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  isVerified?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  unreadCount: number;
  isGroup?: boolean;
  memberCount?: number;
  role?: 'student' | 'teacher' | 'admin';
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video' | 'system';
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'seen' | 'failed';
  reactions?: string[];
  replyTo?: Message;
  isEdited?: boolean;
}

export interface Conversation {
  id: string;
  participants: Contact[];
  messages: Message[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  createdAt: string;
  updatedAt: string;
}
