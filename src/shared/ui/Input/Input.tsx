import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import styles from "./Input.module.scss";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

// eslint-disable-next-line react/display-name
export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autoFocus,
    readonly,
    ...otherProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const onBlurInput = () => setIsFocused(false);
  const onFocusInput = () => setIsFocused(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectInput = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const mods: Mods = {
    [styles.readonly]: readonly
  };

  const isCaretVisible = isFocused && !readonly;

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={classNames(styles.inputWrapper, mods, [className])}>
      {placeholder && <div className={styles.placeholder}>{`${placeholder}>`}</div>}
      <div className={styles.caretWrapper}>
        <input
          ref={inputRef}
          className={styles.input}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          onSelect={onSelectInput}
          readOnly={readonly}
          {...otherProps}
        />
        {isCaretVisible && (
          <span className={styles.caret} style={{ left: `${caretPosition * 9}px` }} />
        )}
      </div>
    </div>
  );
});
