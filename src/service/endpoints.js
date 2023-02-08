const BASE_DOMAIN = 'https://cryptocitygame.ru/';
const PATH = `${BASE_DOMAIN}Libs/PersonalCabinet/`;


const endpoints = {
    getTransactions: `${PATH}GetMyTransactions.php`,
    auth: `${PATH}Authorization.php`,
    logout: `${PATH}LogOut.php`,
}

export default endpoints;