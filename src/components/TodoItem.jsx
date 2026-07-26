import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] =
        useState(false);

    const [todoMsg, setTodoMsg] = useState(todo.todo);

    const {
        updateTodo,
        deleteTodo,
        toggleComplete,
    } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, {
            ...todo,
            todo: todoMsg,
        });

        setIsTodoEditable(false);
    };

    return (
        <div
            className="
                flex
                w-full
                min-w-0
                items-center
                gap-2
                rounded-xl
                bg-white
                p-2
                shadow-sm
                sm:gap-3
                sm:p-3
            "
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                className="h-5 w-5 shrink-0 accent-green-600"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />

            {/* Todo Text */}
            <input
                type="text"
                className={`
                    min-w-0
                    flex-1
                    bg-transparent
                    px-2
                    py-2
                    text-sm
                    text-gray-800
                    outline-none
                    sm:text-base
                    ${
                        todo.completed
                            ? "line-through opacity-60"
                            : ""
                    }
                `}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit / Save */}
            <button
                type="button"
                className="
                    shrink-0
                    rounded-lg
                    bg-blue-500
                    px-2
                    py-2
                    text-xs
                    text-white
                    sm:px-4
                    sm:text-sm
                "
                onClick={() => {
                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable(true);
                    }
                }}
            >
                {isTodoEditable ? "Save" : "Edit"}
            </button>

            {/* Delete */}
            <button
                type="button"
                className="
                    shrink-0
                    rounded-lg
                    bg-red-500
                    px-2
                    py-2
                    text-xs
                    text-white
                    sm:px-4
                    sm:text-sm
                "
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default TodoItem;