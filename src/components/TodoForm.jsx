import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!todo.trim()) return;

        addTodo({
            todo: todo.trim(),
            completed: false,
        });

        setTodo("");
    };

    return (
        <form
            onSubmit={add}
            className="
                flex
                w-full
                min-w-0
                overflow-hidden
                rounded-xl
                shadow-lg
            "
        >
            <input
                type="text"
                placeholder="Write Todo..."
                className="
                    min-w-0
                    flex-1
                    bg-white/20
                    px-3
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    duration-150
                    placeholder:text-gray-300
                    focus:bg-white/25
                    focus:ring-2
                    focus:ring-green-400
                    sm:px-4
                    sm:text-base
                "
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <button
                type="submit"
                className="
                    shrink-0
                    bg-green-600
                    px-3
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    duration-200
                    hover:bg-green-700
                    active:scale-95
                    sm:px-5
                    sm:text-base
                "
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;