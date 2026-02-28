const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center bg-neutral-400 text-neutral-50 text-sm rounded-md px-1 py-0.5 mr-2">
    {children}
  </span>
);

export default Tag;
