import { AccountDetailsCard } from "@/components/account-details-card";
import { DynamicRevenueChart } from "@/components/dynamic-revenue-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6 py-6 md:space-y-10">
      <div className="border-b pb-3">
        <h1 className="before:contents-[''] relative border-primary text-lg font-semibold before:absolute before:-bottom-3 before:h-0.5 before:w-36 before:bg-primary">
          Online Payments
        </h1>
      </div>

      <AccountDetailsCard
        amount="800,000.00"
        accountName="OGEDENGBE FRUITS STORE"
        bankName="STERLING BANK"
      />

      <DynamicRevenueChart />
    </div>
  );
}
