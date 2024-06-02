import { makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { authService } from "@/api/AuthService"
import { ACCESS_TOKEN_LS_KEY } from "@/config/constants"
import { Company } from "@/types/companies/entities/Company"
import { Client } from "@/types/clients/entities/Client"
import { SigninCompanyDto } from "@/types/auth/dto/SigninCompanyDto"
import { SignupComapnyDto } from "@/types/auth/dto/SignupCompanyDto"

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    company: Company | null = null
    client: Client | null = null
    isLoading = false
    isReady = false

    async signinCompany(dto: SigninCompanyDto) {
        try {
            this.isLoading = true

            const signinResponse = await authService.signinCompany(dto)

            localStorage.setItem(
                ACCESS_TOKEN_LS_KEY,
                signinResponse.accessToken
            )

            const profile = await authService.getCompanyProfile()

            runInAction(() => {
                this.company = profile
            })
        } catch (error) {
            message.error(
                "An error occured while signing-in. Please, try again later"
            )
        } finally {
            this.isLoading = false
        }
    }

    async signupCompany(dto: SignupComapnyDto) {
        try {
            this.isLoading = true

            const signupResponse = await authService.signupCompany(dto)

            localStorage.setItem(
                ACCESS_TOKEN_LS_KEY,
                signupResponse.accessToken
            )

            const profile = await authService.getCompanyProfile()

            runInAction(() => {
                this.company = profile
            })
        } catch (error) {
            message.error(
                "An error occured while signing-up. Please, try again later"
            )
        } finally {
            this.isLoading = false
        }
    }

    async signinClient() {
        try {
            this.isLoading = true

            const signinResponse = await authService.signinClient()

            localStorage.setItem(
                ACCESS_TOKEN_LS_KEY,
                signinResponse.accessToken
            )

            const profile = await authService.getClientProfile()

            runInAction(() => {
                this.client = profile
            })
        } catch (error) {
            message.error(
                "An error occured while signing-in. Please, try again later"
            )
        } finally {
            this.isLoading = false
        }
    }

    setReady(isReady: boolean) {
        this.isReady = isReady
    }

    async getCompanyProfile() {
        const profile = await authService.getCompanyProfile()

        runInAction(() => {
            this.company = profile
            this.isReady = true
        })
    }

    async getClientProfile() {
        const profile = await authService.getClientProfile()

        runInAction(() => {
            this.client = profile
            this.isReady = true
        })
    }

    async signout() {
        runInAction(() => {
            this.client = null
            this.company = null
        })

        localStorage.setItem(ACCESS_TOKEN_LS_KEY, "")
    }
}

export const authStore = new AuthStore()

