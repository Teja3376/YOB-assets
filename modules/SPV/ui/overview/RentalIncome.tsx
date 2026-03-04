import { formatCurrencyWithLocale } from "@/lib/format.utils";

const RentalIncome = ({
  expenses,
  assetName,
  grossMonthlyRentalIncome,
  netMonthlyRentalIncome,
  currency = "USD",
}: {
  expenses: {
    label: string;
    amount: number;
  }[];
  assetName: string;
  grossMonthlyRentalIncome: number;
  netMonthlyRentalIncome: number;
  currency?: string;
}) => {
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
            <p className="text-sm">{assetName}</p>
          </div>
          <p className="text-primary text-xl font-semibold">
            {formatCurrencyWithLocale(grossMonthlyRentalIncome, currency)}
          </p>
        </div>
        <div className="border-t space-y-3 px-5 py-1">
          {expenses &&
            expenses.length > 0 &&
            expenses.map((expense) => (
              <div
                key={`expense-${expense.label}`}
                className="flex justify-between items-center px-5 py-3"
              >
                <p>{expense?.label}</p>
                <p className="font-medium">
                  {formatCurrencyWithLocale(expense.amount, currency)}
                </p>
              </div>
            ))}
          <hr />
          <div className="flex items-center justify-between mb-3">
            <p className="text-primary text-xl font-medium">
              Net Distributable Income
            </p>
            <p className="text-xl font-semibold">
              {formatCurrencyWithLocale(netMonthlyRentalIncome, currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIncome;
