import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/api/getall")
            setUser(response.data)
        }

        fetchData();
    }, [])

    const deleteUser = async (userid) => {
        await axios.delete(`http://localhost:5000/api/delete/${userid}`)
            .then((response) => {
                setUser((preUser) => preUser.filter((user) => user._id !== userid));
                toast.success(response.data.msg, { position: "top-center" });
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (<>
        <Link to={"/add"}><h5 className="m-5">add User</h5></Link>
        <table className="table m-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((user, index) => {
                        return (<tr>
                            <th scope="row">{index + 1}</th>
                            <td>{user.fname} {user.Lname}</td>
                            <td>{user.email}</td>
                            <td className="row">
                                <Link to={"/edit/" + user._id} className="col">edit</Link>
                                <Link onClick={() => {
                                    deleteUser(user._id)
                                }} className="col">delete</Link>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
    )
}

export default User