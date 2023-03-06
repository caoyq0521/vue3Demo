export enum FieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  PHONE = 'phone',
  DATETIME = 'datetime',
  NUMBER = 'number',
  AMOUNT = 'amount',
  PERCENT = 'percent',
  IMAGE = 'image',
  AREA = 'area',
  POSITION = 'position',
  INCREASENUMBER = 'increaseNumber',
  CASCADER = 'cascader',
  REFSTATS = 'refStats',
  FORMULA = 'formula'
}

interface BasicField {
  type: string,
  options: {
    name: string
    fieldWidth: 0 | 1 | 2
    hasTip: boolean
    tip: string
    businessType: string[]
    authority: string
  }
  [propName: string]: any
}

export type Field = BasicField & {
  options: {
    isRequired?: boolean
    requiredBusinessType?: string[]
    hideOnCreate: boolean
  }
}

export type IncreaseNumberField = BasicField & {
  type: string,
  options: {
    startNumber: number
    digitLimit: number // 位数
    numberingSequence: any[]
  }
  [propName: string]: any
}

type WriteField = Field & {
  options: {
    hasPlaceholder: boolean
    placeholder: string
  }
}

export interface OptionItems {
  label: string,
  value: string,
  color?: string
}

type InputFiled = WriteField & {
  options: {
    wordsMin: number, 
    wordsMax: number,
    limitFormat: boolean, // 限制格式
    limitFormatValue: number[],
  }
}

type TextareaFiled = InputFiled

type RadioField = WriteField & {options: {
  optionItems: OptionItems[],
  showType: number,
  addOther: boolean
}}

type CheckboxField = RadioField

type PhoneField = WriteField & {options: {
  digitLimit: number
}}

type DatetimeField = WriteField & {options: {
  pattern: number,
  defaultValue: string
}}

type NumberField = WriteField & {options: {
  precision: number,
  thousandth: boolean,
}}

type AmountField = NumberField;

type PercentField = WriteField & {options: {
  precision: number
}}

type ImageField = Field & {
  options: {
    imageMin: number,
    imageMax: number,
    onlyCamera: boolean,
    addWatermark: boolean,
  }
}

type AreaField = WriteField
type PositionField = WriteField

type CascaderField = WriteField & {
  options: {
    multiple: number
    optionItems: any[]
    selectionLimit: number
    addOther: boolean
  }
}

type RefStatsField = Field & {
  options: {
    refData: any,
    dataRange: number,
    dataConditions: string[],
    statsDisplay: boolean,
    statsDisplayValue: number,
  }
}

type FormulaField = Field & {
  options: {
    returnValue: number,
    precision: number,
    thousandth: boolean,
    formulaContent: string,
  }
}

// 单行文本
const Input:InputFiled = {
  type: FieldType.INPUT,
  options: {
    name: '',
    wordsMin: 0, 
    wordsMax: 50,
    fieldWidth: 0,
    limitFormat: false, // 限制格式
    limitFormatValue: [],
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 多行文本
const Textarea:TextareaFiled = {
  type: FieldType.TEXTAREA,
  options: {
    name: '',
    wordsMin: 0, 
    wordsMax: 50,
    fieldWidth: 0,
    limitFormat: false, // 限制格式
    limitFormatValue: [],
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 单选
const Radio:RadioField = {
  type: FieldType.RADIO,
  options: {
    name: '',
    showType: 1,
    optionItems: [],
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: '',
    addOther: false
  }
}

// 多选
const Checkbox:CheckboxField = {
  type: FieldType.CHECKBOX,
  options: {
    name: '',
    showType: 1,
    optionItems: [],
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: '',
    addOther: false
  }
}

// 电话
const Phone:PhoneField = {
  type: FieldType.PHONE,
  options: {
    name: '',
    digitLimit: 1,
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 日期时间
const Datetime:DatetimeField = {
  type: FieldType.DATETIME,
  options: {
    name: '',
    pattern: 1,
    defaultValue: '',
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 数字
const Number: NumberField = {
  type: FieldType.NUMBER,
  options: {
    name: '',
    precision: 1,
    thousandth: false,
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 金额
const Amount: AmountField = {
  type: FieldType.AMOUNT,
  options: {
    name: '',
    precision: 1,
    thousandth: false,
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 百分号
const Percent: PercentField = {
  type: FieldType.PERCENT,
  options: {
    name: '',
    precision: 1,
    fieldWidth: 0,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 图片
const Image: ImageField = {
  type: FieldType.IMAGE,
  options: {
    name: '',
    imageMin: 0,
    imageMax: 50,
    onlyCamera: false,
    addWatermark: false,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasTip: false,
    tip: '',
    fieldWidth: 0,
    businessType: [],
    authority: ''
  }
}

// 省市区
const Area:AreaField = {
  type: FieldType.AREA,
  options: {
    name: '',
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    fieldWidth: 0,
    businessType: [],
    authority: ''
  }
}

// 定位
const Position:PositionField = {
  type: FieldType.POSITION,
  options: {
    name: '',
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    fieldWidth: 0,
    businessType: [],
    authority: ''
  }
}

// 自增编号
const IncreaseNumber:IncreaseNumberField = {
  type: FieldType.INCREASENUMBER,
  options: {
    name: '',
    startNumber: 1,
    digitLimit: 4,
    numberingSequence: [],
    fieldWidth: 0,
    hasTip: false,
    tip: '',
    businessType: [],
    authority: ''
  }
}

// 级联选择
const Cascader:CascaderField =  {
  type: FieldType.CASCADER,
  options: {
    name: '',
    multiple: 1,
    optionItems: [],
    addOther: false,
    selectionLimit: 1,
    isRequired: false,
    requiredBusinessType: [],
    hideOnCreate: false,
    hasPlaceholder: false,
    placeholder: '请输入',
    hasTip: false,
    tip: '',
    fieldWidth: 0,
    businessType: [],
    authority: ''
  }
}

// 引用统计
const RefStats:RefStatsField = {
  type: FieldType.REFSTATS,
  options: {
    name: '',
    refData: {},
    dataRange: 1,
    dataConditions: [],
    statsDisplay: false,
    statsDisplayValue: 1,
    hideOnCreate: false,
    hasTip: false,
    tip: '',
    fieldWidth: 0,
    businessType: [],
    authority: ''
  }
}

// 公式
const Formula:FormulaField = {
  type: FieldType.FORMULA,
  options: {
    name: '',
    returnValue: 1,
    precision: 1,
    thousandth: false,
    formulaContent: '',
    hideOnCreate: false,
    hasTip: false,
    tip: '',
    fieldWidth: 0,
    businessType: [],
    authority: ''
  }
}

export const field = [Input, Textarea, Radio, Checkbox, Phone, Datetime, Number, Amount, Percent, Image, Area, Position, IncreaseNumber, Cascader, RefStats, Formula]



type arr = [1, 2, 3, 4];

type First<T extends any[]> = T extends [...infer rest, infer first] ? first : T;

type num1 = First<arr>