import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {

    const users = {
        fname: "",
        Lname: "",
        email: ""
    }

    const [user, setUser] = useState(users);
    const nav = useNavigate();

    console.log(user)

    const inputchangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    }


    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/api/getone/${id}`)
            .then((response) => {
                setUser({
                    fname: response.data.fname,
                    Lname: response.data.Lname,
                    email: response.data.email
                });
            }).catch(error => console.log(error.response))
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/update/${id}`, user)
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
                    <input type="text" name="fname" value={user.fname} onChange={inputchangeHandler} class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" name="Lname" value={user.Lname} onChange={inputchangeHandler} class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" name="email" value={user.email} onChange={inputchangeHandler} class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">update User</button>
            </form>
        </>
    )
}

export default Edit