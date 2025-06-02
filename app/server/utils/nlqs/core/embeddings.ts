import { Creator } from "~/components/persona/user/server/dashboard/mock-data";


export function createEmbeddingDocument(creator: Creator) {
  return {
    id: creator.id,
    name: creator.name,
    genre: creator.genre,
    reach: creator.reach,
    content: `${creator.genre}`,
    
  };
}
