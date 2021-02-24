# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [1.5.1] - 2021-02-24

### Updated

- Added extra margin to the bottom of the site on small screens (rounded corners, you know)
- Add aria-desribedby to charts (point at the details element)
- Create dynamic meta tag for provinces and homepage

### Added

- Added a nice header image for social sharing
- Link to other provinces from the province pages

### Fixed

- Focus returns to `<body>` after route changes
- Added lang="en" attribute to `<head>`
- Smaller footer text and nonbreaking space between "Ontario" and "Canada" to prevent awkward layouts
- Fixed bug whereby the charts would look terrible on their initial load on a small screen

## [1.5.0] - 2021-02-22

### Updated

- Updated the "regions" chart on the home page to care about Canada Day, not Labour Day
- Updated the "methodology" and "about" pages to talk about the new estimates: 15-24 million by Canada Day (🤞)

### Added

- Added accessible chart descriptions under graphs
  - All of our graphs now have a details element with an explanation sentence and a data table so that the data in the viz can be browsed by other modalities
- On the region pages, I've put a blurb about how that province/territory is doing in relation to other provinces or territories
  - note that I separated provinces and territories because the numbers are so different between them

### Removed

- Removed the button I spent so much time on
  - Basically the interface was too cluttered so I took it away
  - The logic is still in place to update the graphs but there isn't a way to control that anymore

## [1.4.0] - 2021-02-22

### Added

- Added a "data" page with the raw numbers I am using in a big data table
  - Also mentioned the sources I am using on the data page

### Removed

- Remove "sources" page, as the data page is more useful
- Replaced all references to the "sources" page to the new data page

## [1.3.1] - 2021-02-21

### Fixed

- Fix number display logic so we don't say "1047k"
- Pass the actual numbers into the chart on the index page

## [1.3.0] - 2021-02-20

### Added

- Call data from the API now, so it's always up to date

### Updated

- Updated home page
  - Added link to regions
  - Consolidated text about vaccines
  - Changed link to other regions
- Added responsive graph widths
  - It's like 20% better but they are still terrible on mobile

## [1.2.1] - 2021-01-28

### Added

- Added an "update" script so that we can very easily update the data

### Updated

- Changed data format in data/_regions.js
  - Now it is a JSON file that we can generate on the fly
- LastUpdated component accepts a datetime, defaulting to global "last_updated"


## [1.2.0] - 2021-01-25

### Added

- Create pages for individual provinces and territories
- Create page for listing/selecting all available regions
- Add details/summary collapsible top menu

### Updated

- Add new pages to sitemap
- LastUpdated is a component now
- Update mobile styling for font sizes and graphs

## [1.1.0] - 2021-01-21

### Added

- Unit tests
- Github Actions to run tests
- Test instructions in README
- Added an MVP sitemap

### Updated

- Data from Wednesday, Jan 20
- "About" page knows about github
- Change the graph to show how many people have received vaccines (rather than total vaccines used)
  - Update methodology page with more true facts stated
- Update Canadian population numbers to Q4 (instead of realtime)
  - Update sources with link to Stats Can

## [1.0.2] - 2021-01-19

### Updated

- Data from Tuesday, Jan 19
- Last updated is a component now

## [1.0.1] - 2021-01-19

### Added

- Added a sementic VERSION meta tag to the header
- Added a CHANGELOG

## [1.0.0] - 2021-01-19

### Added

- Shipped V1 of the site
  - Not a lot on it, just one page of graphs and a couple supplementary pages
- Added a CHANGELOG
