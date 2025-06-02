/**
 * ChromaDB client
 */
import { ChromaClient, Collection } from "chromadb";
import { NLQSDocument } from "../../types";
import { createEmbeddingDocument } from "../../core/embeddings";
import { Creator } from "~/components/persona/user/server/dashboard/mock-data";

export const client = new ChromaClient({
  path: process.env.CHROMA_DB_URL!,
});

/**
 * Simple embedding function using normalized character-based vector
 */
class SimpleEmbeddingFunction {
  public name = "SimpleEmbeddingFunction";
  public dimension = 384;

  public async generate(texts: string[]): Promise<number[][]> {
    return texts.map((text) => {
      const vec = new Array(this.dimension).fill(0);
      for (let i = 0; i < text.length; i++) {
        vec[i % this.dimension] += text.charCodeAt(i);
      }
      const length = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
      return vec.map((val) => val / length);
    });
  }

  public getConfig(): Record<string, any> {
    return {
      type: "simple",
      dimension: this.dimension,
    };
  }
}

/**
 * Document processor with ChromaDB integration
 */
class BaseChromaProcessor {
  protected collection: Collection | null = null;
  protected client: ChromaClient;

  constructor(client: ChromaClient) {
    this.client = client;
  }

  /**
   * Initialize collection and store creators as documents
   */
  async initializeCollection(
    collectionName: string = "creators",
    creators: Creator[]
  ): Promise<void> {
    const embedder = new SimpleEmbeddingFunction();

    // Create or get collection
    this.collection = await this.client.getOrCreateCollection({
      name: collectionName,
      embeddingFunction: embedder,
      metadata: {
        "hnsw:space": "cosine",
        dimension: embedder.dimension,
      },
    });

    const documents = creators.map((creator) =>
      createEmbeddingDocument(creator)
    );
    await this.addDocuments(documents);
  }

  /**
   * Store documents with generated embeddings
   */
  async addDocuments(documents: NLQSDocument[]) {
    if (!this.collection) throw new Error("Collection not initialized");

    const embedder = new SimpleEmbeddingFunction();
    const embeddings = await embedder.generate(
      documents.map((doc) => doc.content)
    );

    await this.collection.add({
      ids: documents.map((doc) => doc.id.toString()),
      documents: documents.map((  doc) => doc.content),
      metadatas: documents.map((doc) => ({
        id: doc.id,
        name: doc.name,
        genre: doc.genre,
        reach: doc.reach,
      })),
      embeddings,
    });
  }

  /**
   * Search the collection by query string
   */
  async queryCollection(query: string, numResults: number = 5) {
    if (!this.collection) throw new Error("Collection not initialized");

    const embedder = new SimpleEmbeddingFunction();
    const queryEmbedding = (await embedder.generate([query]))[0];

    const results = await this.collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: numResults,
    });

    return {
      ids: results.ids[0].map((id) => parseInt(id)),
      scores: results.distances ? results.distances[0] : [],
    };
  }
}

export { BaseChromaProcessor };
