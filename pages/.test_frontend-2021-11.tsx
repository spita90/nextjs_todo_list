// import type { NextPage } from 'next'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// type Todo = {
//   userId: number
//   id: number
//   title: string
//   completed: boolean
// }

// const Home: NextPage = () => {
//   const router = useRouter()
//   const [todos, setTodos] = useState<Todo[]>([])
//   const [search, setSearch] = useState('')
//   const [results, setResults] = useState<Todo[]>([])

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos')
//       .then(response => response.json())
//       .then(setTodos)
//   }, [])

//   useEffect(() => {
//     setResults(todos)
//   }, [todos])

//   useEffect(() => {
//     const results = todos.filter(item => item.title.includes(search))
//     setResults(results)
//   }, [search, todos])

//   const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value)
//   }

//   const handleOnClickTodo = (id: number) => {
//     router.push('/todo/' + id)
//   }

//   const handleOnClickDelete = (id: number) => {
//     setResults(results.filter(item => item.id !== id))
//     setTodos(todos.filter(item => item.id !== id))
//   }

//   return (
//     <div style={styles.container}>
//       <main style={styles.main}>
//         <input
//           style={styles.search}
//           value={search}
//           onChange={handleOnChangeInput}
//           placeholder='Search todo...'
//         />
//         {results.map(({ id, title, completed }) => (
//           <div
//             key={id}
//             style={styles.item}
//             onClick={() => handleOnClickTodo(id)}
//           >
//             <p>{title}</p>
//             {completed ? <p>✅</p> : null}
//             <button onClick={() => handleOnClickDelete(id)}>Delete</button>
//           </div>
//         ))}
//       </main>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     padding: '0.5rem'
//   },
//   main: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   item: {
//     width: '100%',
//     padding: '0.5rem',
//     border: '1px solid whitesmoke',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   search: {
//     padding: '0.5rem',
//     marginBottom: '0.5rem',
//     width: '100%',
//     color: 'black',
//     border: '1px solid black'
//   }
// }

// export default Home
