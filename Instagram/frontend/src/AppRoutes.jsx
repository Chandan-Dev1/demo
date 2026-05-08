import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./feature/auth/pages/Login"
import Register from "./feature/auth/pages/Register"
import Feed from "./feature/post/pages/Feed"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes