export const data = [
  {
    id: 1,
    title: 'Design Database Schema',
    description:
      'Create the initial PostgreSQL entity-relationship diagram and define table relationships for the user service.',
    priority: 'high',
    dueDate: new Date('2026-06-05'),
    category: 'work',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Review Q2 Budget Draft',
    description:
      'Go over the marketing and infrastructure spend proposals for the upcoming quarter with the finance team.',
    priority: 'medium',
    dueDate: new Date('2026-05-30'),
    category: 'work',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Fix Authentication Token Bug',
    description:
      'Resolve the issue where JWT tokens are expiring 15 minutes earlier than the configured duration in the auth middleware.',
    priority: 'high', // Adjusted from 'Critical' to fit allowed types
    dueDate: new Date('2026-05-28'),
    category: 'work',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Update Project Documentation',
    description:
      'Add setup instructions for the new Docker environment and update the API endpoint collection in the README file.',
    priority: 'low',
    dueDate: new Date('2026-06-12'),
    category: 'study', // Adjusted to fit allowed types
    status: 'pending',
  },
  {
    id: 5,
    title: 'Prepare Client Presentation Docs',
    description:
      'Compile the latest sprint metrics, velocity charts, and product feature demonstrations for the Friday review sync.',
    priority: 'high',
    dueDate: new Date('2026-06-01'),
    category: 'work',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Conduct Code Review for PR #42',
    description:
      'Review the pull request for the dark mode UI implementation to ensure CSS variables comply with the design system.',
    priority: 'medium',
    dueDate: new Date('2026-05-25'),
    category: 'personal', // Adjusted to fit allowed types
    status: 'completed',
  },
];
