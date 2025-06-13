import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';
import { LLmService } from '../llm/llm.service';
import { GeminiAdapter } from '../llm/adapters/gemini.adapter';

@Injectable()
export class ChatService {
  constructor(
    private readonly vendorService: VendorService,
    private readonly llmService: LLmService,
    private readonly languageModel: GeminiAdapter,
  ) {}

  async handlePrompt(prompt: string) {
    const vendors = await this.vendorService.searchVendor(prompt);
    let context = 'No matching vendors found.';

    if (vendors.length === 0) return { response: context, vendors };

    context =
      `Here are some vendors related to your query:\n` +
      vendors
        .map(
          (v) =>
            `- ${v.name} (${v.category}): ${v.description} (Email: ${v.emailContact})`,
        )
        .join('\n');

    const fullPrompt = `${context}\n\nUser query: "${prompt}"`;

    try {
      const response = await this.llmService.generateResponse(
        this.languageModel,
        fullPrompt,
      );
      return {
        response,
        vendors,
      };
    } catch (error) {
      throw new ServiceUnavailableException(
        'Bot service is unreachable. Please try again later.',
      );
    }
  }
}
