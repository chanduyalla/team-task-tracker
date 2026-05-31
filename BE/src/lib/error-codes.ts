export const errorCodes = {
  UNAUTHORIZED: {
    statusCode: 401,
    errorMessage: "Unauthorized access",
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    errorMessage: "Invalid email or password",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    errorMessage: "User not found",
  },
  FORBIDDEN: {
    statusCode: 403,
    errorMessage: "You do not have permission to access this resource",
  },
  INVALID_TASK_ID: {
    statusCode: 400,
    errorMessage: "Invalid Task ID",
  },
  TASK_NOT_FOUND: {
    statusCode: 404,
    errorMessage: "Task not found",
  },
  TASK_NOT_ASSIGNED_TO_YOU: {
    statusCode: 403,
    errorMessage: "You can only edit tasks assigned to you",
  },
  ONLY_MANAGER_CAN_ASSIGN_TASKS: {
    statusCode: 403,
    errorMessage:
      "You do not have permission to assign task, Only managers are allowed to assign tasks",
  },
  INVALID_ASSIGNEE_ID: {
    statusCode: 400,
    errorMessage: "Invalid Assignee ID",
  },
  ASSIGNEE_NOT_FOUND: {
    statusCode: 404,
    errorMessage: "Assignee not found",
  },
  INVALID_PROJECT_ID: {
    statusCode: 400,
    errorMessage: "Invalid Project ID",
  },
  PROJECT_NOT_FOUND: {
    statusCode: 404,
    errorMessage: "Project not found",
  },
  INVALID_USER_ID: {
    statusCode: 400,
    errorMessage: "Invalid User ID",
  },
  USER_ALREADY_IN_PROJECT: {
    statusCode: 400,
    errorMessage: "User already added to the project",
  },
  INVALID_IDS: {
    statusCode: 400,
    errorMessage: "Invalid IDS",
  },
  NO_REFRESH_TOKEN: {
    statusCode: 401,
    errorMessage: "No refresh token found",
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 401,
    errorMessage: "Invalid refresh token",
  },
};
