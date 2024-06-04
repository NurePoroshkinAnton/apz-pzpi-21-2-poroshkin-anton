import { Typography } from "antd"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"
import { useTranslation } from "react-i18next"

export default function AuthLayout() {
    const { t } = useTranslation()

    return (
        <div className={styles["auth-layout"]}>
            <Typography.Title>{t("welcome")}</Typography.Title>
            <Outlet />
        </div>
    )
}

