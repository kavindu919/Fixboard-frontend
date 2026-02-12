# Fixboard - Issue Tracker Application

Fixboard is a modern, responsive issue tracking application designed to help teams organize, collaborate, and manage their projects efficiently. Built with performance and user experience in mind, it provides a comprehensive suite of tools for creating, tracking, and resolving issues.

## Features

### Issue Management

- **Dashboard Overview**: Get a high-level view of project health with real-time statistics, status distribution charts, and activity feeds.
- **CRUD Operations**: Complete functionality to create, read, update, and delete issues.
- **Detailed Attributes**: Track issues with specific attributes including priority levels, severity, due dates, and assigned team members.
- **Rich Text Support**: Create detailed issue descriptions.
- **File Attachments**: Upload and attach relevant files or screenshots to issues using Cloudinary integration.

### collaborative Tools

- **Status Workflow**: Manage issue lifecycles through defined states (Open, In Progress, Resolved, Closed).
- **Team Assignment**: Assign issues to specific team members to ensure accountability.
- **Comments & Activity**: Track progress and discussions on specific issues (Backend dependence).

### Search & Organization

- **Advanced Filtering**: Filter issues by status, priority, severity, and assignee to find exactly what you need.
- **Search**: integrated search functionality to quickly locate specific issues.
- **Pagination**: Efficiently handle large sets of data with built-in pagination.
- **Export Data**: Export issue lists to CSV or JSON formats for external reporting.

### User Experience

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS.
- **Visual Feedback**: Toast notifications for user actions and loading states for data fetching.

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM 7
- **Data Visualization**: Recharts
- **Form Handling**: Zod for validation
- **HTTP Client**: Axios

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory:
   ```bash
   cd fixboard-frontend
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory of the project. You will need to define the API endpoint for the backend server:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Replace the URL with the actual address of your running backend server.

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate optimized static files in the `dist` directory.

## Project Structure

- `src/api`: Axios configuration and interceptors.
- `src/components`: Reusable UI components (Buttons, Inputs, Modals, etc.).
- `src/pages`: Main application pages (Dashboard, Auth, Issues).
- `src/services`: API service functions for communicating with the backend.
- `src/store`: Redux store setup and slices.
- `src/utils`: Helper functions, constants, and TypeScript interfaces.
- `src/routes`: Route definitions and authentication guards.

## License

This project is open-source and available for personal and educational use.
