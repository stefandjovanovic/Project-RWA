import * as fromChallenge from './challenges.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";
import {Challenge} from "../../interfaces/challenge.interface";
import {ChallengeStatus} from "../../enums/challenge-status.enum";
import * as TeamsSelectors from '../teams/teams.selectors';
import {Team} from "../../interfaces/team.interface";

export const selectChallengesState = (state: AppState) => state.challenges;

export const selectChallenges = createSelector(
  selectChallengesState,
  fromChallenge.adapter.getSelectors().selectAll
);

export const selectAcceptedChallenges = createSelector(
  selectChallenges,
  (challenges: Challenge[]) => {
    return challenges
      .filter(challenge =>
      challenge.status === ChallengeStatus.ACCEPTED && !hasChallengeExpired(challenge))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
)

export const selectRejectedChallenges = createSelector(
  selectChallenges,
  (challenges: Challenge[]) => {
    return challenges.filter(challenge => challenge.status === ChallengeStatus.REJECTED);
  }
)

export const selectPendingChallenges = createSelector(
  selectChallenges,
  TeamsSelectors.selectSelectedTeam,
  (challenges: Challenge[], selectedTeam: Team | null) => {
    if(!selectedTeam){
      return [];
    }
    return challenges
      .filter(challenge =>
      challenge.status === ChallengeStatus.PENDING &&
      challenge.challengedTeamName === selectedTeam.name &&
      !hasChallengeExpired(challenge))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
)
export const selectCompletedChallenges = createSelector(
  selectChallenges,
  (challenges: Challenge[]) => {
    return challenges
      .filter(challenge => challenge.status === ChallengeStatus.ACCEPTED && hasChallengeExpired(challenge))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
)


const hasChallengeExpired = (challenge: Challenge): boolean => {
  const now = new Date();
  const hours = now.getUTCHours();
  now.setUTCHours(0,0,0,0);

  const challengeDate = new Date(challenge.date);
  challengeDate.setUTCHours(0,0,0,0);

  if(challengeDate < now){
    return true;
  }

  return(
    now.getUTCFullYear() === challengeDate.getUTCFullYear() &&
    now.getUTCMonth() === challengeDate.getUTCMonth() &&
    now.getUTCDate() === challengeDate.getUTCDate() &&
    challenge.startTime < hours
  );
}
