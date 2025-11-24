// Mock data for dashboard components

export interface User {
  id: string;
  name: string;
  position: string;
  avatar: string;
  email: string;
}

export interface AttendanceRecord {
  id: string;
  type: "session" | "spar" | "meeting";
  date: string;
  title: string;
  status: "present" | "absent" | "late";
}

export interface Feedback {
  id: string;
  message: string;
  date: string;
  from?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  deadline: string;
  assignedDate: string;
}

// Mock user data
export const mockUser: User = {
  id: "1",
  name: "John Doe",
  position: "Active Member",
  avatar: "/Mobi.jpg",
  email: "john.doe@example.com",
};

// Mock attendance data
export const mockAttendance: AttendanceRecord[] = [
  { id: "1", type: "session", date: "2024-01-15", title: "Weekly Debate Session", status: "present" },
  { id: "2", type: "spar", date: "2024-01-12", title: "SPAR Practice", status: "present" },
  { id: "3", type: "meeting", date: "2024-01-10", title: "Monthly Meeting", status: "late" },
  { id: "4", type: "session", date: "2024-01-08", title: "Weekly Debate Session", status: "present" },
  { id: "5", type: "spar", date: "2024-01-05", title: "SPAR Practice", status: "absent" },
  { id: "6", type: "session", date: "2024-01-01", title: "Weekly Debate Session", status: "present" },
  { id: "7", type: "meeting", date: "2023-12-28", title: "Monthly Meeting", status: "present" },
  { id: "8", type: "session", date: "2023-12-25", title: "Weekly Debate Session", status: "present" },
];

// Mock feedback data
export const mockFeedback: Feedback[] = [
  { id: "1", message: "Great performance in the last debate! Your argumentation was clear and persuasive.", date: "2024-01-10" },
  { id: "2", message: "Your research skills have improved significantly. Keep up the excellent work!", date: "2024-01-05" },
  { id: "3", message: "Consider working on your rebuttal timing. Overall, well done!", date: "2023-12-28" },
  { id: "4", message: "Outstanding contribution to the team discussion. Your insights were valuable.", date: "2023-12-20" },
  { id: "5", message: "Your presentation style is engaging. Continue to develop your public speaking skills.", date: "2023-12-15" },
];

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Prepare research for upcoming debate",
    description: "Research topic: Climate Change Policies. Gather at least 5 credible sources.",
    status: "in_progress",
    deadline: "2024-01-20",
    assignedDate: "2024-01-12",
  },
  {
    id: "2",
    title: "Submit feedback form",
    description: "Complete the monthly feedback form for December sessions.",
    status: "pending",
    deadline: "2024-01-18",
    assignedDate: "2024-01-10",
  },
  {
    id: "3",
    title: "Attend SPAR practice session",
    description: "Participate in the scheduled SPAR practice on Friday.",
    status: "completed",
    deadline: "2024-01-12",
    assignedDate: "2024-01-08",
  },
  {
    id: "4",
    title: "Review debate recordings",
    description: "Watch and analyze last month's debate recordings for improvement.",
    status: "pending",
    deadline: "2024-01-25",
    assignedDate: "2024-01-15",
  },
];

