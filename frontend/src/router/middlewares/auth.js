
export default {
    loggedIn: () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }

    }
}