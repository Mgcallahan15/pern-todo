import { Fragment } from "react"
import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo'

function ListTodos() {
    // react hook vars
    const [todos, setTodos] = useState([]);

    //update list rendering
    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();
            setTodos(jsonData);
            console.log("refreshed");
        } catch (err) {
            console.error(err.message);
        }
    }

    //delete a todo from the database
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <Fragment>
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo} /></td>
                                <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        </div >
    )
}

export default ListTodos
