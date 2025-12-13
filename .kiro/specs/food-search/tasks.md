# Implementation Plan: Ethiopian Food Search

- [ ] 1. Extend StoreContext to manage bilingual search state
  - Add `searchText` state variable initialized to empty string (supports Amharic and English)
  - Add `setSearchText` function to context value
  - Export updated context with bilingual search functionality
  - _Requirements: 1.1, 1.2, 2.1_

- [ ] 2. Create bilingual SearchBar component for Ethiopian food
  - Create new component file `src/components/SearchBar/SearchBar.jsx`
  - Implement controlled input that receives searchText and onSearchChange props (supports Amharic and English)
  - Add clear button with icon that calls onClear callback
  - Include bilingual placeholder text "ምግብ ይፈልጉ / Search for food"
  - Add proper bilingual aria-labels for accessibility
  - Ensure proper Unicode support for Amharic characters (U+1200 to U+137F)
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Create SearchBar styles with Ethiopian design elements
  - Create `src/components/SearchBar/SearchBar.css`
  - Style input field to match navbar design with Ethiopian color scheme
  - Add focus states for better UX
  - Ensure responsive design for mobile devices
  - Style clear button with appropriate Ethiopian visual feedback
  - Ensure proper font rendering for Amharic text
  - _Requirements: 3.3, 5.2_

- [ ]* 3.1 Write unit tests for bilingual SearchBar component
  - Test input change handling for both Amharic and English
  - Test clear button functionality
  - Test bilingual placeholder display
  - Test bilingual aria-label attributes
  - Test Amharic Unicode character handling
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Integrate SearchBar into Navbar
  - Import SearchBar component into Navbar
  - Access searchText and setSearchText from StoreContext
  - Replace existing search icon with SearchBar component
  - Pass searchText and callbacks as props
  - Implement handleClear function to reset search
  - _Requirements: 3.1, 3.4_

- [ ]* 4.1 Write unit tests for Navbar integration
  - Test SearchBar renders in Navbar
  - Test search state updates through context
  - Test clear functionality
  - _Requirements: 3.1, 3.4_

- [ ] 5. Implement filtering logic in FoodDisplay
  - Access searchText from StoreContext
  - Create filterFoodItems helper function
  - Implement case-insensitive matching for name and description
  - Apply both category and search filters
  - Handle empty search case
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 4.1, 4.2, 4.3_

- [ ] 5.1 Add no results message
  - Display "No food items match your search" when filtered list is empty
  - Style the message appropriately
  - _Requirements: 1.5_

- [ ]* 5.2 Write unit tests for filter logic
  - Test filtering by name only
  - Test filtering by description only
  - Test case-insensitive matching
  - Test combined category and search filtering
  - Test empty search returns category results
  - Test special characters in search
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3_

- [ ]* 5.3 Write property test for search filter subset
  - **Property 1: Search filter subset**
  - **Validates: Requirements 1.1, 2.1, 2.2**
  - Generate random food lists and search strings
  - Verify filtered results are subset of original list
  - Verify all results contain search text in name or description (case-insensitive)

- [ ]* 5.4 Write property test for empty search behavior
  - **Property 2: Empty search returns category results**
  - **Validates: Requirements 1.2**
  - Generate random food lists and categories
  - Verify empty search returns all items matching category

- [ ]* 5.5 Write property test for case-insensitive matching
  - **Property 3: Case-insensitive matching**
  - **Validates: Requirements 1.3, 2.3**
  - Generate random search strings with varied casing
  - Verify results are identical regardless of case

- [ ]* 5.6 Write property test for combined filtering
  - **Property 4: Combined filter intersection**
  - **Validates: Requirements 1.4, 4.1, 4.2**
  - Generate random combinations of categories and search text
  - Verify results match both category AND search criteria

- [ ]* 5.7 Write property test for clear functionality
  - **Property 5: Clear resets to category filter**
  - **Validates: Requirements 4.3**
  - Generate random food lists and categories
  - Verify clearing search returns to category-only results

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 7. Write integration tests
  - Test full user flow: type search → see filtered results → clear → see all items
  - Test interaction between category selection and search
  - Test search persists when navigating between pages
  - _Requirements: 4.1, 4.2, 5.1_
