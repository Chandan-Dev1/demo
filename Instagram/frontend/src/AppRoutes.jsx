import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./feature/auth/pages/Login"
import Register from "./feature/auth/pages/Register"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>welcome to home page </h1>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes