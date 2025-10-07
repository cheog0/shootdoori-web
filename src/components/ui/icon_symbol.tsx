import React from 'react';
import {
  IoHome,
  IoPaperPlane,
  IoCodeSlash,
  IoChevronForward,
  IoChevronBack,
  IoPerson,
  IoPeople,
  IoSettings,
  IoLogOut,
  IoAdd,
  IoClose,
  IoCheckmark,
  IoWarning,
  IoInformationCircle,
  IoTrash,
  IoPencil,
  IoSearch,
  IoFilter,
  IoCalendar,
  IoTime,
  IoLocation,
  IoMail,
  IoCall,
  IoGlobe,
  IoStar,
  IoHeart,
  IoThumbsUp,
  IoThumbsDown,
  IoShare,
  IoDownload,
  IoArrowUp,
  IoRefresh,
  IoMenu,
  IoEllipsisHorizontal,
  IoEllipsisVertical,
} from 'react-icons/io5';

import { theme } from '@/styles/theme';

type IconName =
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'chevron.left'
  | 'person.fill'
  | 'person.2.fill'
  | 'gearshape.fill'
  | 'rectangle.portrait.and.arrow.right'
  | 'plus'
  | 'xmark'
  | 'checkmark'
  | 'exclamationmark.triangle.fill'
  | 'info.circle.fill'
  | 'trash.fill'
  | 'pencil'
  | 'magnifyingglass'
  | 'line.3.horizontal.decrease'
  | 'calendar'
  | 'clock'
  | 'location.fill'
  | 'envelope.fill'
  | 'phone.fill'
  | 'globe'
  | 'star.fill'
  | 'heart.fill'
  | 'hand.thumbsup.fill'
  | 'hand.thumbsdown.fill'
  | 'square.and.arrow.up'
  | 'arrow.down.circle.fill'
  | 'arrow.up.circle.fill'
  | 'arrow.clockwise'
  | 'line.3.horizontal'
  | 'ellipsis'
  | 'ellipsis.vertical';

interface IconSymbolProps {
  name: IconName;
  size?: number;
  color?: string;
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
}

const iconMap: Record<
  IconName,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  'house.fill': IoHome,
  'paperplane.fill': IoPaperPlane,
  'chevron.left.forwardslash.chevron.right': IoCodeSlash,
  'chevron.right': IoChevronForward,
  'chevron.left': IoChevronBack,
  'person.fill': IoPerson,
  'person.2.fill': IoPeople,
  'gearshape.fill': IoSettings,
  'rectangle.portrait.and.arrow.right': IoLogOut,
  plus: IoAdd,
  xmark: IoClose,
  checkmark: IoCheckmark,
  'exclamationmark.triangle.fill': IoWarning,
  'info.circle.fill': IoInformationCircle,
  'trash.fill': IoTrash,
  pencil: IoPencil,
  magnifyingglass: IoSearch,
  'line.3.horizontal.decrease': IoFilter,
  calendar: IoCalendar,
  clock: IoTime,
  'location.fill': IoLocation,
  'envelope.fill': IoMail,
  'phone.fill': IoCall,
  globe: IoGlobe,
  'star.fill': IoStar,
  'heart.fill': IoHeart,
  'hand.thumbsup.fill': IoThumbsUp,
  'hand.thumbsdown.fill': IoThumbsDown,
  'square.and.arrow.up': IoShare,
  'arrow.down.circle.fill': IoDownload,
  'arrow.up.circle.fill': IoArrowUp,
  'arrow.clockwise': IoRefresh,
  'line.3.horizontal': IoMenu,
  ellipsis: IoEllipsisHorizontal,
  'ellipsis.vertical': IoEllipsisVertical,
};

export function IconSymbol({
  name,
  size = 24,
  color = theme.colors.textMain,
  weight = 'regular',
}: IconSymbolProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} color={color} />;
}
