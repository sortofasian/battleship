const { FlatCompat } = require("@eslint/eslintrc")
const js = require("@eslint/js")

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
})

const nx = require("@nx/eslint-plugin")
const prettier = require("eslint-plugin-prettier")
const importPlugin = require("eslint-plugin-import")
const simpleImportSort = require("eslint-plugin-simple-import-sort")
const unusedImports = require("eslint-plugin-unused-imports")

module.exports = [
    {
        plugins: {
            nx,
            prettier,
            import: importPlugin,
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort
        }
    },
    ...compat.config({ extends: ["plugin:@nx/typescript"] }).map((config) => ({
        ...config,
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            ...config.rules
        }
    })),
    ...compat.config({ extends: ["plugin:@nx/javascript"] }).map((config) => ({
        ...config,
        files: ["**/*.js", "**/*.jsx"],
        rules: {
            ...config.rules
        }
    })),
    ...compat.config({ env: { jest: true } }).map((config) => ({
        ...config,
        files: [
            "**/*.spec.ts",
            "**/*.spec.tsx",
            "**/*.spec.js",
            "**/*.spec.jsx"
        ],
        rules: {
            ...config.rules
        }
    })),
    { rules: prettier.configs.recommended.rules },
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        rules: {
            "import/no-duplicates": "warn",
            "import/newline-after-import": "warn",
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
            "prettier/prettier": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_"
                }
            ],
            "nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: "*",
                            onlyDependOnLibsWithTags: ["*"]
                        }
                    ]
                }
            ]
        }
    }
]
