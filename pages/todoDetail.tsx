import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { capitalize, Todo } from ".";

const TodoDetail: NextPage = () => {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo>();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    // checks todo id validity
    if (isNaN(Number(id)) || Number(id) < 1) {
      return console.error("Invalid todo id");
    } else {
      const todoId = Number(id);
      fetchTodoDetail(todoId);
    }
  }, [id]);

  const fetchTodoDetail = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(async (response) => {
        // detects response errors like 404, etc.
        if (!response.ok) throw new Error("Error " + response.status);
        // added async/await since .json() returns a Promise
        return await response.json();
      })
      .then(setTodo)
      // added catch block in order to handle errors
      .catch((e) => {
        console.error(e);
      });
  };

  const TodoItemCheck = ({ item }: { item: Todo }) => (
    <div
      style={{
        ...styles.todoCheck,
        backgroundColor: item.completed
          ? "rgba(0,255,0,0.2)"
          : "rgba(255,0,0,0.2)",
      }}
    >
      {item.completed ? <p>✅</p> : <p>❎</p>}
    </div>
  );

  const TodoItem = ({ item }: { item: Todo }) => (
    <div style={styles.item}>
      <TodoItemCheck item={item} />
      {todo && (
        <p
          style={{
            // added line-through on text if todo is completed
            textDecoration: item.completed ? "line-through" : "none",
          }}
        >
          {/* Text is capitalized */}
          {capitalize(todo.title)}
        </p>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h1 style={styles.heading}>TodoApp - Todo detail</h1>
        <button style={styles.backBtn} onClick={() => router.back()}>
          Go back
        </button>
        {todo && <TodoItem item={todo} />}
      </main>
    </div>
  );
};

const styles = {
  container: {
    padding: "0.5rem",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginBottom: "30px",
    fontWeight: "bold",
  },
  backBtn: {
    padding: "0.5rem 0.7rem",
    borderWidth: "1px",
    borderRadius: "0.7rem",
    marginBottom: "2rem",
  },
  item: {
    display: "flex",
    grow: 1,
    maxWidth: "600px",
    padding: "0.5rem 1.5rem 0.5rem 0.5rem",
    backgroundColor: "rgba(200,200,200,0.4)",
    border: "1px solid grey",
    borderRadius: "1rem",
    alignItems: "center",
    justifyContent: "start",
  },
  todoCheck: {
    border: "1px solid grey",
    padding: "0px 16px",
    borderRadius: "1rem",
    marginRight: "2rem",
  },
};

export default TodoDetail;
