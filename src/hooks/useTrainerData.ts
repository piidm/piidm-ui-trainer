import { useState, useEffect } from "react";
import {
  Batch,
  Student,
  LiveSession,
  Assignment,
  Exam,
  AttendanceRecord,
  DashboardStats,
  AssignmentSubmission,
  ReviewAction,
  AssignmentStats,
} from "../types";

// Mock data - in a real app, this would come from an API
// const mockBatches: Batch[] = [
//   {
//     id: "1",
//     name: "Full Stack Development - Batch A",
//     timing: "10am-12pm",
//     students: [],
//     startDate: "2024-01-15",
//     endDate: "2024-06-15",
//     courseTitle: "Full Stack Web Development",
//     totalStudents: 25,
//     isActive: true,
//   },
//   {
//     id: "2",
//     name: "React Advanced - Batch B",
//     timing: "3pm-6pm",
//     students: [],
//     startDate: "2024-02-01",
//     endDate: "2024-05-01",
//     courseTitle: "Advanced React Development",
//     totalStudents: 18,
//     isActive: true,
//   },
//   {
//     id: "3",
//     name: "Backend Development - Batch C",
//     timing: "7pm-9pm",
//     students: [],
//     startDate: "2024-01-20",
//     endDate: "2024-04-20",
//     courseTitle: "Backend with Node.js",
//     totalStudents: 22,
//     isActive: true,
//   },
// ];

// const mockStudents: Student[] = [
//   // Batch A Students
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 92,
//     overallGrade: 85,
//     batchId: "1",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 88,
//     overallGrade: 91,
//     batchId: "1",
//   },
//   {
//     id: "5",
//     name: "Alex Brown",
//     email: "alex@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 87,
//     overallGrade: 89,
//     batchId: "1",
//   },
//   {
//     id: "6",
//     name: "Emily Davis",
//     email: "emily@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 94,
//     overallGrade: 93,
//     batchId: "1",
//   },
//   {
//     id: "7",
//     name: "Michael Chen",
//     email: "michael@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 89,
//     overallGrade: 87,
//     batchId: "1",
//   },
//   {
//     id: "8",
//     name: "Sarah Wilson",
//     email: "sarah.w@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 91,
//     overallGrade: 90,
//     batchId: "1",
//   },
//   {
//     id: "9",
//     name: "David Rodriguez",
//     email: "david@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 85,
//     overallGrade: 82,
//     batchId: "1",
//   },
//   {
//     id: "10",
//     name: "Lisa Thompson",
//     email: "lisa@example.com",
//     enrollmentDate: "2024-01-15",
//     overallAttendance: 96,
//     overallGrade: 95,
//     batchId: "1",
//   },
//   // Batch B Students
//   {
//     id: "3",
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     enrollmentDate: "2024-02-01",
//     overallAttendance: 95,
//     overallGrade: 88,
//     batchId: "2",
//   },
//   {
//     id: "11",
//     name: "Anna Garcia",
//     email: "anna@example.com",
//     enrollmentDate: "2024-02-01",
//     overallAttendance: 92,
//     overallGrade: 89,
//     batchId: "2",
//   },
//   {
//     id: "12",
//     name: "James Lee",
//     email: "james@example.com",
//     enrollmentDate: "2024-02-01",
//     overallAttendance: 88,
//     overallGrade: 86,
//     batchId: "2",
//   },
//   {
//     id: "13",
//     name: "Maria Martinez",
//     email: "maria@example.com",
//     enrollmentDate: "2024-02-01",
//     overallAttendance: 90,
//     overallGrade: 91,
//     batchId: "2",
//   },
//   // Batch C Students
//   {
//     id: "4",
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     enrollmentDate: "2024-01-20",
//     overallAttendance: 90,
//     overallGrade: 92,
//     batchId: "3",
//   },
//   {
//     id: "14",
//     name: "Robert Taylor",
//     email: "robert@example.com",
//     enrollmentDate: "2024-01-20",
//     overallAttendance: 87,
//     overallGrade: 84,
//     batchId: "3",
//   },
//   {
//     id: "15",
//     name: "Jennifer White",
//     email: "jennifer@example.com",
//     enrollmentDate: "2024-01-20",
//     overallAttendance: 93,
//     overallGrade: 88,
//     batchId: "3",
//   },
// ];

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// const mockSessions: LiveSession[] = [
//   // Today's sessions for testing attendance
//   {
//     id: "today-1",
//     topic: "React Hooks Deep Dive",
//     batchId: "1",
//     date: getTodayDate(),
//     time: "10:00",
//     mode: "online",
//     lectureLink: "https://meet.google.com/react-hooks-session",
//     status: "scheduled",
//   },
//   {
//     id: "today-2",
//     topic: "Advanced State Management with Redux",
//     batchId: "2",
//     date: getTodayDate(),
//     time: "15:00",
//     mode: "hybrid",
//     lectureLink: "https://meet.google.com/redux-advanced",
//     status: "scheduled",
//   },
//   {
//     id: "today-3",
//     topic: "Node.js Performance Optimization",
//     batchId: "3",
//     date: getTodayDate(),
//     time: "19:00",
//     mode: "classroom",
//     status: "scheduled",
//   },
//   // Original sessions
//   {
//     id: "1",
//     topic: "Introduction to React Hooks",
//     batchId: "1",
//     date: "2024-12-20",
//     time: "10:00",
//     mode: "online",
//     lectureLink: "https://meet.google.com/abc-defg-hij",
//     status: "scheduled",
//   },
//   {
//     id: "2",
//     topic: "Advanced State Management",
//     batchId: "2",
//     date: "2024-12-20",
//     time: "15:00",
//     mode: "hybrid",
//     lectureLink: "https://meet.google.com/xyz-defg-hij",
//     status: "scheduled",
//   },
//   {
//     id: "3",
//     topic: "Database Design Principles",
//     batchId: "3",
//     date: "2024-12-20",
//     time: "19:00",
//     mode: "classroom",
//     status: "scheduled",
//   },
//   // Additional past sessions for better calendar view
//   {
//     id: "4",
//     topic: "JavaScript Fundamentals Review",
//     batchId: "1",
//     date: "2024-12-18",
//     time: "10:00",
//     mode: "online",
//     lectureLink: "https://meet.google.com/js-fundamentals",
//     status: "completed",
//   },
//   {
//     id: "5",
//     topic: "Component Lifecycle Methods",
//     batchId: "2",
//     date: "2024-12-19",
//     time: "15:00",
//     mode: "hybrid",
//     lectureLink: "https://meet.google.com/lifecycle-methods",
//     status: "completed",
//   },
//   {
//     id: "6",
//     topic: "Express.js Middleware Deep Dive",
//     batchId: "3",
//     date: "2024-12-17",
//     time: "19:00",
//     mode: "classroom",
//     status: "completed",
//   },
//   // Future sessions
//   {
//     id: "7",
//     topic: "Testing React Applications",
//     batchId: "1",
//     date: "2024-12-22",
//     time: "10:00",
//     mode: "online",
//     lectureLink: "https://meet.google.com/react-testing",
//     status: "scheduled",
//   },
//   {
//     id: "8",
//     topic: "GraphQL Implementation",
//     batchId: "2",
//     date: "2024-12-23",
//     time: "15:00",
//     mode: "hybrid",
//     lectureLink: "https://meet.google.com/graphql-impl",
//     status: "scheduled",
//   },
//   {
//     id: "9",
//     topic: "Microservices Architecture",
//     batchId: "3",
//     date: "2024-12-24",
//     time: "19:00",
//     mode: "classroom",
//     status: "scheduled",
//   },
// ];

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Todo App with React Hooks",
    details:
      "<h3>Build a Complete Todo Application</h3><p>Create a fully functional todo application using React hooks with the following features:</p><ul><li>Add new todos</li><li>Mark todos as complete/incomplete</li><li>Edit existing todos</li><li>Delete todos</li><li>Filter todos (All, Active, Completed)</li><li>Local storage persistence</li></ul><h4>Technical Requirements:</h4><ul><li>Use functional components with hooks</li><li>Implement proper state management</li><li>Add responsive styling with CSS</li><li>Include form validation</li><li>Write clean, readable code with comments</li></ul><h4>Submission Format:</h4><p>Submit as a ZIP file containing your complete project with README.md file including setup instructions.</p>",
    batchId: "1",
    dueDate: "2024-12-25T23:59:59",
    totalMarks: 100,
    submissions: [
      {
        id: "1",
        studentId: "1",
        studentName: "John Doe",
        assignmentId: "1",
        submittedAt: "2024-12-18T14:30:00",
        files: [
          {
            id: "1",
            name: "todo-app-john.zip",
            url: "#",
            type: "application/zip",
            size: 2048576,
          },
        ],
        status: "submitted",
      },
      {
        id: "2",
        studentId: "2",
        studentName: "Jane Smith",
        assignmentId: "1",
        submittedAt: "2024-12-17T16:45:00",
        files: [
          {
            id: "2",
            name: "react-todo-jane.zip",
            url: "#",
            type: "application/zip",
            size: 1843200,
          },
        ],
        marks: 92,
        feedback:
          "Excellent work! Clean code structure and all requirements met. Great use of custom hooks for state management. The UI is intuitive and responsive.",
        status: "reviewed",
        reviewedAt: "2024-12-19T10:30:00",
        reviewedBy: "Dr. Sarah Johnson",
      },
      {
        id: "3",
        studentId: "5",
        studentName: "Alex Brown",
        assignmentId: "1",
        submittedAt: "2024-12-18T09:15:00",
        files: [
          {
            id: "3",
            name: "todo-application-alex.zip",
            url: "#",
            type: "application/zip",
            size: 1756800,
          },
        ],
        marks: 78,
        feedback:
          "Good implementation of core features. Code is well-structured but could benefit from better error handling and more comprehensive testing.",
        status: "reviewed",
        reviewedAt: "2024-12-19T11:15:00",
        reviewedBy: "Dr. Sarah Johnson",
      },
      {
        id: "4",
        studentId: "6",
        studentName: "Emily Davis",
        assignmentId: "1",
        submittedAt: "2024-12-19T20:30:00",
        files: [
          {
            id: "4",
            name: "emily-todo-app.zip",
            url: "#",
            type: "application/zip",
            size: 2156800,
          },
        ],
        status: "submitted",
      },
      {
        id: "5",
        studentId: "7",
        studentName: "Michael Chen",
        assignmentId: "1",
        submittedAt: "2024-12-19T13:45:00",
        files: [
          {
            id: "5",
            name: "michael-todo-project.zip",
            url: "#",
            type: "application/zip",
            size: 1923456,
          },
        ],
        status: "submitted",
      },
      {
        id: "6",
        studentId: "8",
        studentName: "Sarah Wilson",
        assignmentId: "1",
        submittedAt: "2024-12-16T22:00:00",
        files: [
          {
            id: "6",
            name: "sarah-todo-complete.zip",
            url: "#",
            type: "application/zip",
            size: 2345678,
          },
        ],
        marks: 88,
        feedback:
          "Very good work! All features implemented correctly. The code is clean and well-documented. Minor improvements needed in CSS organization.",
        status: "reviewed",
        reviewedAt: "2024-12-19T09:45:00",
        reviewedBy: "Dr. Sarah Johnson",
      },
      {
        id: "7",
        studentId: "9",
        studentName: "David Rodriguez",
        assignmentId: "1",
        submittedAt: "2024-12-19T18:20:00",
        files: [
          {
            id: "7",
            name: "david-todo-app.zip",
            url: "#",
            type: "application/zip",
            size: 1654321,
          },
        ],
        status: "submitted",
      },
      {
        id: "8",
        studentId: "10",
        studentName: "Lisa Thompson",
        assignmentId: "1",
        submittedAt: "2024-12-18T11:30:00",
        files: [
          {
            id: "8",
            name: "lisa-advanced-todo.zip",
            url: "#",
            type: "application/zip",
            size: 2567890,
          },
        ],
        marks: 96,
        feedback:
          "Outstanding work! Exceeded expectations with additional features like drag-and-drop, themes, and excellent test coverage. Professional-level implementation.",
        status: "reviewed",
        reviewedAt: "2024-12-19T14:20:00",
        reviewedBy: "Dr. Sarah Johnson",
      },
    ],
    status: "active",
    createdAt: "2024-12-15T10:00:00",
    updatedAt: "2024-12-15T10:00:00",
    createdBy: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    title: "API Integration Project",
    details:
      "<h3>REST API Integration Challenge</h3><p>Create a React application that integrates with external REST APIs to build a meaningful application.</p><h4>Requirements:</h4><ul><li>Fetch data from at least 2 different endpoints</li><li>Implement comprehensive error handling</li><li>Add loading states and skeleton screens</li><li>Include search/filter functionality</li><li>Responsive design for all screen sizes</li><li>Use modern React patterns (hooks, context if needed)</li></ul><h4>Bonus Points:</h4><ul><li>Implement caching mechanism</li><li>Add unit tests</li><li>Use TypeScript</li><li>Implement infinite scrolling or pagination</li></ul><h4>Suggested APIs:</h4><ul><li>JSONPlaceholder</li><li>OpenWeatherMap</li><li>News API</li><li>GitHub API</li></ul>",
    batchId: "2",
    dueDate: "2024-12-28T23:59:59",
    totalMarks: 150,
    submissions: [
      {
        id: "9",
        studentId: "3",
        studentName: "Mike Johnson",
        assignmentId: "2",
        submittedAt: "2024-12-19T16:30:00",
        files: [
          {
            id: "9",
            name: "mike-api-project.zip",
            url: "#",
            type: "application/zip",
            size: 3456789,
          },
        ],
        status: "submitted",
      },
      {
        id: "10",
        studentId: "11",
        studentName: "Anna Garcia",
        assignmentId: "2",
        submittedAt: "2024-12-18T14:15:00",
        files: [
          {
            id: "10",
            name: "anna-weather-app.zip",
            url: "#",
            type: "application/zip",
            size: 2987654,
          },
        ],
        marks: 135,
        feedback:
          "Excellent API integration with weather and news APIs. Great error handling and loading states. Clean TypeScript implementation with good test coverage.",
        status: "reviewed",
        reviewedAt: "2024-12-19T15:45:00",
        reviewedBy: "Dr. Sarah Johnson",
      },
      {
        id: "11",
        studentId: "12",
        studentName: "James Lee",
        assignmentId: "2",
        submittedAt: "2024-12-19T21:00:00",
        files: [
          {
            id: "11",
            name: "james-github-explorer.zip",
            url: "#",
            type: "application/zip",
            size: 3123456,
          },
        ],
        status: "submitted",
      },
    ],
    status: "active",
    createdAt: "2024-12-16T09:00:00",
    updatedAt: "2024-12-16T09:00:00",
    createdBy: "Dr. Sarah Johnson",
  },
  {
    id: "3",
    title: "Node.js Backend API Development",
    details:
      "<h3>Build a RESTful API with Node.js</h3><p>Create a complete backend API for a blog application using Node.js, Express, and MongoDB.</p><h4>Core Features:</h4><ul><li>User authentication (register, login, logout)</li><li>CRUD operations for blog posts</li><li>Comment system</li><li>File upload for images</li><li>Search and pagination</li><li>Input validation and sanitization</li></ul><h4>Technical Requirements:</h4><ul><li>Use Express.js framework</li><li>MongoDB with Mongoose ODM</li><li>JWT for authentication</li><li>Bcrypt for password hashing</li><li>Multer for file uploads</li><li>Express-validator for validation</li></ul><h4>API Endpoints:</h4><ul><li>POST /api/auth/register</li><li>POST /api/auth/login</li><li>GET /api/posts</li><li>POST /api/posts</li><li>PUT /api/posts/:id</li><li>DELETE /api/posts/:id</li></ul>",
    batchId: "3",
    dueDate: "2024-12-30T23:59:59",
    totalMarks: 120,
    submissions: [
      {
        id: "12",
        studentId: "4",
        studentName: "Sarah Wilson",
        assignmentId: "3",
        submittedAt: "2024-12-19T19:45:00",
        files: [
          {
            id: "12",
            name: "sarah-blog-api.zip",
            url: "#",
            type: "application/zip",
            size: 4567890,
          },
          {
            id: "13",
            name: "api-documentation.pdf",
            url: "#",
            type: "application/pdf",
            size: 567890,
          },
        ],
        status: "submitted",
      },
      {
        id: "13",
        studentId: "14",
        studentName: "Robert Taylor",
        assignmentId: "3",
        submittedAt: "2024-12-18T20:30:00",
        files: [
          {
            id: "14",
            name: "robert-backend-project.zip",
            url: "#",
            type: "application/zip",
            size: 3890123,
          },
        ],
        marks: 102,
        feedback:
          "Good implementation of core features. Authentication works well and API endpoints are properly structured. Could improve error handling and add more comprehensive validation.",
        status: "reviewed",
        reviewedAt: "2024-12-19T16:30:00",
        reviewedBy: "Dr. Sarah Johnson",
      },
    ],
    status: "active",
    createdAt: "2024-12-17T14:00:00",
    updatedAt: "2024-12-17T14:00:00",
    createdBy: "Dr. Sarah Johnson",
  },
  {
    id: "4",
    title: "E-commerce Frontend with React",
    details:
      "<h3>Build an E-commerce Product Catalog</h3><p>Create a modern e-commerce frontend application with product browsing, cart functionality, and checkout process.</p><h4>Required Features:</h4><ul><li>Product listing with grid/list view</li><li>Product search and filtering</li><li>Product detail pages</li><li>Shopping cart functionality</li><li>User authentication</li><li>Responsive design</li></ul><h4>Technical Stack:</h4><ul><li>React with hooks</li><li>React Router for navigation</li><li>Context API or Redux for state management</li><li>Styled Components or CSS Modules</li><li>Axios for API calls</li></ul><h4>Bonus Features:</h4><ul><li>Wishlist functionality</li><li>Product reviews and ratings</li><li>Order history</li><li>Payment integration (mock)</li></ul>",
    batchId: "1",
    dueDate: "2025-01-05T23:59:59",
    totalMarks: 130,
    submissions: [],
    status: "active",
    createdAt: "2024-12-19T11:00:00",
    updatedAt: "2024-12-19T11:00:00",
    createdBy: "Dr. Sarah Johnson",
  },
  {
    id: "5",
    title: "Database Design and Implementation",
    details:
      "<h3>Design and Implement a Library Management System Database</h3><p>Create a comprehensive database schema for a library management system and implement it using SQL.</p><h4>Requirements:</h4><ul><li>Design ER diagram</li><li>Create normalized database schema</li><li>Implement tables with proper relationships</li><li>Write complex SQL queries</li><li>Create stored procedures and triggers</li><li>Add indexes for optimization</li></ul><h4>Entities to Include:</h4><ul><li>Books, Authors, Publishers</li><li>Members, Staff</li><li>Borrowing records</li><li>Categories, Genres</li><li>Fines and payments</li></ul>",
    batchId: "3",
    dueDate: "2024-12-22T23:59:59",
    totalMarks: 100,
    submissions: [
      {
        id: "14",
        studentId: "15",
        studentName: "Jennifer White",
        assignmentId: "5",
        submittedAt: "2024-12-19T15:20:00",
        files: [
          {
            id: "15",
            name: "library-db-schema.sql",
            url: "#",
            type: "application/sql",
            size: 234567,
          },
          {
            id: "16",
            name: "er-diagram.pdf",
            url: "#",
            type: "application/pdf",
            size: 456789,
          },
        ],
        status: "submitted",
      },
    ],
    status: "expired",
    createdAt: "2024-12-10T09:00:00",
    updatedAt: "2024-12-10T09:00:00",
    createdBy: "Dr. Sarah Johnson",
  },
];

const mockExams: Exam[] = [
  {
    id: "1",
    title: "React Fundamentals Assessment",
    description:
      "Assessment covering React basics, hooks, and component lifecycle",
    batchId: "1",
    type: "mixed",
    duration: 90,
    totalMarks: 100,
    passingMarks: 70,
    scheduledDate: "2024-12-22T10:00:00",
    questions: [],
    submissions: [],
    status: "scheduled",
  },
];

export const useTrainerData = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [reviewActions, setReviewActions] = useState<ReviewAction[]>([]);
  const [loading, setLoading] = useState(false);

  const dashboardStats: DashboardStats = {
    totalBatches: batches && batches[0] ? batches[0].length : 0,
    totalStudents: students && students[0] && typeof students[0].length === "number" ? students[0].length : 0,
    todaySessions: sessions.filter((s) => {
      const today = new Date().toISOString().split("T")[0];
      return s.date === today;
    }).length,
   pendingGrading: (assignments || []).reduce((acc, assignment) => {
  const submissions = Array.isArray(assignment.submissions) ? assignment.submissions : [];
  const submittedCount = submissions.filter(s => s.status === "submitted").length;
  return acc + submittedCount;
}, 0),

    averageAttendance: 89,
    upcomingExams: exams.filter((e) => new Date(e.scheduledDate) > new Date())
      .length,
  };

  const assignmentStats: AssignmentStats = {
    totalAssignments: assignments.length,
    activeAssignments: assignments.filter((a) => a.status === "active").length,
    expiredAssignments: assignments.filter((a) => a.status === "expired")
      .length,
    totalSubmissions: assignments.reduce(
      (acc, assignment) => acc + assignment.submissions.length,
      0
    ),
    pendingReviews: assignments.reduce(
      (acc, assignment) =>
        acc +
        assignment.submissions.filter((s) => s.status === "submitted").length,
      0
    ),
    reviewedSubmissions: assignments.reduce(
      (acc, assignment) =>
        acc +
        assignment.submissions.filter((s) => s.status === "reviewed").length,
      0
    ),
  };

  function convertTo24Hour(time12h: any) {
    const [time, modifier] = time12h.match(/(\d{1,2}:\d{2})(AM|PM)/i).slice(1);
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  // Sessions API

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg";

    fetch(
      "http://127.0.0.1:3002/api/lecture/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=topic&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=batch_date&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=batch_time.name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=course_mode.name&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=zoom_link&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=total_combined_batches&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1753018158729",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        const sessions = resData.data.map((item: any) => {
          let batchIds: string[] = [];
          try {
            batchIds = JSON.parse(item.json_batch_ids);
          } catch {
            batchIds = [];
          }

          const firstBatchId = batchIds[0]?.toString() || "0";
          const today = new Date().toISOString().split("T")[0];
          const status = item.batch_date < today ? "completed" : "scheduled";
          let startTime12hr = item.batch_time?.name.split(" - ")[0];
          let startTime24hr = convertTo24Hour(startTime12hr);

          return {
            id: item.lecture_id.toString(),
            topic: item.topic || "Untitled",
            batchId: firstBatchId,
            date: item.batch_date,
            time: startTime24hr || "00:00",
            mode: item.course_mode?.name.toLowerCase() || "unknown",
            lectureLink: item.zoom_link || "",
            status,
          } as LiveSession;
        });

        setSessions(sessions);
      })
      .catch(console.error);
  }, []);

  // Batches API

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg";

    fetch(
      "http://127.0.0.1:3002/api/batch/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=batch_num&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=batch_date&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=batch_time.name&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=branch.name&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=course.name&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=course_mode.name&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=trainer.name&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=total_seats&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        const totalBatches = resData.basic_stats.total_batches;
        const batchList: Batch[] = resData.data.map((item: any) => {
          return {
            id: item.batch_id?.toString() || "0",
            length: totalBatches,
            name: item.name || "Unnamed Batch",
            timing: item.batch_time?.name || "00:00 - 00:00",
            students: [],
            startDate: item.start_date || "1970-01-01",
            endDate: item.end_date || "1970-01-01",
            courseTitle: item.course?.name || "Unknown Course",
            totalStudents: item.total_seats || 0,
            isActive: item.is_active !== false,
          };
        });

        setBatches(batchList);
      })
      .catch(console.error);
  }, []);

  // Students API
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg";

    fetch(
      "http://127.0.0.1:3002/api/students_report/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=student.name&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=attendance&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=assignment&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=exam&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=score&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=certificate&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=mock_interview&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=placement_status&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        const totalStudents = resData.basic_stats.total_student_reports;
        const students = resData.data.map((item: any) => ({
          id: item.student_id?.toString(),
          length: totalStudents,
          name: item.student?.name || "Unnamed",
          email: item.student?.email || "N/A",
          enrollmentDate: item.enrollmentDate || "2024-01-01",
          overallAttendance: item.attendance || 0,
          overallGrade: item.score || 0,
          assignment: item.assignment || "N/A",
          exam: item.exam || "N/A",
          certificate: item.certificate || "Pending",
          mockInterview: item.mock_interview || "Not Attempted",
          placementStatus: item.placement_status || "Not Placed",
          batchId: item.batch_id?.toString() || "0",
        }));

        setStudents(students); // assuming setStudents is a state setter
      })
      .catch(console.error);
  }, []);

  // assignment API

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg";

    fetch(
      "http://127.0.0.1:3002/api/assignment/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=title&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=description&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=assignment_date&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=total_combined_batches&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=total_marks&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1753177048507",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        const assignments: Assignment[] = resData.data.map((item: any) => {
          return {
           id: item.assignment_id.toString(),
          title: item.title || "Untitled Assignment",
          details: item.description || "<p>No details provided.</p>",
          batchId: item.batch_id?.toString() || "0",
          dueDate: item.assignment_date || new Date().toISOString(),
          totalMarks: item.total_marks || 100,
          status: item.is_active == 1? "active" : "submitted",
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString(),
          createdBy: item.created_by || "System",
          submissions: (item.submissions || []).map((submission: any) => ({
            id: submission.id.toString(),
            studentId: submission.student_id.toString(),
            studentName: submission.student_name || "Unnamed",
            assignmentId: item.assignment_id.toString(),
            submittedAt: submission.submitted_at || "",
            status: submission.status || "submitted",
            marks: submission.marks,
            feedback: submission.feedback,
            reviewedAt: submission.reviewed_at,
            reviewedBy: submission.reviewed_by,
            files: (submission.files || []).map((file: any) => ({
              id: file.id.toString(),
              name: file.name,
              url: file.url || "#",
              type: file.type || "application/octet-stream",
              size: file.size || 0,
            })),
          })),
          
          };
        });

        setAssignments(assignments);
      })
      .catch(console.error);
  }, []);

  const addSession = (session: Omit<LiveSession, "id">) => {
    const newSession: LiveSession = {
      ...session,
      id: Date.now().toString(),
    };
    setSessions((prev) => [...prev, newSession]);
  };

  const updateSession = (id: string, updates: Partial<LiveSession>) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      )
    );
  };

  const addAssignment = (
    assignment: Omit<
      Assignment,
      "id" | "createdAt" | "updatedAt" | "createdBy" | "submissions" | "status"
    >
  ) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      submissions: [],
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Dr. Sarah Johnson",
    };
    setAssignments((prev) => [...prev, newAssignment]);
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? { ...assignment, ...updates, updatedAt: new Date().toISOString() }
          : assignment
      )
    );
  };

  const deleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
  };

  const addSubmission = (
    assignmentId: string,
    submission: Omit<AssignmentSubmission, "id">
  ) => {
    const newSubmission: AssignmentSubmission = {
      ...submission,
      id: Date.now().toString(),
    };

    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              submissions: [...assignment.submissions, newSubmission],
            }
          : assignment
      )
    );
  };

  const updateSubmission = (
    assignmentId: string,
    submissionId: string,
    updates: Partial<AssignmentSubmission>
  ) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              submissions: assignment.submissions.map((submission) =>
                submission.id === submissionId
                  ? { ...submission, ...updates }
                  : submission
              ),
            }
          : assignment
      )
    );
  };

  const reviewSubmission = (
    assignmentId: string,
    submissionId: string,
    reviewData: {
      action: "accept" | "reject";
      marks?: number;
      feedback: string;
    }
  ) => {
    const reviewAction: ReviewAction = {
      id: Date.now().toString(),
      submissionId,
      assignmentId,
      action: reviewData.action,
      marks: reviewData.marks,
      feedback: reviewData.feedback,
      reviewedBy: "Dr. Sarah Johnson",
      reviewedAt: new Date().toISOString(),
    };

    setReviewActions((prev) => [...prev, reviewAction]);

    updateSubmission(assignmentId, submissionId, {
      marks: reviewData.marks,
      feedback: reviewData.feedback,
      status: "reviewed",
      reviewedAt: new Date().toISOString(),
      reviewedBy: "Dr. Sarah Johnson",
    });
  };

  const bulkReviewSubmissions = (
    reviews: Array<{
      assignmentId: string;
      submissionId: string;
      action: "accept" | "reject";
      marks?: number;
      feedback: string;
    }>
  ) => {
    reviews.forEach((review) => {
      reviewSubmission(review.assignmentId, review.submissionId, {
        action: review.action,
        marks: review.marks,
        feedback: review.feedback,
      });
    });
  };

  const addExam = (exam: Omit<Exam, "id">) => {
    const newExam: Exam = {
      ...exam,
      id: Date.now().toString(),
    };
    setExams((prev) => [...prev, newExam]);
  };

  const updateExam = (id: string, updates: Partial<Exam>) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updates } : exam))
    );
  };

  const markAttendance = (records: Omit<AttendanceRecord, "id">[]) => {
    const newRecords = records.map((record) => ({
      ...record,
      id: Date.now().toString() + Math.random(),
    }));
    setAttendance((prev) => [...prev, ...newRecords]);
  };

  // Update assignment status based on due date
  useEffect(() => {
    const updateAssignmentStatuses = () => {
      const now = new Date();
      setAssignments((prev) =>
        prev.map((assignment) => {
          const dueDate = new Date(assignment.dueDate);
          const newStatus = dueDate < now ? "expired" : "active";
          return assignment.status !== newStatus
            ? { ...assignment, status: newStatus }
            : assignment;
        })
      );
    };

    updateAssignmentStatuses();
    const interval = setInterval(updateAssignmentStatuses, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return {
    batches,
    students,
    sessions,
    assignments,
    exams,
    attendance,
    reviewActions,
    dashboardStats,
    assignmentStats,
    loading,
    addSession,
    updateSession,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    addSubmission,
    updateSubmission,
    reviewSubmission,
    bulkReviewSubmissions,
    addExam,
    updateExam,
    markAttendance,
  };
};
