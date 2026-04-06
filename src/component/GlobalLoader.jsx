// function GlobalLoader() {
//   return (
  
//     <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//       <div className="book">
//         <div className="page"></div>
//         <div className="page"></div>
//         <div className="page"></div>
//       </div>
//       <p className="mt-4 text-gray-500 text-sm">
//   Loading books...
// </p>
//     </div>

 
//   );
// }

// export default GlobalLoader;

const GlobalLoader = ({ loading }) => {
  return (
    <div className={`loader-overlay ${loading ? "show" : ""}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalLoader;