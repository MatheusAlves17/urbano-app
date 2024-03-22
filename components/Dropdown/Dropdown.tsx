/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';

interface Option {
  label: string;
  value: string;
}

type Props<TFieldValues extends FieldValues> = {
  options: Option[];
  placeholder?: string;
  zIndex?: number;
} & UseControllerProps<TFieldValues>;

/**
 *
 * @param zIndex Utilizar zIndex maior que 1 para que o dropdown fique acima de outros dropdown
 */
const Dropdown = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  zIndex = 1,
}: Props<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    control: control as Control<TFieldValues>,
    name,
  });

  const [isOpen, setOpen] = React.useState(false);

  return (
    <DropDownPicker
      open={isOpen}
      value={value}
      items={options}
      setOpen={setOpen}
      setValue={() => null}
      setItems={() => null}
      flatListProps={{
        nestedScrollEnabled: true,
      }}
      onSelectItem={item => onChange(item.value)}
      containerStyle={{
        width: '90%',
        alignSelf: 'center',
        zIndex: 999,
      }}
      listItemContainerStyle={{
        borderTopWidth: 0,
      }}
      listParentContainerStyle={{
        borderWidth: 0,
      }}
      dropDownContainerStyle={{
        borderTopColor: '#57575865',
      }}
      placeholder={placeholder ?? 'Selecione uma opção'}
      zIndex={zIndex}
    />
  );
};

export default Dropdown;
