# API Reference

Complete API reference for all functions and types.

## Table of Contents

- [Factory Functions](#factory-functions)
- [CRUD Methods](#crud-methods)
- [Configuration Utilities](#configuration-utilities)
- [Types](#types)

---

## Factory Functions

### createApiClient

Creates a configured axios instance with interceptors.

```typescript
createApiClient(config?: ApiConfig): AxiosInstance
```

**Parameters**:
- `config` (optional) - Configuration object

**Returns**: Configured axios instance

**Example**:
```javascript
const api = createApiClient({
  baseURL: 'https://api.example.com',
  tokenKey: '@my_token',
});
```

---

### createDefaultRequestInterceptor

Creates the default request interceptor with branch and user logic.

```typescript
createDefaultRequestInterceptor(config: ApiConfig): Function
```

**Parameters**:
- `config` - Configuration object

**Returns**: Request interceptor function

**Example**:
```javascript
const api = createApiClient({
  requestInterceptor: createDefaultRequestInterceptor({
    tokenKey: '@token',
    includeBranchLogic: true,
  }),
});
```

---

### createSimpleRequestInterceptor

Creates a simple token-only request interceptor.

```typescript
createSimpleRequestInterceptor(config: ApiConfig): Function
```

**Parameters**:
- `config` - Configuration object with at least `tokenKey`

**Returns**: Request interceptor function

**Example**:
```javascript
const api = createApiClient({
  requestInterceptor: createSimpleRequestInterceptor({
    tokenKey: '@token',
  }),
});
```

---

### customAxios

Backward compatible factory function.

```typescript
customAxios(dynamicBaseURL?: string): AxiosInstance
```

**Parameters**:
- `dynamicBaseURL` (optional) - Base URL for the API

**Returns**: Configured axios instance

**Example**:
```javascript
const api = customAxios('https://api.example.com');
```

---

## CRUD Methods

### Get

Fetch data from the API.

```typescript
Get(
  url: string,
  params?: object,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<any>
```

**Parameters**:
- `url` - Endpoint URL
- `params` (optional) - Query parameters
- `api` (optional) - Axios instance (defaults to `customAxios()`)
- `options` (optional) - Request options

**Returns**: Promise resolving to response data

---

### Post

Create a resource.

```typescript
Post(
  url: string,
  data: object,
  config?: object,
  text: string,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<any>
```

**Parameters**:
- `url` - Endpoint URL
- `data` - Request payload
- `config` (optional) - Axios config
- `text` - Entity name for notifications
- `api` (optional) - Axios instance
- `options` (optional) - Request options

**Returns**: Promise resolving to response data

---

### PostWithFormData

Create a resource with FormData.

```typescript
PostWithFormData(
  url: string,
  data: FormData,
  config?: object,
  text: string,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<any>
```

**Parameters**: Same as `Post` but `data` must be FormData

---

### Update

Update a resource.

```typescript
Update(
  url: string,
  id: string,
  data: object,
  config?: object,
  text: string,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<any>
```

**Parameters**:
- `url` - Endpoint URL (without ID)
- `id` - Resource ID
- `data` - Update payload
- `config` (optional) - Axios config
- `text` - Entity name for notifications
- `api` (optional) - Axios instance
- `options` (optional) - Request options

**Returns**: Promise resolving to response data

---

### UpdateWithFormData

Update a resource with FormData.

```typescript
UpdateWithFormData(
  url: string,
  id: string,
  data: FormData,
  config?: object,
  text: string,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<any>
```

**Parameters**: Same as `Update` but `data` must be FormData

---

### GetDetail

Get a single resource by ID.

```typescript
GetDetail(
  url: string,
  id: string,
  params?: object,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<any>
```

**Parameters**:
- `url` - Endpoint URL (without ID)
- `id` - Resource ID
- `params` (optional) - Query parameters
- `api` (optional) - Axios instance
- `options` (optional) - Request options

**Returns**: Promise resolving to resource data

---

### Delete

Delete a resource.

```typescript
Delete(
  url: string,
  id: string,
  text: string,
  api?: AxiosInstance,
  options?: CrudOptions
): Promise<boolean>
```

**Parameters**:
- `url` - Endpoint URL (without ID)
- `id` - Resource ID
- `text` - Entity name for notifications
- `api` (optional) - Axios instance
- `options` (optional) - Request options

**Returns**: Promise resolving to `true` if successful, `false` otherwise

---

### ValidateForm

Validate form fields with automatic error notifications.

```typescript
ValidateForm(
  fieldChecks: FieldCheck[],
  options?: CrudOptions
): ValidationResult
```

**Parameters**:
- `fieldChecks` - Array of field validation objects
- `options` (optional) - Request options

**Returns**: Validation result object

**FieldCheck**:
```typescript
{
  condition: boolean,      // True if validation fails
  label?: string,          // Field label (for required checks)
  customMsg?: string,      // Custom error message
  isRequired?: boolean,    // Is this a required field check?
  isCustom?: boolean,      // Is this a custom validation?
}
```

**ValidationResult**:
```typescript
{
  isSuccess: boolean,
  message?: string,
}
```

---

## Configuration Utilities

### mergeConfig

Merges user configuration with default configuration.

```typescript
mergeConfig(userConfig?: ApiConfig): ApiConfig
```

**Parameters**:
- `userConfig` (optional) - User configuration

**Returns**: Merged configuration

---

### validateConfig

Validates configuration object.

```typescript
validateConfig(config: ApiConfig): void
```

**Parameters**:
- `config` - Configuration to validate

**Throws**: Error if configuration is invalid

---

### getSuccessHandler

Gets the appropriate success notification handler.

```typescript
getSuccessHandler(config: ApiConfig): Function
```

**Parameters**:
- `config` - Configuration object

**Returns**: Success handler function

---

### getErrorHandler

Gets the appropriate error notification handler.

```typescript
getErrorHandler(config: ApiConfig): Function
```

**Parameters**:
- `config` - Configuration object

**Returns**: Error handler function

---

### defaultSuccessHandler

Default success notification handler.

```typescript
defaultSuccessHandler(message: string): void
```

---

### defaultErrorHandler

Default error notification handler.

```typescript
defaultErrorHandler(message: string): void
```

---

## Types

### ApiConfig

Main configuration object for API client.

```typescript
{
  baseURL?: string,
  tokenKey?: string,
  userKey?: string,
  headers?: object,
  includeBranchLogic?: boolean,
  includeCreatedBy?: boolean,
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
  requestInterceptor?: (config: any) => any,
  responseInterceptor?: (response: any) => any,
  errorInterceptor?: (error: any) => Promise<any>,
  transformRequest?: (config: any, user: any, token: string) => any,
  transformResponse?: (response: any) => any,
}
```

---

### CrudOptions

Options for CRUD method calls.

```typescript
{
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
  showNotification?: boolean,
  customSuccessMessage?: string,
  customErrorMessage?: string,
  apiConfig?: ApiConfig,
}
```

---

## Exported Instances

### apiInstance

Default configured axios instance with interceptors.

```javascript
import { apiInstance } from '@/utils/apiMethods';
```

---

### api

Plain axios instance without interceptors.

```javascript
import { api } from '@/utils/apiMethods';
```

---

### ImageURL

Helper for constructing image URLs.

```javascript
import { ImageURL } from '@/utils/apiMethods';

const avatarUrl = ImageURL + 'avatars/user123.jpg';
```

---

## See Also

- [Configuration Guide](./CONFIGURATION.md) - Detailed configuration options
- [Usage Guide](./USAGE.md) - How to use CRUD methods
- [Examples](./EXAMPLES.md) - Real-world examples
