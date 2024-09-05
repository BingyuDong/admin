declare global {
    interface LoginParams { 
        account: string, 
        password: string 
    }
    interface Loginrespond { 
        token: string, 
        userId: string 
    }
}

export { }