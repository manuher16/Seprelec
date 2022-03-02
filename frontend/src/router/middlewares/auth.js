import axios from 'axios';
export default {
    loggedIn: async (to) => {
        try {

            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.VUE_APP_API_URL}/api/utils/validate-jwt`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'to': `${to.fullPath}`,
                }
            })

            return res.data.isAuthenticated;
        }
        catch (e) {
            console.log(e);
            //location.href = '/';
            return false;
        }

    }
}