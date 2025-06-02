import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import UserDashboard from "~/components/persona/user/routes/features/dashboard/UserDashboard";
import { NLQSSearch } from "~/server/utils/nlqs/core/search.server";
import { BaseChromaProcessor } from "~/server/utils/nlqs/db/chroma/chromaClient.server";
import { ChromaClient } from "chromadb";
import { creatorMockData } from "~/components/persona/user/server/dashboard/mock-data";

/*
 * loader
 */
import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
export const loader = HomeLoader;

/*
 * action
 */

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const prompt = formData.get("prompt");
  const chromaClient = new BaseChromaProcessor(new ChromaClient());
  await chromaClient.initializeCollection("creators", creatorMockData);
  const nlqsSearch = new NLQSSearch(chromaClient);
  const results = await nlqsSearch.search(prompt as string);
  return results;
};

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
