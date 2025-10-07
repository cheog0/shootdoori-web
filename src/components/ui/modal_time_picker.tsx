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
  background-color: ${theme.colors.background.main};
  border-top-left-radius: ${theme.spacing.spacing4};
  border-top-right-radius: ${theme.spacing.spacing4};
  padding-bottom: ${theme.spacing.spacing6};
  width: 100%;
  max-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.spacing4} ${theme.spacing.spacing5};
  border-bottom: 1px solid ${theme.colors.border.light};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize.font5};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.main};
  margin: 0;
`;

const CancelButton = styled.button`
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  background: none;
  border: none;
  cursor: pointer;
`;

const CancelButtonText = styled.span`
  font-size: ${theme.typography.fontSize.font4};
  color: ${theme.colors.text.sub};
`;

const PickerContainer = styled.div`
  padding: ${theme.spacing.spacing4} ${theme.spacing.spacing5};
`;

const PickerRow = styled.div`
  display: flex;
  align-items: stretch;
`;

const TimeColumn = styled.div`
  flex: 1;
  margin-right: 8px;
`;

const TimeColumnSpacer = styled.div`
  width: 12px;
`;

const TimeLabel = styled.label`
  color: ${theme.colors.text.sub};
  margin-bottom: 8px;
  display: block;
`;

const TimePickerContainer = styled.div`
  border: 1px solid ${theme.colors.border.light};
  border-radius: 8px;
  overflow: hidden;
`;

const ScrollView = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const ScrollItem = styled.button<{ selected: boolean }>`
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.selected ? theme.colors.blue[50] : 'transparent'};
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props =>
      props.selected ? theme.colors.blue[100] : theme.colors.gray[50]};
  }
`;

const ScrollItemText = styled.span<{ selected: boolean }>`
  color: ${props =>
    props.selected ? theme.colors.blue[600] : theme.colors.text.main};
  font-weight: ${props =>
    props.selected
      ? theme.typography.fontWeight.semibold
      : theme.typography.fontWeight.regular};
  font-size: ${theme.typography.fontSize.font4};
`;

const Footer = styled.div`
  padding: ${theme.spacing.spacing4} ${theme.spacing.spacing5} 0
    ${theme.spacing.spacing5};
  border-top: 1px solid ${theme.colors.border.light};
`;

const ConfirmButton = styled.button`
  background-color: ${theme.colors.blue[500]};
  padding: ${theme.spacing.spacing4};
  border-radius: ${theme.spacing.spacing3};
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.blue[600]};
  }
`;

const ConfirmButtonText = styled.span`
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.white};
`;

interface ModalTimePickerProps {
  visible: boolean;
  value: Date;
  onTimeChange: (time: Date) => void;
  onClose: () => void;
  title?: string;
}

export const ModalTimePicker: React.FC<ModalTimePickerProps> = ({
  visible,
  value,
  onTimeChange,
  onClose,
  title = '시간 선택',
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(value.getHours());
  const [selectedMinute, setSelectedMinute] = useState<number>(
    value.getMinutes()
  );

  useEffect(() => {
    if (visible) {
      setSelectedHour(value.getHours());
      setSelectedMinute(value.getMinutes());
    }
  }, [visible, value]);

  const handleConfirm = () => {
    const confirmed = new Date(value);
    confirmed.setHours(selectedHour);
    confirmed.setMinutes(selectedMinute);
    confirmed.setSeconds(0);
    onTimeChange(confirmed);
    onClose();
  };

  const handleCancel = () => {
    setSelectedHour(value.getHours());
    setSelectedMinute(value.getMinutes());
    onClose();
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
                <TimeLabel>시</TimeLabel>
                <TimePickerContainer>
                  <ScrollColumn
                    range={{ start: 0, end: 23 }}
                    selectedValue={selectedHour}
                    onSelect={setSelectedHour}
                  />
                </TimePickerContainer>
              </TimeColumn>
              <TimeColumnSpacer />
              <TimeColumn>
                <TimeLabel>분</TimeLabel>
                <TimePickerContainer>
                  <ScrollColumn
                    range={{ start: 0, end: 59 }}
                    selectedValue={selectedMinute}
                    onSelect={setSelectedMinute}
                  />
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

interface ScrollColumnProps {
  range: { start: number; end: number };
  selectedValue: number;
  onSelect: (value: number) => void;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({
  range,
  selectedValue,
  onSelect,
}) => {
  const values = Array.from(
    { length: range.end - range.start + 1 },
    (_, idx) => range.start + idx
  );

  return (
    <ScrollView>
      {values.map(value => {
        const isSelected = value === selectedValue;
        return (
          <ScrollItem
            key={value}
            onClick={() => onSelect(value)}
            selected={isSelected}
          >
            <ScrollItemText selected={isSelected}>
              {String(value).padStart(2, '0')}
            </ScrollItemText>
          </ScrollItem>
        );
      })}
    </ScrollView>
  );
};
