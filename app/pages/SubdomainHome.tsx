const SubdomainHome = ({ subdomain }: { subdomain: string }) => {
  return (
    <div>
      <h2>{subdomain.toUpperCase()} Home</h2>
      <p>Welcome to the {subdomain} subdomain home page!</p>
    </div>
  );
};

export default SubdomainHome;
