import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ChallengesService } from '../services/challenges.service';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ChallengeDto } from '../dto/challenge.dto';
import { SubmitResultDto } from '../dto/submit-result.dto';
import { ResultRequestDto } from '../dto/result-request.dto';

@Roles([Role.PLAYER])
@UseGuards(RolesGuard, AuthGuard())
@Controller('challenges')
export class ChallengesController {
    constructor(private challengesService: ChallengesService) {}

    @Get('/all/:teamId')
    async getAllChallenges(@Param('teamId') teamId: string) : Promise<ChallengeDto[]>{
        return this.challengesService.getAllChallenges(teamId);
    }

    @Post('/create')
    async createChallenge(@Body() createChallengeDto: CreateChallengeDto) : Promise<ChallengeDto> {
        return this.challengesService.createChallenge(createChallengeDto);
    }

    @Post('/accept/:challengeId')
    async acceptChallenge(@Param('challengeId') challengeId: string) : Promise<void>{
        return this.challengesService.acceptChallenge(challengeId);
    }

    @Post('/reject/:challengeId')
    async rejectChallenge(@Param('challengeId') challengeId: string) : Promise<void>{
        return this.challengesService.rejectChallenge(challengeId);
    }

    @Post('/result/submit')
    async submitResult(@Body() submitResultDto: SubmitResultDto) : Promise<void>{
        return this.challengesService.submitResult(submitResultDto.challengeId, submitResultDto.homeScore, submitResultDto.awayScore);
    }

    @Post('/result/accept/:challengeId')
    async acceptResult(@Param('challengeId') challengeId: string) : Promise<void>{
        return this.challengesService.acceptResult(challengeId);
    }

    @Post('/result/reject/:challengeId')
    async rejectResult(@Param('challengeId') challengeId: string) : Promise<void>{
        return this.challengesService.rejectResult(challengeId);
    }

    @Get('/result/requests/:teamId')
    async getResultRequests(@Param('teamId') teamId: string) : Promise<ResultRequestDto[]>{
        return this.challengesService.getResultRequests(teamId);
    }


}
