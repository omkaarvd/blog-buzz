const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      <img src="/src/assets/page_not_found.svg" alt="" className="mt-16 h-96" />
      <h2 className="text-3xl font-bold">Page not found</h2>
    </div>
  );
};

export default NotFound;
