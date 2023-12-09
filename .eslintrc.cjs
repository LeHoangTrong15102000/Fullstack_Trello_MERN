// module.exports = {
//   extends: [
//     // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:import/recommended',
//     'plugin:import/typescript',
//     'plugin:jsx-a11y/recommended',
//     'plugin:@typescript-eslint/recommended',
//     // 'plugin:eslint-plugin-import/recommended',
//     // 'plugin:eslint-plugin-react/recommended',
//     // Disable các rule mà eslint xung đột với prettier.
//     // Để cái này ở dưới để nó override các rule phía trên!.
//     'eslint-config-prettier',
//     'prettier'
//   ],
//   plugins: ['prettier'],
//   settings: {
//     react: {
//       // Nói eslint-plugin-react tự động biết version của React.
//       version: 'detect'
//     },
//     // Nói ESLint cách xử lý các import
//     'import/resolver': {
//       node: {
//         paths: [path.resolve(__dirname, '')],
//         extensions: ['.js', '.jsx', '.ts', '.tsx']
//       }
//     }
//   },
//   env: {
//     node: true
//   },
//   rules: {
//     // Tắt rule yêu cầu import React trong file jsx
//     'react/react-in-jsx-scope': 'off',
//     // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
//     'react/jsx-no-target-blank': 'warn',
//     // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
//     'prettier/prettier': [
//       'warn',
//       {
//         arrowParens: 'always',
//         semi: false,
//         trailingComma: 'none',
//         tabWidth: 2,
//         endOfLine: 'auto',
//         useTabs: false,
//         singleQuote: true,
//         printWidth: 120,
//         jsxSingleQuote: true
//       }
//     ]
//   }
// }

// Updated by trungquandev.com's author on May 13 2023
// Sample Eslint config for React project
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    'no-console': 1,
    'no-lonely-if': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    indent: ['warn', 2],
    semi: [1, 'never'],
    quotes: ['error', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1
  }
}
