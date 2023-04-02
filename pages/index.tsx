/**
 * I todo item adesso possono essere settati come completed
 * cliccando sul relativo checkBox a sinistra,
 * cancellati cliccando sul tasto Delete a destra,
 * o se ne può vedere un minimale dettaglio cliccando sul testo.
 */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 * Return the capitalized string ("hello world => Hello world")
 * @param string the input string
 */
export const capitalize = (string: string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;

const Home: NextPage = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(async (response) => {
        // detects response errors like 404, etc.
        if (!response.ok) throw new Error("Error " + response.status);
        // added async/await since .json() returns a Promise
        return await response.json();
      })
      .then(setTodos)
      // added catch block in order to handle errors
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    setResults(todos);
  }, [todos]);

  useEffect(() => {
    const results = todos.filter((item) =>
      //added .toLowerCase() to act without case-sensitivity
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setResults(results);
  }, [search, todos]);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnClickTodo = (id: number) => {
    // opens todoDetail page. Todo id is passed as a query param
    router.push({ pathname: "/todoDetail", query: { id: id } });
  };

  // sets todo as completed when its check button is pressed
  const handleOnClickTodoCheck = (id: number) => {
    const updatedTodos = [...todos];
    const changedTodo = updatedTodos.find((todo) => todo.id === id);
    if (!changedTodo) return;
    changedTodo.completed = !changedTodo.completed;
    setTodos(updatedTodos);
  };

  const handleOnClickDelete = (id: number) => {
    setResults(results.filter((item) => item.id !== id));
    setTodos(todos.filter((item) => item.id !== id));
  };

  const TodoItem = ({ item }: { item: Todo }) => (
    <div style={styles.item} onClick={() => handleOnClickTodo(item.id)}>
      <div
        style={{
          ...styles.todoCheck,
          backgroundColor: item.completed
            ? "rgba(0,255,0,0.2)"
            : "rgba(255,0,0,0.2)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleOnClickTodoCheck(item.id);
        }}
      >
        {item.completed ? <p>✅</p> : <p>❎</p>}
      </div>
      <p
        style={{
          ...styles.itemTitle,
          // added line-through on text if todo is completed
          textDecoration: item.completed ? "line-through" : "none",
        }}
      >
        {/* Text is capitalized */}
        {capitalize(item.title)}
      </p>
      <button
        style={styles.deleteItem}
        onClick={(e) => {
          e.stopPropagation();
          handleOnClickDelete(item.id);
        }}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h1 style={styles.heading}>TodoApp</h1>
        <div>
          <input
            style={styles.search}
            value={search}
            onChange={handleOnChangeInput}
            placeholder="Search todo..."
          />
          <button style={styles.eraseSearch} onClick={() => setSearch("")}>
            ❌
          </button>
        </div>
        <div style={styles.todoList}>
          {results.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
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
  },
  search: {
    padding: "0.5rem",
    marginBottom: "0.5rem",
    width: "500px",
    color: "black",
    borderRadius: "0.8rem",
    border: "1px solid black",
  },
  eraseSearch: {
    marginLeft: "1rem",
    padding: "0.5rem 0.7rem",
    borderWidth: "1px",
    borderRadius: "0.7rem",
  },
  todoList: {
    marginTop: "40px",
  },
  item: {
    cursor: "pointer",
    width: "100%",
    padding: "0.5rem 1.5rem 0.5rem 0.5rem",
    backgroundColor: "rgba(200,200,200,0.4)",
    border: "1px solid grey",
    borderRadius: "1rem",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  todoCheck: {
    border: "1px solid grey",
    padding: "0px 16px",
    borderRadius: "1rem",
    marginRight: "2rem",
  },
  itemTitle: {
    flexGrow: 1,
    marginRight: "20px",
  },
  deleteItem: {
    cursor: "pointer",
    padding: "0.5rem 1.5rem",
    borderWidth: "1px",
    borderRadius: "0.8rem",
  },
};

export default Home;
