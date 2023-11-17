import { it, describe, expect } from 'vitest';
import { axios2Curl } from './functions';
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

    axios2Curl(api, (message) => {
      expect(message.startsWith('curl')).toBe(true);

      expect(message.includes('-d order=name')).toBe(true);

      expect(message.includes('-d limit=1')).toBe(true);
    });

    await api.get('/todos?order=name', {
      params: {
        limit: 1
      }
    });
  });

  it('should call api with empty params', async () => {
    const api = createApi();

    axios2Curl(api, (message) => {
      expect(message).includes(`curl -X GET "${api.defaults.baseURL}/todos"`);
    });

    await api.get('/todos');
  });

  it('should call api with post method', async () => {
    const api = createApi();

    const todo = { title: 'Task', active: true };

    axios2Curl(api, (message) => {
      expect(message.startsWith('curl')).toBe(true);

      expect(message.includes(JSON.stringify(todo))).toBe(true);
    });

    await api.post('/todos', todo);
  });

  it('should call axios with get method', async () => {
    const api = axios;

    const mockApi = new MockAdapter(api);

    mockApi.onAny().reply(200);

    axios2Curl(api, (message) => {
      expect(message.startsWith('curl')).toBe(true);
    });

    addSerializer();

    await api.get('http://localhost:3000/todos');
  });
});
