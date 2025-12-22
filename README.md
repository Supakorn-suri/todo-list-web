# Todo List Web

A simple Todo web application built with Next.js (App Router) and Mantine UI.

## Features
- CRUD operations for Todos using React Context
- Mock API at `/app/api/todos/route.ts` with simulated network delay
- Responsive UI with loading skeletons and empty state
- Simulated error scenarios for creating Todos
- User notifications for success and error states

## Requirements
- Node.js 20.9 or later (LTS)

This project is built with Next.js (App Router).  
The Node.js requirement follows the official
[Next.js documentation](https://nextjs.org/docs/app/getting-started/installation).

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/Supakorn-suri/todo-list-web.git
cd "todo-list-web"
```
2. Install dependencies
```bash
yarn install
```
> This project is primarily developed using Yarn (Plug'n'Play), but npm and pnpm are also supported.

3. (If using Yarn PnP) Configure VS Code TypeScript SDK
   Yarn PnP removes `node_modules` and uses a virtual filesystem. To make VS Code work with the PnP TypeScript SDK:
```bash
yarn dlx @yarnpkg/sdks vscode
```
> This sets `.vscode/settings.json` to use `.yarn/sdks/typescript/lib/tsserver.js`.

4. Run dev server
```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   ```
5. Open http://localhost:3000

## Demo Video
https://drive.google.com/file/d/1-GM7cNQfK73hvpDkUrlYONKcvcUqz7fN/view?usp=sharing

### Live Preview
You can check the live UI preview here: [Preview Link](https://jam.dev/c/c3df9ea2-4f41-4c9b-868e-7790869da705)

