import {AxiosError} from 'axios';

export const parseErrors = (error: AxiosError): string => {
  if (error.response?.data) {
    return error.response?.data;
  } else {
    return error.message;
  }
};
