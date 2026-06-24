import API from "./api";

const quizService = {
  getAll:       (params) => API.get("/quizzes", { params }).then(r => r.data.data),
  getById:      (id)     => API.get(`/quizzes/${id}`).then(r => r.data.data),
  submit:       (id, d)  => API.post(`/quizzes/${id}/submit`, d).then(r => r.data.data),
  getResult:    (id)     => API.get(`/quizzes/attempts/${id}`).then(r => r.data.data),
  getMyResults: ()       => API.get("/quizzes/my-results").then(r => r.data.data),
  // Teacher
  create:       (data)   => API.post("/quizzes", data).then(r => r.data.data),
};

export default quizService;