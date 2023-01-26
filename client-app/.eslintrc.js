module.exports = {
  ignorePatterns: ["*.js"],
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [
    {
      files: ["*.jsx", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json", "functions/tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "indent" : "off",
    "eslint-multiline-ternary": "off",
    "@typescript-eslint/semi": "off",
    "react/no-unescaped-entities": 0,
    "no-multiple-empty-lines": 0,
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/space-before-function-paren": [
      "warn",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "quotes": "off",
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/prefer-optional-chain": "warn"
  },
};
