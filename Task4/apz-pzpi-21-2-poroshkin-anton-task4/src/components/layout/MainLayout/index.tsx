import { Typography } from "antd"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"

export default function MainLayout() {
    return (
        <div className={styles["main-layout"]}>
            <Typography.Title>Main layout</Typography.Title>
            <Outlet />
        </div>
    )
}

