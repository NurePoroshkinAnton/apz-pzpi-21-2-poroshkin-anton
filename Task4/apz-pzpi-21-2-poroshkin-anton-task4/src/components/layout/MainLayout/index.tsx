import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"
import { Button } from "antd"
import { authStore } from "@/store/AuthStore"
import { observer } from "mobx-react-lite"

function MainLayoutComponent() {
    return (
        <div className={styles["main-layout"]}>
            <header>
                <div className={styles["logo"]}>Climatly</div>
                <div>{authStore.company?.name || authStore.client?.name}</div>
                <Button onClick={() => authStore.signout()}>Signout</Button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

const MainLayout = observer(MainLayoutComponent)
export default MainLayout

