# Configuration Guide

Complete reference for configuring the API utilities.

## Table of Contents

- [Configuration Object](#configuration-object)
- [Authentication](#authentication)
- [Feature Flags](#feature-flags)
- [Notification Handlers](#notification-handlers)
- [Interceptors](#interceptors)
- [Headers & Transformations](#headers--transformations)

---

## Configuration Object

The `ApiConfig` object supports the following properties:

```javascript
{
  // Base Configuration
  baseURL: string,                    // API base URL
  headers: object,                    // Default headers
  
  // Authentication
  tokenKey: string,                   // localStorage key for token
  userKey: string,                    // localStorage key for user data
  
  // Feature Flags
  includeBranchLogic: boolean,        // Include relatedBranch in requests
  includeCreatedBy: boolean,          // Include createdBy field
  
  // Notification Handlers
  onSuccess: (message) => void,       // Success notification handler
  onError: (message) => void,         // Error notification handler
  
  // Interceptors
  requestInterceptor: (config) => config,
  responseInterceptor: (response) => response,
  errorInterceptor: (error) => Promise,
  
  // Transformers
  transformRequest: (config, user, token) => config,
  transformResponse: (response) => response,
}
```

---

## Authentication

### Token Key

Specifies the localStorage key where the authentication token is stored.

**Default**: `@account_token`

```javascript
const api = createApiClient({
  tokenKey: '@myapp_token',
});
```

The token is automatically added to request headers as:
```
Authorization: Bearer <token>
```

### User Key

Specifies the localStorage key where user data is stored (as JSON string).

**Default**: `@account_authenticatedUser`

```javascript
const api = createApiClient({
  userKey: '@myapp_user',
});
```

Used for branch logic and custom transformations.

---

## Feature Flags

### includeBranchLogic

When `true`, automatically adds `relatedBranch` to all requests based on the user's branch.

**Default**: `true`

```javascript
const api = createApiClient({
  includeBranchLogic: false, // Disable for single-tenant apps
});
```

**Behavior when enabled**:
- Adds `relatedBranch` query parameter to all requests
- Adds `relatedBranch` field to POST/PUT/PATCH request bodies

### includeCreatedBy

When `true`, automatically adds `createdBy` field to POST/PUT/PATCH requests.

**Default**: `true`

```javascript
const api = createApiClient({
  includeCreatedBy: false, // Disable if not needed
});
```

**Note**: Only works when `includeBranchLogic` is also `true`.

---

## Notification Handlers

### Default Behavior

By default, the system uses `react-hot-toast` if available, falling back to console logging.

```javascript
// Default - uses toast if available
const api = createApiClient({});
```

### Custom Success Handler

```javascript
const api = createApiClient({
  onSuccess: (message) => {
    // Use your notification library
    notification.success({ message });
    // Or: MyToast.success(message);
    // Or: alert(message);
  },
});
```

### Custom Error Handler

```javascript
const api = createApiClient({
  onError: (message) => {
    // Use your notification library
    notification.error({ message });
    // Log to error tracking
    errorTracking.log(message);
  },
});
```

### Silent Mode (No Notifications)

```javascript
const api = createApiClient({
  onSuccess: () => {}, // Do nothing
  onError: () => {},   // Do nothing
});
```

---

## Interceptors

### Default Request Interceptor

Includes token authentication and branch logic (if enabled).

```javascript
// Uses default interceptor
const api = createApiClient({});
```

### Simple Request Interceptor

Token-only authentication, no branch logic.

```javascript
import { createApiClient, createSimpleRequestInterceptor } from '@/utils/apiMethods';

const api = createApiClient({
  requestInterceptor: createSimpleRequestInterceptor({
    tokenKey: '@myapp_token'
  }),
});
```

### Custom Request Interceptor

Full control over request transformation.

```javascript
const api = createApiClient({
  requestInterceptor: (config) => {
    // Add custom headers
    const token = localStorage.getItem('@custom_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['X-Custom-Header'] = 'value';
    }
    
    // Modify request data
    if (config.data) {
      config.data.timestamp = Date.now();
    }
    
    return config;
  },
});
```

### Response Interceptor

Transform successful responses.

```javascript
const api = createApiClient({
  responseInterceptor: (response) => {
    // Unwrap nested data
    if (response.data.data) {
      response.data = response.data.data;
    }
    return response;
  },
});
```

### Error Interceptor

Handle errors globally.

```javascript
const api = createApiClient({
  errorInterceptor: (error) => {
    // Handle 401 - redirect to login
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    
    // Handle 403 - show permission error
    if (error.response?.status === 403) {
      showPermissionError();
    }
    
    return Promise.reject(error);
  },
});
```

---

## Headers & Transformations

### Custom Default Headers

```javascript
const api = createApiClient({
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 'v2',
    'X-Client-Name': 'MyApp',
  },
});
```

### Request Transformation

Modify requests based on user data or other context.

```javascript
const api = createApiClient({
  transformRequest: (config, user, token) => {
    // Add user-specific headers
    if (user.companyId) {
      config.headers['X-Company-ID'] = user.companyId;
    }
    
    // Add tracking
    config.headers['X-Request-ID'] = generateRequestId();
    
    // Modify data
    if (config.data) {
      config.data.clientVersion = APP_VERSION;
    }
    
    return config;
  },
});
```

### Response Transformation

Transform all responses before they reach your code.

```javascript
const api = createApiClient({
  transformResponse: (response) => {
    // Convert dates from strings
    if (response.data.createdAt) {
      response.data.createdAt = new Date(response.data.createdAt);
    }
    
    // Normalize data structure
    return {
      ...response.data,
      normalized: true,
    };
  },
});
```

---

## Complete Example

```javascript
import { createApiClient } from '@/utils/apiMethods';
import { notification } from 'antd';

export const api = createApiClient({
  // Base settings
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Client-Version': '1.0.0',
  },
  
  // Authentication
  tokenKey: '@myapp_token',
  userKey: '@myapp_user',
  
  // Features
  includeBranchLogic: true,
  includeCreatedBy: true,
  
  // Notifications
  onSuccess: (msg) => notification.success({ message: msg }),
  onError: (msg) => notification.error({ message: msg }),
  
  // Custom transformation
  transformRequest: (config, user) => {
    config.headers['X-User-Role'] = user.role;
    return config;
  },
  
  // Error handling
  errorInterceptor: (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
});
```

---

## See Also

- [Usage Guide](./USAGE.md) - How to use CRUD methods
- [Examples](./EXAMPLES.md) - Real-world examples
- [API Reference](./API_REFERENCE.md) - Complete API documentation
