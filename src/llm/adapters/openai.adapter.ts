import { Injectable } from '@nestjs/common';
import { LLMAdapter } from '../interfaces/llm.interface';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiAdapter implements LLMAdapter {
  constructor(private configService: ConfigService) {}

  client = new OpenAI({
    apiKey: this.configService.get('OPENAI_API_KEY'),
  });

  async generateResponse(prompt: string) {
    const response = await this.client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
    });
    return response.output_text;
  }
}
