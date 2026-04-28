"use client";

import useGetMe from "@/hooks/me/useGetMe";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { BalanceCard } from "./ui/BalanceCard";
import useGetYobWallet from "./hooks/useGetYobWallet";

export default function WalletPage() {
  const { data: userData } = useGetMe();
  const userId = userData?.id || "";
  console.log(userId, "userId");

  //   const { data, isLoading } = useGetAllBalance(userId);
  const { data, isFetching: isLoading } = useGetYobWallet();

  console.log(data, "data");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        {/* <LoaderCircle size={35} className="animate-spin text-primary" /> */}
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <main className="p-2 space-y-2">
      {/* <div className="mx-auto max-w-6xl"> */}
      <div className="flex flex-col gap-6">
        {/* <WalletHeader /> */}
        <h1 className="text-2xl font-semibold">Wallet</h1>
        <BalanceCard
          walletData={data.data}
          userId={userId}
          isLoading={isLoading}
        />

        {/* <BalancesTable
            cryptoBalance={data?.crypto || []}
            assets={data?.assets || []}
          /> */}

        {/* <TransactionsTable transactions={data?.transactions || []} /> */}
      </div>
      {/* </div> */}
    </main>
  );
}
