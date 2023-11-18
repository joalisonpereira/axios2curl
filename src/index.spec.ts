import { it, describe, expect } from 'vitest';
import { DISABLE_CURL, axios2Curl } from '.';
import MockAdapter from 'axios-mock-adapter';
import axios, { type AxiosInstance } from 'axios';

describe('Functions', () => {
  const createApi = (): AxiosInstance => {
    const api = axios.create({ baseURL: 'http://localhost:3000' });

    const mockApi = new MockAdapter(api);

    mockApi.onAny().reply(200);

    return api;
  };

  it('should call axios2Curl', () => {
    const api = createApi();

    axios2Curl(api, () => {});
  });

  it('should call api with get method', async () => {
    const api = createApi();

    axios2Curl(api, (curl) => {
      expect(curl.startsWith('curl')).toBe(true);

      expect(curl.includes('-d order=name')).toBe(true);

      expect(curl.includes('-d limit=1')).toBe(true);
    });

    await api.get('/todos?order=name', {
      params: {
        limit: 1
      }
    });
  });

  it('should call api with empty params', async () => {
    const api = createApi();

    axios2Curl(api, (curl) => {
      expect(curl).includes(`curl -X GET "${api.defaults.baseURL}/todos"`);
    });

    await api.get('/todos');
  });

  it('should call api with post method', async () => {
    const api = createApi();

    const todo = { title: 'Task', active: true };

    axios2Curl(api, (curl) => {
      expect(curl.startsWith('curl')).toBe(true);

      expect(curl.includes(JSON.stringify(todo))).toBe(true);
    });

    await api.post('/todos', todo);
  });

  it('should call axios with get method', async () => {
    const api = axios;

    const mockApi = new MockAdapter(api);

    mockApi.onAny().reply(200);

    axios2Curl(api, (curl) => {
      expect(curl.startsWith('curl')).toBe(true);
    });

    await api.get('http://localhost:3000/todos');
  });

  it('should call axios without curl', async () => {
    const api = axios;

    const mockApi = new MockAdapter(api);

    mockApi.onAny().reply(200);

    axios2Curl(api, (curl) => {
      expect(curl.startsWith('curl')).toBe(true);
    });

    await api.get('http://localhost:3000/todos', {
      headers: {
        [DISABLE_CURL]: 'true'
      }
    });
  });
});
