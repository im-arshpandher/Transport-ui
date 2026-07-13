# Admin Section (To Be Migrated)

This section of the application has not been migrated to Next.js yet.
When you are ready to build the admin dashboard in the future, follow these conventions:

1. Create a `layout.jsx` in this folder that includes your `<ProtectedRoute>` and Sidebar/Navbar specific to the admin area.
2. For route protection, Next.js Middleware (`middleware.js` at the root) is recommended instead of a client-side wrapper component, to prevent unauthorized flashes of content.
3. Migrate the components from `src/admin` (now legacy) into Next.js standard pages like `dashboard/page.jsx`, `users/page.jsx`, etc.
