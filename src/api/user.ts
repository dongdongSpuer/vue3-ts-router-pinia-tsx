import http from '@/utils/http';

export const Login = (data: any) => {
    return http.post('/login', data);
};
