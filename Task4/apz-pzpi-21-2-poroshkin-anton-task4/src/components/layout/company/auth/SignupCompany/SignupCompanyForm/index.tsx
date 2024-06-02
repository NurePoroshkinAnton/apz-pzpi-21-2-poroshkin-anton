import { SignupComapnyDto } from "@/types/auth/dto/SignupCompanyDto"
import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"
import { authStore } from "@/store/AuthStore"

export default function SignupCompanyForm() {
    const navigate = useNavigate()

    function handleFormSubmit(values: SignupComapnyDto) {
        authStore.signupCompany(values)
    }

    return (
        <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="Company name" name="name">
                <Input />
            </Form.Item>
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
                        Sign up
                    </Button>
                    <Button
                        type="default"
                        onClick={() => navigate("/auth/company/signin")}
                    >
                        Use existing account
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

