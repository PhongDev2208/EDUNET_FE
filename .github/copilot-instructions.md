# EduNet — AI Coding Instructions

## Project Overview

EduNet is a **Vietnamese ed-tech platform** (React 19 + TypeScript) with two distinct surfaces: a student/teacher-facing **user app** and an **admin dashboard**. Backend API runs at `http://localhost:3000`; many admin hooks still use mock data with `setTimeout` simulations.

## Architecture

- **Routing:** React Router v7 with `createBrowserRouter`. User pages nest under `<AppLayout />` (`/`), admin pages under `<AdminLayout />` (`/admin`). Auth pages (`/auth/*`, `/admin/login`) are standalone (no layout wrapper). See `src/router/index.tsx`.
- **State & Data Fetching:** RTK Query is the primary data layer — **not** Redux slices. Each domain has a separate `createApi` instance (`authApi`, `courseApi`, `learningApi`, `supportApi`) registered independently in the store. Use the auto-generated hooks (e.g., `useGetCoursesQuery`) — never call `axios` directly from components.
- **Auth:** JWT tokens stored in `localStorage` via `src/services/axiosBaseQuery.ts` helpers (`setTokens`, `clearTokens`, `getAccessToken`). The `axiosBaseQuery` auto-attaches `Authorization: Bearer` headers. User auth flows through `useAuth` hook; admin auth through `useAdminAuth` (currently mock-based).

## Key Conventions

### File & Folder Structure
- **Pages:** One folder per page (`src/pages/user/Home/`, `src/pages/admin/Dashboard/`). Pages are thin composers that assemble section components — keep logic in hooks.
- **Components:** Domain-scoped directories (`components/Home/`, `components/admin/`, `components/DetailCourse/`). Reusable UI goes in `components/common/`.
- **Barrel exports:** Always maintain `index.ts` barrels in `components/admin/`, `components/common/`, `hooks/`, `services/`, `types/`, and `src/pages/admin/`. Import from barrels, not direct file paths.

### Exports
- **Components & pages:** Use `export default` (PascalCase names).
- **Hooks:** Named `export const useXxx`. Some also have `export default` for backward compat — prefer named imports.
- **Utilities:** Named arrow-function exports only. Add JSDoc `/** */` comments.
- **Types/interfaces:** Use `export interface` in the relevant service file or `types/` directory. Use `import type` syntax.

### Styling
- **Tailwind CSS** for layout and spacing. **Ant Design v6** for interactive components (`Button`, `Table`, `Modal`, `Drawer`, `Form`, `message`).
- Brand colors: navy `#012643`, pink accent `#e5698e`, cyan `#17EAD9`, primary blue `#30C2EC`. These are hardcoded in Tailwind classes (e.g., `text-[#e5698e]`).
- Dark mode managed via CSS custom properties on `document.documentElement` — see `useTheme` hook.

### Hooks Pattern
Custom hooks encapsulate all feature logic. Follow the established shape:
```typescript
// src/hooks/useFeature.ts
export const useFeature = (options?: Options): UseFeatureReturn => {
  // RTK Query hooks for data
  // useCallback for all handler functions
  // useMemo for derived/computed values
  // Return a typed object interface
};
```
Generic reusable hooks (`usePagination`, `useSearchFilter`, `useModal`) accept `<T>` type parameters.

### RTK Query Services
Each service in `src/services/` defines its own `createApi` with:
- A custom `axiosBaseQuery` (not `fetchBaseQuery`)
- `tagTypes` for cache invalidation
- Query format: `{ url, method, data?, params? }`
- Shared types `ApiResponse<T>` and `PaginatedResponse<T>` imported from `authApi.ts`

When adding endpoints, follow the existing section-comment pattern (`// ============ SECTION ============`) and always configure `providesTags` / `invalidatesTags`.

### Types
- **Domain models** (Course, Chat entities): `src/models/` — pure interfaces, no runtime code.
- **API-layer types** (request/response shapes): Co-located in their service file (`courseApi.ts`, `learningApi.ts`).
- **Feature-specific UI types** (admin tables, profile forms): `src/types/`.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (Vite on rolldown-vite) |
| Build | `npm run build` (`tsc -b && vite build`) |
| Lint | `npm run lint` |
| Preview prod | `npm run preview` |
| Tests | `npx vitest` (vitest configured, jsdom environment) |

## Localization Note

UI strings are hardcoded in **Vietnamese** (not i18n). Admin toasts use `message.success('Thành công!')` etc. Validation utils include Vietnamese phone and ID card formats. Maintain this pattern — do not introduce English UI text in Vietnamese-facing surfaces.

## File Upload

AWS S3 integration via `src/services/s3Service.ts` — a class-based singleton using `@aws-sdk/client-s3` with presigned URLs. Instantiate with config; do not hardcode credentials.
