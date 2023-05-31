import { enumUtil } from "./helpers/enumUtil";
import { errorUtil } from "./helpers/errorUtil";
import { AsyncParseReturnType, ParseContext, ParseInput, ParseParams, ParseReturnType, ParseStatus, SyncParseReturnType } from "./helpers/parseUtil";
import { partialUtil } from "./helpers/partialUtil";
import { Primitive } from "./helpers/typeAliases";
import { objectUtil, util } from "./helpers/util";
import { IssueData, StringValidation, ZodCustomIssue, ZodError, ZodErrorMap } from "./ZodError";
export type RefinementCtx = {
    addIssue: (arg: IssueData) => void;
    path: (string | number)[];
};
export type ZodRawShape = {
    [k: string]: ZodTypeAny;
};
export type ZodTypeAny = ZodType<any, any, any>;
export type TypeOf<T extends ZodType<any, any, any>> = T["_output"];
export type input<T extends ZodType<any, any, any>> = T["_input"];
export type output<T extends ZodType<any, any, any>> = T["_output"];
export type { TypeOf as infer };
export type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, "code">>;
export interface Metadata {
    from?: string;
}
export type WithMetadata<T extends ZodTypeAny, M extends Metadata> = T & {
    _def: {
        metadata: M;
    };
};
export interface ZodTypeDef<M extends Metadata = Metadata> {
    errorMap?: ZodErrorMap;
    description?: string;
    metadata?: M;
}
export type RawCreateParams<M extends Metadata = Metadata> = {
    metadata?: M;
    errorMap?: ZodErrorMap;
    invalid_type_error?: string;
    required_error?: string;
    description?: string;
} | undefined;
export type ProcessedCreateParams<M extends Metadata = Metadata> = {
    metadata?: M;
    errorMap?: ZodErrorMap;
    description?: string;
};
export type SafeParseSuccess<Output> = {
    success: true;
    data: Output;
};
export type SafeParseError<Input> = {
    success: false;
    error: ZodError<Input>;
};
export type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;
export declare abstract class ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    readonly _type: Output;
    readonly _output: Output;
    readonly _input: Input;
    readonly _def: Def;
    get description(): string | undefined;
    abstract _parse(input: ParseInput): ParseReturnType<Output>;
    _getType(input: ParseInput): string;
    _getOrReturnCtx(input: ParseInput, ctx?: ParseContext | undefined): ParseContext;
    _processInputParams(input: ParseInput): {
        status: ParseStatus;
        ctx: ParseContext;
    };
    _parseSync(input: ParseInput): SyncParseReturnType<Output>;
    _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
    parse(data: unknown, params?: Partial<ParseParams>): Output;
    safeParse(data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Input, Output>;
    parseAsync(data: unknown, params?: Partial<ParseParams>): Promise<Output>;
    safeParseAsync(data: unknown, params?: Partial<ParseParams>): Promise<SafeParseReturnType<Input, Output>>;
    spa: (data: unknown, params?: Partial<ParseParams>) => Promise<SafeParseReturnType<Input, Output>>;
    refine<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, RefinedOutput, Input>;
    refine(check: (arg: Output) => unknown | Promise<unknown>, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, Output, Input>;
    refinement<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, RefinedOutput, Input>;
    refinement(check: (arg: Output) => boolean, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, Output, Input>;
    _refinement(refinement: RefinementEffect<Output>["refinement"]): ZodEffects<this, Output, Input>;
    superRefine<RefinedOutput extends Output>(refinement: (arg: Output, ctx: RefinementCtx) => arg is RefinedOutput): ZodEffects<this, RefinedOutput, Input>;
    superRefine(refinement: (arg: Output, ctx: RefinementCtx) => void | Promise<void>): ZodEffects<this, Output, Input>;
    constructor(def: Def);
    getMetadata(): this["_def"]["metadata"];
    metadata<M extends Metadata>(metadata: M): WithMetadata<this, M>;
    optional(): ZodOptional<this>;
    nullable(): ZodNullable<this>;
    nullish(): ZodOptional<ZodNullable<this>>;
    array(): ZodArray<this>;
    promise(): ZodPromise<this>;
    or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
    and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
    transform<NewOut>(transform: (arg: Output, ctx: RefinementCtx) => NewOut | Promise<NewOut>): ZodEffects<this, NewOut>;
    default(def: util.noUndefined<Input>): ZodDefault<this>;
    default(def: () => util.noUndefined<Input>): ZodDefault<this>;
    brand<B extends string | number | symbol>(brand?: B): ZodBranded<this, B>;
    catch(def: Output): ZodCatch<this>;
    catch(def: (ctx: {
        error: ZodError;
        input: Input;
    }) => Output): ZodCatch<this>;
    describe(description: string): this;
    pipe<T extends ZodTypeAny>(target: T): ZodPipeline<this, T>;
    isOptional(): boolean;
    isNullable(): boolean;
    from<F extends string>(name: F): WithMetadata<this, {
        from: F;
    }>;
}
export type IpVersion = "v4" | "v6";
export type ZodStringCheck = {
    kind: "min";
    value: number;
    message?: string;
} | {
    kind: "max";
    value: number;
    message?: string;
} | {
    kind: "length";
    value: number;
    message?: string;
} | {
    kind: "email";
    message?: string;
} | {
    kind: "url";
    message?: string;
} | {
    kind: "emoji";
    message?: string;
} | {
    kind: "uuid";
    message?: string;
} | {
    kind: "cuid";
    message?: string;
} | {
    kind: "includes";
    value: string;
    position?: number;
    message?: string;
} | {
    kind: "cuid2";
    message?: string;
} | {
    kind: "ulid";
    message?: string;
} | {
    kind: "startsWith";
    value: string;
    message?: string;
} | {
    kind: "endsWith";
    value: string;
    message?: string;
} | {
    kind: "regex";
    regex: RegExp;
    message?: string;
} | {
    kind: "trim";
    message?: string;
} | {
    kind: "toLowerCase";
    message?: string;
} | {
    kind: "toUpperCase";
    message?: string;
} | {
    kind: "datetime";
    offset: boolean;
    precision: number | null;
    message?: string;
} | {
    kind: "ip";
    version?: IpVersion;
    message?: string;
};
export interface ZodStringDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    checks: ZodStringCheck[];
    typeName: ZodFirstPartyTypeKind.ZodString;
    coerce: boolean;
}
export declare class ZodString<M extends Metadata = Metadata> extends ZodType<string, ZodStringDef<M>> {
    _parse(input: ParseInput): ParseReturnType<string>;
    protected _regex: (regex: RegExp, validation: StringValidation, message?: errorUtil.ErrMessage) => ZodEffects<this, string, string, Metadata>;
    _addCheck(check: ZodStringCheck): ZodString<M>;
    email(message?: errorUtil.ErrMessage): ZodString<M>;
    url(message?: errorUtil.ErrMessage): ZodString<M>;
    emoji(message?: errorUtil.ErrMessage): ZodString<M>;
    uuid(message?: errorUtil.ErrMessage): ZodString<M>;
    cuid(message?: errorUtil.ErrMessage): ZodString<M>;
    cuid2(message?: errorUtil.ErrMessage): ZodString<M>;
    ulid(message?: errorUtil.ErrMessage): ZodString<M>;
    ip(options?: string | {
        version?: "v4" | "v6";
        message?: string;
    }): ZodString<M>;
    datetime(options?: string | {
        message?: string | undefined;
        precision?: number | null;
        offset?: boolean;
    }): ZodString<M>;
    regex(regex: RegExp, message?: errorUtil.ErrMessage): ZodString<M>;
    includes(value: string, options?: {
        message?: string;
        position?: number;
    }): ZodString<M>;
    startsWith(value: string, message?: errorUtil.ErrMessage): ZodString<M>;
    endsWith(value: string, message?: errorUtil.ErrMessage): ZodString<M>;
    min(minLength: number, message?: errorUtil.ErrMessage): ZodString<M>;
    max(maxLength: number, message?: errorUtil.ErrMessage): ZodString<M>;
    length(len: number, message?: errorUtil.ErrMessage): ZodString<M>;
    nonempty: (message?: errorUtil.ErrMessage) => ZodString<M>;
    trim: () => ZodString<M>;
    toLowerCase: () => ZodString<M>;
    toUpperCase: () => ZodString<M>;
    get isDatetime(): boolean;
    get isEmail(): boolean;
    get isURL(): boolean;
    get isEmoji(): boolean;
    get isUUID(): boolean;
    get isCUID(): boolean;
    get isCUID2(): boolean;
    get isULID(): boolean;
    get isIP(): boolean;
    get minLength(): number | null;
    get maxLength(): number | null;
    static create: <M_1 extends Metadata = Metadata>(params?: ({
        metadata?: M_1 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: true | undefined;
    }) | undefined) => ZodString;
}
export type ZodNumberCheck = {
    kind: "min";
    value: number;
    inclusive: boolean;
    message?: string;
} | {
    kind: "max";
    value: number;
    inclusive: boolean;
    message?: string;
} | {
    kind: "int";
    message?: string;
} | {
    kind: "multipleOf";
    value: number;
    message?: string;
} | {
    kind: "finite";
    message?: string;
};
export interface ZodNumberDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    checks: ZodNumberCheck[];
    typeName: ZodFirstPartyTypeKind.ZodNumber;
    coerce: boolean;
}
export declare class ZodNumber<M extends Metadata = Metadata> extends ZodType<number, ZodNumberDef<M>> {
    _parse(input: ParseInput): ParseReturnType<number>;
    static create: <M_1 extends Metadata = Metadata>(params?: ({
        metadata?: M_1 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodNumber<M_1>;
    gte(value: number, message?: errorUtil.ErrMessage): ZodNumber<M>;
    min: (value: number, message?: errorUtil.ErrMessage) => ZodNumber<M>;
    gt(value: number, message?: errorUtil.ErrMessage): ZodNumber<M>;
    lte(value: number, message?: errorUtil.ErrMessage): ZodNumber<M>;
    max: (value: number, message?: errorUtil.ErrMessage) => ZodNumber<M>;
    lt(value: number, message?: errorUtil.ErrMessage): ZodNumber<M>;
    protected setLimit(kind: "min" | "max", value: number, inclusive: boolean, message?: string): ZodNumber<M>;
    _addCheck(check: ZodNumberCheck): ZodNumber<M>;
    int(message?: errorUtil.ErrMessage): ZodNumber<M>;
    positive(message?: errorUtil.ErrMessage): ZodNumber<M>;
    negative(message?: errorUtil.ErrMessage): ZodNumber<M>;
    nonpositive(message?: errorUtil.ErrMessage): ZodNumber<M>;
    nonnegative(message?: errorUtil.ErrMessage): ZodNumber<M>;
    multipleOf(value: number, message?: errorUtil.ErrMessage): ZodNumber<M>;
    step: (value: number, message?: errorUtil.ErrMessage) => ZodNumber<M>;
    finite(message?: errorUtil.ErrMessage): ZodNumber<M>;
    safe(message?: errorUtil.ErrMessage): ZodNumber<M>;
    get minValue(): number | null;
    get maxValue(): number | null;
    get isInt(): boolean;
    get isFinite(): boolean;
}
export type ZodBigIntCheck = {
    kind: "min";
    value: bigint;
    inclusive: boolean;
    message?: string;
} | {
    kind: "max";
    value: bigint;
    inclusive: boolean;
    message?: string;
} | {
    kind: "multipleOf";
    value: bigint;
    message?: string;
};
export interface ZodBigIntDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    checks: ZodBigIntCheck[];
    typeName: ZodFirstPartyTypeKind.ZodBigInt;
    coerce: boolean;
}
export declare class ZodBigInt<M extends Metadata = Metadata> extends ZodType<bigint, ZodBigIntDef<M>> {
    _parse(input: ParseInput): ParseReturnType<bigint>;
    static create: <M_1 extends Metadata = Metadata>(params?: ({
        metadata?: M_1 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodBigInt<M_1>;
    gte(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt<M>;
    min: (value: bigint, message?: errorUtil.ErrMessage) => ZodBigInt<M>;
    gt(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt<M>;
    lte(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt<M>;
    max: (value: bigint, message?: errorUtil.ErrMessage) => ZodBigInt<M>;
    lt(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt<M>;
    protected setLimit(kind: "min" | "max", value: bigint, inclusive: boolean, message?: string): ZodBigInt<M>;
    _addCheck(check: ZodBigIntCheck): ZodBigInt<M>;
    positive(message?: errorUtil.ErrMessage): ZodBigInt<M>;
    negative(message?: errorUtil.ErrMessage): ZodBigInt<M>;
    nonpositive(message?: errorUtil.ErrMessage): ZodBigInt<M>;
    nonnegative(message?: errorUtil.ErrMessage): ZodBigInt<M>;
    multipleOf(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt<M>;
    get minValue(): bigint | null;
    get maxValue(): bigint | null;
}
export interface ZodBooleanDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodBoolean;
    coerce: boolean;
}
export declare class ZodBoolean<M extends Metadata = Metadata> extends ZodType<boolean, ZodBooleanDef<M>> {
    _parse(input: ParseInput): ParseReturnType<boolean>;
    static create: <M_1 extends Metadata = Metadata>(params?: ({
        metadata?: M_1 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodBoolean<M_1>;
}
export type ZodDateCheck = {
    kind: "min";
    value: number;
    message?: string;
} | {
    kind: "max";
    value: number;
    message?: string;
};
export interface ZodDateDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    checks: ZodDateCheck[];
    coerce: boolean;
    typeName: ZodFirstPartyTypeKind.ZodDate;
}
export declare class ZodDate<M extends Metadata = Metadata> extends ZodType<Date, ZodDateDef<M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    _addCheck(check: ZodDateCheck): ZodDate<M>;
    min(minDate: Date, message?: errorUtil.ErrMessage): ZodDate<M>;
    max(maxDate: Date, message?: errorUtil.ErrMessage): ZodDate<M>;
    get minDate(): Date | null;
    get maxDate(): Date | null;
    static create: <M_1 extends Metadata = Metadata>(params?: ({
        metadata?: M_1 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodDate<M_1>;
}
export interface ZodSymbolDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodSymbol;
}
export declare class ZodSymbol<M extends Metadata = Metadata> extends ZodType<symbol, ZodSymbolDef<M>, symbol> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <M_1 extends Metadata = Metadata>(params?: RawCreateParams<M_1>) => ZodSymbol<M_1>;
}
export interface ZodUndefinedDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodUndefined;
}
export declare class ZodUndefined<M extends Metadata = Metadata> extends ZodType<undefined, ZodUndefinedDef<M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    params?: RawCreateParams;
    static create: (params?: RawCreateParams) => ZodUndefined;
}
export interface ZodNullDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodNull;
}
export declare class ZodNull<M extends Metadata = Metadata> extends ZodType<null, ZodNullDef<M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodNull;
}
export interface ZodAnyDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodAny;
}
export declare class ZodAny<M extends Metadata = Metadata> extends ZodType<any, ZodAnyDef<M>> {
    _any: true;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodAny;
}
export interface ZodUnknownDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodUnknown;
}
export declare class ZodUnknown<M extends Metadata = Metadata> extends ZodType<unknown, ZodUnknownDef<M>> {
    _unknown: true;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodUnknown;
}
export interface ZodNeverDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodNever;
}
export declare class ZodNever<M extends Metadata = Metadata> extends ZodType<never, ZodNeverDef<M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodNever;
}
export interface ZodVoidDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodVoid;
}
export declare class ZodVoid<M extends Metadata = Metadata> extends ZodType<void, ZodVoidDef<M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodVoid;
}
export interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodArray;
    exactLength: {
        value: number;
        message?: string;
    } | null;
    minLength: {
        value: number;
        message?: string;
    } | null;
    maxLength: {
        value: number;
        message?: string;
    } | null;
}
export type ArrayCardinality = "many" | "atleastone";
export type arrayOutputType<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];
export declare class ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many", M extends Metadata = Metadata> extends ZodType<arrayOutputType<T, Cardinality>, ZodArrayDef<T, M>, Cardinality extends "atleastone" ? [T["_input"], ...T["_input"][]] : T["_input"][]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get element(): T;
    min(minLength: number, message?: errorUtil.ErrMessage): this;
    max(maxLength: number, message?: errorUtil.ErrMessage): this;
    length(len: number, message?: errorUtil.ErrMessage): this;
    nonempty(message?: errorUtil.ErrMessage): ZodArray<T, "atleastone">;
    static create: <T_1 extends ZodTypeAny, M_1 extends Metadata = Metadata>(schema: T_1, params?: RawCreateParams<M_1>) => ZodArray<T_1, "many", M_1>;
}
export type ZodNonEmptyArray<T extends ZodTypeAny, M extends Metadata = Metadata> = ZodArray<T, "atleastone", M>;
export type UnknownKeysParam = "passthrough" | "strict" | "strip";
export interface ZodObjectDef<T extends ZodRawShape = ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodObject;
    shape: () => T;
    catchall: Catchall;
    unknownKeys: UnknownKeys;
}
export type mergeTypes<A, B> = {
    [k in keyof A | keyof B]: k extends keyof B ? B[k] : k extends keyof A ? A[k] : never;
};
export type objectOutputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny, UnknownKeys extends UnknownKeysParam = UnknownKeysParam> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>> & CatchallOutput<Catchall> & PassthroughType<UnknownKeys>;
export type baseObjectOutputType<Shape extends ZodRawShape> = {
    [k in keyof Shape]: Shape[k]["_output"];
};
export type objectInputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny, UnknownKeys extends UnknownKeysParam = UnknownKeysParam> = objectUtil.flatten<baseObjectInputType<Shape>> & CatchallInput<Catchall> & PassthroughType<UnknownKeys>;
export type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.addQuestionMarks<{
    [k in objectInputKeys<Shape>]: objectInputProperty<Shape, k>;
}>;
type objectInputKeys<Shape extends ZodRawShape> = {
    [k in keyof Shape]: ExtractFrom<NonNullable<Shape[k]>> extends string ? ExtractFrom<NonNullable<Shape[k]>> : k;
}[keyof Shape];
type objectInputProperty<Shape extends ZodRawShape, Name> = Name extends keyof Shape ? Shape[Name]["_input"] : {
    [k in keyof Shape]: ExtractFrom<NonNullable<Shape[k]>> extends Name ? Shape[k]["_input"] : never;
}[keyof Shape];
type ExtractFrom<T extends ZodTypeAny> = ZodType<any, ZodTypeDef, any> extends T ? undefined : NonNullable<T["_def"]["metadata"]> extends {
    from: infer F;
} ? F : T extends ZodOptional<infer U> ? ExtractFrom<U> : T extends ZodNullable<infer U> ? ExtractFrom<U> : T extends ZodDefault<infer U> ? ExtractFrom<U> : undefined;
export type CatchallOutput<T extends ZodTypeAny> = ZodTypeAny extends T ? unknown : {
    [k: string]: T["_output"];
};
export type CatchallInput<T extends ZodTypeAny> = ZodTypeAny extends T ? unknown : {
    [k: string]: T["_input"];
};
export type PassthroughType<T extends UnknownKeysParam> = T extends "passthrough" ? {
    [k: string]: unknown;
} : unknown;
export type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U> ? deoptional<U> : T extends ZodNullable<infer U> ? ZodNullable<deoptional<U>> : T;
export type SomeZodObject = ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny>;
export type noUnrecognized<Obj extends object, Shape extends object> = {
    [k in keyof Obj]: k extends keyof Shape ? Obj[k] : never;
};
declare function objectInputKeys<T extends ZodRawShape>(shape: T): string[];
export declare class ZodObject<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall, UnknownKeys>, Input = objectInputType<T, Catchall, UnknownKeys>, M extends Metadata = Metadata> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall, M>, Input> {
    private _cached;
    _getCached(): {
        shape: T;
        inputKeys: string[];
        outputKeys: string[];
    };
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get shape(): T;
    strict(message?: errorUtil.ErrMessage): ZodObject<T, "strict", Catchall>;
    strip(): ZodObject<T, "strip", Catchall>;
    passthrough(): ZodObject<T, "passthrough", Catchall>;
    nonstrict: () => ZodObject<T, "passthrough", Catchall>;
    extend<Augmentation extends ZodRawShape>(augmentation: Augmentation): ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall>;
    augment: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<Omit<T, keyof Augmentation> & Augmentation extends infer T_1 ? { [k in keyof T_1]: (Omit<T, keyof Augmentation> & Augmentation)[k]; } : never, UnknownKeys, Catchall, objectOutputType<Omit<T, keyof Augmentation> & Augmentation extends infer T_1 ? { [k in keyof T_1]: (Omit<T, keyof Augmentation> & Augmentation)[k]; } : never, Catchall, UnknownKeys>, objectInputType<Omit<T, keyof Augmentation> & Augmentation extends infer T_1 ? { [k in keyof T_1]: (Omit<T, keyof Augmentation> & Augmentation)[k]; } : never, Catchall, UnknownKeys>, Metadata>;
    merge<Incoming extends AnyZodObject, Augmentation extends Incoming["shape"]>(merging: Incoming): ZodObject<objectUtil.extendShape<T, Augmentation>, Incoming["_def"]["unknownKeys"], Incoming["_def"]["catchall"]>;
    setKey<Key extends string, Schema extends ZodTypeAny>(key: Key, schema: Schema): ZodObject<T & {
        [k in Key]: Schema;
    }, UnknownKeys, Catchall>;
    catchall<Index extends ZodTypeAny>(index: Index): ZodObject<T, UnknownKeys, Index>;
    pick<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
    omit<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
    deepPartial(): partialUtil.DeepPartial<this>;
    partial(): ZodObject<{
        [k in keyof T]: ZodOptional<T[k]>;
    }, UnknownKeys, Catchall>;
    partial<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<objectUtil.noNever<{
        [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k];
    }>, UnknownKeys, Catchall>;
    required(): ZodObject<{
        [k in keyof T]: deoptional<T[k]>;
    }, UnknownKeys, Catchall>;
    required<Mask extends {
        [k in keyof T]?: true;
    }>(mask: Mask): ZodObject<objectUtil.noNever<{
        [k in keyof T]: k extends keyof Mask ? deoptional<T[k]> : T[k];
    }>, UnknownKeys, Catchall>;
    keyof(): ZodEnum<enumUtil.UnionToTupleString<keyof T>>;
    static create: <T_1 extends ZodRawShape, M_1 extends Metadata = Metadata>(shape: T_1, params?: RawCreateParams<M_1>) => ZodObject<T_1, "strip", ZodTypeAny, objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, (baseObjectOutputType<T_1> extends infer T_3 extends object ? { [k_1 in keyof T_3]: undefined extends baseObjectOutputType<T_1>[k_1] ? never : k_1; } : never)[keyof T_1]> extends infer T_2 ? { [k in keyof T_2]: objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, (baseObjectOutputType<T_1> extends infer T_3 extends object ? { [k_1 in keyof T_3]: undefined extends baseObjectOutputType<T_1>[k_1] ? never : k_1; } : never)[keyof T_1]>[k]; } : never, baseObjectInputType<T_1> extends infer T_4 ? { [k_2 in keyof T_4]: baseObjectInputType<T_1>[k_2]; } : never, M_1>;
    static strictCreate: <T_1 extends ZodRawShape, M_1 extends Metadata = Metadata>(shape: T_1, params?: RawCreateParams<M_1>) => ZodObject<T_1, "strict", ZodTypeAny, objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, (baseObjectOutputType<T_1> extends infer T_3 extends object ? { [k_1 in keyof T_3]: undefined extends baseObjectOutputType<T_1>[k_1] ? never : k_1; } : never)[keyof T_1]> extends infer T_2 ? { [k in keyof T_2]: objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, (baseObjectOutputType<T_1> extends infer T_3 extends object ? { [k_1 in keyof T_3]: undefined extends baseObjectOutputType<T_1>[k_1] ? never : k_1; } : never)[keyof T_1]>[k]; } : never, baseObjectInputType<T_1> extends infer T_4 ? { [k_2 in keyof T_4]: baseObjectInputType<T_1>[k_2]; } : never, M_1>;
    static lazycreate: <T_1 extends ZodRawShape, M_1 extends Metadata = Metadata>(shape: () => T_1, params?: RawCreateParams<M_1>) => ZodObject<T_1, "strip", ZodTypeAny, objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, (baseObjectOutputType<T_1> extends infer T_3 extends object ? { [k_1 in keyof T_3]: undefined extends baseObjectOutputType<T_1>[k_1] ? never : k_1; } : never)[keyof T_1]> extends infer T_2 ? { [k in keyof T_2]: objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, (baseObjectOutputType<T_1> extends infer T_3 extends object ? { [k_1 in keyof T_3]: undefined extends baseObjectOutputType<T_1>[k_1] ? never : k_1; } : never)[keyof T_1]>[k]; } : never, baseObjectInputType<T_1> extends infer T_4 ? { [k_2 in keyof T_4]: baseObjectInputType<T_1>[k_2]; } : never, M_1>;
}
export type AnyZodObject = ZodObject<any, any, any>;
export type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;
export interface ZodUnionDef<T extends ZodUnionOptions = Readonly<[
    ZodTypeAny,
    ZodTypeAny,
    ...ZodTypeAny[]
]>, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    options: T;
    typeName: ZodFirstPartyTypeKind.ZodUnion;
}
export declare class ZodUnion<T extends ZodUnionOptions, M extends Metadata = Metadata> extends ZodType<T[number]["_output"], ZodUnionDef<T, M>, T[number]["_input"]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get options(): T;
    static create: <T_1 extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]], M_1 extends Metadata = Metadata>(types: T_1, params?: RawCreateParams<M_1>) => ZodUnion<T_1, M_1>;
}
export type ZodDiscriminatedUnionOption<Discriminator extends string> = ZodObject<{
    [key in Discriminator]: ZodTypeAny;
} & ZodRawShape, UnknownKeysParam, ZodTypeAny>;
export interface ZodDiscriminatedUnionDef<Discriminator extends string, Options extends ZodDiscriminatedUnionOption<string>[] = ZodDiscriminatedUnionOption<string>[], M extends Metadata = Metadata> extends ZodTypeDef<M> {
    discriminator: Discriminator;
    options: Options;
    optionsMap: Map<Primitive, ZodDiscriminatedUnionOption<any>>;
    typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion;
}
export declare class ZodDiscriminatedUnion<Discriminator extends string, Options extends ZodDiscriminatedUnionOption<Discriminator>[], M extends Metadata = Metadata> extends ZodType<output<Options[number]>, ZodDiscriminatedUnionDef<Discriminator, Options, M>, input<Options[number]>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get discriminator(): Discriminator;
    get options(): Options;
    get optionsMap(): Map<Primitive, ZodDiscriminatedUnionOption<any>>;
    static create<Discriminator extends string, Types extends [
        ZodDiscriminatedUnionOption<Discriminator>,
        ...ZodDiscriminatedUnionOption<Discriminator>[]
    ], M extends Metadata = Metadata>(discriminator: Discriminator, options: Types, params?: RawCreateParams<M>): ZodDiscriminatedUnion<Discriminator, Types, M>;
}
export interface ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    left: T;
    right: U;
    typeName: ZodFirstPartyTypeKind.ZodIntersection;
}
export declare class ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<T["_output"] & U["_output"], ZodIntersectionDef<T, U, M>, T["_input"] & U["_input"]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny, U_1 extends ZodTypeAny, M_1 extends Metadata = Metadata>(left: T_1, right: U_1, params?: RawCreateParams<M_1>) => ZodIntersection<T_1, U_1, M_1>;
}
export type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
export type AssertArray<T> = T extends any[] ? T : never;
export type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_output"] : never;
}>;
export type OutputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]] : OutputTypeOfTuple<T>;
export type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_input"] : never;
}>;
export type InputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;
export interface ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    items: T;
    rest: Rest;
    typeName: ZodFirstPartyTypeKind.ZodTuple;
}
export type AnyZodTuple = ZodTuple<[
    ZodTypeAny,
    ...ZodTypeAny[]
] | [], ZodTypeAny | null>;
export declare class ZodTuple<T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]], Rest extends ZodTypeAny | null = null, M extends Metadata = Metadata> extends ZodType<OutputTypeOfTupleWithRest<T, Rest>, ZodTupleDef<T, Rest, M>, InputTypeOfTupleWithRest<T, Rest>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get items(): T;
    rest<Rest extends ZodTypeAny>(rest: Rest): ZodTuple<T, Rest>;
    static create: <T_1 extends [] | [ZodTypeAny, ...ZodTypeAny[]], M_1 extends Metadata = Metadata>(schemas: T_1, params?: RawCreateParams<M_1>) => ZodTuple<T_1, null, M_1>;
}
export interface ZodRecordDef<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    valueType: Value;
    keyType: Key;
    typeName: ZodFirstPartyTypeKind.ZodRecord;
}
export type KeySchema = ZodType<string | number | symbol, any, any>;
export type RecordType<K extends string | number | symbol, V> = [
    string
] extends [K] ? Record<K, V> : [number] extends [K] ? Record<K, V> : [symbol] extends [K] ? Record<K, V> : [BRAND<string | number | symbol>] extends [K] ? Record<K, V> : Partial<Record<K, V>>;
export declare class ZodRecord<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodType<RecordType<Key["_output"], Value["_output"]>, ZodRecordDef<Key, Value, M>, RecordType<Key["_input"], Value["_input"]>> {
    get keySchema(): Key;
    get valueSchema(): Value;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get element(): Value;
    static create<Value extends ZodTypeAny>(valueType: Value, params?: RawCreateParams): ZodRecord<ZodString, Value>;
    static create<Keys extends KeySchema, Value extends ZodTypeAny>(keySchema: Keys, valueType: Value, params?: RawCreateParams): ZodRecord<Keys, Value>;
}
export interface ZodMapDef<Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    valueType: Value;
    keyType: Key;
    typeName: ZodFirstPartyTypeKind.ZodMap;
}
export declare class ZodMap<Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodType<Map<Key["_output"], Value["_output"]>, ZodMapDef<Key, Value, M>, Map<Key["_input"], Value["_input"]>> {
    get keySchema(): Key;
    get valueSchema(): Value;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <Key_1 extends ZodTypeAny = ZodTypeAny, Value_1 extends ZodTypeAny = ZodTypeAny, M_1 extends Metadata = Metadata>(keyType: Key_1, valueType: Value_1, params?: RawCreateParams<M_1>) => ZodMap<Key_1, Value_1, M_1>;
}
export interface ZodSetDef<Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    valueType: Value;
    typeName: ZodFirstPartyTypeKind.ZodSet;
    minSize: {
        value: number;
        message?: string;
    } | null;
    maxSize: {
        value: number;
        message?: string;
    } | null;
}
export declare class ZodSet<Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodType<Set<Value["_output"]>, ZodSetDef<Value, M>, Set<Value["_input"]>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    min(minSize: number, message?: errorUtil.ErrMessage): this;
    max(maxSize: number, message?: errorUtil.ErrMessage): this;
    size(size: number, message?: errorUtil.ErrMessage): this;
    nonempty(message?: errorUtil.ErrMessage): ZodSet<Value>;
    static create: <Value_1 extends ZodTypeAny = ZodTypeAny>(valueType: Value_1, params?: RawCreateParams) => ZodSet<Value_1, Metadata>;
}
export interface ZodFunctionDef<Args extends ZodTuple<any, any> = ZodTuple<any, any>, Returns extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    args: Args;
    returns: Returns;
    typeName: ZodFirstPartyTypeKind.ZodFunction;
}
export type OuterTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = Args["_input"] extends Array<any> ? (...args: Args["_input"]) => Returns["_output"] : never;
export type InnerTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = Args["_output"] extends Array<any> ? (...args: Args["_output"]) => Returns["_input"] : never;
export declare class ZodFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<OuterTypeOfFunction<Args, Returns>, ZodFunctionDef<Args, Returns, M>, InnerTypeOfFunction<Args, Returns>> {
    _parse(input: ParseInput): ParseReturnType<any>;
    parameters(): Args;
    returnType(): Returns;
    args<Items extends Parameters<(typeof ZodTuple)["create"]>[0]>(...items: Items): ZodFunction<ZodTuple<Items, ZodUnknown>, Returns>;
    returns<NewReturnType extends ZodType<any, any>>(returnType: NewReturnType): ZodFunction<Args, NewReturnType>;
    implement<F extends InnerTypeOfFunction<Args, Returns>>(func: F): ReturnType<F> extends Returns["_output"] ? (...args: Args["_input"]) => ReturnType<F> : OuterTypeOfFunction<Args, Returns>;
    strictImplement(func: InnerTypeOfFunction<Args, Returns>): InnerTypeOfFunction<Args, Returns>;
    validate: <F extends InnerTypeOfFunction<Args, Returns>>(func: F) => ReturnType<F> extends Returns["_output"] ? (...args: Args["_input"]) => ReturnType<F> : OuterTypeOfFunction<Args, Returns>;
    static create(): ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>;
    static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>>(args: T): ZodFunction<T, ZodUnknown>;
    static create<T extends AnyZodTuple, U extends ZodTypeAny>(args: T, returns: U): ZodFunction<T, U>;
    static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>, U extends ZodTypeAny = ZodUnknown>(args: T, returns: U, params?: RawCreateParams): ZodFunction<T, U>;
}
export interface ZodLazyDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    getter: () => T;
    typeName: ZodFirstPartyTypeKind.ZodLazy;
}
export declare class ZodLazy<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<output<T>, ZodLazyDef<T, M>, input<T>> {
    get schema(): T;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny>(getter: () => T_1, params?: RawCreateParams) => ZodLazy<T_1, Metadata>;
}
export interface ZodLiteralDef<T = any, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    value: T;
    typeName: ZodFirstPartyTypeKind.ZodLiteral;
}
export declare class ZodLiteral<T, M extends Metadata = Metadata> extends ZodType<T, ZodLiteralDef<T, M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get value(): T;
    static create: <T_1 extends Primitive>(value: T_1, params?: RawCreateParams) => ZodLiteral<T_1, Metadata>;
}
export type ArrayKeys = keyof any[];
export type Indices<T> = Exclude<keyof T, ArrayKeys>;
export type EnumValues = [string, ...string[]];
export type Values<T extends EnumValues> = {
    [k in T[number]]: k;
};
export interface ZodEnumDef<T extends EnumValues = EnumValues, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    values: T;
    typeName: ZodFirstPartyTypeKind.ZodEnum;
}
export type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type FilterEnum<Values, ToExclude> = Values extends [] ? [] : Values extends [infer Head, ...infer Rest] ? Head extends ToExclude ? FilterEnum<Rest, ToExclude> : [Head, ...FilterEnum<Rest, ToExclude>] : never;
export type typecast<A, T> = A extends T ? A : never;
declare function createZodEnum<U extends string, T extends Readonly<[U, ...U[]]>>(values: T, params?: RawCreateParams): ZodEnum<Writeable<T>>;
declare function createZodEnum<U extends string, T extends [U, ...U[]]>(values: T, params?: RawCreateParams): ZodEnum<T>;
export declare class ZodEnum<T extends [string, ...string[]], M extends Metadata = Metadata> extends ZodType<T[number], ZodEnumDef<T, M>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get options(): T;
    get enum(): Values<T>;
    get Values(): Values<T>;
    get Enum(): Values<T>;
    extract<ToExtract extends readonly [T[number], ...T[number][]]>(values: ToExtract): ZodEnum<Writeable<ToExtract>>;
    exclude<ToExclude extends readonly [T[number], ...T[number][]]>(values: ToExclude): ZodEnum<typecast<Writeable<FilterEnum<T, ToExclude[number]>>, [string, ...string[]]>>;
    static create: typeof createZodEnum;
}
export interface ZodNativeEnumDef<T extends EnumLike = EnumLike, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    values: T;
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum;
}
export type EnumLike = {
    [k: string]: string | number;
    [nu: number]: string;
};
export declare class ZodNativeEnum<T extends EnumLike, M extends Metadata = Metadata> extends ZodType<T[keyof T], ZodNativeEnumDef<T, M>> {
    _parse(input: ParseInput): ParseReturnType<T[keyof T]>;
    get enum(): T;
    static create: <T_1 extends EnumLike>(values: T_1, params?: RawCreateParams) => ZodNativeEnum<T_1, Metadata>;
}
export interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodPromise;
}
export declare class ZodPromise<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<Promise<T["_output"]>, ZodPromiseDef<T, M>, Promise<T["_input"]>> {
    unwrap(): T;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodPromise<T_1, Metadata>;
}
export type Refinement<T> = (arg: T, ctx: RefinementCtx) => any;
export type SuperRefinement<T> = (arg: T, ctx: RefinementCtx) => void | Promise<void>;
export type RefinementEffect<T> = {
    type: "refinement";
    refinement: (arg: T, ctx: RefinementCtx) => any;
};
export type TransformEffect<T> = {
    type: "transform";
    transform: (arg: T, ctx: RefinementCtx) => any;
};
export type PreprocessEffect<T> = {
    type: "preprocess";
    transform: (arg: T, ctx: RefinementCtx) => any;
};
export type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;
export interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    schema: T;
    typeName: ZodFirstPartyTypeKind.ZodEffects;
    effect: Effect<any>;
}
export declare class ZodEffects<T extends ZodTypeAny, Output = output<T>, Input = input<T>, M extends Metadata = Metadata> extends ZodType<Output, ZodEffectsDef<T, M>, Input> {
    innerType(): T;
    sourceType(): T;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <I extends ZodTypeAny>(schema: I, effect: Effect<I["_output"]>, params?: RawCreateParams) => ZodEffects<I, I["_output"], input<I>, Metadata>;
    static createWithPreprocess: <I extends ZodTypeAny>(preprocess: (arg: unknown, ctx: RefinementCtx) => unknown, schema: I, params?: RawCreateParams) => ZodEffects<I, I["_output"], unknown, Metadata>;
}
export { ZodEffects as ZodTransformer };
export interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodOptional;
}
export type ZodOptionalType<T extends ZodTypeAny> = ZodOptional<T>;
export declare class ZodOptional<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<T["_output"] | undefined, ZodOptionalDef<T, M>, T["_input"] | undefined> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    unwrap(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1, Metadata>;
}
export interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodNullable;
}
export type ZodNullableType<T extends ZodTypeAny> = ZodNullable<T>;
export declare class ZodNullable<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<T["_output"] | null, ZodNullableDef<T, M>, T["_input"] | null> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    unwrap(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodNullable<T_1, Metadata>;
}
export interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    innerType: T;
    defaultValue: () => util.noUndefined<T["_input"]>;
    typeName: ZodFirstPartyTypeKind.ZodDefault;
}
export declare class ZodDefault<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<util.noUndefined<T["_output"]>, ZodDefaultDef<T, M>, T["_input"] | undefined> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    removeDefault(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params: {
        metadata?: Metadata | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        default: T_1["_input"] | (() => util.noUndefined<T_1["_input"]>);
    }) => ZodDefault<T_1, Metadata>;
}
export interface ZodCatchDef<T extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    innerType: T;
    catchValue: (ctx: {
        error: ZodError;
        input: unknown;
    }) => T["_input"];
    typeName: ZodFirstPartyTypeKind.ZodCatch;
}
export declare class ZodCatch<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<T["_output"], ZodCatchDef<T, M>, unknown> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    removeCatch(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params: {
        metadata?: Metadata | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        catch: T_1["_output"] | (() => T_1["_output"]);
    }) => ZodCatch<T_1, Metadata>;
}
export interface ZodNaNDef<M extends Metadata = Metadata> extends ZodTypeDef<M> {
    typeName: ZodFirstPartyTypeKind.ZodNaN;
}
export declare class ZodNaN<M extends Metadata = Metadata> extends ZodType<number, ZodNaNDef<M>> {
    _parse(input: ParseInput): ParseReturnType<any>;
    static create: (params?: RawCreateParams) => ZodNaN;
}
export interface ZodBrandedDef<T extends ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodBranded;
}
export declare const BRAND: unique symbol;
export type BRAND<T extends string | number | symbol> = {
    [BRAND]: {
        [k in T]: true;
    };
};
export declare class ZodBranded<T extends ZodTypeAny, B extends string | number | symbol, M extends Metadata = Metadata> extends ZodType<T["_output"] & BRAND<B>, ZodBrandedDef<T, M>, T["_input"]> {
    _parse(input: ParseInput): ParseReturnType<any>;
    unwrap(): T;
}
export interface ZodPipelineDef<A extends ZodTypeAny, B extends ZodTypeAny, M extends Metadata = Metadata> extends ZodTypeDef<M> {
    in: A;
    out: B;
    typeName: ZodFirstPartyTypeKind.ZodPipeline;
}
export declare class ZodPipeline<A extends ZodTypeAny, B extends ZodTypeAny, M extends Metadata = Metadata> extends ZodType<B["_output"], ZodPipelineDef<A, B, M>, A["_input"]> {
    _parse(input: ParseInput): ParseReturnType<any>;
    static create<A extends ZodTypeAny, B extends ZodTypeAny>(a: A, b: B): ZodPipeline<A, B>;
}
type CustomParams = CustomErrorParams & {
    fatal?: boolean;
};
export declare const custom: <T>(check?: ((data: unknown) => any) | undefined, params?: string | CustomParams | ((input: any) => CustomParams), fatal?: boolean) => ZodType<T, ZodTypeDef<Metadata>, T>;
export { ZodType as Schema, ZodType as ZodSchema };
export declare const late: {
    object: <T extends ZodRawShape, M extends Metadata = Metadata>(shape: () => T, params?: RawCreateParams<M>) => ZodObject<T, "strip", ZodTypeAny, objectUtil.addQuestionMarks<baseObjectOutputType<T>, (baseObjectOutputType<T> extends infer T_2 extends object ? { [k_1 in keyof T_2]: undefined extends baseObjectOutputType<T>[k_1] ? never : k_1; } : never)[keyof T]> extends infer T_1 ? { [k in keyof T_1]: objectUtil.addQuestionMarks<baseObjectOutputType<T>, (baseObjectOutputType<T> extends infer T_2 extends object ? { [k_1 in keyof T_2]: undefined extends baseObjectOutputType<T>[k_1] ? never : k_1; } : never)[keyof T]>[k]; } : never, baseObjectInputType<T> extends infer T_3 ? { [k_2 in keyof T_3]: baseObjectInputType<T>[k_2]; } : never, M>;
};
export declare enum ZodFirstPartyTypeKind {
    ZodString = "ZodString",
    ZodNumber = "ZodNumber",
    ZodNaN = "ZodNaN",
    ZodBigInt = "ZodBigInt",
    ZodBoolean = "ZodBoolean",
    ZodDate = "ZodDate",
    ZodSymbol = "ZodSymbol",
    ZodUndefined = "ZodUndefined",
    ZodNull = "ZodNull",
    ZodAny = "ZodAny",
    ZodUnknown = "ZodUnknown",
    ZodNever = "ZodNever",
    ZodVoid = "ZodVoid",
    ZodArray = "ZodArray",
    ZodObject = "ZodObject",
    ZodUnion = "ZodUnion",
    ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    ZodIntersection = "ZodIntersection",
    ZodTuple = "ZodTuple",
    ZodRecord = "ZodRecord",
    ZodMap = "ZodMap",
    ZodSet = "ZodSet",
    ZodFunction = "ZodFunction",
    ZodLazy = "ZodLazy",
    ZodLiteral = "ZodLiteral",
    ZodEnum = "ZodEnum",
    ZodEffects = "ZodEffects",
    ZodNativeEnum = "ZodNativeEnum",
    ZodOptional = "ZodOptional",
    ZodNullable = "ZodNullable",
    ZodDefault = "ZodDefault",
    ZodCatch = "ZodCatch",
    ZodPromise = "ZodPromise",
    ZodBranded = "ZodBranded",
    ZodPipeline = "ZodPipeline"
}
export type ZodFirstPartySchemaTypes = ZodString | ZodNumber | ZodNaN | ZodBigInt | ZodBoolean | ZodDate | ZodUndefined | ZodNull | ZodAny | ZodUnknown | ZodNever | ZodVoid | ZodArray<any, any> | ZodObject<any, any, any> | ZodUnion<any> | ZodDiscriminatedUnion<any, any> | ZodIntersection<any, any> | ZodTuple<any, any> | ZodRecord<any, any> | ZodMap<any> | ZodSet<any> | ZodFunction<any, any> | ZodLazy<any> | ZodLiteral<any> | ZodEnum<any> | ZodEffects<any, any, any> | ZodNativeEnum<any> | ZodOptional<any> | ZodNullable<any> | ZodDefault<any> | ZodCatch<any> | ZodPromise<any> | ZodBranded<any, any> | ZodPipeline<any, any>;
declare abstract class Class {
    constructor(..._: any[]);
}
declare const instanceOfType: <T extends typeof Class>(cls: T, params?: CustomParams) => ZodType<InstanceType<T>, ZodTypeDef<Metadata>, InstanceType<T>>;
declare const stringType: <M extends Metadata = Metadata>(params?: ({
    metadata?: M | undefined;
    errorMap?: ZodErrorMap | undefined;
    invalid_type_error?: string | undefined;
    required_error?: string | undefined;
    description?: string | undefined;
} & {
    coerce?: true | undefined;
}) | undefined) => ZodString;
declare const numberType: <M extends Metadata = Metadata>(params?: ({
    metadata?: M | undefined;
    errorMap?: ZodErrorMap | undefined;
    invalid_type_error?: string | undefined;
    required_error?: string | undefined;
    description?: string | undefined;
} & {
    coerce?: boolean | undefined;
}) | undefined) => ZodNumber<M>;
declare const nanType: (params?: RawCreateParams) => ZodNaN;
declare const bigIntType: <M extends Metadata = Metadata>(params?: ({
    metadata?: M | undefined;
    errorMap?: ZodErrorMap | undefined;
    invalid_type_error?: string | undefined;
    required_error?: string | undefined;
    description?: string | undefined;
} & {
    coerce?: boolean | undefined;
}) | undefined) => ZodBigInt<M>;
declare const booleanType: <M extends Metadata = Metadata>(params?: ({
    metadata?: M | undefined;
    errorMap?: ZodErrorMap | undefined;
    invalid_type_error?: string | undefined;
    required_error?: string | undefined;
    description?: string | undefined;
} & {
    coerce?: boolean | undefined;
}) | undefined) => ZodBoolean<M>;
declare const dateType: <M extends Metadata = Metadata>(params?: ({
    metadata?: M | undefined;
    errorMap?: ZodErrorMap | undefined;
    invalid_type_error?: string | undefined;
    required_error?: string | undefined;
    description?: string | undefined;
} & {
    coerce?: boolean | undefined;
}) | undefined) => ZodDate<M>;
declare const symbolType: <M extends Metadata = Metadata>(params?: RawCreateParams<M>) => ZodSymbol<M>;
declare const undefinedType: (params?: RawCreateParams) => ZodUndefined;
declare const nullType: (params?: RawCreateParams) => ZodNull;
declare const anyType: (params?: RawCreateParams) => ZodAny;
declare const unknownType: (params?: RawCreateParams) => ZodUnknown;
declare const neverType: (params?: RawCreateParams) => ZodNever;
declare const voidType: (params?: RawCreateParams) => ZodVoid;
declare const arrayType: <T extends ZodTypeAny, M extends Metadata = Metadata>(schema: T, params?: RawCreateParams<M>) => ZodArray<T, "many", M>;
declare const objectType: <T extends ZodRawShape, M extends Metadata = Metadata>(shape: T, params?: RawCreateParams<M>) => ZodObject<T, "strip", ZodTypeAny, objectUtil.addQuestionMarks<baseObjectOutputType<T>, (baseObjectOutputType<T> extends infer T_2 extends object ? { [k_1 in keyof T_2]: undefined extends baseObjectOutputType<T>[k_1] ? never : k_1; } : never)[keyof T]> extends infer T_1 ? { [k in keyof T_1]: objectUtil.addQuestionMarks<baseObjectOutputType<T>, (baseObjectOutputType<T> extends infer T_2 extends object ? { [k_1 in keyof T_2]: undefined extends baseObjectOutputType<T>[k_1] ? never : k_1; } : never)[keyof T]>[k]; } : never, baseObjectInputType<T> extends infer T_3 ? { [k_2 in keyof T_3]: baseObjectInputType<T>[k_2]; } : never, M>;
declare const strictObjectType: <T extends ZodRawShape, M extends Metadata = Metadata>(shape: T, params?: RawCreateParams<M>) => ZodObject<T, "strict", ZodTypeAny, objectUtil.addQuestionMarks<baseObjectOutputType<T>, (baseObjectOutputType<T> extends infer T_2 extends object ? { [k_1 in keyof T_2]: undefined extends baseObjectOutputType<T>[k_1] ? never : k_1; } : never)[keyof T]> extends infer T_1 ? { [k in keyof T_1]: objectUtil.addQuestionMarks<baseObjectOutputType<T>, (baseObjectOutputType<T> extends infer T_2 extends object ? { [k_1 in keyof T_2]: undefined extends baseObjectOutputType<T>[k_1] ? never : k_1; } : never)[keyof T]>[k]; } : never, baseObjectInputType<T> extends infer T_3 ? { [k_2 in keyof T_3]: baseObjectInputType<T>[k_2]; } : never, M>;
declare const unionType: <T extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]], M extends Metadata = Metadata>(types: T, params?: RawCreateParams<M>) => ZodUnion<T, M>;
declare const discriminatedUnionType: typeof ZodDiscriminatedUnion.create;
declare const intersectionType: <T extends ZodTypeAny, U extends ZodTypeAny, M extends Metadata = Metadata>(left: T, right: U, params?: RawCreateParams<M>) => ZodIntersection<T, U, M>;
declare const tupleType: <T extends [] | [ZodTypeAny, ...ZodTypeAny[]], M extends Metadata = Metadata>(schemas: T, params?: RawCreateParams<M>) => ZodTuple<T, null, M>;
declare const recordType: typeof ZodRecord.create;
declare const mapType: <Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny, M extends Metadata = Metadata>(keyType: Key, valueType: Value, params?: RawCreateParams<M>) => ZodMap<Key, Value, M>;
declare const setType: <Value extends ZodTypeAny = ZodTypeAny>(valueType: Value, params?: RawCreateParams) => ZodSet<Value, Metadata>;
declare const functionType: typeof ZodFunction.create;
declare const lazyType: <T extends ZodTypeAny>(getter: () => T, params?: RawCreateParams) => ZodLazy<T, Metadata>;
declare const literalType: <T extends Primitive>(value: T, params?: RawCreateParams) => ZodLiteral<T, Metadata>;
declare const enumType: typeof createZodEnum;
declare const nativeEnumType: <T extends EnumLike>(values: T, params?: RawCreateParams) => ZodNativeEnum<T, Metadata>;
declare const promiseType: <T extends ZodTypeAny>(schema: T, params?: RawCreateParams) => ZodPromise<T, Metadata>;
declare const effectsType: <I extends ZodTypeAny>(schema: I, effect: Effect<I["_output"]>, params?: RawCreateParams) => ZodEffects<I, I["_output"], input<I>, Metadata>;
declare const optionalType: <T extends ZodTypeAny>(type: T, params?: RawCreateParams) => ZodOptional<T, Metadata>;
declare const nullableType: <T extends ZodTypeAny>(type: T, params?: RawCreateParams) => ZodNullable<T, Metadata>;
declare const preprocessType: <I extends ZodTypeAny>(preprocess: (arg: unknown, ctx: RefinementCtx) => unknown, schema: I, params?: RawCreateParams) => ZodEffects<I, I["_output"], unknown, Metadata>;
declare const pipelineType: typeof ZodPipeline.create;
declare const ostring: () => ZodOptional<ZodString<Metadata>, Metadata>;
declare const onumber: () => ZodOptional<ZodNumber<Metadata>, Metadata>;
declare const oboolean: () => ZodOptional<ZodBoolean<Metadata>, Metadata>;
export declare const coerce: {
    string: <M extends Metadata = Metadata>(params?: ({
        metadata?: M | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: true | undefined;
    }) | undefined) => ZodString;
    number: <M_1 extends Metadata = Metadata>(params?: ({
        metadata?: M_1 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodNumber<M_1>;
    boolean: <M_2 extends Metadata = Metadata>(params?: ({
        metadata?: M_2 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodBoolean<M_2>;
    bigint: <M_3 extends Metadata = Metadata>(params?: ({
        metadata?: M_3 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodBigInt<M_3>;
    date: <M_4 extends Metadata = Metadata>(params?: ({
        metadata?: M_4 | undefined;
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodDate<M_4>;
};
export { anyType as any, arrayType as array, bigIntType as bigint, booleanType as boolean, dateType as date, discriminatedUnionType as discriminatedUnion, effectsType as effect, enumType as enum, functionType as function, instanceOfType as instanceof, intersectionType as intersection, lazyType as lazy, literalType as literal, mapType as map, nanType as nan, nativeEnumType as nativeEnum, neverType as never, nullType as null, nullableType as nullable, numberType as number, objectType as object, oboolean, onumber, optionalType as optional, ostring, pipelineType as pipeline, preprocessType as preprocess, promiseType as promise, recordType as record, setType as set, strictObjectType as strictObject, stringType as string, symbolType as symbol, effectsType as transformer, tupleType as tuple, undefinedType as undefined, unionType as union, unknownType as unknown, voidType as void, };
export declare const NEVER: never;
