// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";
import { Link } from "react-router-dom";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    function demoUser() {
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
            .then(closeModal)
    }

    return (
        <>
            <h1 className="login-setup">Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p className="errors">{errors.credential}</p>
                )}
                <button disabled={Object.values(errors).length > 0 || credential.length < 4 || password.length < 6} type="submit">Log In</button>
            </form>
            <Link to={'/'} className="login-setup" onClick={demoUser}>Demo User</Link>
        </>
    );
}

export default LoginFormModal;
