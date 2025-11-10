import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import {
  OpaqueColorValue,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type IconMapping = Record<
  SymbolViewProps['name'],
  ComponentProps<typeof MaterialIcons>['name']
>;

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  // iOS가 아닌 경우 (Android, Web) MaterialIcons 사용
  if (Platform.OS !== 'ios') {
    const materialIconName = MAPPING[name as keyof typeof MAPPING];
    if (!materialIconName) {
      console.warn(`Icon mapping not found for: ${name}`);
      return null;
    }

    return (
      <MaterialIcons
        color={color}
        size={size}
        name={materialIconName}
        style={style as any}
      />
    );
  }

  // iOS인 경우 SymbolView 사용
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
