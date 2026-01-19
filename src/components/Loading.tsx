function Loading({ margin = 5 }: { margin?: number }) {
  return (
    <div className="w-[95vw] flex justify-center items-center">
      <div
        className={`w-12 h-12 border-4 mt-${margin} mt-5 border-blue-500 border-t-transparent border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default Loading;
