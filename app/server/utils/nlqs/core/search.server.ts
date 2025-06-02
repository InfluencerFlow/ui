import { BaseChromaProcessor } from "~/server/utils/nlqs/db/chroma/chromaClient.server";
import { NLQSSearchResult } from "~/server/utils/nlqs/types";
import { BaseModel } from "~/server/utils/nlqs/models/base";

export class NLQSSearch {
  private chromaClient: BaseChromaProcessor;
    private model: BaseModel;

  constructor(chromaClient: BaseChromaProcessor) {
    this.chromaClient = chromaClient;
    this.model = new BaseModel("gemini");
  }

  async search(prompt: string): Promise<NLQSSearchResult> {
    // console.log("Searching for:", prompt);

    const systemPrompt = `
    You are a helpful assistant analyzing creator profiles. Use the following format to understand and respond to queries:

    Context Structure:
    - Genre: Creator's primary content category

    Output Format:
    - Return the names of the genres that match the query separated by spaces

    User Query: ${prompt}
    `;

    const response = await this.model.generateContent(systemPrompt);

    const searchResults = await this.chromaClient.queryCollection(prompt);

    return searchResults;
  }
}
