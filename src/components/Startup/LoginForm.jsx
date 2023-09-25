import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../Context/UserContext"; // Import UserContext
import "./LoginForm.css";

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const { state: userState, dispatch } = useUser(); // Access user state and dispatch from context
	const { isLoggedIn } = userState;

	const apiUrl = process.env.REACT_APP_API_URL;
	const apiKey = process.env.REACT_APP_API_KEY;

	const onSubmit = async (data) => {
		try {
			// Check if the user exists
			const response = await fetch(
				`${apiUrl}?username=${data.username}`
			);
			const userData = await response.json();

			if (userData.length > 0) {
				// User exists, update the user state using dispatch
				dispatch({ type: "LOGIN", payload: data.username });

				// Redirect to the Translation Page
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("username", data.username);
				navigate("/translation");
			} else {
				// User doesn't exist, create a new user
				const createUserResponse = await fetch(
					apiUrl,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"X-API-Key": apiKey,
						},
						body: JSON.stringify({ username: data.username }),
					}
				);

				if (createUserResponse.ok) {
					// User created successfully, update the user state using dispatch
					dispatch({ type: "LOGIN", payload: data.username });

					// Redirect to the Translation Page
					localStorage.setItem("isLoggedIn", "true");
					localStorage.setItem("username", data.username);
					navigate("/translation");
				} else {
					// Handle user creation error
					console.error("Error creating user.");
				}
			}
		} catch (error) {
			console.error("Error checking user existence:", error);
		}
	};

	if (isLoggedIn) {
		// If the user is already logged in, redirect to the Translation Page
		navigate("/translation");
		return null;
	}

	return (
		<div className="login-form">
			<h2 className="form-title">Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="center-form">
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						{...register("username", { required: true })}
						className="username-input"
					/>
					{errors.username && (
						<span className="error-message">
							This field is required
						</span>
					)}
				</div>
				<button type="submit" className="login-button">
					Login
				</button>
			</form>
		</div>
	);
}
export default LoginForm;
