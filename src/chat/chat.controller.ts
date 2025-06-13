import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { SkipAuth } from '../auth/decorators/skipauth.decorator';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // We have skipped the auth
  @Get(':prompt')
  @SkipAuth()
  handlePrompt(@Param('prompt') prompt: string) {
    if (!prompt || prompt.trim().length === 0) {
      throw new BadRequestException('Prompt is required');
    }
    return this.chatService.handlePrompt(prompt);
  }
}
