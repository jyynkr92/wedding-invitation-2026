# Frontend Project Agent Instructions

## 🧠 General Principles

- Write clean, maintainable, production-level code
- Prefer readability over cleverness
- Avoid unnecessary abstractions
- Follow existing project patterns
- Do not introduce new libraries unless necessary

---

## 🏗 Tech Stack

- React + TypeScript
- Functional components only
- Vite or Next.js environment
- State management: Zustand
- Server state: TanStack Query
- Styling: Tailwind CSS

---

## 📂 Architecture Rules

- Use feature-based folder structure
- Keep components small and focused
- Separate UI, hooks, and business logic

Preferred structure:

feature/
├── components/
├── hooks/
├── stores/
├── types/
└── utils/

---

## 🧩 Component Rules

- Use function components only
- Use arrow functions
- Use named exports (no default export)
- Props must be fully typed
- Avoid inline complex logic in JSX

---

## 🎣 Hooks Rules

- Extract reusable logic into custom hooks
- Hooks must start with "use"
- Do not mix UI logic inside hooks

---

## 🗄 State Management Rules

### Global State

- Use Zustand only
- Keep store minimal
- Avoid storing derived state

### Server State

- Use TanStack Query
- Do not use useEffect for data fetching

---

## 🎨 Styling Rules

- Use Tailwind CSS only
- No inline styles
- Prefer utility classes over custom CSS

---

## 🧪 TypeScript Rules

- No `any` type
- Prefer strict typing
- Use type over interface unless extending
- Always type function return values

---

## 🔄 Performance Rules

- Avoid unnecessary re-renders
- Use memoization only when needed
- Do not prematurely optimize

---

## 🧹 Code Quality Rules

- Keep functions under 50 lines
- Avoid deeply nested logic
- Use early returns

---

## 🚫 Things to Avoid

- Redux
- Class components
- Default exports
- Overusing useEffect
- Prop drilling (use state/store instead)

---

## 🧾 When Generating Code

Agent should:

- Follow existing folder structure
- Reuse existing utilities when possible
- Write minimal but complete implementations
- Include types by default

---

## Naming Conventions

- Components: PascalCase
- Hooks: useCamelCase
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- All file names must use kebab-case
- Do not use camelCase or PascalCase for file names
