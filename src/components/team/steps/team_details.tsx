import React from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
    >
      <div style={{stepContainer}>
        <div style={{stepHeader}>
          <span style={{stepTitle}>팀 상세 정보를 입력해주세요</span>
          <span style={{stepSubtitle}>
            팀의 실력 수준과 설명을 작성해주세요
          </span>
        </div>

        <div style={{stepContent}>
          <div style={{inputContainer}>
            <span style={{inputLabel}>팀 실력 *</span>
            <div style={{selectorContainer}>
              {SKILL_LEVELS.map(level => (
                <button
                  key={level}
                  style={[
                    styles.stepSelectorButton,
                    skillLevel === level && styles.stepSelectorButtonActive,
                  ]}
                  onClick={() => onSkillLevelChange(level)}
                >
                  <span
                    style={[
                      styles.stepSelectorButtonText,
                      skillLevel === level &&
                        styles.stepSelectorButtonTextActive,
                    ]}
                  >
                    {level}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{inputContainer}>
            <span style={{inputLabel}>팀 설명</span>
            <spanInput
              style={[
                styles.stepTextArea,
                errors.description && styles.textInputError,
              ]}
              value={description}
              onChange={onDescriptionChange}
              placeholder="팀의 목표, 활동 내용, 모집 조건 등을 자유롭게 작성해주세요"
              multiline
             
              maxLength={1000}
              textAlignVertical="top"
            />
            <span style={{characterCount}>{description.length}/1000</span>
            {errors.description && (
              <span style={{errorText}>{errors.description}</span>
            )}
          </div>
        </div>

        <div style={{stepFooter}>
          <button style={{backButton} onClick={onBack}>
            <ChevronBack size={20} color={colors.gray[600]} />
            <span style={{backButtonText}>이전</span>
          </button>

          <button
            style={[nextButton, !description.trim() && { opacity: 0.5 }]}
            onClick={onSubmit}
            disabled={!description.trim()}
          >
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
            <span style={{nextButtonText}> 팀 생성</span>
          </button>
        </div>
      </div>
    </KeyboardAwareScrollView>
  );
}
