// Type definitions for redux-form 7.5
// Project: https://github.com/erikras/redux-form, https://redux-form.com
// Definitions by: Carson Full <https://github.com/carsonf>
//                 Daniel Lytkin <https://github.com/aikoven>
//                 Karol Janyst <https://github.com/LKay>
//                 Luka Zakrajsek <https://github.com/bancek>
//                 Alex Young <https://github.com/alsiola>
//                 Anton Novik <https://github.com/tehbi4>
//                 Huw Martin <https://github.com/huwmartin>
//                 Ethan Resnick <https://github.com/ethanresnick>
//                 Tim de Koning <https://github.com/reggino>
//                 Maddi Joyce <https://github.com/maddijoyce>
//                 Kamil Wojcik <https://github.com/smifun>
//                 Mohamed Shaaban <https://github.com/mshaaban088>
//                 Ethan Setnik <https://github.com/esetnik>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

declare module 'redux-form' {
    import {
        Component,
        ComponentClass,
        ComponentType,
        DragEvent,
        FocusEvent,
        ReactElement,
        ReactNode,
        SyntheticEvent,
        StatelessComponent,
        FormEventHandler,
        ChangeEvent,
        InputHTMLAttributes,
        SelectHTMLAttributes,
        TextareaHTMLAttributes,
        FormHTMLAttributes,
    } from "react";
    import { Dispatch, Reducer, Action } from "redux";

    export type FieldType = "Field" | "FieldArray";

    export interface ErrorOther<T = string> {
        _error?: T;
    }

    export type FormErrors<FormData = {}, T = string> = {
        [P in keyof FormData]?: ReactElement<any, any> | T;
    } & ErrorOther<T>;

    export interface WarningOther<T = void> {
        _warning?: T;
    }

    export type FormWarnings<FormData = {}, T = void> = {
        [P in keyof FormData]?: ReactElement<any, any> | string | WarningOther<T>;
    };

    export interface RegisteredFieldState {
        name: string;
        type: FieldType;
    }

    export type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never } & { [x: string]: never, [x: number]: never })[keyof T]>;

    export type FormSubmitHandler<FormData = {}, P = {}, ErrorType = string> =
        (values: FormData, dispatch: Dispatch<any>, props: P) => void | FormErrors<FormData, ErrorType> | Promise<any>;

    export type GetFormState = (state: any) => FormStateMap;
    export interface SubmitHandler<FormData = {}, P = {}, ErrorType = string> {
        (
            submit: FormSubmitHandler<FormData, P, ErrorType>,
            props?: InjectedFormProps<FormData, P, ErrorType>,
            valid?: boolean,
            asyncValidate?: any,
            fields?: string[]
        ): any;
        (event: SyntheticEvent<any>): void;
    }

    export interface ValidateCallback<FormData, P, ErrorType> {
        values: FormData;
        nextProps: P & InjectedFormProps<FormData, P, ErrorType>;
        props: P & InjectedFormProps<FormData, P, ErrorType>;
        initialRender: boolean;
        structure: any;
    }

    export interface AsyncValidateCallback<FormData, ErrorType> {
        asyncErrors?: FormErrors<FormData, ErrorType>;
        initialized: boolean;
        trigger: "blur" | "submit";
        blurredField?: string;
        pristine: boolean;
        syncValidationPasses: boolean;
    }

    export interface InjectedArrayProps {
        insert(field: string, index: number, value: any): void;
        move(field: string, from: number, to: number): void;
        pop(field: string): void;
        push(field: string, value: any): void;
        remove(field: string, index: number): void;
        removeAll(field: string): void;
        shift(field: string): void;
        splice(field: string, index: number, removeNum: number, value: any): void;
        swap(field: string, indexA: number, indexB: number): void;
        unshift(field: string, value: any): void;
    }

    export interface RegisteredField {
        count: number;
        name: string;
        type: "Field" | "FieldArray";
    }

    export interface InjectedFormProps<FormData = {}, P = {}, ErrorType = string> {
        anyTouched: boolean;
        array: InjectedArrayProps;
        asyncValidate(): void;
        asyncValidating: string | boolean;
        autofill(field: string, value: any): void;
        blur(field: string, value: any): void;
        change(field: string, value: any): void;
        clearAsyncError(field: string): void;
        destroy(): void;
        dirty: boolean;
        error: ErrorType;
        form: string;
        handleSubmit: SubmitHandler<FormData, P, ErrorType>;
        initialize(data: Partial<FormData>): void;
        initialized: boolean;
        initialValues: Partial<FormData>;
        invalid: boolean;
        pristine: boolean;
        reset(): void;
        submitFailed: boolean;
        submitSucceeded: boolean;
        submitting: boolean;
        touch(...field: string[]): void;
        untouch(...field: string[]): void;
        valid: boolean;
        warning: any;
        registeredFields: { [name: string]: RegisteredField };
    }

    export interface ConfigProps<FormData = {}, P = {}, ErrorType = string> {
        form: string;
        asyncBlurFields?: string[];
        asyncChangeFields?: string[];
        asyncValidate?(values: FormData, dispatch: Dispatch<any>, props: P & InjectedFormProps<FormData, P, ErrorType>, blurredField: string): Promise<any>;
        destroyOnUnmount?: boolean;
        enableReinitialize?: boolean;
        forceUnregisterOnUnmount?: boolean;
        getFormState?: GetFormState;
        immutableProps?: string[];
        initialValues?: Partial<FormData>;
        keepDirtyOnReinitialize?: boolean;
        updateUnregisteredFields?: boolean;
        onChange?(values: Partial<FormData>, dispatch: Dispatch<any>, props: P & InjectedFormProps<FormData, P, ErrorType>, previousValues: Partial<FormData>): void;
        onSubmit?: FormSubmitHandler<FormData, P & InjectedFormProps<FormData, P, ErrorType>, ErrorType> | SubmitHandler<FormData, P & InjectedFormProps<FormData, P, ErrorType>, ErrorType>;
        onSubmitFail?(
            errors: FormErrors<FormData, ErrorType> | undefined,
            dispatch: Dispatch<any>,
            submitError: any,
            props: P & InjectedFormProps<FormData, P, ErrorType>
        ): void;
        onSubmitSuccess?(result: any, dispatch: Dispatch<any>, props: P & InjectedFormProps<FormData, P, ErrorType>): void;
        propNamespace?: string;
        pure?: boolean;
        shouldValidate?(params: ValidateCallback<FormData, P, ErrorType>): boolean;
        shouldError?(params: ValidateCallback<FormData, P, ErrorType>): boolean;
        shouldWarn?(params: ValidateCallback<FormData, P, ErrorType>): boolean;
        shouldAsyncValidate?(params: AsyncValidateCallback<FormData, ErrorType>): boolean;
        touchOnBlur?: boolean;
        touchOnChange?: boolean;
        persistentSubmitErrors?: boolean;
        validate?(values: FormData, props: P & InjectedFormProps<FormData, P, ErrorType>): FormErrors<FormData, ErrorType>;
        warn?(values: FormData, props: P & InjectedFormProps<FormData, P, ErrorType>): FormWarnings<FormData>;
    }

    export interface FormInstance<FormData, P, ErrorType> extends Component<P> {
        dirty: boolean;
        invalid: boolean;
        pristine: boolean;
        registeredFields: RegisteredFieldState[];
        reset(): void;
        resetSection(...sections: string[]): void;
        submit(): Promise<any>;
        valid: boolean;
        values: Partial<FormData>;
        wrappedInstance: ReactElement<P & InjectedFormProps<FormData, P, ErrorType>>;
    }

    export interface DecoratedComponentClass<FormData, P, ErrorType> {
        new(props?: P, context?: any): FormInstance<FormData, P, ErrorType>;
    }

    export type FormDecorator<FormData, P, Config, ErrorType = string> =
        (component: ComponentType<P & InjectedFormProps<FormData, P, ErrorType>>) => DecoratedComponentClass<FormData, P & Config, ErrorType>;

    export function reduxForm<FormData = {}, P = {}, ErrorType = string>(
        config: ConfigProps<FormData, P, ErrorType>
    ): FormDecorator<FormData, P, Partial<ConfigProps<FormData, P, ErrorType>>, ErrorType>;

    export function reduxForm<FormData = {}, P = {}, ErrorType = string>(
        config: Partial<ConfigProps<FormData, P, ErrorType>>
    ): FormDecorator<FormData, P, ConfigProps<FormData, P, ErrorType>, ErrorType>;

    export type Normalizer = (value: any, previousValue?: any, allValues?: any, previousAllValues?: any) => any;
    export type Formatter = (value: any, name: string) => any;
    export type Parser = (value: any, name: string) => any;
    export type Validator = (value: any, allValues?: any, props?: any, name?: any) => any;

    export type EventHandler<Event> = (event: Event, name?: string) => void;
    export type EventWithDataHandler<Event> = (event?: Event, newValue?: any, previousValue?: any, name?: string) => void;

    export interface EventOrValueHandler<Event> extends EventHandler<Event> {
        (value: any): void;
    }

    export interface CommonFieldInputProps {
        name: string;
        onDragStart: EventHandler<DragEvent>;
        onDrop: EventHandler<DragEvent>;
        onFocus: EventHandler<FocusEvent>;
    }

    export interface CommonFieldProps extends CommonFieldInputProps {
        onBlur: EventWithDataHandler<FocusEvent>;
        onChange: EventWithDataHandler<ChangeEvent<any>>;
    }

    export interface BaseFieldProps<P = {}> extends Partial<CommonFieldProps> {
        name: string;
        component?: ComponentType<WrappedFieldProps & P> | "input" | "select" | "textarea";
        format?: Formatter | null;
        normalize?: Normalizer;
        props?: P;
        parse?: Parser;
        validate?: Validator | Validator[];
        warn?: Validator | Validator[];
        withRef?: boolean;
        immutableProps?: string[];
    }

    export interface GenericField<P> extends Component<BaseFieldProps<P> & P> {
        dirty: boolean;
        name: string;
        pristine: boolean;
        value: any;
        getRenderedComponent(): Component<WrappedFieldProps & P>;
    }

    export type GenericFieldHTMLAttributes =
        InputHTMLAttributes<HTMLInputElement> |
        SelectHTMLAttributes<HTMLSelectElement> |
        TextareaHTMLAttributes<HTMLTextAreaElement>;

    export class Field<P extends GenericFieldHTMLAttributes | BaseFieldProps = GenericFieldHTMLAttributes | BaseFieldProps> extends Component<P> {
        dirty: boolean;
        name: string;
        pristine: boolean;
        value: any;
        getRenderedComponent(): Component<WrappedFieldProps & P>;
    }

    export interface WrappedFieldProps {
        input: WrappedFieldInputProps;
        meta: WrappedFieldMetaProps;
    }

    export interface WrappedFieldInputProps extends CommonFieldInputProps {
        checked?: boolean;
        value: any;
        onBlur: EventOrValueHandler<FocusEvent>;
        onChange: EventOrValueHandler<ChangeEvent<any>>;
    }

    export interface WrappedFieldMetaProps {
        active?: boolean;
        autofilled: boolean;
        asyncValidating: boolean;
        dirty: boolean;
        dispatch: Dispatch<any>;
        error?: any;
        form: string;
        initial: any;
        invalid: boolean;
        pristine: boolean;
        submitting: boolean;
        submitFailed: boolean;
        touched: boolean;
        valid: boolean;
        visited: boolean;
        warning?: any;
    }

    interface BaseFieldsProps<P = {}> {
        names: string[];
        component?: ComponentType<any>;
        format?: Formatter | null;
        props?: P;
        parse?: Parser;
        withRef?: boolean;
    }

    export interface GenericFields<P> extends Component<BaseFieldsProps<P> & P> {
        dirty: boolean;
        names: string[];
        pristine: boolean;
        values: { [name: string]: any };
        getRenderedComponent(): Component<BaseFieldsProps & WrappedFieldsProps & P>;
    }

    export class Fields<P = {}> extends Component<BaseFieldsProps<P> & P> implements GenericFields<P> {
        dirty: boolean;
        names: string[];
        pristine: boolean;
        values: { [name: string]: any };
        getRenderedComponent(): Component<BaseFieldsProps & WrappedFieldsProps & P>;
    }

    interface WrappedFieldsProps {
        [name: string]: WrappedFieldsProps & WrappedFieldProps;
    }

    export interface BaseFieldArrayProps<P = {}> {
        name: string;
        component: ComponentType<P>;
        validate?: Validator | Validator[];
        warn?: Validator | Validator[];
        withRef?: boolean;
        props?: P;
        rerenderOnEveryChange?: boolean;
    }

    export interface GenericFieldArray<Field, P = {}> extends Component<BaseFieldArrayProps<P> & Partial<P>> {
        name: string;
        valid: boolean;
        getRenderedComponent(): Component<WrappedFieldArrayProps<Field> & P>;
    }

    export class FieldArray<P = {}> extends Component<BaseFieldArrayProps<P> & Partial<P>> implements GenericFieldArray<any, P> {
        name: string;
        valid: boolean;
        getRenderedComponent(): Component<WrappedFieldArrayProps<any> & P>;
    }

    export interface WrappedFieldArrayProps<FieldValue> {
        fields: FieldArrayFieldsProps<FieldValue>;
        meta: FieldArrayMetaProps;
    }

    export type FieldIterate<FieldValue, R = void> = (name: string, index: number, fields: FieldArrayFieldsProps<FieldValue>) => R;

    export interface FieldArrayFieldsProps<FieldValue> {
        forEach(callback: FieldIterate<FieldValue>): void;
        get(index: number): FieldValue;
        getAll(): FieldValue[];
        removeAll(): void;
        insert(index: number, value: FieldValue): void;
        name: string;
        length: number;
        map<R>(callback: FieldIterate<FieldValue, R>): R[];
        pop(): FieldValue;
        push(value: FieldValue): void;
        remove(index: number): void;
        shift(): FieldValue;
        swap(indexA: number, indexB: number): void;
        move(from: number, to: number): void;
        unshift(value: FieldValue): void;
    }

    export interface FieldArrayMetaProps {
        dirty: boolean;
        error?: any;
        form: string;
        invalid: boolean;
        pristine: boolean;
        submitFailed: boolean;
        submitting: boolean;
        valid: boolean;
        warning?: any;
    }

    interface FormSubmitProp<FormData = {}, P = {}, ErrorType = string> {
        onSubmit?: FormSubmitHandler<FormData, P, ErrorType>;
    }

    export type FormProps<FormData, P, ErrorType = string> = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & FormSubmitProp<FormData, P, ErrorType>;

    export class GenericForm<FormData, P, ErrorType> extends Component<FormProps<FormData, P, ErrorType>> { }

    export class Form<FormData = {}, P = {}, ErrorType = string> extends Component<FormProps<FormData, P, ErrorType>> implements GenericForm<FormData, P, ErrorType> { }

    export interface FormNameProps {
        children: (props: { form: string }) => ReactNode;
    }

    export const FormName: StatelessComponent<FormNameProps>;

    export interface FormSectionProps<P> {
        name: string;
        component?: ComponentType<P>;
    }

    export class FormSection<P = {}> extends Component<FormSectionProps<P> & P> { }
    export function formValues<
        Values,
        P = {}
    >(obj: Values): (component: ComponentType<P & { [K in keyof Values]: any }>) => ComponentClass<P & { [K in keyof Values]: any }>;

    export function formValues<
        FormData = {},
        K extends keyof FormData = keyof FormData,
        P = {}
    >(...names: K[]): (component: ComponentType<P & Pick<FormData, K>>) => ComponentClass<P & Pick<FormData, K>>;

    export function formValueSelector<State = {}>(
        form: string,
        getFormState?: (state: State) => FormStateMap
    ): (state: State, ...field: string[]) => any;

    export default formValueSelector;

    export interface FormReducer extends Reducer<FormStateMap> {
        plugin(reducers: FormReducerMapObject): Reducer<FormStateMap>;
    }

    export const reducer: FormReducer;

    export interface FormReducerMapObject {
        // and `<any>` to make it compatible with redux@3
        // tslint:disable-next-line use-default-type-parameter
        [formName: string]: Reducer<any>;
    }

    export interface FormStateMap {
        [formName: string]: FormState;
    }

    export interface FormState {
        registeredFields: RegisteredFieldState[];
        fields?: { [name: string]: FieldState };
        values?: { [fieldName: string]: any };
        active?: string;
        anyTouched?: boolean;
        submitting?: boolean;
        submitErrors?: { [fieldName: string]: string };
        submitFailed?: boolean;
    }

    export interface RegisteredFieldState {
        name: string;
        type: FieldType;
    }

    export interface FieldState {
        active?: boolean;
        touched?: boolean;
        visited?: boolean;
    }

    export class SubmissionError<FormData = {}, ErrorType = string> extends Error {
        constructor(errors?: FormErrors<FormData, ErrorType>);
    }

    export interface FormAction extends Action {
        meta?: any;
        payload?: any;
        error?: any;
    }

    export function arrayInsert(form: string, field: string, index: number, value: any): FormAction;
    export function arrayMove(form: string, field: string, from: number, to: number): FormAction;
    export function arrayPop(form: string, field: string): FormAction;
    export function arrayPush(form: string, field: string, value: any): FormAction;
    export function arrayRemove(form: string, field: string, index: number): FormAction;
    export function arrayRemoveAll(form: string, field: string): FormAction;
    export function arrayShift(form: string, field: string): FormAction;
    export function arraySplice(form: string, field: string, index: number, removeNum: number, value: any): FormAction;
    export function arraySwap(form: string, field: string, indexA: number, indexB: number): FormAction;
    export function arrayUnshift(form: string, field: string, value: any): FormAction;
    export function autofill(form: string, field: string, value: any): FormAction;
    export function blur(form: string, field: string, value: any, touch?: boolean): FormAction;
    export function change(form: string, field: string, value: any, touch?: boolean, persistentSubmitErrors?: boolean): FormAction;
    export function destroy(...form: string[]): FormAction;
    export function focus(form: string, field: string): FormAction;

    export interface InitializeOptions {
        keepDirty: boolean;
        keepSubmitSucceeded: boolean;
        updateUnregisteredFields: boolean;
        keepValues: boolean;
    }

    export function initialize(form: string, data: any, keepDirty?: boolean, options?: Partial<InitializeOptions>): FormAction;
    export function initialize(form: string, data: any, options?: Partial<InitializeOptions>): FormAction;
    export function registerField(form: string, name: string, type: FieldType): FormAction;
    export function reset(form: string): FormAction;
    export function resetSection(form: string, ...sections: string[]): FormAction;
    export function startAsyncValidation(form: string): FormAction;
    export function stopAsyncValidation(form: string, errors?: FormErrors<FormData, any>): FormAction;
    export function setSubmitFailed(form: string, ...fields: string[]): FormAction;
    export function setSubmitSucceeded(form: string, ...fields: string[]): FormAction;
    export function startSubmit(form: string): FormAction;
    export function stopSubmit(form: string, errors?: FormErrors<FormData, any>): FormAction;
    export function submit(form: string): FormAction;
    export function clearSubmit(form: string): FormAction;
    export function clearSubmitErrors(form: string): FormAction;
    export function clearAsyncError(form: string, field: string): FormAction;
    export function clearFields(form: string, keepTouched: boolean, persistentSubmitErrors: boolean, ...fields: string[]): FormAction;
    export function touch(form: string, ...fields: string[]): FormAction;
    export function unregisterField(form: string, name: string): FormAction;
    export function untouch(form: string, ...fields: string[]): FormAction;
    export function updateSyncErrors<T = any>(from: string, syncErrors: FormErrors<FormData, T>, error: T): FormAction;
    export function updateSyncWarnings<T = any>(form: string, syncWarnings: FormWarnings<FormData, T>, warning: T): FormAction;

    const actions: {
        arrayInsert: typeof arrayInsert,
        arrayMove: typeof arrayMove,
        arrayPop: typeof arrayPop,
        arrayPush: typeof arrayPush,
        arrayRemove: typeof arrayRemove,
        arrayRemoveAll: typeof arrayRemoveAll,
        arrayShift: typeof arrayShift,
        arraySplice: typeof arraySplice,
        arraySwap: typeof arraySwap,
        arrayUnshift: typeof arrayUnshift,
        autofill: typeof autofill,
        blur: typeof blur,
        change: typeof change,
        clearSubmit: typeof clearSubmit,
        clearSubmitErrors: typeof clearSubmitErrors,
        clearAsyncError: typeof clearAsyncError,
        clearFields: typeof clearFields,
        destroy: typeof destroy,
        focus: typeof focus,
        initialize: typeof initialize,
        registerField: typeof registerField,
        reset: typeof reset,
        startAsyncValidation: typeof startAsyncValidation,
        startSubmit: typeof startSubmit,
        stopAsyncValidation: typeof stopAsyncValidation,
        stopSubmit: typeof stopSubmit,
        submit: typeof submit,
        setSubmitFailed: typeof setSubmitFailed,
        setSubmitSucceeded: typeof setSubmitSucceeded,
        touch: typeof touch,
        unregisterField: typeof unregisterField,
        untouch: typeof untouch,
        updateSyncErrors: typeof updateSyncErrors,
        updateSyncWarnings: typeof updateSyncWarnings
    };
    export interface ActionTypes {
        ARRAY_INSERT: string;
        ARRAY_MOVE: string;
        ARRAY_POP: string;
        ARRAY_PUSH: string;
        ARRAY_REMOVE: string;
        ARRAY_REMOVE_ALL: string;
        ARRAY_SHIFT: string;
        ARRAY_SPLICE: string;
        ARRAY_UNSHIFT: string;
        ARRAY_SWAP: string;
        AUTOFILL: string;
        BLUR: string;
        CHANGE: string;
        CLEAR_SUBMIT: string;
        CLEAR_SUBMIT_ERRORS: string;
        CLEAR_ASYNC_ERROR: string;
        CLEAR_FIELDS: string;
        DESTROY: string;
        FOCUS: string;
        INITIALIZE: string;
        REGISTER_FIELD: string;
        RESET: string;
        RESET_SECTION: string;
        SET_SUBMIT_FAILED: string;
        SET_SUBMIT_SUCCEEDED: string;
        START_ASYNC_VALIDATION: string;
        START_SUBMIT: string;
        STOP_ASYNC_VALIDATION: string;
        STOP_SUBMIT: string;
        SUBMIT: string;
        TOUCH: string;
        UNREGISTER_FIELD: string;
        UNTOUCH: string;
        UPDATE_SYNC_ERRORS: string;
        UPDATE_SYNC_WARNINGS: string;
    }

    export const actionTypes: ActionTypes;

    export type DataSelector<FormData = {}, State = {}> = (formName: string, getFormState?: GetFormState) => (state: State) => FormData;
    export type ErrorSelector<FormData = {}, State = {}, ErrorType = string> = (formName: string, getFormState?: GetFormState) => (state: State) => FormErrors<FormData, ErrorType>;
    export type BooleanSelector<State = {}> = (formName: string, getFormState?: GetFormState) => (state: State) => boolean;
    export type NamesSelector<State = {}> = (getFormState?: GetFormState) => (state: State) => string[];
    export type FormOrFieldsBooleanSelector<State = {}> = (formName: string, getFormState?: GetFormState) => (state: State, ...fields: string[]) => boolean;

    export const getFormValues: DataSelector;
    export const getFormInitialValues: DataSelector;
    export const getFormSyncErrors: ErrorSelector;
    export const getFormMeta: DataSelector;
    export const getFormAsyncErrors: ErrorSelector;
    export const getFormSyncWarnings: ErrorSelector;
    export const getFormSubmitErrors: ErrorSelector;
    export const getFormError: ErrorSelector;
    export const getFormNames: NamesSelector;
    export const isDirty: FormOrFieldsBooleanSelector;
    export const isPristine: FormOrFieldsBooleanSelector;
    export const isValid: BooleanSelector;
    export const isInvalid: BooleanSelector;
    export const isSubmitting: BooleanSelector;
    export const isAsyncValidating: BooleanSelector;
    export const hasSubmitSucceeded: BooleanSelector;
    export const hasSubmitFailed: BooleanSelector;
}
