import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { theme } from '@/theme';

// Styled Components
const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CancelButtonText = styled.span`
  font-size: 16px;
  color: #6b7280;
`;

const PickerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const PickerRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const TimeColumn = styled.div`
  flex: 1;
`;

const TimeColumnSpacer = styled.div`
  width: 20px;
`;

const TimeLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScrollView = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const ScrollItem = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 12px;
  border: none;
  background-color: ${props => (props.selected ? '#3b82f6' : 'white')};
  color: ${props => (props.selected ? 'white' : '#374151')};
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => (props.selected ? '#2563eb' : '#f3f4f6')};
  }
`;

const ScrollItemText = styled.span`
  font-size: 16px;
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
`;

const ConfirmButton = styled.button`
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
`;

const ConfirmButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

interface ModalDatePickerProps {
  visible: boolean;
  value: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
  title?: string;
}

export const ModalDatePicker: React.FC<ModalDatePickerProps> = ({
  visible,
  value,
  onDateChange,
  onClose,
  title = '날짜 선택',
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(value.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(value.getDate());

  useEffect(() => {
    if (visible) {
      setSelectedMonth(value.getMonth());
      setSelectedDay(value.getDate());
    }
  }, [visible, value]);

  const handleConfirm = () => {
    const confirmed = new Date(
      currentYear,
      selectedMonth,
      selectedDay,
      12,
      0,
      0
    );

    onDateChange(confirmed);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const renderScrollItem = (
    items: (string | number)[],
    selectedValue: number,
    onSelect: (value: number) => void
  ) => {
    return items.map((item, index) => (
      <ScrollItem
        key={index}
        selected={selectedValue === index}
        onClick={() => onSelect(index)}
      >
        <ScrollItemText>{item}</ScrollItemText>
      </ScrollItem>
    ));
  };

  return (
    <Overlay visible={visible}>
      <div onClick={handleCancel}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          <Header>
            <Title>{title}</Title>
            <CancelButton onClick={handleCancel}>
              <CancelButtonText>취소</CancelButtonText>
            </CancelButton>
          </Header>

          <PickerContainer>
            <PickerRow>
              <TimeColumn>
                <TimeLabel>월</TimeLabel>
                <TimePickerContainer>
                  <ScrollView>
                    {renderScrollItem(months, selectedMonth, setSelectedMonth)}
                  </ScrollView>
                </TimePickerContainer>
              </TimeColumn>

              <TimeColumnSpacer />

              <TimeColumn>
                <TimeLabel>일</TimeLabel>
                <TimePickerContainer>
                  <ScrollView>
                    {renderScrollItem(days, selectedDay - 1, index =>
                      setSelectedDay(index + 1)
                    )}
                  </ScrollView>
                </TimePickerContainer>
              </TimeColumn>
            </PickerRow>
          </PickerContainer>

          <Footer>
            <ConfirmButton onClick={handleConfirm}>
              <ConfirmButtonText>확인</ConfirmButtonText>
            </ConfirmButton>
          </Footer>
        </ModalContainer>
      </div>
    </Overlay>
  );
};
