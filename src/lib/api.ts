const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://debsoc-backend.vercel.app/api";

// Types
export type Role = "TechHead" | "President" | "cabinet" | "Member";

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
  assignedTo?: User;
  assignedToMember?: User;
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
  status: "Present" | "Absent";
  speakerScore?: number;
  session?: Session;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  score: number;
  sessions: number;
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
}

// Helper function to get auth token
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Helper function to make API calls
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: { message?: string; error?: string;[key: string]: unknown };
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "An error occurred" };
    }

    // Include detailed error information if available
    const errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
    const fullError = new Error(errorMessage) as Error & { details?: typeof errorData };

    // Attach additional error details for debugging
    if (errorData.error) {
      fullError.details = errorData;
    }

    throw fullError;
  }

  return response.json();
};

export interface VerifiedUsers {
  verifiedPresidents: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
  verifiedCabinet: Array<{
    id: string;
    name: string;
    email: string;
    position: string;
    createdAt: string;
  }>;
  verifiedMembers: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
}

// ... existing code ...

// TechHead API
export const techHeadApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
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
  unverifyPresident: async (
    presidentId: string
  ): Promise<{
    message: string;
    president: { id: string; name: string; isVerified: boolean };
  }> => {
    return apiCall(`/techhead/unverify/president`, {
      method: "POST",
      body: JSON.stringify({ presidentId }),
    });
  },
  unverifyCabinet: async (
    cabinetId: string
  ): Promise<{
    message: string;
    cabinet: { id: string; name: string; isVerified: boolean };
  }> => {
    return apiCall(`/techhead/unverify/cabinet`, {
      method: "POST",
      body: JSON.stringify({ cabinetId }),
    });
  },
  unverifyMember: async (
    memberId: string
  ): Promise<{
    message: string;
    member: { id: string; name: string; isVerified: boolean };
  }> => {
    return apiCall(`/techhead/unverify/member`, {
      method: "POST",
      body: JSON.stringify({ memberId }),
    });
  },
  getUnverifiedUsers: async (): Promise<UnverifiedUsers> => {
    return apiCall<UnverifiedUsers>("/techhead/unverified-users");
  },
  getVerifiedUsers: async (): Promise<VerifiedUsers> => {
    return apiCall<VerifiedUsers>("/techhead/verified-users");
  },
  deletePresident: async (id: string): Promise<{ message: string }> => {
    return apiCall("/techhead/delete/president", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  },
  deleteCabinet: async (id: string): Promise<{ message: string }> => {
    return apiCall("/techhead/delete/cabinet", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  },
  deleteMember: async (id: string): Promise<{ message: string }> => {
    return apiCall("/techhead/delete/member", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
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
      body: JSON.stringify({ feedback, memberId }),
    });
  },
  getSessions: async (): Promise<{ sessions: Session[] }> => {
    return apiCall<{ sessions: Session[] }>("/president/sessions");
  },
  getDashboard: async (): Promise<{ members: User[]; cabinet: User[] }> => {
    return apiCall<{ members: User[]; cabinet: User[] }>(
      "/president/dashboard"
    );
  },
  getMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>("/president/messages");
  },
  getSentFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>(
      "/president/feedback/sent"
    );
  },
};

// Cabinet API
export const cabinetApi = {
  register: async (
    name: string,
    email: string,
    password: string,
    position: string
  ): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/cabinet/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, position }),
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/cabinet/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  createSession: async (data: {
    sessionDate: string;
    motiontype: string;
    Chair: string;
  }): Promise<{ message: string; session: Session }> => {
    return apiCall("/cabinet/session/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  markAttendance: async (data: {
    sessionId: string;
    attendanceData: Array<{
      memberId?: string;
      cabinetId?: string;
      status: "Present" | "Absent";
      speakerScore?: number;
    }>;
  }): Promise<{ message: string; count: number }> => {
    return apiCall("/cabinet/attendance/mark", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getTasks: async (): Promise<{ tasks: Task[] }> => {
    return apiCall<{ tasks: Task[] }>("/cabinet/tasks");
  },
  giveFeedback: async (
    feedback: string,
    memberId: string
  ): Promise<{ message: string; feedback: AnonymousFeedback }> => {
    return apiCall("/cabinet/feedback/give", {
      method: "POST",
      body: JSON.stringify({ feedback, memberId }),
    });
  },
  getSessions: async (): Promise<{ sessions: Session[] }> => {
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
    return apiCall<{ messages: AnonymousMessage[] }>(
      "/cabinet/messages/sent"
    );
  },
  getSentFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>(
      "/cabinet/feedback/sent"
    );
  },
  getMyAttendance: async (): Promise<{ attendance: Attendance[] }> => {
    return apiCall<{ attendance: Attendance[] }>("/cabinet/attendance/my");
  },
};

// Member API
export const memberApi = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/member/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiCall<AuthResponse>("/member/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  getAttendance: async (): Promise<{ attendance: Attendance[] }> => {
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
      body: JSON.stringify({ message, presidentId }),
    });
  },
  getFeedback: async (): Promise<{ feedbacks: AnonymousFeedback[] }> => {
    return apiCall<{ feedbacks: AnonymousFeedback[] }>("/member/feedback");
  },
  getSentMessages: async (): Promise<{ messages: AnonymousMessage[] }> => {
    return apiCall<{ messages: AnonymousMessage[] }>("/member/messages/sent");
  },
  getPresidents: async (): Promise<{ presidents: User[] }> => {
    return apiCall<{ presidents: User[] }>("/member/presidents");
  },
};

export const leaderboardApi = {
  getLeaderboard: async (
    type: "all-time" | "bi-monthly" = "all-time"
  ): Promise<{ leaderboard: LeaderboardEntry[] }> => {
    return apiCall<{ leaderboard: LeaderboardEntry[] }>(
      `/leaderboard?type=${type}`
    );
  },
};
