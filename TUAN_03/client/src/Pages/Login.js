import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../Actions/AuthActions'

const Login = () => {
    const initState = {
        username: "huynh@gmail.com",
        password: "",
    }
    const loading = useSelector((state) => state.authReducer.loading);

    // const mess = useSelector((state) => state.authReducer.message);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);

    const [data, setData] = useState(initState);


    const resetForm = () => {
        setData(initState);
    }

    const handleChange = (e) => {
        setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }


    const handleSubmit = (e) => {
        // resetForm();
        e.preventDefault();
        dispatch(logIn(data, navigate));
        setSubmitted(true);

    }

    return (
        <div className='container_auth'>
            <div>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='username'
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <button disabled={loading} type="submit">
                            {loading ? "loading..." : "LOGIN"}
                        </button>
                    </div>

                    <div className='form-group'>
                        <Link to="/register">REGISTER</Link>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default Login