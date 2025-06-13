import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { VendorModule } from '../vendor/vendor.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [VendorModule, LlmModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
