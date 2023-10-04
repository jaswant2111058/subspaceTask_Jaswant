# Blog Analytics and Search Tool with Express.js and Lodash

This project implements a blog analytics and search tool using Express.js and Lodash. It fetches data from a third-party blog API, performs data analysis, provides insightful statistics, and offers a blog search endpoint. Additionally, there's an optional bonus challenge to implement caching using Lodash's `memoize` function.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Data Analysis](#data-analysis)
5. [Error Handling](#error-handling)
6. [Bonus Challenge: Caching](#bonus-challenge-caching)
7. [Contributing](#contributing)

## Installation

To set up this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd blog-analytics-tool
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:5000`.

## Usage

Once the server is running, you can use the following API endpoints to retrieve blog analytics and perform blog searches.

## API Endpoints

### 1. `/api/blog-stats` (GET)

This route fetches blog data from a third-party API and provides insightful statistics about the blogs.

#### Request:

- **Method:** GET
- **URL:** `/api/blog-stats`

#### Response:

The response is a JSON object containing the following statistics:

- `totalBlogs`: Total number of blogs.
- `longestBlogTitle`: Title of the longest blog.
- `blogsWithPrivacyKeyword`: Number of blogs with "privacy" in the title.
- `uniqueBlogTitles`: An array of unique blog titles (no duplicates).

Example response:

```json
{
  "totalBlogs": 100,
  "longestBlogTitle": "A Blog with the Longest Title Ever",
  "blogsWithPrivacyKeyword": 25,
  "uniqueBlogTitles": ["Blog 1", "Blog 2", "Blog 3", ...]
}
```

### 2. `/api/blog-search` (GET)

This route allows you to search for blogs based on a query string.

#### Request:

- **Method:** GET
- **URL:** `/api/blog-search?query=<your-query>`

Replace `<your-query>` with the search query you want to use.

#### Response:

The response is a JSON array containing the blogs that match the search query. The search is case-insensitive.

Example response:

```json
[
  {
    "title": "Privacy and Data Security",
    "content": "..."
  },
  {
    "title": "Protecting User Privacy",
    "content": "..."
  },
  ...
]
```

## Data Analysis

The `/api/blog-stats` route uses Lodash to perform the following analytics on the fetched data:

- Calculate the total number of blogs.
- Find the blog with the longest title.
- Determine the number of blogs with titles containing the word "privacy."
- Create an array of unique blog titles (no duplicates).

## Error Handling

The project includes error handling to address potential issues:

- Handles errors that may occur during data retrieval, analysis, or search processes.
- Responds with appropriate error messages if the third-party API is unavailable or returns an error.
- Error handling has been implemented without direct copying of code from external sources.

## Bonus Challenge: Caching

An optional bonus challenge is implemented using Lodash's `memoize` function:

- Caches the analytics results and search results for a certain period.
- If the same requests are made within the caching period, the server returns the cached results instead of re-fetching and re-analyzing the data.
- The caching mechanism is implemented as an original solution.
- Time to reCashing the memoize data is define by the devloper that is 1 min before last cashing.

## Contributing

Contributions to this project are welcome. Feel free to open issues or pull requests to improve the functionality, add features, or fix bugs.
