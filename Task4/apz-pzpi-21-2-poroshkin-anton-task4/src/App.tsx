import { App as AntdApp } from "antd"
import { Outlet } from "react-router-dom"

function App() {
    return (
        <AntdApp style={{ height: "100%" }}>
            <Outlet />
        </AntdApp>
    )
}

export default App

