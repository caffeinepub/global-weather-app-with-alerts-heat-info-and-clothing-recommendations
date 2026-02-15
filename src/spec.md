# Specification

## Summary
**Goal:** Enable truly global location search so users can find and select any place worldwide to fetch weather (removing Berlin/San Francisco hardcoding).

**Planned changes:**
- Update the location search UI to use a real place search that returns multiple matching locations worldwide (city/region/country) and lets the user select one result.
- On selection, set `selectedLocation.name/lat/lon` and trigger weather loading through the existing weather query flow.
- Show a clear English “no results found” message when a search returns no matches, and update placeholder/help text to reflect global search.
- Remove the backend “blessed locations only” restriction so location lookup no longer traps for valid non-Berlin/San-Francisco queries and can return coordinates for global queries.

**User-visible outcome:** Users can type a location (e.g., “Paris”), pick from multiple worldwide matches, and see weather for the selected place; if nothing matches, they see a clear no-results message.
