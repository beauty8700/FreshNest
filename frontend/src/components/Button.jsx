export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}
