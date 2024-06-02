import { Typography } from "antd"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"

export default function AuthLayout() {
    return (
        <div className={styles["auth-layout"]}>
            <Typography.Title>Welcome to Climatly!</Typography.Title>
            <Outlet />
        </div>
    )
}

