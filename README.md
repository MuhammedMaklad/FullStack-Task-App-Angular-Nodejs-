# Full Stack Task Management Application

A modern task management system built with Angular 21.2.0 frontend and Node.js/Express backend.

## Features

- **User Authentication**: Login and registration functionality with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Protected Routes**: Guarded routes for authenticated users only
- **Modern UI**: Clean, responsive interface built with Angular standalone components
- **TypeScript**: Full-stack TypeScript implementation for type safety
- **Real-time Updates**: Angular signals for reactive state management

## Tech Stack

### Frontend
- **Framework**: Angular 21.2.0
- **Language**: TypeScript
- **Styling**: Component-scoped CSS
- **Testing**: Vitest 4.0.8
- **Package Manager**: npm
- **Additional Libraries**: 
  - @ngxpert/hot-toast (notifications)
  - json-server (for mock data)
  - ngx-cookie-service

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (json-web-token)
- **Validation**: Zod
- **Security**: bcryptjs (password hashing)
- **Process Management**: PM2
- **Development Tools**: nodemon, ts-node

## Project Structure

```
FullStack Task App/
├── backend-node-task-app/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Service layer
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Configuration files
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
└── frontent/
    ├── src/
    │   ├── app/
    │   │   ├── components/  # Angular components
    │   │   ├── services/    # Data services
    │   │   ├── guards/      # Route guards
    │   │   ├── interceptor/ # HTTP interceptors
    │   │   └── types/       # TypeScript interfaces
    │   ├── main.ts
    │   └── index.html
    ├── package.json
    └── angular.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v11.14.1 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend-node-task-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your MongoDB URI and other configurations.

4. Build and start the server:
```bash
npm run build
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks (authenticated)
- `POST /api/tasks` - Create a new task (authenticated)
- `PUT /api/tasks/:id` - Update a task (authenticated)
- `DELETE /api/tasks/:id` - Delete a task (authenticated)

### Health Check
- `GET /api/health` - API health status

## Development Scripts

### Backend
- `npm run dev` - Start with nodemon (development)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run pm2:start` - Start with PM2 process manager
- `npm run pm2:stop` - Stop PM2 process
- `npm run pm2:restart` - Restart PM2 process

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests with Vitest
- `ng serve` - Alternative development server command

## Testing

### Frontend Tests
```bash
cd frontent
npm test
```

### Backend Integration
The API can be tested using tools like Postman or curl. Refer to the API endpoints section above.

## Deployment Notes

- The backend is configured for PM2 process management
- CORS is configured for the frontend origin
- Environment variables should be set in production
- Ensure MongoDB is properly secured for production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure nothing is broken
5. Submit a pull request

## Future Enhancements

- Add task categories and priorities
- Implement real-time notifications
- Add task due date reminders
- Collaborative features for team tasks
- Mobile app development
- Advanced analytics dashboard

## License

This project is licensed under the ISC License - see the package.json file for details.