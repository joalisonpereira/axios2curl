import { type InternalAxiosRequestConfig, type AxiosInstance } from 'axios';

type Logger = (message: string) => void;

export const DISABLE_HEADER = `___DISABLE_CURL___`;

export function axios2Curl(instance: AxiosInstance, logger: Logger): void {
  instance.interceptors.request.use((config) => {
    if (config.headers.get(DISABLE_HEADER) !== 'true') {
      logger(getCommand(config));
    }

    return config;
  });
}

function getCommand(config: InternalAxiosRequestConfig): string {
  let message = `curl ${getMethod(config)} ${getUrl(config)}`;

  message += `${getHeaders(config)} ${getBody(config)} ${getParams(config)}`;

  message = message.replace(/\s+/g, ' ');

  return message;
}

function getUrl(config: InternalAxiosRequestConfig): string {
  const url = new URL(
    config.baseURL != null ? `${config.baseURL}${config.url}` : `${config.url}`
  );

  url.search = '';

  return `"${url.toString()}"`;
}

function getMethod(config: InternalAxiosRequestConfig): string {
  return `-X ${config.method?.toUpperCase()}`;
}

function getParams(config: InternalAxiosRequestConfig): string {
  let paramsString = '';

  const url = new URL(`${config.baseURL}${config.url}`);

  const params: Record<string, string> = {
    ...config.params,
    ...Object.fromEntries(url.searchParams)
  };

  Object.entries(params).forEach(([key, value]) => {
    paramsString += ` -d ${key}=${value} `;
  });

  return paramsString;
}

function getBody(config: InternalAxiosRequestConfig): string {
  let body = '';

  if (config.data != null) {
    body = ` -d '${JSON.stringify(config.data)}' `;
  }

  return body;
}

function getHeaders(config: InternalAxiosRequestConfig): string {
  let headers = '';

  if (config.headers != null) {
    Object.entries(config.headers).forEach(([key, value]) => {
      if (value != null) {
        headers += ` -H "${key}: ${value}" `;
      }
    });
  }

  return headers;
}
