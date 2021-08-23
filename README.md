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

This project is inspired by an professional experience with agile methodology, in which Jira has its significant place. At the same time, I had been planning to embark on my journey using TypeScript, and therefore the project is named Typezilla, as a respectful parody to them both. In a nutshell, the project acts as a reinforcement and improvement of what I have learned about React.js, with a main focus on custom React hooks this time around, despite the fact that the implementations seem gratuitous. This is also my first ever practice in TypeScript syntax building complete React applications.

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

  - A custom component built with Mock Service Worker using local storage as a distributed backend.

- CI/CD
  - Github Actions
- Deployment
  - Github Pages
- Version Control
  - Git and GitHub

<!-- Custom Hooks -->

## List of Main Custom Hooks

- useDebounce: This hook debounces any fast changing value so that it will only reflect the latest value when the useDebounce hook has not been called for the specified time period
- useMount: This hook calls a function after the component is mounted
- useMountedRef: This hook keeps track of a component's mounted / un-mounted status and returns a ref object with a boolean value representing said status
- useSafeDispatch: This hook handles edge cases where states are being set on an unmounted component after async tasks are completed, in conjunction with useMountedRef.
- useDocumentTitle: This hook sets the current title of the document
- useURLSearchParams: This hook uses URL query string to state manage search params
- useAuth: This hooks enables any component to get the current auth state and re-render if it changes
- useConfigureFetch: This hook is an abstraction of making http requests in conjunction with useAuth for embedding token
- useAsyncTask: This hook makes async calls and also know the current state of the request
- useQueriesConfig: With React Query, this hooks highly centralizes the configuration of inputting corresponding http requests parameters (except 'GET') and set up query keys along with the handling of Promises where optimistic updates are also enabled
- useDragEnd: This hooks provides a simplified way for components to be connected to React-Drag-Drop system

The rest of custom hooks are created for dealing CRUD specifically, feel free to check them out in 'src/hooks'

 <!-- TODO -->

## To-Do

Testing with React Library in process
