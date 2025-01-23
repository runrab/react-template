// @ts-check

/** @type {import("@commitlint/types").UserConfig} */
export default {
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        // 编译相关的修改，例如发布版本，对项目构建或者依赖的改动
        "build",
        // 新功能(feature)
        "feat",
        // 修复bug
        "fix",
        // 更新某功能
        "update",
        // 重构
        "refactor",
        // 文档
        "docs",
        // 构建过程或者辅助工具的变动,如增加依赖库等
        "chore",
        // 不影响代码运行的变动
        "style",
        // 撤销commit,回滚到上一个版本
        "revert",
        // 性能优化
        "perf",
        // 测试(单元,集成测试)
        "test",
        // 持续集成相关
        "ci",
        //wip
        "wip",
        // 工作流相关
        "workflow",
        // 类型
        "types",
        // 发布
        "release"
      ]
    ]
  }
};
