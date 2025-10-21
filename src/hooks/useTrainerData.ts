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
  const [allBatches, setAllBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [reviewActions, setReviewActions] = useState<ReviewAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLectureTimes, setAllLectureTimes] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMDU4fQ.Bq73AlphQHYrSEoA8sqKLavypbd5HXHcDItv0sdNsbg";

  //Convert 12-hour time format to 24-hour format
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
  const fetchSessions = async (signal?: AbortSignal) => {

    try {

      const res = await fetch(
        " http://127.0.0.1:3002/api/lecture/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=topic&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=batch_date&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=batch_time.name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=course_mode.name&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=zoom_link&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=total_combined_batches&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1753018158729",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal
        }
      )
      if (!res.ok) throw new Error("Failed to fetch sessions");
      const resData = await res.json();

      const sessions: LiveSession[] = (resData.data || []).map((item: any) => {
        let batchIds: string[] = [];
        try {
          batchIds = JSON.parse(item.json_batch_ids);
        } catch {
          batchIds = [];
        }

        const firstBatchId = batchIds?.toString() || "0";
        const today = new Date().toISOString().split("T")[0];
        const batchDate = item.batch_date?.split("T")[0] || today;
        const status = batchDate < today ? "completed" : "scheduled";

        // ✅ Safely handle missing batch_time
        let displayTime = "00:00 AM - 00:00 PM";
        if (item.batch_time && typeof item.batch_time.name === "string") {
          displayTime = item.batch_time.name;
        }

        // ✅ Safely extract start time
        let startTime12hr = "00:00 AM";
        try {
          if (displayTime && displayTime.includes(" - ")) {
            startTime12hr = displayTime.split(" - ")[0];
          }
        } catch {
          startTime12hr = "00:00 AM";
        }

        // ✅ Convert to 24-hour
        let startTime24hr = "00:00";
        try {
          startTime24hr = convertTo24Hour(startTime12hr);
        } catch {
          startTime24hr = "00:00";
        }

        return {
          id: item.lecture_id.toString(),
          topic: item.topic || item.title || "Untitled",
          batchId: firstBatchId,
          date: batchDate,
          time: startTime24hr,
          displayTime,
          mode: item.course_mode?.name.toLowerCase() || "unknown",
          lectureLink: item.zoom_link || "",
          status,
        } as LiveSession;
      });

      setSessions(sessions);
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Fetch sessions aborted");
      } else {
        console.error(err);
      }
    }
  };



  // Batches API
  const fetchBatches = async (signal?: AbortSignal) => {
    setLoading(true);
    try {

      const res = await fetch(
        " http://127.0.0.1:3002/api/batch/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=batch_num&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=name&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=batch_date&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=batch_time.name&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=branch.name&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=course.name&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=course_mode.name&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=trainer.name&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=total_seats&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal
        }
      );

      const resData = await res.json();
      const totalBatches = resData.basic_stats.total_batches;

      const getLectureName = (id: number) => {
        const lecture: any = allLectureTimes.find((l: any) => l.id == id);
        return lecture?.name || "";
      };

      const batchList: Batch[] = resData.data.map((item: any) => ({
        id: item.batch_id?.toString() || "0",
        length: totalBatches,
        name: item.name || "Unnamed Batch",
        timing:
          item.batch_time && item.batch_time.batch_time_id
            ? getLectureName(item.batch_time.batch_time_id) || "Unknown"
            : "Unknown",
        // courseMode: modeName,
        students: [],
        startDate: item.start_date || "1970-01-01",
        endDate: item.end_date || "1970-01-01",
        courseTitle: item.course?.name || "Unknown Course",
        totalStudents: item.total_seats || 0,
        isActive: item.is_active !== false,
      }));


      setBatches(batchList);

    } catch (err: any) {
      if (err.name === "AbortError") {
      } else {
        console.error(err);
      }
    }
  };


  //fetch all lecture times
  const fetchAllLectureTimes = async (signal?: AbortSignal) => {

    try {

      const res = await fetch(" http://127.0.0.1:3002/api/lecture/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal,

      });

      if (!res.ok) throw new Error("Failed to fetch all lectures");

      const resData = await res.json();

      const allLecturesList = (resData || []).map((item: any) => ({
        id: item.batch_time.batch_time_id,
        name: item.batch_time.name || "Untitled", // Fallback to title or "Untitled
        mode: item.course_mode.course_mode_id
      }));

      setAllLectureTimes(allLecturesList);

    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Fetch all lecture times aborted");
      } else {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    setAllLectureTimes(allLectureTimes);
  }, [allLectureTimes]);



  const fetchAllBatches = async (signal?: AbortSignal) => {


    try {

      const res = await fetch(" http://127.0.0.1:3002/api/batch/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal,
      });

      if (!res.ok) throw new Error("Failed to fetch all batches");

      const resData = await res.json();
      // Handle both: array response OR wrapped { data: [...] }
      const batchesArray = Array.isArray(resData)
        ? resData
        : Array.isArray(resData.data)
          ? resData.data
          : [];

      const getLectureName = (id: number) => {
        const lecture: any = allLectureTimes.find((l: any) => l.id == id);
        return lecture?.name || "";
      };

      const getCourseModeName = (courseModeId: number) => {

        switch (courseModeId) {
          case 1:
            return "classroom";
          case 2:
            return "online";
          case 3:
            return "hybrid";
          default:
            return "unknown";
        }
      };


      // Map batches correctly
      const batchList: Batch[] = batchesArray.map((item: any) => {

        return {

          id: item.batch_id?.toString() || "0",
          name: item.name || `Batch ${item.batch_num || "Unknown"}`,
          timing:
            item.batch_time && item.batch_time.batch_time_id
              ? getLectureName(item.batch_time.batch_time_id) || "Unknown"
              : "Unknown",
          // courseMode: modeName,
          students: [],
          courseMode: "online",
          startDate: item.batch_date || "1970-01-01",
          endDate: item.batch_date || "1970-01-01",
          courseTitle: `Course #${item.course_id}`,
          totalStudents: item.seats_occupied || 0,
          isActive: item.deleted === 0, // Keep only non-deleted
        }

      });


      setAllBatches(batchList);

    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Fetch all batches aborted");
      } else {
        console.error("Error fetching all batches:", err);
      }
    }

  };






  const fetchBatchById = async (batchId: string, signal?: AbortSignal) => {
    try {
      const res = await fetch(` http://127.0.0.1:3002/api/batch/select/${batchId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal,
      });
      if (!res.ok) throw new Error("Failed to fetch batch");
      const data = await res.json();
      return data; // raw batch object
    } catch (err) {
      console.error("Error fetching batch:", err);
      return null;
    }
  };



  // Students API
  const fetchStudents = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const res = await fetch(
        " http://127.0.0.1:3002/api/students_report/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=student.name&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=attendance&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=assignment&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=exam&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=score&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=certificate&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=mock_interview&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=placement_status&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal
        }
      )

      if (!res.ok) throw new Error("Failed to fetch students");

      const resData = await res.json();

      const totalStudents = resData.basic_stats?.total_student_reports || 0;
      const studentList: Student[] = (resData.data || []).map((item: any) => ({
        id: item.student_id?.toString() || String(Math.random()),
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

      setStudents(studentList);
      setLoading(false);
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Fetch students aborted");
      } else {
        console.error("Error fetching students:", err);
      }
      setLoading(false);
    }
  };

  // Helper function to get students by batch ID
  const getStudentsByBatch = (batchId: string): Student[] => {
    return students.filter((student) => student.batchId === batchId);
  };

  // Helper function to get student by ID
  const getStudentById = (studentId: string): Student | undefined => {
    return students.find((student) => student.id === studentId);
  };

  // assignment API
  const fetchAssignments = async (signal?: AbortSignal) => {
    setLoading(true);
    try {

      const res = await fetch(
        " http://127.0.0.1:3002/api/assignment/select-paginate-advanced?draw=1&columns%5B0%5D%5Bdata%5D=title&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=description&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=assignment_date&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=total_combined_batches&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=total_marks&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1753177048507",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal,
        }
      );
      const resData = await res.json();
      const assignments: Assignment[] = resData.data.map((item: any) => ({
        id: item.assignment_id.toString(),
        title: item.title || "Untitled Assignment",
        details: item.description || "<p>No details provided.</p>",
        batchId: item.json_batch_ids?.toString() || "0",
        dueDate: item.assignment_date || new Date().toISOString(),
        totalMarks: item.total_marks || 100,
        status: item.is_active == 1 ? "active" : "submitted",
        createdAt: item.created_at || new Date().toISOString(),
        updatedAt: item.updated_at || new Date().toISOString(),
        submissions: (item.submission || []).map((submission: any) => ({
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
          }))
        }))
      }))

      setAssignments(assignments);
    } catch (err: any) {
      if (err.name === "AbortError") {
      } else {
        console.error(err);
      }
    }
  };

  const fetchAssignmentSubmissions = async (assignmentId: string, signal?: AbortSignal) => {
    try {
      const res = await fetch(` http://127.0.0.1:3002/api/assignment/submission/view/${assignmentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal,
      });
      if (!res.ok) throw new Error("Failed to fetch submissions");
      const data = await res.json();
      return data; // array of submissions
    } catch (err) {
      console.error("Error fetching submissions:", err);
      return [];
    }
  };

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

  const modeMap: Record<string, number> = {
    classroom: 1,
    online: 2,
    hybrid: 3,
  };

  // Example: Map time string to ID (customize as needed)
  const timeMap: Record<string, number> = {
    "09:00": 1,
    "11:45": 2,
    "15:00": 3,
    // Add more mappings as needed
  };

  function formatDate(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  const addSession = async (session: Omit<LiveSession, "id">) => {
    try {
      const batch_time_id = timeMap[session.time] || 1; // fallback to 1
      const course_mode_id = modeMap[session.mode] || 1;
      const batch_date = formatDate(session.date);

      // Example trainer name, replace with dynamic value if available
      const trainerName = "Vijay Gehlot";
      const name = `${trainerName}-${batch_date}-${session.batchId}[${batch_time_id}]`;

      const payload = [{
        name,
        topic: session.topic,
        course_mode_id,
        json_batch_ids: `[${session.batchId}]`,
        batch_time_id,
        trainer_id: "1",
        user_id: "2058",
        zoom_link: session.lectureLink,
        batch_date,
      }];



      const res = await fetch(" http://127.0.0.1:3002/api/lecture/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create session");

      const resData = await res.json();

      const newSession: LiveSession = {
        ...session,
        id: resData.lecture_id?.toString() || Date.now().toString(),
      };

      setSessions((prev) => [...prev, newSession]);

      return resData;
    } catch (err) {
      console.error("Error adding session:", err);
      throw err;
    }
  };

  const updateSession = (id: string, updates: Partial<LiveSession>) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      )
    );
  };

  const addAssignment = async (
    assignment: Omit<
      Assignment,
      "id" | "createdAt" | "updatedAt" | "createdBy" | "submissions" | "status"
    >
  ) => {

    try {
      function formatAssignmentDate(isoDate: string) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

      const payload = [{
        title: assignment.title,
        description: assignment.details,
        json_batch_ids: `[${assignment.batchId}]`,
        trainer_id: "1",
        user_id: "2058",
        assignment_date: formatAssignmentDate(assignment.dueDate),
        total_marks: assignment.totalMarks?.toString() || "100"
      }];


      const res = await fetch(" http://127.0.0.1:3002/api/assignment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create assignment");

      const resData = await res.json();

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
      return resData;
    } catch (err) {
      console.error("Error adding session:", err);
      throw err;
    }
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
  useEffect((): any => {
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
    const interval = updateAssignmentStatuses; // Check every minute

    return () => interval
  }, []);


  return {
    batches,
    allBatches,
    allLectureTimes,
    students,
    sessions,
    assignments,
    exams,
    attendance,
    reviewActions,
    dashboardStats,
    assignmentStats,
    loading,
    fetchSessions,
    fetchAllLectureTimes,
    fetchBatches,
    fetchAllBatches,
    fetchStudents,
    fetchAssignments,
    fetchBatchById,
    fetchAssignmentSubmissions,
    getStudentsByBatch, // ✅ Add this
    getStudentById, // ✅ Add this
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





