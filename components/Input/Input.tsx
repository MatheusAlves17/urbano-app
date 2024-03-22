import { shadow } from '@/global/shadow';
import React, { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { theme } from '@/global/theme';
import { EyeClosed, EyeOpen } from '@/assets/icons';
import {
  InputContainer,
  ErrorMessage,
  TextInput,
  TextInputMasked,
  Label,
} from './styles';

type Props<TFieldValues extends FieldValues> = {
  inputRef?: React.Ref<typeof TextInput>;
  inputSize?: number | string;
  onChevronPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  /**
   * Icones da lib MaterialIcons
   */
  iconLeft?: JSX.Element;
  marginTop?: number;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  includeRawValueInChangeText?: boolean;
  password?: boolean;
  label?: string;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  control,
  name,
  containerStyle,
  iconLeft,
  marginTop,
  type,
  password,
  label,
  ...props
}: Props<TFieldValues>) => {
  const [passwordHidden, setPasswordHidden] = useState(password);

  if (!control) {
    throw new Error('Control não foi passado como prop');
  }

  if (!name) {
    throw new Error('Name não foi passado como prop');
  }

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <View style={{ marginTop: 8 }}>
      <Label>{label}</Label>
      <InputContainer
        style={{ ...containerStyle, marginTop, ...shadow.default }}
      >
        {!!iconLeft && iconLeft}
        {type ? (
          <TextInputMasked
            onChangeText={field.onChange}
            value={field.value}
            refInput={field.ref}
            type={type}
            secureTextEntry={passwordHidden}
            placeholderTextColor={`${theme.colors.primary_02}80`}
            {...props}
          />
        ) : (
          <TextInput
            onChangeText={field.onChange}
            ref={field.ref}
            onBlur={field.onBlur}
            secureTextEntry={passwordHidden}
            placeholderTextColor={`${theme.colors.primary_02}80`}
            value={field.value}
            {...props}
          />
        )}
        <View style={{ position: 'absolute', right: 8 }}>
          {password && (
            <View>
              {passwordHidden ? (
                <EyeClosed onPress={() => setPasswordHidden(!passwordHidden)} />
              ) : (
                <EyeOpen onPress={() => setPasswordHidden(!passwordHidden)} />
              )}
            </View>
          )}
        </View>
      </InputContainer>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </View>
  );
};

export default Input;
