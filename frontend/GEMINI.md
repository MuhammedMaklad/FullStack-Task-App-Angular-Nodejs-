# Project: Lab1 (Task Management System)

## Tech Stack
- **Framework:** Angular 21.2.0 (Standalone Components, Signals)
- **Language:** TypeScript
- **Testing:** Vitest 4.0.8 (using `@angular/build:unit-test` builder)
- **Styling:** Vanilla CSS (component-scoped)
- **Package Manager:** npm

## Project Structure
- `src/app/components/`: UI components (Login, Register, Task, Slider, etc.)
- `src/app/services/`: Business logic and data management (TaskService)
- `src/app/guards/`: Route protection logic (authGuard)
- `src/app/types/`: Shared TypeScript interfaces and types
- `public/`: Static assets (images, favicon)

## Conventions & Rules
- **Components:** Always use standalone components.
- **State Management:** Prefer Angular Signals for local and shared state.
- **Routing:** Use lazy loading for major feature modules (e.g., `TaskForm`, `TaskBar`).
- **Styling:** Adhere to component-scoped CSS; avoid global styles unless absolutely necessary (use `src/styles.css`).
- **Testing:** Write unit tests for new components and services using Vitest. Run `npm test` to verify.

## Development Scripts
- `npm start`: Runs the development server (`ng serve`).
- `npm run build`: Builds the application.
- `npm test`: Runs unit tests via Vitest.
- `npm run lint`: (If added) Run linting checks.
