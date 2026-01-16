# Authentication System Documentation

## Overview

The Zenlyf app now features a robust token-based authentication system with automatic expiration after 4 days. When users log in, their access token is saved along with metadata about when it was created and their user role. The app automatically checks token validity on startup and routes users accordingly.

## Key Features

- ✅ **4-Day Token Expiration**: Access tokens automatically expire 4 days after login
- ✅ **Automatic Authentication Check**: App checks token validity on every startup
- ✅ **Role-Based Routing**: Users are automatically redirected to their appropriate dashboard based on role
- ✅ **Persistent Sessions**: Valid tokens keep users logged in across app restarts
- ✅ **Secure Logout**: Proper cleanup of all authentication data

## How It Works

### 1. Login Flow

When a user logs in (`app/(auth)/signin/index.tsx`):

```typescript
// Save token with user role
await saveAuthToken(tokenData, selectedRole as 'user' | 'caregiver' | 'doctor');
```

This saves:
- **Access Token**: For API authentication
- **Refresh Token**: For token renewal (if needed)
- **Timestamp**: When the token was created
- **User Role**: 'user', 'caregiver', or 'doctor'

### 2. App Startup Flow

When the app starts (`components/SetupChecker.tsx`):

1. **Auth Check**: The `useAuth` hook checks if a valid token exists
2. **Expiration Check**: Verifies the token hasn't expired (< 4 days old)
3. **Automatic Routing**:
   - If token is **valid**: User is redirected to their role-based dashboard
     - `doctor` → `/(doctor-tabs)`
     - `caregiver` → `/(caregiver-tabs)`
     - `user` → `/(tabs)`
   - If token is **invalid/expired**: User is redirected to `/splash` (onboarding)

### 3. Token Expiration

Tokens expire exactly **4 days (96 hours)** after login:

```typescript
const TOKEN_EXPIRATION_DAYS = 4;
const expirationTime = savedTimestamp + (4 * 24 * 60 * 60 * 1000);
```

After 4 days:
- Token is automatically cleared from storage
- User sees the splash/welcome screen on next app open
- User must log in again

### 4. Logout Flow

When a user logs out (`app/MainScreen/logout.tsx`):

1. Clears access and refresh tokens
2. Clears authentication metadata (timestamp, role)
3. Clears user context data
4. Redirects to main index page

## File Structure

### New Files

- **`hooks/useAuth.tsx`**: Custom hook for checking authentication status
  - Checks if token exists
  - Validates token hasn't expired
  - Returns authentication state and user role

### Modified Files

- **`app/Requesthandler/Auth.tsx`**:
  - `saveAuthToken()`: Now saves token with timestamp and role
  - `clearAuthToken()`: Clears both tokens and metadata
  - `isAuthenticated()`: Checks token validity including expiration
  - `getTokenExpirationInfo()`: Returns detailed token expiration data

- **`contexts/UserContext.tsx`**:
  - Automatically restores user role from AsyncStorage on app start
  - `clearUserData()`: Now properly clears AsyncStorage

- **`components/SetupChecker.tsx`**:
  - Uses `useAuth` hook for authentication checks
  - Implements automatic role-based routing
  - Shows loading indicator during auth check

- **`app/(auth)/signin/index.tsx`**:
  - Passes user role to `saveAuthToken()`

- **`app/MainScreen/logout.tsx`**:
  - Properly clears all authentication data
  - Uses both `clearAuthToken()` and `clearUserData()`

## Storage Schema

### AsyncStorage Keys

#### `cookies`
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `authData`
```json
{
  "timestamp": 1697558400000,
  "role": "user"
}
```

## Usage Examples

### Check Authentication Status

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Dashboard role={userRole} />;
  }

  return <LoginScreen />;
}
```

### Get Token Expiration Info

```typescript
import { getTokenExpirationInfo } from '../app/Requesthandler/Auth';

async function checkTokenExpiry() {
  const info = await getTokenExpirationInfo();
  
  console.log('Token valid:', info.isValid);
  console.log('Expires at:', info.expiresAt);
  console.log('Time remaining (ms):', info.timeRemaining);
  console.log('User role:', info.role);
  
  // Convert to days remaining
  if (info.timeRemaining) {
    const daysRemaining = info.timeRemaining / (24 * 60 * 60 * 1000);
    console.log(`Token expires in ${daysRemaining.toFixed(1)} days`);
  }
}
```

### Manual Token Refresh

If you need to implement token refresh logic:

```typescript
import { refreshAccessToken } from '../app/Requesthandler/Auth';

async function refreshToken() {
  try {
    const response = await refreshAccessToken();
    console.log('Token refreshed successfully');
  } catch (error) {
    console.error('Token refresh failed:', error);
    // Redirect to login
  }
}
```

## Security Considerations

1. **Token Storage**: Tokens are stored in AsyncStorage, which is appropriate for React Native apps
2. **Automatic Cleanup**: Expired tokens are automatically removed
3. **Role Validation**: User roles are stored and validated on each app start
4. **Secure Logout**: All authentication data is properly cleared on logout

## Testing Checklist

- [ ] User can log in successfully
- [ ] Token is saved with correct timestamp and role
- [ ] User is redirected to correct dashboard based on role
- [ ] App remembers user between restarts (within 4 days)
- [ ] Token expires after exactly 4 days
- [ ] Expired token redirects to splash screen
- [ ] Logout clears all authentication data
- [ ] User can log in again after logout

## Future Enhancements

Potential improvements:

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Biometric Auth**: Add fingerprint/face ID for quick re-authentication
3. **Session Extension**: Option to extend session when user is active
4. **Multiple Devices**: Track and manage sessions across devices
5. **Security Alerts**: Notify users of unusual login activity

## Troubleshooting

### User Not Staying Logged In

Check console logs for:
```
useAuth: Token expired, clearing auth data
```

Verify timestamp is being saved correctly.

### Wrong Dashboard After Login

Check that `selectedRole` in `UserContext` matches the role passed to `saveAuthToken()`.

### Token Still Valid After 4 Days

Verify the expiration calculation:
```typescript
const expirationTime = authData.timestamp + (4 * 24 * 60 * 60 * 1000);
```

Check system time is correct.

## Support

For questions or issues, check the console logs which include detailed debug information:
- `=== useAuth Token Check ===`
- `=== Saving Tokens ===`
- `=== SetupChecker Navigation Logic ===`

