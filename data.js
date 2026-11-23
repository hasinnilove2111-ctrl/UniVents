let currentAdmin = {
  name: "Admin User",
  email: "admin@univents.edu",
  role: "Admin"
};
let events = [
  { id: 1, title: "Web Development Workshop", organizer: "Computer Science Club", category: "Workshop",
    date: "15 Nov 2026", dateValue: "2026-11-15", venue: "Lab 101", capacity: 150, status: "Open", started: true },
  { id: 2, title: "AI & Future of Technology", organizer: "AI Society", category: "Seminar",
    date: "20 Nov 2026", dateValue: "2026-11-20", venue: "Auditorium", capacity: 200, status: "Open", started: false },
  { id: 3, title: "Programming Contest 2026", organizer: "Programming Club", category: "Competition",
    date: "28 Nov 2026", dateValue: "2026-11-28", venue: "Lab 203", capacity: 100, status: "Open", started: false },
  { id: 4, title: "Freshers Cultural Night", organizer: "Cultural Club", category: "Cultural",
    date: "05 Dec 2026", dateValue: "2026-12-05", venue: "Main Campus", capacity: 500, status: "Open", started: false }
];

let users = [
  { id: 1, name: "Admin User", email: "admin@univents.edu", studentId: "", role: "Admin", status: "Active", joined: "01 Aug 2026" },
  { id: 2, name: "CS Club Organizer", email: "organizer@univents.edu", studentId: "", role: "Organizer", status: "Active", joined: "05 Aug 2026" },
  { id: 3, name: "Hasin Nilove", email: "hasin@student.aiub.edu", studentId: "22-12345-1", role: "Student", status: "Active", joined: "01 Sept 2026" },
  { id: 4, name: "Nazmuz Sakib", email: "nazmuz@student.aiub.edu", studentId: "22-12346-1", role: "Student", status: "Active", joined: "02 Sept 2026" },
  { id: 5, name: "Labib Hasan", email: "labib@student.aiub.edu", studentId: "22-12347-1", role: "Student", status: "Active", joined: "03 Sept 2026" },
  { id: 6, name: "Minhajul Islam", email: "minhajul@student.aiub.edu", studentId: "22-12348-1", role: "Student", status: "Active", joined: "04 Sept 2026" },
  { id: 7, name: "Saifullah Mansur", email: "saifullah@student.aiub.edu", studentId: "22-12349-1", role: "Student", status: "Active", joined: "05 Sept 2026" }
];

// newest registration shobar upore
let registrations = [
  { id: 1, userId: 4, eventId: 2, registered: "10 Oct 2026", status: "Registered", attendance: "Not marked" },
  { id: 2, userId: 3, eventId: 1, registered: "10 Oct 2026", status: "Registered", attendance: "Present" },
  { id: 3, userId: 7, eventId: 1, registered: "09 Oct 2026", status: "Registered", attendance: "Present" },
  { id: 4, userId: 6, eventId: 3, registered: "09 Oct 2026", status: "Registered", attendance: "Not marked" },
  { id: 5, userId: 5, eventId: 2, registered: "09 Oct 2026", status: "Registered", attendance: "Present" }
];
