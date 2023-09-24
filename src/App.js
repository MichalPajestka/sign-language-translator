import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import Startup from "./views/Startup";
import Translation from "./views/Translation";
import Profile from "./views/Profile";

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route path="/" element={<Startup />} />
						<Route path="/translation" element={<Translation />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
