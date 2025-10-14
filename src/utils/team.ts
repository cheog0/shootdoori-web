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
    skillLevel: apiResponse.skillLevel as SkillLevel,
    teamType: apiResponse.teamType as TeamType,
    memberCount: apiResponse.memberCount,
    createdAt: apiResponse.createdAt,
  };
}

export function transformTeamListPageResponse(
  apiResponse: ApiTeamListPageResponse
): TeamListPageResponse {
  return {
    content: apiResponse.content.map(transformTeamDetailResponse).map(team => ({
      ...team,
      captainName: 'Unknown',
      captainId: 0,
    })),
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
    pageable: apiResponse.pageable,
    sort: apiResponse.sort,
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
    pageable: {
      sort: { sorted: false, unsorted: true, empty: true },
      pageNumber: apiResponse.number,
      pageSize: apiResponse.size,
      offset: apiResponse.number * apiResponse.size,
      paged: true,
      unpaged: false,
    },
    sort: { sorted: false, unsorted: true, empty: true },
  };
}

export function transformTeamMemberItem(
  apiResponse: ApiTeamMember
): TeamMember {
  return {
    id: apiResponse.id,
    userId: apiResponse.userId,
    name: apiResponse.name,
    email: apiResponse.email,
    position: apiResponse.position,
    role: apiResponse.role,
    joinedAt: apiResponse.joinedAt,
  };
}

export function transformTeamJoinRequestPageResponse(
  apiResponse: ApiTeamJoinRequestPageResponse
): TeamJoinRequestPageResponse {
  return {
    content: apiResponse.content.map(request => ({
      ...request,
      status: request.status as
        | 'PENDING'
        | 'APPROVED'
        | 'REJECTED'
        | 'CANCELED',
    })),
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
    pageable: apiResponse.pageable,
    sort: apiResponse.sort,
  };
}

export function transformUserJoinWaitingPageResponse(
  apiResponse: ApiUserJoinWaitingPageResponse
): UserJoinWaitingPageResponse {
  return {
    content: apiResponse.content.map(item => ({
      ...item,
      status: item.status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED',
    })),
    totalElements: apiResponse.totalElements,
    totalPages: apiResponse.totalPages,
    size: apiResponse.size,
    number: apiResponse.number,
    first: apiResponse.first,
    last: apiResponse.last,
    numberOfElements: apiResponse.numberOfElements,
    empty: apiResponse.empty,
    pageable: apiResponse.pageable,
    sort: apiResponse.sort,
  };
}

export function getTeamTypeInEnglish(teamType: TeamType): string {
  const typeMap: Record<TeamType, string> = {
    중앙동아리: 'CENTRAL_CLUB',
    과동아리: 'DEPARTMENT_CLUB',
    기타: 'OTHER',
  };
  return typeMap[teamType] || 'OTHER';
}

export function getSkillLevelInEnglish(skillLevel: SkillLevel): string {
  const levelMap: Record<SkillLevel, string> = {
    아마추어: 'AMATEUR',
    세미프로: 'SEMI_PRO',
    프로: 'PRO',
  };
  return levelMap[skillLevel] || 'AMATEUR';
}

export function getRoleInKorean(role: TeamMemberRole): string {
  const roleMap: Record<TeamMemberRole, string> = {
    LEADER: '리더',
    VICE_LEADER: '부리더',
    MEMBER: '멤버',
  };
  return roleMap[role] || '멤버';
}

export function getRoleDisplayName(role: TeamMemberRole): string {
  return getRoleInKorean(role);
}

export function getJoinRequestStatusDisplayName(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: '대기중',
    APPROVED: '승인됨',
    REJECTED: '거절됨',
    CANCELED: '취소됨',
  };
  return statusMap[status] || '알 수 없음';
}
