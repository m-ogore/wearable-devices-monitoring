// pages/guest/Users-Test/page.js
'use client'
import { useEffect, useState } from 'react';
//@ts-ignore
function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    }

    fetchUsers();
  }, []);

  return (
    <div className='w-[1500px]'>
      <h1>Users</h1>
      <table className='w-[1500px] text-left rounded-md p-2 cursor-pointer hover:bg-light-white'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Device</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
              <td>{user.deviceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
