import clienteAxios from './clienteAxios';

const tokenAuth = token =>{
    if(token) {
        clienteAxios.defaults.headers.common['x-access-token'] = token;
    }else {
        delete clienteAxios.defaults.headers.common['x-access-token'];
    }
}

export default tokenAuth;