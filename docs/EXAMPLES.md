# Examples

Real-world examples for different scenarios. See [examples.js](./examples.js) for complete code.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Authentication Patterns](#authentication-patterns)
- [Multi-API Projects](#multi-api-projects)
- [Notification Customization](#notification-customization)
- [Advanced Patterns](#advanced-patterns)

---

## Basic Usage

### Example 1: Default Configuration (Backward Compatible)

Use the default instance - works exactly like before.

```javascript
import { apiInstance, Get, Post } from '@/utils/apiMethods';

// Fetch data
const users = await Get('users');
const products = await Get('products', { category: 'electronics' });

// Create data
const newUser = await Post('users', {
  name: 'John Doe',
  email: 'john@example.com',
}, {}, 'user');
```

---

## Authentication Patterns

### Example 2: Simple Token-Only Auth

No branch logic, just token authentication.

```javascript
import { createApiClient, createSimpleRequestInterceptor } from '@/utils/apiMethods';

const api = createApiClient({
  baseURL: 'https://api.simple.com',
  tokenKey: '@simple_token',
  includeBranchLogic: false,
  requestInterceptor: createSimpleRequestInterceptor({
    tokenKey: '@simple_token'
  }),
});

// Use it
const data = await Get('products', {}, api);
```

### Example 3: Custom Authentication Header

Use a different auth scheme (e.g., API Key).

```javascript
const api = createApiClient({
  baseURL: 'https://api.example.com',
  requestInterceptor: (config) => {
    const apiKey = localStorage.getItem('@api_key');
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }
    return config;
  },
});
```

---

## Multi-API Projects

### Example 4: Multiple API Clients

Different APIs in the same project.

```javascript
import { createApiClient, Get } from '@/utils/apiMethods';

// Main business API
const mainApi = createApiClient({
  baseURL: 'https://api.main.com',
  tokenKey: '@main_token',
  includeBranchLogic: true,
});

// Analytics API
const analyticsApi = createApiClient({
  baseURL: 'https://analytics.main.com',
  tokenKey: '@analytics_token',
  includeBranchLogic: false,
});

// Public API (no auth)
const publicApi = createApiClient({
  baseURL: 'https://public-api.com',
  requestInterceptor: (config) => config, // No auth
});

// Use different APIs
const users = await Get('users', {}, mainApi);
const stats = await Get('stats', {}, analyticsApi);
const news = await Get('news', {}, publicApi);
```

---

## Notification Customization

### Example 5: Ant Design Notifications

```javascript
import { createApiClient } from '@/utils/apiMethods';
import { notification } from 'antd';

const api = createApiClient({
  baseURL: 'https://api.example.com',
  onSuccess: (message) => {
    notification.success({
      message: 'Success',
      description: message,
      duration: 3,
    });
  },
  onError: (message) => {
    notification.error({
      message: 'Error',
      description: message,
      duration: 5,
    });
  },
});
```

### Example 6: Silent Background Operations

```javascript
import { Get, Post } from '@/utils/apiMethods';

// Background sync - no notifications
const syncData = async () => {
  const result = await Post('sync', {
    lastSync: Date.now(),
    items: pendingItems,
  }, {}, 'sync', api, {
    showNotification: false,
  });
  
  return result;
};

// Polling - silent
const pollStatus = async () => {
  const status = await Get('job/status', {}, api, {
    showNotification: false,
  });
  
  return status;
};
```

### Example 7: Custom Messages Per Request

```javascript
import { Post, Update } from '@/utils/apiMethods';

// Registration with custom message
const register = await Post('auth/register', userData, {}, 'user', api, {
  customSuccessMessage: '🎉 Welcome aboard! Please check your email.',
  customErrorMessage: 'Registration failed. Email might already exist.',
});

// Update with custom message
const updateProfile = await Update('profile/', userId, data, {}, 'profile', api, {
  customSuccessMessage: 'Profile updated successfully!',
});
```

---

## Advanced Patterns

### Example 8: Request Transformation

Add custom headers and modify requests.

```javascript
const api = createApiClient({
  baseURL: 'https://api.example.com',
  transformRequest: (config, user, token) => {
    // Add user-specific headers
    if (user.companyId) {
      config.headers['X-Company-ID'] = user.companyId;
    }
    
    // Add request tracking
    config.headers['X-Request-ID'] = generateRequestId();
    config.headers['X-Request-Time'] = new Date().toISOString();
    
    // Add client info to all POST requests
    if (config.method === 'post' && config.data) {
      config.data = {
        ...config.data,
        clientVersion: APP_VERSION,
        platform: 'web',
      };
    }
    
    return config;
  },
});

function generateRequestId() {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

### Example 9: Response Transformation

Transform all API responses.

```javascript
const api = createApiClient({
  baseURL: 'https://api.example.com',
  
  responseInterceptor: (response) => {
    // Unwrap nested data structure
    if (response.data.data) {
      response.data = response.data.data;
    }
    
    // Convert date strings to Date objects
    if (response.data.createdAt) {
      response.data.createdAt = new Date(response.data.createdAt);
    }
    
    return response;
  },
});
```

### Example 10: Global Error Handling

Handle specific error scenarios globally.

```javascript
const api = createApiClient({
  baseURL: 'https://api.example.com',
  
  errorInterceptor: (error) => {
    const status = error.response?.status;
    
    // Unauthorized - redirect to login
    if (status === 401) {
      localStorage.removeItem('@token');
      window.location.href = '/login';
    }
    
    // Forbidden - show permission error
    if (status === 403) {
      showModal({
        title: 'Permission Denied',
        message: 'You don\'t have permission to perform this action.',
      });
    }
    
    // Server error - log to error tracking
    if (status >= 500) {
      errorTracking.log(error);
    }
    
    return Promise.reject(error);
  },
});
```

### Example 11: Project-Wide API Client

Best practice: Create one client and export it.

```javascript
// api/client.js
import { createApiClient } from '@juro/shared';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  tokenKey: '@myproject_token',
  userKey: '@myproject_user',
  
  // Use your notification library
  onSuccess: (msg) => toast.success(msg),
  onError: (msg) => toast.error(msg),
  
  // Enable features
  includeBranchLogic: true,
  includeCreatedBy: true,
});
```

```javascript
// In your components
import { api } from '@/api/client';
import { Get, Post } from '@juro/shared';

const users = await Get('users', {}, api);
```

### Example 12: Form with Validation

Complete form submission with validation.

```javascript
import { ValidateForm, Post } from '@/utils/apiMethods';

const handleSubmit = async (formData) => {
  // Validate
  const validation = ValidateForm([
    { condition: !formData.name, label: 'Name', isRequired: true },
    { condition: !formData.email, label: 'Email', isRequired: true },
    { condition: !formData.password, label: 'Password', isRequired: true },
    {
      condition: !isValidEmail(formData.email),
      customMsg: 'Please enter a valid email address',
      isCustom: true,
    },
    {
      condition: formData.password.length < 8,
      customMsg: 'Password must be at least 8 characters',
      isCustom: true,
    },
  ]);
  
  if (!validation.isSuccess) {
    return; // Errors already shown
  }
  
  // Submit
  const result = await Post('users', formData, {}, 'user', api, {
    customSuccessMessage: 'Account created! Welcome aboard.',
  });
  
  if (result.isSuccess) {
    navigate('/dashboard');
  }
};
```

---

## More Examples

See [examples.js](./examples.js) for complete, runnable code examples including:
- Token-only authentication
- Custom interceptors
- Multiple API endpoints
- Notification customization
- And more!

---

## See Also

- [Configuration Guide](./CONFIGURATION.md) - Configure your API client
- [Usage Guide](./USAGE.md) - CRUD methods reference
- [Migration Guide](./MIGRATION.md) - Migrate existing projects
