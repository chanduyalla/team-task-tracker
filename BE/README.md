# TEAM-TASK-TRACKER-BE - Node.js + Express + Typescript + PostgreSQL + Prisma ORM

A backend application for Team Task Tracker, providing a comprehensive solution for team task management and collaboration. Built with Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM, the application supports user authentication, role-based access control (RBAC), task management, project management, and administrative operations.

---

## Database Schema

- **Role**: Defines user roles such as Admin, Manager and Member.
- **Permission**: Defines available actions (Create, Read, Update, Delete, etc.).
- **Resource**: Represents protected resources such as Users, Projects and Tasks.
- **RolePermission**: RBAC table that maps roles to permissions on resources.
- **User**: Stores user information and role assignments.
- **Task**: Represents work items. Tasks support priorities, statuses, assignees, due dates, and audit fields.
- **Project**: Represents a project managed by a specific user.
- **ProjectMember**: Many-to-many relationship between users and projects, allowing multiple users to participate in multiple projects.
- **UserRefreshToken**: Stores refresh tokens for JWT authentication.

## Design Decision

### Role-Based Access Control (RBAC)

- Flexible RBAC model with Roles, Resources, Permissions, and RolePermissions.
- Makes it easy to manage permissions at the role level.
- Allows adding new roles, resources, or actions without schema changes.

### Project Membership Structure

- Created `ProjectMember` junction table for many-to-many user-project relationships.
- Supports multiple users per project and multiple projects per user.

### User Refresh Tokens

- `UserRefreshToken` table is used to implement secure JWT authentication with refresh tokens.
- Each user can have multiple active refresh tokens, enabling multiple devices or sessions.
- Tokens can be revoked individually without affecting other sessions.
- Helps prevent replay attacks and allows token rotation for better security

---

## Tech Stack

- **Node.js** (Express)
- **TypeScript**
- **PostgreSQL** (Prisma ORM)

---

## Prerequirements

- Node.js v18+
- npm
- PostgreSQL database

---

## Environment Variables

- Copy `.env.example` to `.env` and fill your secrets

---

## Installation

1. Clone the repository
2. Install dependencies: npm install
3. Setup environment variables

---

## Scripts

- Run migrations: npm run migrate
- Run seeders: npx prisma db seed (run `npm run build` before this)

---

## Running Application

- npm run build
- npm start

---

## Postman Collection

- Access the collection at:

---

## Performance & Trade-offs

- **Indexes:** Added indexes on Task table fields that are frequently used in filters and sorting:
  - `status` → filter by task status
  - `assignee` → fetch tasks for a specific user
  - `due_date` → sort or filter by deadlines
  - `priority` -> filter by task priority
  - These indexes improve query performance without adding extra complexity.

- **Caching (Redis):** Considered caching task lists per assignee to speed up reads.
  - **Decision:** Not implemented.
  - Reason: Tasks change frequently, filters/sorting make caching keys complex, and database indexes provide sufficient performance at expected scale.
  - Future improvement: Redis can be used later for dashboards or high-read operations.

---

## Docker Setup

- Intended approach: Use `docker-compose` to spin up PostgreSQL and the backend service.
- Not implemented due to limited Docker experience
- Currently, the application runs locally with Node.js and PostgreSQL without containers.

---

## Future Improvements

- Add proper containerization with Docker and Docker Compose for easier deployment.
- Add more comprehensive automated tests for API endpoints.
- Implement email notifications for task updates and reminders.
