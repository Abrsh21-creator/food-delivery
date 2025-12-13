# Design Document: Ethiopian Food Search Feature

## Overview

The Ethiopian food search feature will enable users to filter and find traditional Ethiopian dishes quickly by typing keywords in Amharic or English into a bilingual search input field. The implementation will integrate seamlessly with the existing Ethiopian food category filtering system (Wot, Tibs, Fasting foods, etc.), providing a dual-filter approach where users can narrow results by both category and search text. The search will be case-insensitive, support both Amharic and English languages, and will match against food item names, descriptions, and common Ethiopian ingredients in real-time.

## Architecture

The search functionality will follow the existing React Context pattern used in the application. We'll extend the `StoreContext` to include search state management, and modify the `FoodDisplay` component to apply search filtering alongside category filtering.

### Component Structure

```
App
├── Navbar (modified to include search input)
│   └── SearchBar (new component)
├── Home
│   ├── Header
│   ├── ExploreMenu
│   ├── FoodDisplay (modified to apply search filter)
│   └── AppDownloader
└── StoreContext (modified to manage search state)
```

### Data Flow

1. User types in search input in Navbar
2. Search text is stored in StoreContext state
3. FoodDisplay component reads search text from context
4. FoodDisplay applies combined filtering (category + search)
5. Filtered results are rendered in real-time

## Components and Interfaces

### 1. SearchBar Component (New)

A new bilingual reusable component that will be integrated into the Navbar, supporting both Amharic and English input.

**Props:**
- `searchText`: string - Current search value (Amharic or English)
- `onSearchChange`: function - Callback when search text changes
- `onClear`: function - Callback to clear search

**State:**
- None (controlled component)

**Methods:**
- `handleInputChange(event)`: Updates search text via callback, handles both Amharic and English input
- `handleClear()`: Clears search input via callback

**Localization:**
- Placeholder text: "ምግብ ይፈልጉ / Search for food"
- Clear button aria-label: "አጽዳ / Clear search"

### 2. StoreContext (Modified)

Extended to manage search state globally.

**Additional State:**
```javascript
const [searchText, setSearchText] = useState('');
```

**Additional Context Values:**
```javascript
{
  searchText,
  setSearchText,
  // ... existing values
}
```

### 3. Navbar Component (Modified)

Will integrate the SearchBar component.

**Changes:**
- Import and use SearchBar component
- Access `searchText` and `setSearchText` from StoreContext
- Replace the existing search icon link with functional SearchBar

### 4. FoodDisplay Component (Modified)

Will apply search filtering in addition to category filtering.

**Changes:**
- Access `searchText` from StoreContext
- Implement `filterFoodItems()` function that applies both filters
- Update rendering logic to use filtered results

**Filter Logic:**
```javascript
const filterFoodItems = (items, category, searchText) => {
  return items.filter(item => {
    // Category filter (Ethiopian food categories: Wot, Tibs, Fasting, etc.)
    const matchesCategory = category === "All" || category === item.category;
    
    // Bilingual search filter (case-insensitive, matches Amharic or English name/description)
    const matchesSearch = searchText === '' || 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.nameAmharic && item.nameAmharic.includes(searchText)) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.descriptionAmharic && item.descriptionAmharic.includes(searchText)) ||
      (item.ingredients && item.ingredients.some(ing => 
        ing.toLowerCase().includes(searchText.toLowerCase())
      ));
    
    return matchesCategory && matchesSearch;
  });
};
```

## Data Models

### Food Item (Extended for Ethiopian Context)

```javascript
{
  _id: string,
  name: string,              // English name (e.g., "Doro Wot")
  nameAmharic: string,       // Amharic name (e.g., "ዶሮ ወጥ")
  image: string,
  price: number,             // Price in Ethiopian Birr
  description: string,       // English description
  descriptionAmharic: string, // Amharic description
  category: string,          // Ethiopian categories: "Wot", "Tibs", "Fasting", "Drinks", etc.
  ingredients: string[],     // Common ingredients: ["berbere", "teff", "injera", etc.]
  spiceLevel: string,        // "mild", "medium", "spicy"
  isFasting: boolean         // Fasting-friendly indicator
}
```

### Search State (New)

```javascript
{
  searchText: string  // The current search query
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Bilingual search filter subset

*For any* search text (Amharic or English) and Ethiopian food list, the filtered results should be a subset of the original food list, and every item in the filtered results should contain the search text (case-insensitive for English) in either its name (English or Amharic), description (English or Amharic), or ingredients list.

**Validates: Requirements 1.1, 2.1, 2.2, 6.1**

### Property 2: Empty search returns Ethiopian category results

*For any* Ethiopian food list and category selection (Wot, Tibs, Fasting, etc.), when the search text is empty, the filtered results should equal all items matching the selected category (or all items if category is "All").

**Validates: Requirements 1.2**

### Property 3: Case-insensitive matching for English text

*For any* English search text, the filtered results should be identical whether the search text is in uppercase, lowercase, or mixed case. Amharic text matching should preserve character integrity.

**Validates: Requirements 1.3, 2.3**

### Property 4: Combined Ethiopian category and search filter intersection

*For any* search text (Amharic or English) and Ethiopian food category selection (both non-empty), the filtered results should contain only items that match both the category (e.g., Wot, Tibs) AND the search criteria.

**Validates: Requirements 4.1, 4.2**

### Property 5: Clear resets to Ethiopian category filter

*For any* Ethiopian food list and active category, clearing the search text should result in displaying all items from that category.

**Validates: Requirements 4.3**

### Property 6: Ingredient-based search accuracy

*For any* Ethiopian food item with ingredients list, searching for any ingredient name should return that food item in the results.

**Validates: Requirements 6.1**

## Error Handling

### Input Validation

- **Empty/Whitespace Search**: Treated as no search filter applied
- **Special Characters**: Handled naturally by string matching (no escaping needed)
- **Very Long Search Text**: No explicit limit, but UI should handle gracefully

### Edge Cases

- **No Results Found**: Display bilingual message "ምንም ምግብ አልተገኘም / No food items match your search"
- **Undefined/Null Values**: Safely handle missing Amharic names, descriptions, or ingredients fields with optional chaining
- **Context Not Available**: Provide default empty string for searchText
- **Mixed Language Input**: Support searching with both Amharic and English in the same query
- **Special Amharic Characters**: Ensure proper Unicode handling for Amharic script (U+1200 to U+137F)

### Error Boundaries

- Wrap FoodDisplay in error boundary to catch rendering errors
- Log errors to console for debugging
- Display fallback UI if filtering fails

## Testing Strategy

### Unit Tests

We'll write unit tests for:

1. **Filter Function Logic**
   - Test filtering by name only
   - Test filtering by description only
   - Test filtering by both name and description
   - Test case-insensitive matching
   - Test combined category and search filtering
   - Test empty search behavior
   - Test special characters in search

2. **SearchBar Component**
   - Test input change handling
   - Test clear button functionality
   - Test placeholder text display
   - Test controlled input behavior

3. **Context Integration**
   - Test searchText state updates
   - Test setSearchText function

### Property-Based Tests

We'll use **fast-check** (a property-based testing library for JavaScript) to verify the correctness properties. Each property-based test will run a minimum of 100 iterations.

Property-based tests will be tagged with comments in this format:
```javascript
// Feature: food-search, Property 1: Search filter subset
```

1. **Property 1: Search filter subset**
   - Generate random food lists and search strings
   - Verify filtered results are always a subset
   - Verify all results contain the search text

2. **Property 2: Empty search returns category results**
   - Generate random food lists and categories
   - Verify empty search returns correct category items

3. **Property 3: Case-insensitive matching**
   - Generate random search strings with varied casing
   - Verify results are identical regardless of case

4. **Property 4: Combined filter intersection**
   - Generate random combinations of categories and search text
   - Verify results match both filters

5. **Property 5: Clear resets to category filter**
   - Generate random food lists and categories
   - Verify clearing search returns to category-only filtering

### Integration Tests

- Test full user flow: type search → see filtered results → clear → see all items
- Test interaction between category selection and search
- Test search across different pages/routes

### Testing Framework

- **Unit Tests**: Jest + React Testing Library
- **Property-Based Tests**: fast-check
- **Test Configuration**: Minimum 100 iterations per property test

## Implementation Notes

### Performance Considerations

- Filtering is performed on every render when search text changes
- For the current food list size (~32 items), performance impact is negligible
- If the list grows significantly, consider debouncing search input or memoization

### Accessibility

- Search input should have proper bilingual `aria-label="ምግብ ይፈልጉ / Search for food"`
- Clear button should have bilingual `aria-label="አጽዳ / Clear search"`
- No results message should be announced to screen readers in both languages
- Maintain keyboard navigation support
- Ensure proper text direction (LTR for English, LTR for Amharic)

### Styling

- Search input should match existing navbar styling
- Use existing CSS patterns for consistency
- Ensure responsive design for mobile devices
- Add subtle focus states for better UX

### Future Enhancements

- Add search history/suggestions
- Implement fuzzy matching for typo tolerance
- Add search analytics tracking
- Support advanced filters (price range, ratings)
