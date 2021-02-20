# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [1.3.1] - 2021-02-01

### Fixed

- Fix number display logic so we don't say "1047k"
- Pass the actual numbers into the chart on the index page

## [1.3.0] - 2021-02-01

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
