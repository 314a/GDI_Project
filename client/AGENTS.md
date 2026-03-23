# Agents

## TypeScript Best Practices

### Code Style

- Avoid using Typescript escape hatches like `as`, `!`, and `any` type assertions
- Leverage new TypeScript features such as the `satisfies` keyword, optional chaining, nullish coalescing, and template literal types
- Use explicit type annotations for function parameters and return types
- Prefer `const` and `let` over `var`
- Use meaningful variable and function names in camelCase

### Type Safety

- Avoid `any` type; if absolutely necessary, use `unknown` with type guards instead
- Use strict mode: `"strict": true` in tsconfig.json
- Enable `noImplicitAny` in tsconfig.json
- Use discriminated unions for complex types
- Define interfaces for object shapes

### Functions

- Use arrow functions for callbacks
- Specify explicit return types
- Keep functions focused and small
- Use rest parameters instead of `arguments`

### Error Handling

- Use try-catch blocks appropriately
- Define custom error classes extending `Error`
- Always handle promise rejections with `.catch()` or try-catch in async functions

### Imports/Exports

- Use ES6 module syntax
- Group related imports together
- Avoid circular dependencies

### Performance

- Avoid unnecessary re-renders in React components
- Use memoization for expensive computations
