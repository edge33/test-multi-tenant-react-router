const SubdomainDashboard = ({ subdomain }: { subdomain: string }) => {
  return (
    <div>
      <h2>{subdomain.toUpperCase()} Dashboard</h2>
      <p>Dashboard for {subdomain} subdomain</p>
      <div>
        <h3>Stats and Analytics</h3>
        <p>Your subdomain-specific content goes here...</p>
      </div>
    </div>
  );
};

export default SubdomainDashboard;
