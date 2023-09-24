import { createContext, useContext, useReducer } from "react";

// Define initial state
const initialState = {
	isLoggedIn: false,
	username: "",
	translationHistory: [], // Add translationHistory as an empty array
};

// Create the context
const UserContext = createContext();

// reducer function to handle state changes
const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				username: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
				username: "",
				translationHistory: [], // Clear translation history on logout
			};
		case "UPDATE_TRANSLATION_HISTORY":
			return {
				...state,
				translationHistory: action.payload,
			};
		default:
			return state;
	}
};

// context provider component
const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

// custom hook to access the context
const useUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}

	return context;
};

export { UserProvider, useUser };
