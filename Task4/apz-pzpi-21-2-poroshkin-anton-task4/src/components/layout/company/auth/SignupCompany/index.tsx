import { Typography } from "antd"
import styles from "./styles.module.scss"
import SignupCompanyForm from "@/components/layout/company/auth/SignupCompany/SignupCompanyForm"

export default function SignupCompany() {
    return (
        <div className={styles["signup-company"]}>
            <Typography.Paragraph>Sign up as company</Typography.Paragraph>
            <SignupCompanyForm />
        </div>
    )
}

