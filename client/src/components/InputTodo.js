import React, { useState } from 'react';

function InputTodo() {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="InputTodo">
            <h1 className="text-center mt-5">  Pern Todo List </h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <button className="btn btn-success"> Add </button>
            </form>

        </div>
    )
}

export default InputTodo;