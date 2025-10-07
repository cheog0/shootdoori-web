import React from 'react';
import { ChevronBack } from 'lucide-react';

import { colors } from '@/theme';
import { SkillLevel, SKILL_LEVELS } from '@/types/team';

interface TeamDetailsProps {
  skillLevel: SkillLevel;
  description: string;
  onSkillLevelChange: (level: SkillLevel) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  errors: {
    description?: string;
  };
}

const stepContainer = {
  flex: 1,
  padding: '20px',
  backgroundColor: colors.background.main,
};

const stepHeader = {
  marginBottom: '32px',
};

const stepTitle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: colors.text.main,
  marginBottom: '8px',
};

const stepSubtitle = {
  fontSize: '16px',
  color: colors.text.sub,
};

const stepContent = {
  flex: 1,
};

const inputContainer = {
  marginBottom: '24px',
};

const inputLabel = {
  fontSize: '16px',
  fontWeight: '500',
  color: colors.text.main,
  marginBottom: '12px',
  display: 'block',
};

const selectorContainer = {
  display: 'flex',
  flexDirection: 'row' as const,
  gap: '12px',
  flexWrap: 'wrap' as const,
};

const stepSelectorButton = {
  padding: '12px 20px',
  borderRadius: '8px',
  border: `1px solid ${colors.border.main}`,
  backgroundColor: colors.background.main,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const stepSelectorButtonActive = {
  backgroundColor: colors.brand.main,
  borderColor: colors.brand.main,
};

const stepSelectorButtonText = {
  fontSize: '14px',
  fontWeight: '500',
  color: colors.text.main,
};

const stepSelectorButtonTextActive = {
  color: colors.white,
};

const stepTextArea = {
  width: '100%',
  minHeight: '120px',
  padding: '12px',
  borderRadius: '8px',
  border: `1px solid ${colors.border.main}`,
  backgroundColor: colors.background.main,
  fontSize: '14px',
  color: colors.text.main,
  resize: 'vertical' as const,
};

const textInputError = {
  borderColor: colors.error.main,
};

const characterCount = {
  fontSize: '12px',
  color: colors.text.sub,
  textAlign: 'right' as const,
  marginTop: '4px',
};

const errorText = {
  fontSize: '12px',
  color: colors.error.main,
  marginTop: '4px',
};

const stepFooter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px',
};

const backButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  backgroundColor: 'transparent',
  border: `1px solid ${colors.border.main}`,
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  color: colors.text.main,
};

const backButtonText = {
  fontSize: '14px',
  fontWeight: '500',
};

const nextButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  backgroundColor: colors.brand.main,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  color: colors.white,
};

const nextButtonText = {
  fontSize: '14px',
  fontWeight: '500',
};

export default function TeamDetails({
  skillLevel,
  description,
  onSkillLevelChange,
  onDescriptionChange,
  onSubmit,
  onBack,
  errors,
}: TeamDetailsProps) {
  return (
    <div style={stepContainer}>
      <div style={stepHeader}>
        <span style={stepTitle}>팀 상세 정보를 입력해주세요</span>
        <span style={stepSubtitle}>
          팀의 실력 수준과 설명을 작성해주세요
        </span>
      </div>

      <div style={stepContent}>
        <div style={inputContainer}>
          <span style={inputLabel}>팀 실력 *</span>
          <div style={selectorContainer}>
            {SKILL_LEVELS.map(level => (
              <button
                key={level}
                style={{
                  ...stepSelectorButton,
                  ...(skillLevel === level ? stepSelectorButtonActive : {}),
                }}
                onClick={() => onSkillLevelChange(level)}
              >
                <span
                  style={{
                    ...stepSelectorButtonText,
                    ...(skillLevel === level ? stepSelectorButtonTextActive : {}),
                  }}
                >
                  {level}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={inputContainer}>
          <span style={inputLabel}>팀 설명</span>
          <textarea
            style={{
              ...stepTextArea,
              ...(errors.description ? textInputError : {}),
            }}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="팀의 목표, 활동 내용, 모집 조건 등을 자유롭게 작성해주세요"
            maxLength={1000}
          />
          <span style={characterCount}>{description.length}/1000</span>
          {errors.description && (
            <span style={errorText}>{errors.description}</span>
          )}
        </div>
      </div>

      <div style={stepFooter}>
        <button style={backButton} onClick={onBack}>
          <ChevronBack size={20} color={colors.gray[600]} />
          <span style={backButtonText}>이전</span>
        </button>

        <button
          style={{
            ...nextButton,
            ...(!description.trim() ? { opacity: 0.5 } : {}),
          }}
          onClick={onSubmit}
          disabled={!description.trim()}
        >
          <span style={nextButtonText}>팀 생성</span>
        </button>
      </div>
    </div>
  );
}
