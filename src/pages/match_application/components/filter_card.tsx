import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalDatePicker } from '@/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/components/ui/modal_time_picker';
import { theme } from '@/theme';

const FilterCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing4};
  padding: ${theme.spacing.spacing4};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${theme.spacing.spacing3};
`;

const FilterCardHeader = styled.div`
  margin-bottom: ${theme.spacing.spacing3};
`;

const FilterCardTitle = styled.span`
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.main};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${theme.spacing.spacing2};
`;

const FilterButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: ${theme.spacing.spacing3};
  border: 1px solid
    ${props =>
      props.active ? theme.colors.brand.main : theme.colors.gray[300]};
  border-radius: ${theme.spacing.spacing2};
  background-color: ${props =>
    props.active ? theme.colors.brand.main : theme.colors.white};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.brand.main};
  }
`;

const FilterButtonText = styled.span<{ active?: boolean }>`
  font-size: ${theme.typography.fontSize.font2};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${props =>
    props.active ? theme.colors.white : theme.colors.text.main};
`;

interface FilterCardProps {
  selectedDate: Date | null;
  selectedTime: Date | null;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: Date | null) => void;
}

export default function FilterCard({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: FilterCardProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <FilterCard>
        <FilterCardHeader>
          <FilterCardTitle>매치 필터</FilterCardTitle>
        </FilterCardHeader>

        <FilterRow>
          <FilterButton
            active={!!selectedDate}
            onClick={() => setShowDatePicker(true)}
          >
            <FilterButtonText active={!!selectedDate}>
              {selectedDate ? formatDate(selectedDate) : formatDate(new Date())}
            </FilterButtonText>
          </FilterButton>

          <FilterButton
            active={!!selectedTime}
            onClick={() => setShowTimePicker(true)}
          >
            <FilterButtonText active={!!selectedTime}>
              {selectedTime ? formatTime(selectedTime) : '시간 선택'}
            </FilterButtonText>
          </FilterButton>
        </FilterRow>
      </FilterCard>

      <ModalDatePicker
        visible={showDatePicker}
        value={selectedDate || new Date()}
        onDateChange={date => {
          setShowDatePicker(false);
          onDateChange(date);
        }}
        onClose={() => setShowDatePicker(false)}
        title="경기 날짜 선택"
      />

      <ModalTimePicker
        visible={showTimePicker}
        value={selectedTime || new Date()}
        onTimeChange={time => {
          setShowTimePicker(false);
          onTimeChange(time);
        }}
        onClose={() => setShowTimePicker(false)}
        title="시작 시간 이후"
      />
    </>
  );
}
