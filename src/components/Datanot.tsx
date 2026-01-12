function Datanot() {
  return (
    <div className="md:min-h-[80vh] flex justify-start  items-start pl-2.5 min-h-screen">
      <div>
        <h1 className="text-2xl md:text-4xl font-extrabold">Oooops...</h1>
        <h2 className="text-xl md:text-2xl font-extrabold">
          Looks like the Data could not be found!
        </h2>
        <div className="relative inline-flex items-center gap-x-4 group">
          <h2 className="text-xl md:text-2xl font-extrabold">Go back to</h2>
        </div>
      </div>
    </div>
  );
}

export default Datanot;
