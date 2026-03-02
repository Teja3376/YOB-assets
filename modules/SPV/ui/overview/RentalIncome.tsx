const RentalIncome = () => {
  return (
    <div className=" rounded-md shadow-xs  border">
      <div className="bg-primary/10 px-4 py-3 rounded-t-md font-medium">
        <h1>Income & Distribution</h1>
      </div>
      <hr />
      <div className="">
        <div className="flex justify-between items-center p-5 m-3 rounded-md bg-green-100/90">
          <div>
            <p className="text-primary font-medium">Monthly Rental Income</p>
            <p className="text-sm">Asset Name</p>
          </div>
          <p className="text-primary text-xl font-semibold">Commercial</p>
        </div>
        <div className="border-t space-y-3 px-5 py-1">
          <div className="flex items-center justify-between mt-3">
            <p className="text-primary font-medium">
              Monthly Property Maintenance
            </p>
            <p className="text-sm">Asset Name</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-primary font-medium">
              Utilities (Electricity, Water, HVAC)
            </p>
            <p className="text-sm">Asset Name</p>
          </div>
          <hr />
          <div className="flex items-center justify-between mb-3">
            <p className="text-primary text-xl font-medium">Net Distributable Income</p>
            <p className="text-xl font-semibold">Asset Name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIncome;
