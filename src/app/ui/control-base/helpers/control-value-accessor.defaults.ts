export type TouchEventFn = () => void;
export type ChangeEventFn<T> = (value: T | null) => void;
export type ValidateEventFn = () => void;

export const defaultTouchEventFn = () => {
};

export const defaultChangeEventFn = (value: any) => {
};

export const defaultValidateEventFn = () => {
};
