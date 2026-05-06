import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./feature/auth/Login"
import Register from "./feature/auth/Register"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes