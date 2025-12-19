# Publishing Instructions

This dist folder is built from the source code and ready to be published to a separate GitHub repository.

## Initial Setup

1. Initialize git in this folder (if not already done):
   ```bash
   git init
   ```

2. Add your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/juro-shared-dist.git
   ```

3. Update the repository URLs in package.json

## Publishing Process

After each build:

1. Review the changes:
   ```bash
   git status
   git diff
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Build version X.X.X"
   git tag vX.X.X
   git push origin main
   git push origin --tags
   ```

3. Projects can install directly from GitHub:
   ```bash
   npm install github:YOUR_USERNAME/juro-shared-dist#vX.X.X
   ```
