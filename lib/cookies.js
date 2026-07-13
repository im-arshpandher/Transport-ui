import Cookies from 'js-cookie';

export const saveCookie = (name, value, options) => {
  Cookies.set(name, value, options);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};

export const saveToken = (token) => {
  Cookies.set('jwt', token, { expires: 7 });
  localStorage.setItem('jwt', token);
};

export const removeToken = () => {
  Cookies.remove('jwt');
  localStorage.removeItem('jwt');
};

export const getToken = () => {
  return Cookies.get('jwt') || localStorage.getItem('jwt');
}; 