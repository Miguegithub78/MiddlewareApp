import clienteAxios from './clienteAxios';

const tokenAuth = token =>{
    if(token) {
        console.log('token de token', token);
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else {
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;