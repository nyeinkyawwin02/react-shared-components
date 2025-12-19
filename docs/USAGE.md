# Usage Guide

Guide for using CRUD methods and common patterns.

## Table of Contents

- [CRUD Methods](#crud-methods)
- [Request Options](#request-options)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## CRUD Methods

All CRUD methods accept an optional `options` parameter for customization.

### Get

Fetch data from the API.

```javascript
Get(url, params = {}, api = customAxios(), options = {})
```

**Example**:
```javascript
import { Get } from '@/utils/apiMethods';

// Basic usage
const users = await Get('users');

// With query parameters
const filteredUsers = await Get('users', { 
  page: 1, 
  limit: 10,
  role: 'admin' 
});

// With custom API instance
const users = await Get('users', {}, customApi);

// Silent request (no notifications)
const users = await Get('users', {}, customApi, {
  showNotification: false,
});
```

---

### Post

Create a new resource.

```javascript
Post(url, data, config = {}, text, api = customAxios(), options = {})
```

**Parameters**:
- `url` - Endpoint URL
- `data` - Request payload
- `config` - Axios config (headers, etc.)
- `text` - Entity name for notification (e.g., "user", "product")
- `api` - Axios instance
- `options` - Custom options

**Example**:
```javascript
import { Post } from '@/utils/apiMethods';

// Create user
const newUser = await Post('users', {
  name: 'John Doe',
  email: 'john@example.com',
}, {}, 'user');

// With custom success message
const newUser = await Post('users', userData, {}, 'user', customApi, {
  customSuccessMessage: 'Welcome! Account created successfully.',
});

// Silent creation
const result = await Post('background-sync', data, {}, 'sync', customApi, {
  showNotification: false,
});
```

---

### PostWithFormData

Create a resource with file upload.

```javascript
PostWithFormData(url, data, config = {}, text, api = customAxios(), options = {})
```

**Example**:
```javascript
import { PostWithFormData } from '@/utils/apiMethods';

const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'Document Name');
formData.append('description', 'File description');

const result = await PostWithFormData('documents', formData, {}, 'document');
```

---

### Update

Update an existing resource.

```javascript
Update(url, id, data, config, text, api = customAxios(), options = {})
```

**Example**:
```javascript
import { Update } from '@/utils/apiMethods';

// Update user (url + id becomes 'users/123')
await Update('users/', userId, {
  name: 'Updated Name',
  email: 'newemail@example.com',
}, {}, 'user');

// With custom options
await Update('users/', userId, updatedData, {}, 'user', customApi, {
  customSuccessMessage: 'Profile updated!',
});
```

---

### UpdateWithFormData

Update a resource with file upload.

```javascript
UpdateWithFormData(url, id, data, config = {}, text, api = customAxios(), options = {})
```

**Example**:
```javascript
import { UpdateWithFormData } from '@/utils/apiMethods';

const formData = new FormData();
formData.append('avatar', avatarFile);
formData.append('name', 'Updated Name');

await UpdateWithFormData('users/', userId, formData, {}, 'user');
```

---

### GetDetail

Get a single resource by ID.

```javascript
GetDetail(url, id, params = {}, api = customAxios(), options = {})
```

**Example**:
```javascript
import { GetDetail } from '@/utils/apiMethods';

// Get user by ID (url + id becomes 'users/123')
const user = await GetDetail('users/', userId);

// With additional query parameters
const user = await GetDetail('users/', userId, { 
  include: 'profile,settings' 
});
```

---

### Delete

Delete a resource.

```javascript
Delete(url, id, text, api = customAxios(), options = {})
```

**Example**:
```javascript
import { Delete } from '@/utils/apiMethods';

// Delete user
const success = await Delete('users/', userId, 'user');

if (success) {
  // Handle successful deletion
  refreshUserList();
}

// With custom message
await Delete('users/', userId, 'user', customApi, {
  customSuccessMessage: 'User permanently deleted.',
});
```

---

### ValidateForm

Client-side form validation with automatic error notifications.

```javascript
ValidateForm(fieldChecks, options = {})
```

**Example**:
```javascript
import { ValidateForm } from '@/utils/apiMethods';

const validation = ValidateForm([
  // Required field checks
  { 
    condition: !name, 
    label: 'Name', 
    isRequired: true 
  },
  { 
    condition: !email, 
    label: 'Email', 
    isRequired: true 
  },
  
  // Custom validation
  { 
    condition: !isValidEmail(email), 
    customMsg: 'Please enter a valid email address', 
    isCustom: true 
  },
  { 
    condition: password.length < 8, 
    customMsg: 'Password must be at least 8 characters', 
    isCustom: true 
  },
]);

if (!validation.isSuccess) {
  return; // Validation failed, errors already shown to user
}

// Proceed with form submission
await Post('users', formData, {}, 'user');
```

---

## Request Options

All CRUD methods accept an optional `options` object:

```javascript
{
  onSuccess: (message) => void,      // Custom success handler
  onError: (message) => void,        // Custom error handler
  showNotification: boolean,         // Show/hide notifications
  customSuccessMessage: string,      // Override success message
  customErrorMessage: string,        // Override error message
  apiConfig: object,                 // API config for this request
}
```

### Examples

**Silent Request**:
```javascript
await Get('status', {}, api, { showNotification: false });
```

**Custom Messages**:
```javascript
await Post('register', data, {}, 'user', api, {
  customSuccessMessage: 'Registration complete! Check your email.',
  customErrorMessage: 'Registration failed. Email may already exist.',
});
```

**Custom Handlers**:
```javascript
await Post('users', data, {}, 'user', api, {
  onSuccess: (msg) => {
    notification.success({ message: msg, duration: 5 });
    analytics.track('user_created');
  },
  onError: (msg) => {
    notification.error({ message: msg });
    analytics.track('user_creation_failed');
  },
});
```

---

## Common Patterns

### Pattern 1: List Page with Pagination

```javascript
import { Get } from '@/utils/apiMethods';

const fetchUsers = async (page = 1, limit = 10) => {
  const response = await Get('users', { page, limit });
  
  if (response.isSuccess) {
    setUsers(response.data);
    setTotalPages(response.totalPages);
  }
};
```

### Pattern 2: Create with Validation

```javascript
import { ValidateForm, Post } from '@/utils/apiMethods';

const createUser = async (formData) => {
  // Validate
  const validation = ValidateForm([
    { condition: !formData.name, label: 'Name', isRequired: true },
    { condition: !formData.email, label: 'Email', isRequired: true },
  ]);
  
  if (!validation.isSuccess) return;
  
  // Create
  const result = await Post('users', formData, {}, 'user');
  
  if (result.isSuccess) {
    navigate('/users');
  }
};
```

### Pattern 3: Update with Optimistic UI

```javascript
import { Update } from '@/utils/apiMethods';

const updateUser = async (userId, updates) => {
  // Update UI optimistically
  setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
  
  // Update on server (silent)
  const result = await Update('users/', userId, updates, {}, 'user', api, {
    showNotification: false,
  });
  
  if (!result.isSuccess) {
    // Revert on failure
    fetchUsers();
    showError('Update failed');
  }
};
```

### Pattern 4: Background Polling

```javascript
import { Get } from '@/utils/apiMethods';

const pollStatus = async () => {
  const interval = setInterval(async () => {
    const status = await Get('job/status', {}, api, {
      showNotification: false,
    });
    
    if (status.data.completed) {
      clearInterval(interval);
      showSuccess('Job completed!');
    }
  }, 5000);
};
```

### Pattern 5: Batch Operations

```javascript
import { Delete } from '@/utils/apiMethods';

const deleteMultiple = async (ids) => {
  const results = await Promise.all(
    ids.map(id => Delete('users/', id, 'user', api, {
      showNotification: false,
    }))
  );
  
  const successCount = results.filter(r => r).length;
  showSuccess(`Deleted ${successCount} of ${ids.length} users`);
};
```

---

## Troubleshooting

### Notifications Not Showing

**Problem**: Success/error notifications are not displayed.

**Solutions**:
1. Check if `react-hot-toast` is installed
2. Provide custom notification handlers in config
3. Verify notifications aren't disabled with `showNotification: false`

```javascript
// Solution: Custom handlers
const api = createApiClient({
  onSuccess: (msg) => console.log('✓', msg),
  onError: (msg) => console.error('✗', msg),
});
```

---

### Token Not Being Sent

**Problem**: Requests fail with 401 Unauthorized.

**Solutions**:
1. Verify `tokenKey` matches your localStorage key
2. Check token is actually stored in localStorage
3. Ensure interceptor is applied

```javascript
// Debug
console.log(localStorage.getItem('@your_token_key'));

// Fix
const api = createApiClient({
  tokenKey: '@your_actual_token_key', // Must match
});
```

---

### Branch Logic Interfering

**Problem**: Requests include unwanted `relatedBranch` parameters.

**Solution**: Disable branch logic

```javascript
const api = createApiClient({
  includeBranchLogic: false,
  includeCreatedBy: false,
});
```

---

### CORS Errors

**Problem**: Browser blocks requests due to CORS.

**Solutions**:
1. Configure CORS on your server
2. Use correct `baseURL` (check protocol: http vs https)
3. Verify headers are allowed by server

```javascript
// Check your baseURL
const api = createApiClient({
  baseURL: 'https://api.example.com', // Must match server CORS config
});
```

---

### File Upload Failing

**Problem**: File uploads fail or data is corrupted.

**Solutions**:
1. Use `PostWithFormData` or `UpdateWithFormData`
2. Don't manually set `Content-Type` header
3. Ensure FormData is constructed correctly

```javascript
// Correct way
const formData = new FormData();
formData.append('file', fileInput.files[0]);

await PostWithFormData('upload', formData, {}, 'file');

// Wrong - don't do this
await Post('upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' } // ❌
}, 'file');
```

---

## See Also

- [Configuration Guide](./CONFIGURATION.md) - Configure API client
- [Examples](./EXAMPLES.md) - More examples
- [API Reference](./API_REFERENCE.md) - Complete API docs
