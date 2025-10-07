import { useState } from 'react';

import type { RegisterRequest } from '@/types';

export interface RegisterFormData {
  // step 1
  university: string;
  universityEmail: string;
  // step 2
  name: string;
  skillLevel: string;
  kakaoTalkId: string;
  position: string;
  studentYear: string;
  department: string;
  bio: string;
  // step 3
  email: string;
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
}

const initialFormData: RegisterFormData = {
  university: '',
  universityEmail: '',
  name: '',
  skillLevel: '',
  kakaoTalkId: '',
  position: '',
  studentYear: '',
  department: '',
  bio: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAgreed: false,
  privacyAgreed: false,
};

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);

  const updateForm = <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const resetForm = () => setFormData(initialFormData);

  const getRegisterData = (): RegisterRequest => ({
    name: formData.name,
    skillLevel: formData.skillLevel,
    email: formData.email,
    universityEmail: formData.universityEmail,
    password: formData.password,
    kakaoTalkId: formData.kakaoTalkId,
    position: formData.position,
    university: formData.university,
    department: formData.department,
    studentYear: formData.studentYear,
    bio: formData.bio,
  });

  return { formData, updateForm, resetForm, getRegisterData };
};
