import { Controller, Get, UseGuards, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { BottlesService } from '../service/bottles.service';
import { AuthGuard } from '@nestjs/passport';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BottleCreateDto, BottleUpdateDto } from '../bottle.dto';
import { CurrentUser } from '../../users/decorator/user.decorator';
import { User } from '../../users/user.entity';

@Controller('bottles')
export class BottlesController {
    constructor(private readonly bottlesService: BottlesService) { }

    /**
     * Fetch the user's connected bottles.
     * @param user - The authenticated user
     * @param options - The find options
     */
    @UseGuards(AuthGuard('jwt'))
    @Get()
    fetchAll(@CurrentUser() user: User, @Query() options: FindManyOptions = {}) {
        return this.bottlesService.findMany({
            ...options,
            where: {
                ...(<Object>options.where),
                user
            }
        })
    }


    /**
     * Fetch a single bottle that belongs to the user.
     * @param user - The authenticated user
     * @param options - The find options
     */
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    fetchOne(
        @CurrentUser() user: User,
        @Param() { id }: { id: string },
        @Query() options: FindOneOptions = {}
    ) {
        return this.bottlesService.findOne({
            ...options,
            where: {
                ...(<Object>options.where),
                id,
                user
            },
            relations: ['measurements']
        })
    }

    /**
     * Add a new bottle to the bottle collection of the user.
     * @param bottle - The bottle to add
     */
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@CurrentUser() user: User, @Body() bottle: BottleCreateDto) {
        return this.bottlesService.create({ ...bottle, user })
    }

    /**
     * Update the given bottle with the new data.
     * @param params - The params for the request
     * @param params.id - The id of the bottle to update
     * @param bottle - The new data for the bottle
     */
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@CurrentUser() user: User, @Param() { id }: { id: string }, bottle: BottleUpdateDto) {
        return this.bottlesService.update({ id, user }, bottle)
    }

    /**
     * Remove a bottle from the user's collection.
     * @param params - The params for the request
     * @param params.id - The id of the bottle to remove.
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@CurrentUser() user: User, @Param() { id }: { id: string }) {
        return this.bottlesService.remove({ id, user })
    }
}
