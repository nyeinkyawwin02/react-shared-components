# Migration Guide

Guide for migrating existing projects to use the new configurable API utilities.

## Table of Contents

- [No Migration Needed](#no-migration-needed)
- [Adopting New Features](#adopting-new-features)
- [Common Migration Scenarios](#common-migration-scenarios)
- [Breaking Changes](#breaking-changes)

---

## No Migration Needed

The refactored API utilities are **100% backward compatible**. Existing code continues to work without any changes.

### Before (Still Works)

```javascript
import { apiInstance, Get, Post, Update, Delete } from '@/utils/apiMethods';

// All of this still works exactly as before
const users = await Get('users');
const newUser = await Post('users', userData, {}, 'user');
await Update('users/', userId, data, {}, 'user');
await Delete('users/', userId, 'user');
```

### After (Optional Enhancement)

```javascript
// You can optionally use new features when you need them
import { createApiClient, Get } from '@/utils/apiMethods';

const customApi = createApiClient({
  baseURL: 'https://different-api.com',
});

const data = await Get('endpoint', {}, customApi);
```

**Recommendation**: Only migrate when you need new features like custom base URLs or notification handlers.

---

## Adopting New Features

### Scenario 1: New Project with Different API

When starting a new project that needs different configuration:

```javascript
// api/client.js
import { createApiClient } from '@juro/shared';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  tokenKey: '@myproject_token',
  userKey: '@myproject_user',
});
```

```javascript
// In your components
import { api } from '@/api/client';
import { Get, Post } from '@juro/shared';

const users = await Get('users', {}, api);
```

### Scenario 2: Changing Notification Library

If you want to use a different notification library:

```javascript
// api/client.js
import { createApiClient } from '@juro/shared';
import { notification } from 'antd';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  onSuccess: (msg) => notification.success({ message: msg }),
  onError: (msg) => notification.error({ message: msg }),
});
```

### Scenario 3: Disabling Branch Logic

For projects that don't need multi-tenant features:

```javascript
// api/client.js
import { createApiClient } from '@juro/shared';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  includeBranchLogic: false,  // Disable
  includeCreatedBy: false,     // Disable
});
```

---

## Common Migration Scenarios

### From Hardcoded Base URL

**Before**:
```javascript
// Had to change in code
const VITE_API_BASE_URL = 'https://api.example.com';
```

**After**:
```javascript
// Configure per environment
const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
});
```

---

### From Different Token Key

**Before**:
```javascript
// Code expected '@account_token'
localStorage.setItem('@account_token', token);
```

**After** (if you can't change localStorage key):
```javascript
// Just configure it
const api = createApiClient({
  tokenKey: '@my_existing_token_key',
  userKey: '@my_existing_user_key',
});
```

---

### From Manual Axios Instance

**Before**:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

// Manually add interceptors
api.interceptors.request.use(config => {
  const token = localStorage.getItem('@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**After**:
```javascript
import { createApiClient } from '@juro/shared';

const api = createApiClient({
  baseURL: 'https://api.example.com',
  tokenKey: '@token',
});
// Interceptors already configured!
```

---

### Multiple API Endpoints

**Before** (creating separate instances):
```javascript
const mainApi = axios.create({ baseURL: 'https://api.main.com' });
const analyticsApi = axios.create({ baseURL: 'https://analytics.com' });

// Manually configure both...
```

**After**:
```javascript
import { createApiClient } from '@juro/shared';

const mainApi = createApiClient({
  baseURL: 'https://api.main.com',
  tokenKey: '@main_token',
});

const analyticsApi = createApiClient({
  baseURL: 'https://analytics.com',
  tokenKey: '@analytics_token',
  includeBranchLogic: false,
});
```

---

### Custom Notification Logic

**Before** (notifications in components):
```javascript
const createUser = async (data) => {
  try {
    const res = await api.post('users', data);
    toast.success('User created!');
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
};
```

**After** (handled automatically):
```javascript
import { Post } from '@juro/shared';

const createUser = async (data) => {
  // Notifications handled automatically
  const result = await Post('users', data, {}, 'user', api);
  return result;
};
```

---

## Breaking Changes

### None!

There are **no breaking changes**. All existing functionality is preserved.

### Optional: Deprecation Notice

If you're maintaining the shared library, consider adding deprecation warnings for old patterns (but don't break them):

```javascript
// Optional: Add console warnings for old patterns
export const apiInterception = (api) => {
  console.warn(
    'apiInterception is deprecated. Use createApiClient instead.',
    'See: MIGRATION.md'
  );
  // But still make it work
  return applyInterceptors(api, mergeConfig());
};
```

---

## Step-by-Step Migration

If you want to fully migrate to the new system:

### Step 1: Create API Client

Create a new file for your API client:

```javascript
// src/api/client.js
import { createApiClient } from '@juro/shared';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  tokenKey: '@myapp_token',
  userKey: '@myapp_user',
  
  // Configure notifications
  onSuccess: (msg) => toast.success(msg),
  onError: (msg) => toast.error(msg),
  
  // Configure features
  includeBranchLogic: true, // or false
  includeCreatedBy: true,   // or false
});
```

### Step 2: Update Imports (Gradually)

Update imports in your components as needed:

```javascript
// Old way (still works)
import { apiInstance } from '@/utils/apiMethods';

// New way
import { api } from '@/api/client';
import { Get, Post } from '@juro/shared';
```

### Step 3: Update API Calls

Replace `apiInstance` with your custom `api`:

```javascript
// Before
const users = await Get('users');

// After
const users = await Get('users', {}, api);
```

### Step 4: Test Thoroughly

Test all API calls in your application:
- Authentication works
- Data fetching works
- Create/Update/Delete operations work
- Notifications appear correctly

---

## Rollback Plan

If you encounter issues, rolling back is simple:

```javascript
// Just remove the custom client and go back to defaults
import { apiInstance, Get, Post } from '@/utils/apiMethods';

// Everything works as before
const users = await Get('users');
```

---

## See Also

- [Configuration Guide](./CONFIGURATION.md) - Configure your API client
- [Usage Guide](./USAGE.md) - CRUD methods reference
- [Examples](./EXAMPLES.md) - Real-world examples
