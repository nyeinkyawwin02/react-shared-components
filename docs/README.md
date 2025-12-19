# API Utilities

A flexible, configurable API client system built on axios with support for dynamic base URLs, custom interceptors, and pluggable notification handlers.

## Features

- ✅ **Configurable base URL** - Use different API endpoints per project
- ✅ **Custom authentication** - Configure localStorage keys for tokens and user data
- ✅ **Flexible interceptors** - Choose between default (with branch logic), simple (token only), or fully custom
- ✅ **Pluggable notifications** - Provide your own success/error handlers or use defaults
- ✅ **Backward compatible** - Existing code continues to work without changes
- ✅ **TypeScript-ready** - JSDoc types for IDE autocomplete
- ✅ **Optional dependencies** - Works with or without react-hot-toast/sweetalert2

---

## Quick Start

```javascript
// Use with default configuration (backward compatible)
import { apiInstance, Get, Post } from '@/utils/apiMethods';

const users = await Get('users');
const newUser = await Post('users', userData, {}, 'user');
```

```javascript
// Use with custom configuration
import { createApiClient, Get } from '@/utils/apiMethods';

const api = createApiClient({
  baseURL: 'https://api.example.com',
  tokenKey: '@my_app_token',
  onSuccess: (msg) => console.log('✓', msg),
  onError: (msg) => console.error('✗', msg),
});

const users = await Get('users', {}, api);
```

---

## Documentation

📖 **[Configuration Guide](./CONFIGURATION.md)** - Complete configuration reference and options

📘 **[Usage Guide](./USAGE.md)** - CRUD methods reference and common patterns

💡 **[Examples](./EXAMPLES.md)** - Real-world examples for different scenarios

🔄 **[Migration Guide](./MIGRATION.md)** - How to migrate existing projects

🛠️ **[API Reference](./API_REFERENCE.md)** - Complete API documentation

---

## Common Use Cases

### Simple Project (No Branch Logic)
```javascript
const api = createApiClient({
  baseURL: 'https://api.myapp.com',
  tokenKey: '@myapp_token',
  includeBranchLogic: false,
});
```

### Multi-Tenant with Branch Logic (Default)
```javascript
// Uses default configuration
import { apiInstance } from '@/utils/apiMethods';
// Automatically includes relatedBranch and createdBy
```

### Custom Notifications
```javascript
const api = createApiClient({
  onSuccess: (msg) => notification.success({ message: msg }),
  onError: (msg) => notification.error({ message: msg }),
});
```

---

## Support & Troubleshooting

For detailed troubleshooting, see the [Usage Guide](./USAGE.md#troubleshooting).

Common issues:
- **Notifications not showing?** → Check [Configuration Guide](./CONFIGURATION.md#notification-handlers)
- **Token not being sent?** → Verify `tokenKey` in [Configuration Guide](./CONFIGURATION.md#authentication)
- **Branch logic interfering?** → Disable in [Configuration Guide](./CONFIGURATION.md#feature-flags)

---

## Files

- `apiConfig.js` - Configuration system and defaults
- `axiosInstance.js` - Axios client factory and interceptors
- `crudMethod.js` - CRUD operations (Get, Post, Update, Delete, etc.)
- `apiMethods.js` - Main exports
- `examples.js` - Code examples

---

For complete documentation, start with the **[Configuration Guide](./CONFIGURATION.md)**.
