import Cookies from 'js-cookie';

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const setCookie = (key, value) => {
  try {
    if (value) {
      Cookies.set(key, JSON.stringify(value), { expires: 30 });
    }
  } catch (e) {
    return false;
  }

  return false;
};

export const getCookie = (key) => {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (e) {
    return false;
  }
};
