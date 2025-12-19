# @juro/shared

Shared components, utilities, hooks, and store patterns for projects.

## Installation

### For Local Development
```bash
cd /path/to/shared-components
npm link

cd /path/to/your-project
npm link @juro/shared
```

### From GitHub
```bash
npm install git+https://github.com/nyeinkyawwin02/shared-components.git#v0.3.0
```

## Usage

### Components
```javascript
import {
  // Core Components
  DataTable,
  ModalBox,
  Button,
  Loading,
  ErrorBoundary,
  NavLinkItem,
  PageLoader,
  FileDownloader,
  TextTruncator,
  AnimateSideText,
  Container,
  ExportExcelSelectedDialog,
  ImportExcel,
  
  // Form Components
  FormField,
  FormRow,
  FileInput,
  MultiFileInput,
  SelectOption,
} from '@juro/shared';
```

### Icons
```javascript
import { UploadIcon, ImageIcon, SearchIcon } from '@juro/shared';

// Usage
<UploadIcon className="w-6 h-6" />
<ImageIcon filled={true} />
```

### Hooks
```javascript
import { useDebounce } from '@juro/shared';

const debouncedValue = useDebounce(searchTerm, 700);
```

### Utilities
```javascript
import {
  Get,
  Post,
  Update,
  Delete,
  sanitizeObject,
  customAxios,
  seo,
} from '@juro/shared';
```

### Helpers
```javascript
import {
  formatNumber,
  getTableRowIndex,
  getTruncatedText,
} from '@juro/shared';
```

### Store
```javascript
import { createCrudStore } from '@juro/shared';

const myStore = createCrudStore({
  baseUrl: '/api/users/',
  defaultForm: { name: '', email: '' },
  validateForm: (form) => { /* validation logic */ },
  preparePayload: (form) => form,
});
```

## What's Included

### ✅ Currently Available
- **Helpers**: `formatNumber`, `getTableRowIndex`, `getTruncatedText`, response formatters

### 🔄 To Be Added
- **Utilities**: apiMethods, sanitize, crudMethod, axiosInstance
- **Hooks**: useDebounce
- **Components**: DataTable, ModalBox, Button, Loading, etc.
- **Store**: createCrudStore factory

## Development

1. Make changes in `src/`
2. Test in consuming projects via `npm link`
3. Update version in `package.json`
4. Commit and push changes

## Versioning

- **0.1.x** - Initial helpers and utilities
- **0.2.x** - Add hooks
- **0.3.x** - Add components
- **1.0.0** - Production ready with all shared code

## License

MIT
