import { Link, Outlet } from "react-router-dom"
import styles from "./styles.module.scss"
import { Button } from "antd"
import { authStore } from "@/store/AuthStore"
import { observer } from "mobx-react-lite"

function MainLayoutComponent() {
    return (
        <div className={styles["main-layout"]}>
            <header>
                <div className={styles["logo"]}>Climatly</div>
                <nav className={styles["navigation"]}>
                    <ul className={styles["navigation-list"]}>
                        <li>
                            <Link to={"/hotels"}>Hotels</Link>
                        </li>
                        <li>
                            <Link to={"/clients"}>Clients</Link>
                        </li>
                        <li>
                            <Link to={"/stats"}>Statistics</Link>
                        </li>
                    </ul>
                </nav>
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

