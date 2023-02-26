import {toast} from 'react-toastify';

const notify = (text, icon) => {
    toast(text, {
        icon: icon,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        progressStyle: {
            backgroundColor: 'var(--aqua)'
        } ,
        style: {
            borderRadius: 15,
            backgroundColor: 'var(--light_bg)',
            padding: 15
        },
    })
}

export default notify;