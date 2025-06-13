import { Module } from '@nestjs/common';
import { LLmService } from './llm.service';
import { GeminiAdapter } from './adapters/gemini.adapter';
import { OpenAiAdapter } from './adapters/openai.adapter';

@Module({
  providers: [LLmService, GeminiAdapter, OpenAiAdapter],
  exports: [LLmService, GeminiAdapter, OpenAiAdapter],
})
export class LlmModule {}
