import { useLoaderData } from "@remix-run/react";
import UserDashboard from "~/components/persona/user/routes/features/dashboard/UserDashboard";

/*
 * loader
 */
import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
export const loader = HomeLoader;

const renderDashboard = (role: string) => {
  switch (role) {
    case "creator":
      // 1) (todo) to be implemented
      return <div>Creator Dashboard</div>;
    case "user":
      return <UserDashboard />;
    default:
      return <div>Unknown Role</div>;
  }
};

export default function DashboardIndex() {
  const user = useLoaderData<typeof loader>();
  const { role } = user;

  return <div className="m-2 w-full h-full">{renderDashboard(role)}</div>;
}
