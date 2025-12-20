import { NextResponse } from "next/server";

// ref : https://jsonplaceholder.typicode.com/todos
const todos = [
  {
    id: 1,
    title: "delectus aut autem",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
  {
    id: 4,
    title: "et porro tempora",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: true,
  },
  {
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    content:
      "JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.",
    completed: false,
  },
];

export async function GET() {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json(todos);
}
