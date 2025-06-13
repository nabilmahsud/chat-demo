import { Injectable } from '@nestjs/common';
import { LLMAdapter } from './interfaces/llm.interface';

@Injectable()
export class LLmService {
  generateResponse(llm: LLMAdapter, prompt: string) {
    return llm.generateResponse(prompt);
  }
}
