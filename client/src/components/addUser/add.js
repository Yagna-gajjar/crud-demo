import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const Add = () => {

    const users = {
        fname: "",
        Lname: "",
        email: "",
        password: ""
    }

    const [user, setUser] = useState(users);
    const nav = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/create", user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center" });
                nav("/");
            }).catch(error => console.log(error.response))
    }

    return (
        <>
            <div className="m-5"><Link to={"/"}>Back</Link></div>
            <form className="m-5" onSubmit={submitForm} >
                <div class="mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" name="fname" onChange={inputHandler} class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" name="Lname" onChange={inputHandler} class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" name="email" onChange={inputHandler} class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" onChange={inputHandler} class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Add User</button>
            </form>
        </>
    )
}

export default Add