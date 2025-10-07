import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import { ModalDatePicker } from '@/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/components/ui/modal_time_picker';
import { useUserProfile } from '@/hooks/queries';
import { useCreateMatch } from '@/hooks/useCreateMatch';
import { useVenues } from '@/hooks/useVenues';
import Message from '@/screens/match_making/match_info/component/message/message';
import SkillLevelSelector from '@/screens/match_making/match_info/component/skill_level_selector/skill_level_selector';
import { MatchCreateRequestDto } from '@/types/match';
import type { Venue } from '@/types/venue';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const FormSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  color: #374151;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props =>
    props.variant === 'primary'
      ? `
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }

    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  `
      : `
    background-color: #f3f4f6;
    color: #374151;

    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

const ButtonContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const CreateButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

type SkillLevel = 'AMATEUR' | 'SEMI_PRO' | 'PRO';

export default function MatchInfoScreen() {
  const router = useNavigate();
  const { data: userProfile, refetch } = useUserProfile();
  const { mutate: createMatch, isPending } = useCreateMatch();
  const { data: venues, isLoading, error } = useVenues();

  const [stadiumQuery, setStadiumQuery] = useState('');
  const [stadiumModalVisible, setStadiumModalVisible] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState<Venue | null>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [timeStart, setTimeStart] = useState<Date>(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return now;
  });
  const [timeEnd, setTimeEnd] = useState<Date>(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 2);
    return now;
  });
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);

  const [skillMin, setSkillMin] = useState<SkillLevel>('AMATEUR');
  const [skillMax, setSkillMax] = useState<SkillLevel>('PRO');

  const [universityOnly, setUniversityOnly] = useState(false);
  const [message, setMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const filteredStadiums = (venues ?? []).filter(s =>
    s.venueName.toLowerCase().includes(stadiumQuery.toLowerCase())
  );

  const onSelectStadium = (venue: Venue) => {
    setSelectedStadium(venue);
    setStadiumModalVisible(false);
  };

  const pad2 = (n: number) => String(n).padStart(2, '0');
  const fmtDate = (d: Date) => {
    const result = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

    return result;
  };
  const fmtTime = (d: Date) =>
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

  const onSubmit = async () => {
    if (!selectedStadium) {
      window.alert('경기장을 선택해주세요.');
      return;
    }

    await refetch();

    const rawTeamId = userProfile?.teamId;

    if (!rawTeamId) {
      window.alert('팀 정보가 없습니다. 팀을 먼저 생성해주세요.');
      return;
    }

    const numericTeamId = Number(rawTeamId);

    if (isNaN(numericTeamId) || numericTeamId <= 0) {
      window.alert('유효하지 않은 팀 ID입니다. 다시 시도해주세요.');
      return;
    }

    const payload: MatchCreateRequestDto = {
      teamId: numericTeamId,
      preferredDate: fmtDate(date),
      preferredTimeStart: fmtTime(timeStart),
      preferredTimeEnd: fmtTime(timeEnd),
      preferredVenueId: selectedStadium.venueId || 1,
      skillLevelMin: skillMin,
      skillLevelMax: skillMax,
      universityOnly,
      message,
    };

    createMatch(payload, {
      onSuccess: data => {
        setSuccessModalVisible(true);
      },
      onError: err => {
        window.alert('매치 생성 실패', err.message ?? '다시 시도해주세요.');
      },
    });
  };

  return (
    <Container>
      <CustomHeader title="경기 정보 입력" />

      <Content>
        <FormSection>
          <SectionTitle>📍 경기 장소</SectionTitle>
          <Button
            variant="secondary"
            onClick={() => setStadiumModalVisible(true)}
          >
            {selectedStadium
              ? selectedStadium.venueName
              : '경기장을 선택하세요'}
          </Button>
        </FormSection>

        <FormSection>
          <SectionTitle>📅 경기 일정</SectionTitle>
          <InputGroup>
            <Label>날짜</Label>
            <Button variant="secondary" onClick={() => setShowDatePicker(true)}>
              {date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short',
              })}
            </Button>
          </InputGroup>
          <InputGroup>
            <Label>시작 시간</Label>
            <Button
              variant="secondary"
              onClick={() => setShowTimeStartPicker(true)}
            >
              {timeStart.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </Button>
          </InputGroup>
          <InputGroup>
            <Label>종료 시간</Label>
            <Button
              variant="secondary"
              onClick={() => setShowTimeEndPicker(true)}
            >
              {timeEnd.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </Button>
          </InputGroup>
        </FormSection>

        <FormSection>
          <SkillLevelSelector
            onChange={(min, max) => {
              setSkillMin(min);
              setSkillMax(max);
            }}
          />
        </FormSection>

        <FormSection>
          <SectionTitle>⚙️ 매치 옵션</SectionTitle>
          <InputGroup>
            <Label>
              <input
                type="checkbox"
                checked={universityOnly}
                onChange={e => setUniversityOnly(e.target.checked)}
              />{' '}
              같은 대학 상대만 구하기
            </Label>
          </InputGroup>
        </FormSection>

        <FormSection>
          <Message value={message} onChange={setMessage} />
        </FormSection>
      </Content>

      <ButtonContainer>
        <CreateButton onClick={onSubmit} disabled={isPending}>
          {isPending ? '등록 중...' : '매치 등록하기'}
        </CreateButton>
      </ButtonContainer>

      {/* Stadium Selection Modal */}
      {stadiumModalVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '80%',
              overflow: 'auto',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0' }}>경기장 선택</h3>
            <Input
              placeholder="경기장 검색"
              value={stadiumQuery}
              onChange={e => setStadiumQuery(e.target.value)}
            />
            <div style={{ marginTop: '16px' }}>
              {isLoading ? (
                <div>불러오는 중...</div>
              ) : error ? (
                <div>에러 발생: {error.message}</div>
              ) : (
                filteredStadiums.map(stadium => (
                  <div
                    key={stadium.venueId}
                    style={{
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => onSelectStadium(stadium)}
                  >
                    <div style={{ fontWeight: '500' }}>{stadium.venueName}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      {stadium.address}
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button
              variant="secondary"
              onClick={() => setStadiumModalVisible(false)}
              style={{ marginTop: '16px', width: '100%' }}
            >
              닫기
            </Button>
          </div>
        </div>
      )}

      <ModalDatePicker
        visible={showDatePicker}
        value={date}
        onDateChange={newDate => {
          setDate(newDate);
        }}
        onClose={() => setShowDatePicker(false)}
        title="경기 날짜 선택"
      />

      <ModalTimePicker
        visible={showTimeStartPicker}
        value={timeStart}
        onTimeChange={newTimeStart => {
          setTimeStart(newTimeStart);
          if (newTimeStart >= timeEnd) {
            const newTimeEnd = new Date(newTimeStart);
            newTimeEnd.setHours(newTimeEnd.getHours() + 2);
            setTimeEnd(newTimeEnd);
          }
        }}
        onClose={() => setShowTimeStartPicker(false)}
        title="시작 시간 선택"
      />

      <ModalTimePicker
        visible={showTimeEndPicker}
        value={timeEnd}
        onTimeChange={newTimeEnd => {
          if (newTimeEnd <= timeStart) {
            const newTimeStart = new Date(newTimeEnd);
            newTimeStart.setHours(newTimeStart.getHours() - 2);
            setTimeStart(newTimeStart);
            setTimeEnd(newTimeEnd);
          } else {
            setTimeEnd(newTimeEnd);
          }
        }}
        onClose={() => setShowTimeEndPicker(false)}
        title="종료 시간 선택"
      />

      {/* Success Modal */}
      {successModalVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              maxWidth: '300px',
              width: '90%',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0' }}>매치 등록 완료!</h3>
            <p style={{ margin: '0 0 20px 0', color: '#6b7280' }}>
              매치가 성공적으로 등록되었습니다.{'\n'}
              상대방을 기다려주세요.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSuccessModalVisible(false);
                router.replace('/');
              }}
              style={{ width: '100%' }}
            >
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
