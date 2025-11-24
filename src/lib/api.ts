<<<<<<< HEAD
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://debsoc-backend.vercel.app/api';

// Types
export type Role = 'TechHead' | 'President' | 'cabinet' | 'Member';
=======
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://debsoc-backend.vercel.app/api";

// Types
export type Role = "TechHead" | "President" | "cabinet" | "Member";
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isVerified: boolean;
  position?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  assignedToId?: string;
  assignedToMemberId?: string;
<<<<<<< HEAD
  assignedTo?: User;
  assignedToMember?: User;
=======
  assignedTo?: { name: string; position: string };
  assignedToMember?: { name: string };
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  sessionDate: string;
  motiontype: string;
  Chair: string;
  attendance?: Attendance[];
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  sessionId: string;
  memberId: string;
<<<<<<< HEAD
  status: 'Present' | 'Absent';
=======
  status: "Present" | "Absent";
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
  session?: Session;
  createdAt: string;
  updatedAt: string;
}

export interface AnonymousMessage {
  id: string;
  message: string;
  presidentId: string;
  senderType: string;
  createdAt: string;
}

export interface AnonymousFeedback {
  id: string;
  feedback: string;
  memberId: string;
  senderType: string;
  createdAt: string;
}

export interface UnverifiedUsers {
<<<<<<< HEAD
  unverifiedPresidents: Array<{ id: string; name: string; email: string; createdAt: string }>;
  unverifiedCabinet: Array<{ id: string; name: string; email: string; position: string; createdAt: string }>;
  unverifiedMembers: Array<{ id: string; name: string; email: string; createdAt: string }>;
=======
  unverifiedPresidents: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
  unverifiedCabinet: Array<{
    id: string;
    name: string;
    email: string;
    position: string;
    createdAt: string;
  }>;
  unverifiedMembers: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
}

// Helper function to get auth token
const getToken = (): string | null => {
<<<<<<< HEAD
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
=======
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
};

// Helper function to make API calls
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const headers: HeadersInit = {
<<<<<<< HEAD
    'Content-Type': 'application/json',
=======
    "Content-Type": "application/json",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
<<<<<<< HEAD
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
=======
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// TechHead API
export const techHeadApi = {
<<<<<<< HEAD
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/techhead/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  verifyPresident: async (presidentId: string): Promise<{ message: string; president: { id: string; name: string; isVerified: boolean } }> => {
    return apiCall(`/techhead/verify/president`, {
      method: 'POST',
      body: JSON.stringify({ presidentId }),
    });
  },
  verifyCabinet: async (cabinetId: string): Promise<{ message: string; cabinet: { id: string; name: string; isVerified: boolean } }> => {
    return apiCall(`/techhead/verify/cabinet`, {
      method: 'POST',
      body: JSON.stringify({ cabinetId }),
    });
  },
  verifyMember: async (memberId: string): Promise<{ message: string; member: { id: string; name: string; isVerified: boolean } }> => {
    return apiCall(`/techhead/verify/member`, {
      method: 'POST',
      body: JSON.stringify({ memberId }),
    });
  },
  getUnverifiedUsers: async (): Promise<UnverifiedUsers> => {
    return apiCall<UnverifiedUsers>('/techhead/unverified-users');
  },
};

// President API
export const presidentApi = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/president/register', {
      method: 'POST',
=======
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/techhead/register", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ name, email, password }),
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
<<<<<<< HEAD
    return apiCall<AuthResponse>('/president/login', {
      method: 'POST',
=======
    return apiCall<AuthResponse>("/techhead/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  verifyPresident: async (
    presidentId: string
  ): Promise<{
    message: string;
    president: { id: string; name: string; isVerified: boolean };
  }> => {
    return apiCall(`/techhead/verify/president`, {
      method: "POST",
      body: JSON.stringify({ presidentId }),
    });
  },
  verifyCabinet: async (
    cabinetId: string
  ): Promise<{
    message: string;
    cabinet: { id: string; name: string; isVerified: boolean };
  }> => {
    return apiCall(`/techhead/verify/cabinet`, {
      method: "POST",
      body: JSON.stringify({ cabinetId }),
    });
  },
  verifyMember: async (
    memberId: string
  ): Promise<{
    message: string;
    member: { id: string; name: string; isVerified: boolean };
  }> => {
    return apiCall(`/techhead/verify/member`, {
      method: "POST",
      body: JSON.stringify({ memberId }),
    });
  },
  getUnverifiedUsers: async (): Promise<UnverifiedUsers> => {
    return apiCall<UnverifiedUsers>("/techhead/unverified-users");
  },
};


// President API
export const presidentApi = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/president/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/president/login", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ email, password }),
    });
  },
  assignTask: async (task: {
    name: string;
    description: string;
    deadline: string;
    assignedToId?: string;
    assignedToMemberId?: string;
  }): Promise<{ message: string; task: Task }> => {
<<<<<<< HEAD
    return apiCall('/president/tasks/assign', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },
  giveFeedback: async (feedback: string, memberId: string): Promise<{ message: string; feedback: AnonymousFeedback }> => {
    return apiCall('/president/feedback/give', {
      method: 'POST',
=======
    return apiCall("/president/tasks/assign", {
      method: "POST",
      body: JSON.stringify(task),
    });
  },
  getTasks: async (): Promise<{ tasks: Task[] }> => {
    return apiCall<{ tasks: Task[] }>("/president/tasks");
  },
  giveFeedback: async (
    feedback: string,
    memberId: string
  ): Promise<{ message: string; feedback: AnonymousFeedback }> => {
    return apiCall("/president/feedback/give", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ feedback, memberId }),
    });
  },
  getSessions: async (): Promise<{ sessions: Session[] }> => {
<<<<<<< HEAD
    return apiCall<{ sessions: Session[] }>('/president/sessions');
  },
  getDashboard: async (): Promise<{ members: User[]; cabinet: User[] }> => {
    return apiCall<{ members: User[]; cabinet: User[] }>('/president/dashboard');
  },
  getMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>('/president/messages');
  },
  getSentFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>('/president/feedback/sent');
  },
  getTasks: async (): Promise<{ tasks: Task[] }> => {
    return apiCall<{ tasks: Task[] }>('/president/tasks');
=======
    return apiCall<{ sessions: Session[] }>("/president/sessions");
  },
  getDashboard: async (): Promise<{ members: User[]; cabinet: User[] }> => {
    return apiCall<{ members: User[]; cabinet: User[] }>("/president/dashboard");
  },
  getMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>("/president/messages");
  },
  getSentFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>("/president/feedback/sent");
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
  },
};

// Cabinet API
export const cabinetApi = {
<<<<<<< HEAD
  register: async (name: string, email: string, password: string, position: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/cabinet/register', {
      method: 'POST',
=======
  register: async (
    name: string,
    email: string,
    password: string,
    position: string
  ): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/cabinet/register", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ name, email, password, position }),
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
<<<<<<< HEAD
    return apiCall<AuthResponse>('/cabinet/login', {
      method: 'POST',
=======
    return apiCall<AuthResponse>("/cabinet/login", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ email, password }),
    });
  },
  markAttendance: async (data: {
    sessionDate: string;
    motiontype: string;
    Chair: string;
<<<<<<< HEAD
    attendanceData: Array<{ memberId: string; status: 'Present' | 'Absent' }>;
  }): Promise<{ message: string; session: Session }> => {
    return apiCall('/cabinet/attendance/mark', {
      method: 'POST',
=======
    attendanceData: Array<{ memberId: string; status: "Present" | "Absent" }>;
  }): Promise<{ message: string; session: Session }> => {
    return apiCall("/cabinet/attendance/mark", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify(data),
    });
  },
  getTasks: async (): Promise<{ tasks: Task[] }> => {
<<<<<<< HEAD
    return apiCall<{ tasks: Task[] }>('/cabinet/tasks');
  },
  giveFeedback: async (feedback: string, memberId: string): Promise<{ message: string; feedback: AnonymousFeedback }> => {
    return apiCall('/cabinet/feedback/give', {
      method: 'POST',
=======
    return apiCall<{ tasks: Task[] }>("/cabinet/tasks");
  },
  giveFeedback: async (
    feedback: string,
    memberId: string
  ): Promise<{ message: string; feedback: AnonymousFeedback }> => {
    return apiCall("/cabinet/feedback/give", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ feedback, memberId }),
    });
  },
  getSessions: async (): Promise<{ sessions: Session[] }> => {
<<<<<<< HEAD
    return apiCall<{ sessions: Session[] }>('/cabinet/sessions');
  },
  sendMessageToPresident: async (message: string, presidentId: string): Promise<{ message: string; data: AnonymousMessage }> => {
    return apiCall('/cabinet/messages/president', {
      method: 'POST',
      body: JSON.stringify({ message, presidentId }),
    });
  },
  getDashboard: async (): Promise<{ members: User[]; cabinet: User[]; presidents: User[] }> => {
    return apiCall<{ members: User[]; cabinet: User[]; presidents: User[] }>('/cabinet/dashboard');
  },
  getSentMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>('/cabinet/messages/sent');
  },
  getSentFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>('/cabinet/feedback/sent');
=======
    return apiCall<{ sessions: Session[] }>("/cabinet/sessions");
  },
  sendMessageToPresident: async (
    message: string,
    presidentId: string
  ): Promise<{ message: string; data: AnonymousMessage }> => {
    return apiCall("/cabinet/messages/president", {
      method: "POST",
      body: JSON.stringify({ message, presidentId }),
    });
  },
  getDashboard: async (): Promise<{
    members: User[];
    cabinet: User[];
    presidents: User[];
  }> => {
    return apiCall<{ members: User[]; cabinet: User[]; presidents: User[] }>(
      "/cabinet/dashboard"
    );
  },
  getSentMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>("/cabinet/messages/sent");
  },
  getSentFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>("/cabinet/feedback/sent");
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
  },
};

// Member API
export const memberApi = {
<<<<<<< HEAD
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/member/register', {
      method: 'POST',
=======
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/member/register", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ name, email, password }),
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
<<<<<<< HEAD
    return apiCall<AuthResponse>('/member/login', {
      method: 'POST',
=======
    return apiCall<AuthResponse>("/member/login", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ email, password }),
    });
  },
  getAttendance: async (): Promise<{ attendance: Attendance[] }> => {
<<<<<<< HEAD
    return apiCall<{ attendance: Attendance[] }>('/member/attendance');
  },
  getTasks: async (): Promise<{ tasks: Task[] }> => {
    return apiCall<{ tasks: Task[] }>('/member/tasks');
  },
  sendMessageToPresident: async (message: string, presidentId: string): Promise<{ message: string; data: AnonymousMessage }> => {
    return apiCall('/member/messages/president', {
      method: 'POST',
=======
    return apiCall<{ attendance: Attendance[] }>("/member/attendance");
  },
  getTasks: async (): Promise<{ tasks: Task[] }> => {
    return apiCall<{ tasks: Task[] }>("/member/tasks");
  },
  sendMessageToPresident: async (
    message: string,
    presidentId: string
  ): Promise<{ message: string; data: AnonymousMessage }> => {
    return apiCall("/member/messages/president", {
      method: "POST",
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
      body: JSON.stringify({ message, presidentId }),
    });
  },
  getFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
<<<<<<< HEAD
    return apiCall<{ feedbacks: AnonymousFeedback[] }>('/member/feedback');
  },
  getSentMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>('/member/messages/sent');
  },
  getPresidents: async (): Promise<{ presidents: User[] }> => {
    return apiCall<{ presidents: User[] }>('/member/presidents');
  },
};

=======
    return apiCall<{ feedbacks: AnonymousFeedback[] }>("/member/feedback");
  },
  getSentMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>("/member/messages/sent");
  },
  getPresidents: async (): Promise<{ presidents: User[] }> => {
    return apiCall<{ presidents: User[] }>("/member/presidents");
  },
};
>>>>>>> 1456dd95e32777a8bf8f6f5f04537a05533d63a3
