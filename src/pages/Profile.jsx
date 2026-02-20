import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import { useState, useEffect } from 'react';
import '../components/HomeMap.css';

function Profile({ user }) {
    //to load profile data
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                lastname: user.lastname || "",
                email: user.email || "",
                username: user.username || "",
                password: ""
            });
        }
    }, [user]);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to deactivate your account?");

        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5555/users/${user.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account deleted successfully");

                localStorage.removeItem("token");

                window.location.href = "/";
            } else {
                alert(data.message || "Error deleting account");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }
    };


    const myAction = async (formData) => {
        console.log(formData)
        // server side logic or client side logic
        const response = await fetch(`http://localhost:5555/users/${user.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', //server expect JSON
            },
            // stringify object for  body
            body: JSON.stringify(formData),

        })

        if (response.ok) {
            alert("user updated");
        }
    };

    //to prevent from not loading user logged data
    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className='home-component'>
            <div class="profile-wrapper">
                <div class="profile-card p-4">

                    <div class="text-center mb-4">
                        <h3 class="fw-bold">@{user.username}</h3>
                        <h6 className="text-secondary">{user.name} {user.lastname}</h6>
                        <small className="text-muted">{user.email}</small>
                    </div>

                    <div class="mb-4">
                        <div class="section-title mb-3">Edit Profile</div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            await myAction(formData);
                        }}>

                            <div class="row mb-3">
                                <div class="col">
                                    <input name='name' type="text" class="form-control" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div class="col">
                                    <input name='lastname' type="text" class="form-control" placeholder="Lastname" value={formData.lastname}
                                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                                </div>
                            </div>

                            <div class="mb-3">
                                <input name='email' type="email" class="form-control" placeholder="Email" value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>

                            <div class="mb-3">
                                <input name='username' type="text" class="form-control" placeholder="Username" value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>

                            <div class="mb-3">
                                <input name='password' type="password" class="form-control" placeholder="New Password" value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <button type="submit" class="btn btn-dark w-100">
                                Update Profile
                            </button>

                        </form>
                    </div>

                    <div class="text-center">
                        <button onClick={handleDeleteAccount} type="button" class="btn btn-outline-danger">
                            Deactivate My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile