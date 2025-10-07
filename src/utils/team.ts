import type {
  ApiTeamDetailResponse,
  TeamDetailResponse,
  ApiTeamListPageResponse,
  TeamListPageResponse,
  ApiTeamMemberPageResponse,
  TeamMemberPageResponse,
  ApiTeamMember,
  TeamMember,
  ApiTeamJoinRequestPageResponse,
  TeamJoinRequestPageResponse,
  ApiUserJoinWaitingPageResponse,
  UserJoinWaitingPageResponse,
  TeamMemberRole,
  SkillLevel,
  TeamType,
} from '@/types/team';

export function transformTeamDetailResponse(
  apiResponse: ApiTeamDetailResponse
): TeamDetailResponse {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    university: apiResponse.university,
    skillLevel: apiResponse.skillLevel,
    teamType: apiResponse.teamType,
    memberCount: apiResponse.memberCount,
    maxMembers: apiResponse.maxMembers,
    createdAt: apiResponse.createdAt,
    updatedAt: apiResponse.updatedAt,
  };
}

export function transformTeamListPageResponse(
  apiResponse: ApiTeamListPageResponse
): TeamListPageResponse {
  return {
    content: apiResponse.content.map(transformTeamDetailResponse),
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
  };
}

export function transformTeamMemberPageResponse(
  apiResponse: ApiTeamMemberPageResponse
): TeamMemberPageResponse {
  return {
    content: apiResponse.content.map(transformTeamMemberItem),
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
  };
}

export function transformTeamMemberItem(
  apiResponse: ApiTeamMember
): TeamMember {
  return {
    id: apiResponse.id,
    userId: apiResponse.userId,
    teamId: apiResponse.teamId,
    role: apiResponse.role,
    joinedAt: apiResponse.joinedAt,
    user: apiResponse.user,
  };
}

export function transformTeamJoinRequestPageResponse(
  apiResponse: ApiTeamJoinRequestPageResponse
): TeamJoinRequestPageResponse {
  return {
    content: apiResponse.content,
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
  };
}

export function transformUserJoinWaitingPageResponse(
  apiResponse: ApiUserJoinWaitingPageResponse
): UserJoinWaitingPageResponse {
  return {
    content: apiResponse.content,
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
  };
}

export function getTeamTypeInEnglish(teamType: TeamType): string {
  const typeMap: Record<TeamType, string> = {
    아마추어: 'AMATEUR',
    세미프로: 'SEMI_PRO',
    프로: 'PRO',
  };
  return typeMap[teamType] || 'AMATEUR';
}

export function getSkillLevelInEnglish(skillLevel: SkillLevel): string {
  const levelMap: Record<SkillLevel, string> = {
    초급: 'BEGINNER',
    중급: 'INTERMEDIATE',
    고급: 'ADVANCED',
  };
  return levelMap[skillLevel] || 'BEGINNER';
}

export function getRoleInKorean(role: TeamMemberRole): string {
  const roleMap: Record<TeamMemberRole, string> = {
    LEADER: '리더',
    MEMBER: '멤버',
  };
  return roleMap[role] || '멤버';
}
