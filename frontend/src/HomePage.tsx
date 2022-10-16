import { useEffect } from 'react';
import { trpc } from './utils/trpc';

export default function HomePage() {
  const fetchExpressUser = async () => {
    fetch(
      `http://localhost:3000/trpc/getUser?input=${encodeURIComponent(
        JSON.stringify({
          name: 'name',
        })
      )}`
    )
      .then((response) => response.json())
      .then((data) => console.log('Express:', data));
  };

  const fetchOpenApiUser = async () => {
    fetch(`http://localhost:3000/api/get-user?name=name`)
      .then((response) => response.json())
      .then((data) => console.log('Open API:', data));
  };

  useEffect(() => {
    fetchExpressUser();
    fetchOpenApiUser();
  }, []);

  const user = trpc.getUser.useQuery({ name: 'name' });
  if (!user.data) return <div>Loading...</div>;

  return (
    <div>
      <p>{user.data.name}</p>
    </div>
  );
}
