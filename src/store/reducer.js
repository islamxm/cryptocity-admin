import Cookies from "js-cookie";



const initState = {
    // lang: 'en',
    token: Cookies.get('cryptocity-admin-token') ? Cookies.get('cryptocity-admin-token') : null 
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'TOKEN':
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}

export default reducer;