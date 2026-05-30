import { Module } from '@nestjs/common';
import { ClassworksService } from './classwork.service';
import { ClassworksController } from './classwork.controller';
import { UserModule } from 'src/users/users.module';

@Module({
  imports:[UserModule],
  controllers: [ClassworksController],
  providers: [ClassworksService],
})
export class ClassworkModule {}
