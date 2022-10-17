import { authenticate } from "../database/firebase";

const authenticateLogin = async (email: string, password: string) => {
    // buscar no banco de dados se exmail existe, se sim
    const isAuthenticated = await authenticate(email, password)
    // find user where user.email === user.password
    if(isAuthenticated) {
        // return true if the email and password are the same
        return true
    } else {
        return false
    }

}

export default authenticateLogin;