import { SigninCompanyDto } from "@/types/auth/dto/SigninCompanyDto"
import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"
import { authStore } from "@/store/AuthStore"

export default function SigninCompanyForm() {
    const navigate = useNavigate()

    function handleFormSubmit(values: SigninCompanyDto) {
        authStore.signinCompany(values)
    }

    return (
        <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="Email" name="email">
                <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
                <div className={styles["buttons-block"]}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={authStore.isLoading}
                    >
                        Sign in
                    </Button>
                    <Button
                        type="default"
                        onClick={() => navigate("/auth/company/signup")}
                    >
                        Create new accounnt
                    </Button>
                    <Button
                        type="default"
                        onClick={() => navigate("/auth/client")}
                    >
                        Sign in as client
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

