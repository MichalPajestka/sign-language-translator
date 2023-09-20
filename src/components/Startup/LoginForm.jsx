import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			// Check if the user exists
			const response = await fetch(
				`https://translations-api-production-3e9d.up.railway.app/translations?username=${data.username}`
			);
			const userData = await response.json();

			if (userData.length > 0) {
				// User exists, redirect to the Translation Page
				navigate("/translation");
			} else {
				// User doesn't exist, create a new user
				const createUserResponse = await fetch(
					"https://translations-api-production-3e9d.up.railway.app/translations",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username: data.username }),
					}
				);

				if (createUserResponse.ok) {
					// User created successfully, redirect to the Translation Page
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

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						{...register("username", { required: true })}
					/>
					{errors.username && <span>This field is required</span>}
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LoginForm;
