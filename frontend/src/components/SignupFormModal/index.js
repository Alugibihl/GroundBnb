import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupFormModal.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect((props) => {
        let err = {}
        if (email.length < 1 || !email.includes('@') || !email.includes('.')) { err.email = 'Please enter a valid email.' }
        if (username.length < 4) { err.username = 'Username must be atleast 4 characters long.' }
        if (username.length > 30) { err.username = 'Username must be shorter than 30 characters' }
      
        if (firstName.length < 2 || firstName.length > 30) { err.firstName = 'First name must be between 2 and 30 characters.' }
        if (lastName.length < 2 || lastName.length > 30) { err.lastName = 'Last name must be between 2 and 30 characters.' }
        if (password.length < 6) { err.password = 'Passwords must be atleast 6 characters long.' }
        setErrors(err)
    }, [email, username, firstName, lastName, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.email}</p>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.username}</p>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.firstName}</p>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.lastName}</p>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.password}</p>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
