import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BottlesService } from './service/bottles.service';
import { Bottle } from './bottle.entity';
import { BottlesController } from './controller/bottles.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Bottle]), UsersModule,],
    providers: [BottlesService],
    controllers: [BottlesController],
    exports: [BottlesService],
})
export class BottlesModule { }
