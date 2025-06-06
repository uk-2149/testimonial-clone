

const Loading = () => {
    return (
      <div className="w-[20vw] min-w-[300px] bg-gradient-to-br from-black via-[#0f172a] to-[#1e293b] rounded-md shadow-lg p-6 flex flex-col gap-4 items-center justify-center text-white animate-pulse">
        <div className="h-5 w-2/3 bg-slate-700 rounded" />
        <div className="h-10 w-full bg-slate-800 rounded" />
  
        <div className="h-5 w-2/3 bg-slate-700 rounded mt-4" />
        <div className="h-10 w-full bg-slate-800 rounded" />
  
        <div className="h-10 w-full bg-blue-800 rounded mt-4" />
      </div>
    );
  };

export default Loading