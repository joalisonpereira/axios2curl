import axios from 'axios';
import { axios2Curl } from './functions';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axios2Curl(api, (message) => {
  console.log(message);
});

async function bootstrap(): Promise<void> {
  const { data } = await api.post(
    '/posts',
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      user: {
        name: 'ok'
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );

  console.log(data);
}

void bootstrap();
