import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { MessageModule } from 'src/message/message.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    MessageModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
