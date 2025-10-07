import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

import { theme } from '@/theme';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.8);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'hasValue',
})<{ hasValue: boolean }>`
  font-size: 1rem;
  color: ${props =>
    props.hasValue ? theme.colors.text.main : theme.colors.text.sub};
  text-align: left;
  flex: 1;
  font-weight: 500;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.sub};
  transition: transform 0.3s ease;
`;

const DropdownList = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 9999;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  animation: ${props => (props.isOpen ? fadeInUp : 'none')} 0.3s ease-out;
  margin-top: 4px;
`;

const DropdownItem = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isSelected',
})<{ isSelected: boolean }>`
  width: 100%;
  padding: 16px;
  border: none;
  background: ${props =>
    props.isSelected
      ? `linear-gradient(135deg, ${theme.colors.brand.main}, ${theme.colors.grass[600]})`
      : 'transparent'};
  color: ${props => (props.isSelected ? 'white' : theme.colors.text.main)};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${props =>
      props.isSelected
        ? `linear-gradient(135deg, ${theme.colors.brand.main}, ${theme.colors.grass[600]})`
        : 'rgba(0, 0, 0, 0.05)'};
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const Overlay = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

interface DropdownProps<T> {
  items: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

export function Dropdown<T extends string>({
  items,
  value,
  onChange,
  placeholder = '선택하세요',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemPress = (item: T) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <Container ref={dropdownRef}>
      <DropdownButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <ButtonText hasValue={!!value}>{value || placeholder}</ButtonText>
        <IconContainer>
          {isOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
        </IconContainer>
      </DropdownButton>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <DropdownList isOpen={isOpen}>
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            isSelected={item === value}
            onClick={() => handleItemPress(item)}
            type="button"
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownList>
    </Container>
  );
}
