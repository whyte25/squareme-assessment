import { Icons } from "./icons";
import { paths } from "./paths";

const routes = paths.private;

export const sidebarItems = [
  { icon: Icons.dashboard, path: routes.get_started, label: "Get Started" },
  { icon: Icons.getStarted, path: routes.home, label: "Dashboard" },
  { icon: Icons.account, path: routes.accounts, label: "Accounts" },
  { icon: Icons.transfer, path: routes.transfers, label: "Transfers" },
  {
    icon: Icons.transactions,
    path: routes.transactions,
    label: "Transactions",
  },
  { icon: Icons.settings, path: routes.settings, label: "Settings" },
];
