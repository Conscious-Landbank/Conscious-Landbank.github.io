# Navigation Standardization Plan

## Current State
- **index.html**: Has conditional navigation (shows/hides based on login state)
- **dashboard.html**: Has full navigation with user profile dropdown
- **wallet.html**: Has minimal navigation without user profile

## Target State
All three pages should have IDENTICAL navigation:
1. Same visual design
2. Same links (DASHBOARD | WALLET | IMPACT | CENTRES | PORTFOLIO)
3. User profile dropdown with all options
4. Same CSS styling
5. Same JavaScript for dropdown functionality

## Components Needed

### CSS Classes:
- `.nav`, `.nav-left`, `.nav-right`
- `.nav-brand`, `.nav-logo-icon`, `.logo`
- `.nav-links`, `.nav-link`
- `.user-profile`, `.user-avatar`, `.user-name`
- `.user-dropdown` and all dropdown related classes

### HTML Structure:
```
<nav class="nav">
  <div class="nav-left">
    <a href="index.html" class="nav-brand">UNERA</a>
    <ul class="nav-links">
      <li>DASHBOARD</li>
      <li>WALLET</li>
      <li>IMPACT</li>
      <li>CENTRES</li>
      <li>PORTFOLIO</li>
    </ul>
  </div>
  <div class="nav-right">
    <div class="user-profile" onclick="toggleUserDropdown()">
      <div class="user-avatar">JS</div>
      <div class="user-name">Jane Smith</div>
      <div class="user-dropdown">
        <!-- Full dropdown menu -->
      </div>
    </div>
  </div>
</nav>
```

### JavaScript:
- `toggleUserDropdown()` function
- Click outside to close dropdown
- User state management

## Implementation
Update wallet.html to match dashboard.html navigation exactly.
