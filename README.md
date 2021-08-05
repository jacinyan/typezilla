<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="">
    <img src="" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Typezilla</h3>

  <p align="center">
    An agile tracking project management system based on React Hooks with TypeScript
    <br />
    <br />
    <a href="">View Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#app-structure">App Structure</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li><a href="#to-do">To-Do</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is inspired by an professional experience with agile methodology. Jira has its significant place in this, and therefore the project is named Typezilla, as a respectful parody. On top of that, the project acts as a reinforcement of what I have learned about React.js, with a main focus on building custom React hooks, and a first ever practice in TypeScript syntax developing React applications.

### App Structure

```bash
.
├── src
│   ├── __tests__
│   │   ├── integration
│   │   │   └── ProjectList.tsx
│   │   └── unit
│   │       ├── components
│   │       │   └── Highlighting.tsx
│   │       ├── functions
│   │       │   └── configureFetch.ts
│   │       └── hooks
│   │           └── useAsync.ts
│   ├── api
│   │   └── index.ts
│   ├── app
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── AuthenticatedApp.styles.ts
│   │   ├── AuthenticatedApp.tsx
│   │   ├── UnauthenticatedApp.tsx
│   │   ├── UnunthenticatedApp.styles.ts
│   │   ├── components
│   │   │   ├── common
│   │   │   │   ├── Drag.tsx
│   │   │   │   ├── Drop.tsx
│   │   │   │   ├── DropChild.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── ErrorBox.tsx
│   │   │   │   ├── FlexRow.tsx
│   │   │   │   ├── FullPageError.tsx
│   │   │   │   ├── FullPageLoader.tsx
│   │   │   │   ├── IdSelect.tsx
│   │   │   │   ├── Marking.tsx
│   │   │   │   ├── Profiler.tsx
│   │   │   │   ├── ProjectModal.tsx
│   │   │   │   ├── ProjectPopover.tsx
│   │   │   │   ├── TaskModal.tsx
│   │   │   │   └── UserPopover.tsx
│   │   │   ├── epic
│   │   │   │   └── CreateEpic.tsx
│   │   │   ├── kanban
│   │   │   │   ├── CreateSwimLane.tsx
│   │   │   │   ├── CreateTask.tsx
│   │   │   │   ├── Highlighting.tsx
│   │   │   │   ├── More.tsx
│   │   │   │   ├── SearchPanel.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   ├── TaskType.tsx
│   │   │   │   ├── TaskTypeSelect.tsx
│   │   │   │   └── swimlane
│   │   │   │       ├── index.styles.ts
│   │   │   │       └── index.tsx
│   │   │   └── project-list
│   │   │       ├── List.tsx
│   │   │       ├── More.tsx
│   │   │       ├── SearchPanel.tsx
│   │   │       └── UserSelect.tsx
│   │   └── screens
│   │       ├── epic
│   │       │   ├── index.styles.ts
│   │       │   └── index.tsx
│   │       ├── kanban
│   │       │   ├── index.styles.ts
│   │       │   └── index.tsx
│   │       ├── login
│   │       │   ├── index.styles.ts
│   │       │   └── index.tsx
│   │       ├── project
│   │       │   ├── index.styles.ts
│   │       │   └── index.tsx
│   │       ├── project-list
│   │       │   ├── index.styles.ts
│   │       │   └── index.tsx
│   │       └── register
│   │           ├── index.styles.ts
│   │           └── index.tsx
│   ├── assets
│   │   ├── bug.svg
│   │   ├── left.svg
│   │   ├── logo-header.svg
│   │   ├── logo.svg
│   │   ├── right.svg
│   │   └── task.svg
│   ├── contexts
│   │   ├── AuthContext.tsx
│   │   └── index.tsx
│   ├── hooks
│   │   ├── _helpers.ts
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── dragndrop.ts
│   │   ├── epics.ts
│   │   ├── kanban.ts
│   │   ├── projects.ts
│   │   ├── reorder.ts
│   │   ├── task-types.ts
│   │   ├── tasks.ts
│   │   └── users.ts
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── index.ts
│   └── wdyr.ts
├── tsconfig.json
└── yarn.lock
```

### Tech Stack

- Client Side

  - React
  - React Query
  - Antd (CSS framework)
  - React-Beautiful-DnD
  - Emotion
  - Fetch Api
  - Context Api

- Server Side

  A custom component built with Mock Service Worker using local storage as a distributed backend.

- ## 3rd Party Services
- ## Deployment
- Version Control: Git and GitHub

<!-- Custom Hooks -->

## Custom Hooks List

- useDebounce: utilised useState, useEffect along with the web API setTimeout to acquire the latest values only without user interactions in a certain period of time to reduce https requests.
- useAuth:
-
-
-
-
-
-

<!-- TODO -->

## To-Do
