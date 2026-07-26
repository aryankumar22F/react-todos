import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos((prev) => [
            {
                id: Date.now(),
                ...todo,
            },
            ...prev,
        ]);
    };

    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? {
                          ...prevTodo,
                          ...todo,
                      }
                    : prevTodo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id)
        );
    };

    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? {
                          ...prevTodo,
                          completed: !prevTodo.completed,
                      }
                    : prevTodo
            )
        );
    };

    useEffect(() => {
        try {
            const data = localStorage.getItem("todos");

            if (data !== null) {
                const savedTodos = JSON.parse(data);

                if (Array.isArray(savedTodos)) {
                    setTodos(savedTodos);
                }
            }
        } catch (error) {
            console.error("Error loading todos:", error);
            localStorage.removeItem("todos");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );
    }, [todos]);

    return (
        <TodoProvider
            value={{
                todos,
                addTodo,
                updateTodo,
                deleteTodo,
                toggleComplete,
            }}
        >
            <div
                className="
                    min-h-screen
                    w-full
                    overflow-x-hidden
                    bg-[#172842]
                    px-3
                    py-6
                    sm:px-5
                    sm:py-8
                    md:px-8
                    lg:px-10
                "
            >
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-2xl
                        text-white
                    "
                >
                    <h1
                        className="
                            mt-2
                            mb-6
                            text-center
                            text-2xl
                            font-bold
                            sm:mb-8
                            sm:text-3xl
                            md:text-4xl
                        "
                    >
                        Manage Your Todos
                    </h1>

                    <div className="mb-5 w-full sm:mb-6">
                        <TodoForm />
                    </div>

                    <div className="flex w-full flex-col gap-3">
                        {todos.map((todo) => (
                            <div
                                key={todo.id}
                                className="w-full min-w-0"
                            >
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;