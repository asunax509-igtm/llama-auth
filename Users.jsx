function Users() {
  const users = [
    { email: 'alice@company.com', status: 'Active', provider: 'Email' },
    { email: 'bob@company.com', status: 'Verified', provider: 'Google' },
  ];

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <span className="eyebrow">Users</span>
          <h1>Customer and user management</h1>
          <p>Track application users, session status, and sign-in methods.</p>
        </div>
        <button className="button primary">Invite user</button>
      </header>
      <section className="card">
        <table className="table-list">
          <thead>
            <tr><th>Email</th><th>Status</th><th>Provider</th><th>Last seen</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.provider}</td>
                <td>2h ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Users;
