# Flow FE

A user flow diagramming platform for UX researchers and product owners.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rasil-pl/Flow-FE
   cd your-project-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, optimized and ready for deployment.

Preview the production build locally:

```bash
npm run preview
```

## Linting and Code Quality

Check code quality with ESLint:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

## Pre-Commit hooks

We are checking the linters before committing the staged files, thus we are using `husky` for running git hooks.

If you are running this on `Linux`, please make sure to convert the `.husky/pre-commit` file to be executable. It can be done through the following command:

```bash
chmod +x .husky/pre-commit
```
