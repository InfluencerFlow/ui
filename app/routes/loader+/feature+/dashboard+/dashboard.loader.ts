import { User } from "@prisma/client";
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/server/services/auth/db.server";
import { NLQSSearch } from "~/server/utils/nlqs/core/search.server";
import { creatorMockData } from "~/components/persona/user/server/dashboard/mock-data";
import { BaseChromaProcessor } from "~/server/utils/nlqs/db/chroma/chromaClient.server";
import { ChromaClient } from "chromadb";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<User | Response | null> {
  const session = await getSession(request);
  if (!session) {
    return redirect("/auth/signin");
  }
  if (!session.user.profileCompleted) {
    return redirect("/feature/home/profile");
  }

  // 2) initialize NLQS

  // const chromaClient = new BaseChromaProcessor(new ChromaClient());
  // await chromaClient.initializeCollection("creators", creatorMockData);
  // const nlqsSearch = new NLQSSearch(chromaClient);
  
  // console.log("NLQS initialized", nlqsSearch);

  return session.user as User;
}
