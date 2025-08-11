import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Platform,
  UIManager
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/Config/colors';
import { fonts } from '@/Config/Fonts';

interface Option {
  label: string;
  value: string;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  style?: object;
  options?: Option[]; 
  searchable?: boolean; 
  maxDropdownHeight?: number;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  error,
  style,
  options = [], 
  searchable = true ,
  maxDropdownHeight = 400 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 300,
          duration: 200,
          useNativeDriver: false
        }),
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
      setHoveredItem(null); // Reset hover state when closing
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery && searchable) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  const measureContentHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(Math.min(height, maxDropdownHeight));
  };

  const displayValue = options.find(opt => opt.value === value)?.label || '';

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <View style={[styles.select, error ? styles.errorBorder : {}]}>
          <Text style={[styles.selectedValue, !displayValue && styles.placeholder]}>
            {displayValue || placeholder}
          </Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <AntDesign name="caretdown" size={20} color={colors.primary} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
        {searchable && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={isOpen}
            />
            {searchQuery ? (
              <AntDesign 
                name="close" 
                size={16} 
                color="#666" 
                onPress={() => setSearchQuery('')}
              />
            ) : (
              <AntDesign name="search1" size={16} color="#666" />
            )}
          </View>
        )}
        <FlatList
          data={filteredOptions}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                value === item.value && styles.selectedOption,
                hoveredItem === item.value && styles.hoveredOption
              ]}
              onPress={() => handleSelect(item.value)}
              onPressIn={() => setHoveredItem(item.value)}
              onPressOut={() => setHoveredItem(null)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{item.label}</Text>
              {value === item.value && (
                <AntDesign name="check" size={16} color="#2E7D32" />
              )}
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      </Animated.View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
    zIndex:40,
  },
  label: {
    fontSize: 10,
    fontFamily: fonts.onestLight,
    lineHeight: 18,
    marginBottom: -10,
    zIndex: 30,
    paddingHorizontal: 12,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedValue: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
    fontSize: 13,
  },
  dropdown: {
    position: 'relative',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    marginRight: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    fontFamily: "font-bold",
    fontWeight: "400",
  },
  selectedOption: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 3,
    borderLeftColor: '#2E7D32',
  },
  hoveredOption: {
    backgroundColor: '#f0f0f0',
    borderLeftWidth: 3,
    borderLeftColor: '#2E7D32',
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#FF3B30',
  },
});

export default Select;
