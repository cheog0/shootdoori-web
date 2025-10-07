import React from 'react';
import styled from 'styled-components';

// Styled Components
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  color: #374151;
  background-color: white;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export default function Message({ value, onChange, placeholder }: Props) {
  return (
    <Section>
      <Label>추가 메세지</Label>
      <Input
        placeholder={placeholder || '매치에 대한 설명을 입력하세요 (선택)'}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </Section>
  );
}
