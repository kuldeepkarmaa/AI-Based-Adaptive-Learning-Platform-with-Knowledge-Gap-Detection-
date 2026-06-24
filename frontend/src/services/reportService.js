import API from "./api";

const reportService = {
  getStudentReport:  ()         => API.get("/reports/student").then(r => r.data.data),
  getCourseReport:   (courseId) => API.get(`/reports/course/${courseId}`).then(r => r.data.data),
  getRecommendations:()         => API.get("/recommendations/my").then(r => r.data.data),
  getNotifications:  ()         => API.get("/student/notifications").then(r => r.data.data),
  markAllRead:       ()         => API.put("/student/notifications/read-all").then(r => r.data),
};

export default reportService;