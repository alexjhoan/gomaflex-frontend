import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { MaterialIcon } from './MaterialIcon';

interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteProps {
  label: string;
  placeholder: string;
  options: AutocompleteOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function Autocomplete({
  label,
  placeholder,
  options,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  ariaLabel,
  className,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Filter options based on input
  useEffect(() => {
    if (!value) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(opt =>
        opt.label.toLowerCase().includes(value.toLowerCase()) ||
        opt.value.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
    setHighlightedIndex(-1);
  }, [value, options]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          const selected = filteredOptions[highlightedIndex]!;
          onChange(selected.value);
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  }, [isOpen, filteredOptions, highlightedIndex, onChange]);

  const handleOptionClick = (option: AutocompleteOption) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleFocus = () => {
    if (options.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on option
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      onBlur?.();
    }, 200);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <label className="block font-label-sm text-label-sm text-text-muted mb-1.5">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <div className="relative">
        <MaterialIcon
          name="search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-controls={isOpen ? 'autocomplete-list' : undefined}
          aria-expanded={isOpen}
          className={cn(
            'input-base w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent',
            'placeholder:text-text-muted',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Limpiar"
          >
            <MaterialIcon name="close" size={18} aria-hidden />
          </button>
        )}
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={listRef}
          id="autocomplete-list"
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-surface-canvas border border-surface-border rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={index === highlightedIndex}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                'px-4 py-2.5 cursor-pointer transition-colors font-body-sm text-body-sm',
                index === highlightedIndex
                  ? 'bg-primary-subtle text-primary-container'
                  : 'text-text-primary hover:bg-surface-subtle'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && value && (
        <div className="absolute z-50 w-full mt-1 bg-surface-canvas border border-surface-border rounded-lg shadow-lg p-4 text-center text-text-muted font-body-sm text-body-sm">
          No se encontraron resultados
        </div>
      )}
    </div>
  );
}