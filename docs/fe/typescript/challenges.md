# TypeScript 类型体操

通过学习 `TypeScript` 类型体操 —— [`Type-Challenges`](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md) 来巩固所学到 `TypeScript` 知识点

在 `Type-Challenges` 中，我们可以从简单、中等、困难以及地狱难度，循序渐进的学习 `TypeScript` 高级技巧

## Easy 简单

### `Pick` 选取

> 实现内置的 `Pick<T, K>`

`Pick` 表示从一个类型 `T` 中选取指定的几个字段（`K`）组合成一个新的类型

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

**实现**:

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

- `K extends keyof T` 表示 `K` 是 `keyof T` 的子类型，确保我们在使用 `MyPick` 时只能传递类型 `T` 中已有的属性键
- `P in K` 遍历类型 `K` 拿到具体属性键

```ts
type result = MyPick<Todo, 'time'>
// Error: 类型“"time"”不满足约束“keyof Todo”
```

### `Readonly` 只读

> 实现内置的 `Readonly<T>`

`Readonly` 会接收一个泛型参数，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar'
}

todo.title = 'Hello' // Error: 无法为“title”赋值，因为它是只读属性
todo.description = 'barFoo' // Error: 无法为“description”赋值，因为它是只读属性
```

**实现**:

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### `TupleToObject` 元组转对象

`TupleToObject<T>` 是用来把一个元组转换成一个 `key/value` 相同的对象

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>
// 结果：{ tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

**实现**:

```ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K
}
```

::: tip 索引访问类型
在 `TypeScript` 中，索引访问类型（Index Types）是一种特殊的类型，它允许我们使用类型中的某个索引类型（比如字符串或数字类型）来访问另一个类型中的属性。索引访问类型通常用于动态地访问对象的属性或数组的元素类型
:::

- `as const` 常量断言，可以将一个数组或对象的类型推断为只读的精确类型，在此处会将 `['tesla', 'model 3']` 推导为常量元组表示其不能新增、删除、修改元素（即 `readonly ["tesla", "model 3", "model X", "model Y"]`）
- `K in T[number]`
  - 先通过数字索引类型 `T[number]`，获取类型 `T` 中的所有元素类型，并将它们组成一个联合类型
  - 再对联合类型进行遍历拿到具体的元素

### `First` 数组的第一个元素

`First<T>` 会接受一个数组 `T` 并返回它的第一个元素的类型

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1>
// 结果：'a'

type head2 = First<arr2>
// 结果：3
```

**实现**:

```ts
/* 使用索引实现 */
type First<T extends any[]> = T extends [] ? never : T[0]
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
type First<T extends any[]> = T[0] extends T[number] ? T[0] : never

/* 使用 infer 占位实现 */
type First<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never
```

- 判断 `T` 是否是一个空数组
  - `T extends []`
  - `T['length'] extends 0`
  - `T[0] extends T[number]`
- `T[0]` 根据下标取数组第一个元素
- `infer R` 表示数组第一个元素的占位
- `...infer Rest` 表示数组剩余元素的占位

### `Length` 元组的长度

`Length<T>` 用来获取一个数组（包括类数组）的长度

```ts
type result1 = Length<[1, 2, 3]>
// 结果：3

type result2 = Length<{ a: 'a'; length: 10 }>
// 结果：10
```

**实现**:

```ts
type Length<T extends any> = T extends { length: number } ? T['length'] : never
```

- `T extends { length: number }` 判断 `T` 是否为 `{ length: number }` 的子类型，如果是则代表 `T` 是数组或类数组
- `T['length']` 获取 `T` 对象的 `length` 属性的值

::: warning
在 `TypeScript` 中不能使用 `T.length` 来取值，应使用 `T['length']` 即索引访问类型
:::

### `Exclude` 排除

> 实现内置的 `Exclude <T, U>`

从联合类型 `T` 中排除 `U` 的类型成员（即取 `T` 对于 `U` 的差集），来构造一个新的类型

```ts
type result = MyExclude<'name' | 'age' | 'sex', 'sex' | 'address'>
// 结果：'name' | 'age'
```

**实现**:

```ts
type MyExclude<T, U> = T extends U ? never : T
```

[分布式条件类型](/fe/typescript/base#分布式条件类型)（对联合类型应用 `extends` 时，会遍历联合类型成员并一一应用该条件类型）

### `Awaited` 获取 `Promise` 返回值类型

> 实现内置的 `Awaited<T>`

`Awaited` 可以用来获取 `Promise` 返回值类型

```ts
type result1 = MyAwaited<Promise<string>>
// 结果：string

type result2 = MyAwaited<Promise<string | number>>
// 结果：string | number
```

**实现**:

```ts
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T
```

### `If` 判断

`If<C, T, F>` 接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型

```ts
type A = If<true, 'a', 'b'>
// 结果：'a'

type B = If<false, 'a', 'b'>
// 结果：'b'
```

**实现**:

```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```

- `C extends boolean` 表示类型 `C` 只能为 `boolean` 的子类型，即只能为 `true` 或 `false`
- `C extends true` 表示类型 `C` 可以被赋值为字面量类型 `true` 时条件成立（相当于 `JavaScript` 中的 `C === true`）

### `Concat` 数组的 `concat` 方法

`Concat<T, U>` 可以将两个数组合并起来，即在类型系统里实现 `JavaScript` 内置的 `Array.concat` 方法

```ts
type result = Concat<[1, 2], [3, 4]>
// 结果：[1, 2, 3, 4]
```

**实现**:

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

- `T extends any[]` 限制传入的参数只能是数组
- `[...T, ...U]` 和 `ES6` 的扩展运算符一样

### `Includes` 数组的 `includes` 方法

> 这题不太 Easy

`Includes<T, U>` 判断 `U` 是否在数组 `T` 中，即在类型系统里实现 `JavaScript` 的 `Array.includes` 方法

```ts
type result1 = Includes<[1, 2, 3], 1>
// 结果：true

type result2 = Includes<[1, 2, 3], 4>
// 结果：false

type result3 = Includes<[boolean, 1, 2, 3], true>
// 结果：false

type result4 = Includes<[true, 1, 2, 3], boolean>
// 结果：false
```

**实现**:

```ts
/* 简单版（存在问题）*/
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

/* 递归完善版 */
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false
type Includes<T extends any[], U> = T extends [infer F, ...infer Rest]
  ? Equal<F, U> extends true
    ? true
    : Includes<Rest, U>
  : false
```

::: tip
`boolean` 实际是 `true ｜ false` 的别名（[详细信息](https://github.com/microsoft/TypeScript/issues/22596)）
:::

- `Equal` 是用来判断两个值是否相等的辅助方法（具体可以[看这里](https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript)）

### `Push` 数组 `push` 方法

`Push<T, U>` 将 `U` 添加到数组 `T` 中，即在类型系统里实现 `JavaScript` 的 `Array.push` 方法

```ts
type result = Push<[1, 2, 3], 4>
// 结果：[1, 2, 3, 4]
```

**实现**:

```ts
type Push<T extends any[], U> = [...T, U]
```

### `Unshift` 数组的 `unshift` 方法

在类型系统里实现 `JavaScript` 的 `Array.unshift` 方法

```ts
type result = Unshift<[1, 2], 0>
// 结果：[0, 1, 2]
```

**实现**:

```ts
type Unshift<T extends any[], U> = [U, ...T]
```

### `Parameters` 函数的参数类型

> 实现内置的 `Parameters<T>`

`Parameters` 可以获取一个函数的参数类型，其返回的结果是一个元组

```ts
const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type result1 = MyParameters<typeof foo>
// 结果：[boolean, { a: 'A' }]

type result2 = MyParameters<typeof bar>
// 结果：[boolean, { a: 'A' }]

type result3 = MyParameters<typeof baz>
// 结果：[]
```

**实现**:

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any
  ? R
  : never
```

## Medium 中级

### `ReturnType` 函数返回类型

> 实现内置的 `ReturnType<T>`

```ts
const fn = (v: boolean) => (v ? 1 : 2)
type result = MyReturnType<typeof fn>
// 结果：1 | 2
```

**实现**:

```ts
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R
  ? R
  : never
```

### `Omit` 移除

> 实现内置的 `Omit<T, K>`

`Omit` 可以移除 `T` 类型中的指定字段

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type result = MyOmit<Todo, 'description'>
// 结果：{ completed: boolean  }
```

**实现**:

> 可以借助在上面已经实现过的 `Pick` 和 `Exclude` 配合来实现

```ts
type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>
```

- `MyExclude<keyof T, K>` 从 `T` 中移除指定字段，得到一个联合类型（`'title' | 'completed'`）即我们需要数据
- `MyPick<T, 'title' | 'completed'>` 从 `T` 中选取这两个字段组成一个新的类型

### `Readonly` 按需只读

> 内置的 `Readonly` 增强版

`MyReadonly<T, K>`

- 当传递 `K` 时，只对 `K` 中的属性集变成只读（按需只读）
- 未传递 `K`时则使所有属性都变为只读

```ts
interface Todo {
  title: string
  description: string
  completed?: boolean
}

interface Expected1 {
  readonly title: string
  readonly description: string
  readonly completed?: boolean
}
interface Expected2 {
  title: string
  readonly description: string
  readonly completed?: boolean
}

type result1 = MyReadonly<Todo>
// 结果：Expected1

type result2 = MyReadonly<Todo, 'description' | 'completed'>
// 结果：Expected2

const todo: MyReadonly<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false
}

todo.title = 'Hello' // Error
todo.description = 'barFoo' // Error
todo.completed = true // OK
```

**实现**:

```ts
type MyReadonly<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P]
}
```

- `K extends keyof T = keyof T` 表示 `K` 只能是 `T` 的键，同时如果没有传递 `K` 则默认为 `T` 的所有键

### `DeepReadonly` 深度只读

`DeepReadonly<T>` 可以将对象的每个参数及其子对象递归地设为只读

```ts
type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type result = DeepReadonly<X>
// 结果：Expected
type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}
```

**实现**:

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends { [key: string]: any } ? DeepReadonly<T[P]> : T[P]
}
```

- `T[P] extends { [key: string]: any }` 判断 `T[P]` 是否是一个包含索引签名的对象，如果是则递归调用 `DeepReadonly`，否则直接返回 `T[P]`

### `TupleToUnion` 元组转联合类型

`TupleToUnion<T>` 可以将元组转换为联合类型

```ts
type result = TupleToUnion<['1', '2', '3']>
// 结果：'1' | '2' | '3'
```

**实现**:

```ts
/* 使用 T[number] */
type TupleToUnion<T extends readonly any[]> = T[number]

/* 使用 infer R */
type TupleToUnion<T> = T extends Array<infer R> ? R : never
```

- `T[number]` 获取类型 `T` 中的所有元素类型，并将它们组成一个联合类型
- `T extends Array<infer R> ? R : never` 表示如果 `T` 是一个数组，则返回数组的每个元素，否则返回 `never`

### `Chainable` 链式调用

`Chainable` 让一个对象可以进行链式调用（提供两个函数 `option(key, value)` 和 `get()`：在 `option` 中你需要使用提供的 `key` 和 `value` 扩展当前的对象类型，通过 `get` 获取最终结果）

```ts
declare const config: Chainable<{}>

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 结果：
interface Expected {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

**实现**:

```ts
type Chainable<T> = {
  option<K extends string, V>(key: K, value: V): Chainable<Omit<T, K> & { [P in K]: V }>
  get(): T
}
```

- `Chainable<>` 返回一个新的 `Chainable` 对象，使其可以递归调用，其中 `T` 为 `Omit<T, K> & { [P in K]: V }`
- `Omit<T, K>` 移除 `T` 中的指定字段 `K`

### `Last` 数组的最后一个元素

`Last<T>` 会接受一个数组 `T` 并返回其最后一个元素的类型

```ts
type result1 = Last<['a', 'b', 'c']>
// 结果：'c'

type result2 = Last<[3, 2, 1]>
// 结果：1
```

**实现**:

```ts
/* 使用 infer 占位实现 */
type Last<T extends any[]> = T extends [...infer Rest, infer L] ? L : never

type Last<T extends any[]> = [any, ...T][T['length']]
```

- `T extends [...infer Rest, infer L] ? L : never` 表示如果 `T` 是一个数组，则返回数组的最后一个元素，否则返回 `never`
- `[any, ...T]` 构建一个新数组，第一个元素为 `any`，其余元素为 `T`
- `T['length']` 可以获取数组 `T` 的长度

```ts
/* 以 type result1 = Last<['a', 'b', 'c']> 为例 */
// 原数组
const T = ['a', 'b', 'c']

// 新数组
const arr = [any, 1, 2, 3]

// 结果：'c'
const result = arr[T['length']]
```

### `Pop` 数组的 pop 方法

`Pop<T>` 返回一个由数组 `T` 的前 `length-1` 项以相同的顺序组成的数组

```ts
type result1 = Last<['a', 'b', 'c', 'd']>
// 结果：['a', 'b', 'c']

type result2 = Last<[]>
// 结果：[]
```

**实现**:

```ts
type Pop<T extends any[]> = T extends [] ? [] : T extends [...infer Rest, infer L] ? Rest : never
```

- 先判断 `T` 是否为空数组，如果是则返回空数组
- 再判断 `T` 是否是一个数组

### `PromiseAll` 获取 `Promise.all` 的返回值类型

`PromiseAll` 可以用来获取 `Promise.all()` 函数的所有返回值类型

```ts
type result = typeof PromiseAll([1, 2, Promise.resolve(3)])

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

const p = PromiseAll([promise1, promise2, promise3] as const)
// 结果：Promise<[number, 42, string]>
```

**实现**:

::: warning
声明 `PromiseAll` 时，应使用 `function` ，而不是 `type`
:::

```ts
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T

declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [K in keyof T]: MyAwaited<T[K]>
}>
```

- 遍历传入的数组，获取每个元素的类型
- `MyAwaited<T>` 是之前实现的 [`Awaited` 类型](#awaited-获取-promise-返回值类型)，用于获取 `Promise` 的返回值类型

### `LookUp` 查找

`LookUp` 可以根据某个属性值在联合类型中查找类型

```ts
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'>
// 结果：Dog
```

**实现**:

```ts
type LookUp<U extends { type: string }, T extends string> = U extends { type: T } ? U : never
```

- `U extends { type: string }` 表示 `U` 必须包含 `type` 属性
- `T extends string` 表示 `T` 必须是一个字符串