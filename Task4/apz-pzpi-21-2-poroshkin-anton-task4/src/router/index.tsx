import App from "@/App"
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"
import AuthLayout from "@/components/layout/AuthLayout"
import SinginCompany from "@/components/layout/company/auth/SigninCompany"
import SignupCompany from "@/components/layout/company/auth/SignupCompany"

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <div>Home page</div>,
                    },
                ],
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "company/signin",
                        element: <SinginCompany />,
                    },
                    {
                        path: "company/signup",
                        element: <SignupCompany />,
                    },
                    {
                        path: "client",
                        element: <div>Client auth page</div>,
                    },
                ],
            },
        ],
    },
])

