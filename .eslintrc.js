/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  'eslint.enable': true, // 开启eslint检查
  'editor.codeActionsOnSave': {
    // 使用eslint来fix，包括格式化会自动fix和代码质量检查会给出错误提示
    'source.fixAll.eslint': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  rules: {
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用@ts-ignore来消除ESLint检查
    '@typescript-eslint/explicit-function-return-type': 'off', // ↓在函数和类方法上需要显式的返回类型
    '@typescript-eslint/no-explicit-any': 'off', // ↓禁止使用any类型
    '@typescript-eslint/no-var-requires': 'off', // ↓除导入语句外，禁止使用require语句
    '@typescript-eslint/no-empty-function': 'off', // ↓禁止使用空函数
    '@typescript-eslint/no-empty-interface': 'off', // ↓对自定义事件名称强制使用特定的大小写
    'vue/custom-event-name-casing': 'off', // ↓禁止定义前使用
    'no-use-before-define': 'off', // ↓在定义变量之前不允许使用变量
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', // ↓禁止使用@ts-注解
    '@typescript-eslint/ban-types': 'off', // ↓禁止使用特定类型
    '@typescript-eslint/no-non-null-assertion': 'off', // ↓禁止使用!后缀运算符进行非null断言
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ↓在导出的函数和类的公共类方法上需要显式的返回值和参数类型

    '@typescript-eslint/no-unused-vars': [
      // 禁止定义未使用的变量
      'error',
      {
        argsIgnorePattern: '^(unused|ignored).*$',
        varsIgnorePattern: '^(unused|ignored).*$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^(unused|ignored).*$',
        varsIgnorePattern: '^(unused|ignored).*$'
      }
    ],
    'space-before-function-paren': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/component-definition-name-casing': 'off',
    'vue/require-valid-default-prop': 'off',
    'no-console': 'error',
    'vue/no-setup-props-destructure': 'off'
  }
}
