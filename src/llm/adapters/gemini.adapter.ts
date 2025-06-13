import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
} from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { LLMAdapter } from '../interfaces/llm.interface';

@Injectable()
export class GeminiAdapter implements LLMAdapter {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(configService.get('GEMINI_API_KEY'));

    this.model = this.genAI.getGenerativeModel({
      model: 'models/gemini-1.5-flash',
    });

    this.model.safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
  }

  async generateResponse(prompt: string): Promise<string> {
    const chat = this.model.startChat();
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }
}
