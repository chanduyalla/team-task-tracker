import api from "./axios";

export const createTask = (data: any) => {
  return api.post("/tasks", data);
};

export const getTasks = () => {
  return api.get("/tasks");
};

export const updateTask = (id: number, data: any) => {
  return api.patch(`/tasks/${id}`, data);
};

export const deleteTask = (id: number) => {
  return api.delete(`/tasks/${id}`);
};
