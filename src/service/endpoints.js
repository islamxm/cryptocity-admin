const BASE_DOMAIN = 'https://cryptocitygame.ru/';
const PATH = `${BASE_DOMAIN}Libs/PersonalCabinet/`;


const endpoints = {
    getTransactions: `${PATH}GetAdminTransactions.php`,
    auth: `${PATH}Authorization.php`,
    logout: `${PATH}LogOut.php`,
    getTransactionUserInfo: `${PATH}GetAdminTransactionUserInfo.php`,
    acceptTrans: `${PATH}AcceptTransaction.php`,
    takeTrans: `${PATH}TakeTransaction.php`,
    rejectTrans: `${PATH}RejectTransaction.php`
}

export default endpoints;