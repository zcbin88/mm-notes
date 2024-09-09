---
description: Git 提交规范
---

# 编程规范

> 记录自己所总结和遵守的编程规范（即个人风格指南）

## `Git` 提交规范

> `git commit message` 的格式

```sh
<type>(<scope>): <subject>

<body>

<footer>
```

- `type`（必填）：`commit` 的类型
- `scope`（选填）：`commit` 的影响范围
- `subject`（必填）：`commit` 信息的简短描述（50 字以内）
- `body`（选填）：`commit` 信息的具体描述
- `footer`（选填）：重大变化（`Breaking Change`）和需要关闭的`Issue`

**正则校验规则**：

```js
/**
 * 基于 vue 项目中的 verify-commit-msg.js 修改
 * https://github.com/vuejs/vue/blob/main/scripts/verify-commit-msg.js
 */
const commitRE =
  /^((revert|wip|draft): )?(feat|fix|docs|style|refactor|perf|types|test|build|ci|chore)(\(.+\))?: .{1,50}/
```

#### `commit` 常用的 `type`

|       type       | 含义                                   |
| :--------------: | :------------------------------------- |
|      _feat_      | 新功能                                 |
|      _fix_       | 修复 bug                               |
|      _docs_      | 文档类改动                             |
|     _style_      | 代码格式改动，同理适用于业务样式调整   |
|    _refactor_    | 重构（即不是新增功能，也不是修复 bug） |
|      _perf_      | 性能优化相关                           |
|     _types_      | `TypeScript` 类型相关的改动            |
|      _test_      | 单元测试、e2e 测试                     |
|     _build_      | 构建工具或者依赖项的改动               |
|       _ci_       | 修改项目持续集成流程                   |
|     _chore_      | 其他类型的提交                         |
|     _revert_     | 恢复或还原相关提交                     |
| _wip_ \| _draft_ | 托管平台对应的草稿标识                 |

- [Conventional Commits | GitHub](https://github.com/conventional-commits/conventionalcommits.org)
- [Angular convention | Github](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
