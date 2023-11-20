import { type InternalAxiosRequestConfig, type AxiosInstance } from 'axios';

type Logger = (curl: string) => void;

export const DISABLE_CURL = `___DISABLE_CURL___`;

export function axios2Curl(instance: AxiosInstance, logger: Logger): void {
  instance.interceptors.request.use((config) => {
    if (config.headers.get(DISABLE_CURL) !== 'true') {
      logger(getCommand(config));
    }

    config.headers.delete(DISABLE_CURL);

    return config;
  });
}

function getCommand(config: InternalAxiosRequestConfig): string {
  let curl = `curl ${getMethod(config)} ${getUrl(config)}`;

  curl += `${getHeaders(config)} ${getBody(config)}`;

  curl = curl.replace(/\s+/g, ' ');

  return curl;
}

function getUrl(config: InternalAxiosRequestConfig): string {
  const url = new URL(
    config.baseURL != null ? `${config.baseURL}${config.url}` : `${config.url}`
  );

  const params: Record<string, string> = {
    ...config.params,
    ...Object.fromEntries(url.searchParams)
  };

  url.search = '';

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return `"${url.toString()}"`;
}

function getMethod(config: InternalAxiosRequestConfig): string {
  return `-X ${config.method?.toUpperCase()}`;
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
