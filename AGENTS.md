# Agents Guide

This document describes the recommended agents and workflows for developing and maintaining the codescape-core library.

## Overview

Agents are AI-powered assistants that can help automate and accelerate development tasks. This guide covers the agents available for use with this codebase and their specialized capabilities.

## Available Agents

### 1. **Explore Agent**

Fast, read-only codebase exploration and Q&A assistant.

**When to use:**

- Quickly understand the codebase structure and architecture
- Answer questions about how specific modules work
- Navigate and find relevant code sections
- Understand patterns and conventions used in the project
- Analyze relationships between modules

**Capabilities:**

- High-speed codebase scanning
- Pattern recognition and code analysis
- Safe to use in parallel without side effects
- Supports thoroughness levels: quick, medium, thorough

**Example usage:**

```
@Explore: Show me how the SortedList utility is implemented and where it's used
```

### 2. **Default Agent**

General-purpose coding assistant for implementation, debugging, and refactoring.

**When to use:**

- Implement new features or utility functions
- Debug failing tests or runtime issues
- Refactor existing code for improvements
- Add type annotations and improve TypeScript types
- Create or modify test cases
- Fix linting or formatting issues

**Capabilities:**

- Full file editing and code manipulation
- Can create new files and modify existing ones
- Executes terminal commands for builds, tests, and linting
- Analyzes errors from build systems and test runners
- Implements fixes and enhancements across the codebase

**Example usage:**

```
Add a new date formatting utility that converts dates to ISO 8601 format with timezone support
```

## Project-Specific Development Workflows

### Adding New Utilities

**Recommended workflow:**

1. **Plan with Explore Agent** (quick level):
   - Ask how existing utilities are structured
   - Understand the export patterns and module organization
   - Check naming conventions

2. **Implement with Default Agent**:
   - Create the new utility file in `src/`
   - Add comprehensive TypeScript types
   - Implement the core functionality
   - Add JSDoc comments for all public functions

3. **Test with Default Agent**:
   - Create corresponding test file in `tests/`
   - Write unit tests using vitest
   - Ensure good coverage of edge cases

4. **Verify**:
   - Run `npm run lint` and `npm run format`
   - Run `npm run test` to verify all tests pass
   - Run `npm run build` to check TypeScript compilation

### Debugging Failing Tests

**Recommended workflow:**

1. **Run the failing test**:

   ```bash
   npm run test -- tests/[module].test.ts
   ```

2. **Use Default Agent** to:
   - Analyze the test failure output
   - Identify the root cause in the implementation
   - Suggest and implement fixes
   - Verify the fix with test execution

### Refactoring and Improvements

**Recommended workflow:**

1. **Use Explore Agent** to:
   - Map out all usages of the module being refactored
   - Understand dependencies and impact
   - Identify patterns that could be improved

2. **Use Default Agent** to:
   - Perform the refactoring changes
   - Update related tests
   - Verify no breaking changes

### Managing Dependencies

**When to use Default Agent:**

- Add new dependencies via `npm install`
- Update versions in `package.json`
- Handle TypeScript type definitions
- Fix dependency conflicts

## Code Organization

The codescape-core library follows this structure:

```
src/
├── index.ts              # Main entry point and re-exports
├── math-utils.ts         # Mathematical utility functions
├── numberutils.ts        # Number formatting and parsing
├── dateutils.ts          # Date and time utilities
├── formatters.ts         # String and data formatting
├── data-sorting.ts       # Sorting algorithms and utilities
├── SortedList.ts         # Sorted list data structure
├── checksum.ts           # Checksum and validation functions
├── constants.ts          # Project constants
└── axios-transformers.ts # Axios request/response transformers

tests/
├── [module].test.ts      # Corresponding test files
```

## Best Practices for Agent Usage

### 1. **Provide Context**

When requesting changes, include relevant details:

```
In the math-utils module, add a function that calculates the standard deviation
of an array of numbers with proper TypeScript typing.
```

### 2. **Specify Scope**

Be clear about which files should be affected:

```
Update the dateutils module and its tests to support timezone-aware date comparisons.
```

### 3. **Include Requirements**

Mention specific requirements:

- Edge cases to handle
- Performance considerations
- Type safety requirements
- Testing expectations

### 4. **Review Changes**

Always review agent-implemented changes:

- Run tests after implementation
- Check formatting and linting
- Verify TypeScript compilation
- Review types and documentation

## Building and Publishing

### Local Development Build

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

### Formatting

```bash
npm run format
```

### Publishing to Private Registry

```bash
npm pack
npm run publish:private
```

## Common Agent Tasks

### Task: Add a new utility function

**Command:**

```
Add a new utility function in src/[module].ts called [functionName] that does [description].
Include proper TypeScript types, JSDoc comments, and add corresponding tests in tests/[module].test.ts.
```

### Task: Fix a failing test

**Command:**

```
The test in tests/[module].test.ts is failing: [test name].
Please analyze the failure and fix the implementation in src/[module].ts.
```

### Task: Refactor for performance

**Command:**

```
Review [module] for performance improvements.
Optimize the implementation and provide before/after benchmarks where applicable.
```

### Task: Improve type safety

**Command:**

```
Enhance TypeScript types in [module] to provide better type safety and IDE support.
Add generic types where appropriate and ensure all public APIs are properly typed.
```

## Tips for Effective Agent Collaboration

1. **Ask clarifying questions**: If a request is ambiguous, agents will ask for clarification
2. **Iterate incrementally**: Break large tasks into smaller, manageable chunks
3. **Leverage test-driven development**: Write tests first, then ask agents to implement
4. **Use version control**: Commit changes frequently to track progress and enable rollback
5. **Run validation after changes**: Always run the full test and lint suite
6. **Document your changes**: Use meaningful commit messages and update documentation

## Limitations and When to Use Manual Coding

Agents work best when:

- Tasks are well-defined and scoped
- Requirements are clear
- You have a good understanding of the codebase
- Changes are localized to specific modules

Consider manual coding when:

- Making architectural decisions for the entire project
- Implementing complex algorithms requiring deep algorithmic knowledge
- Setting up build and deployment infrastructure
- Making decisions that affect the public API

## Support and Resources

- **Project Repository**: https://github.com/marvey11/codescape-core
- **Issues**: https://github.com/marvey11/codescape-core/issues
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Vitest Docs**: https://vitest.dev/
