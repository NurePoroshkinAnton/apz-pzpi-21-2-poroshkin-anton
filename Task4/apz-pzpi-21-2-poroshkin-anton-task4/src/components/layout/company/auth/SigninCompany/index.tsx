import { Typography } from "antd"
import styles from "./styles.module.scss"
import SigninCompanyForm from "@/components/layout/company/auth/SigninCompany/SigninCompanyForm"

export default function SinginCompany() {
    return (
        <div className={styles["signin-company"]}>
            <Typography.Paragraph>Sign in as company</Typography.Paragraph>
            <SigninCompanyForm />
        </div>
    )
}

