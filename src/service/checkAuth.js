import Cookies from "js-cookie";

const checAuth = async (res) => {
    if(res?.status == 401) {
        Cookies.remove('cryptocity-lk-token');
        window.location.replace(window.location.origin + '/auth')
    } else {
        return res;
    }
}

export default checAuth;