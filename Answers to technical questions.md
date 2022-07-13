1.	How long did you spend on the coding assignment?
    Probably 4-5 hours. Much of the time was spent digging into Open Library's data schema and data results to best understand it. Unfortunately, there is a lot of bad data that leads to some less-than-optimal results. I spent some time switching to a low-overhead bundler Parcel.js from what I normally use, Gatsby, to deploy the React project, so that required some understanding to ensure proper deployment with Netlify, the host I used.

  a.	What would you add to your solution if you had more time?
    I would try to understand the data better to improve the fidelity of the results. There is a lot of mal-formed data and fields that may or may not be consistent requiring more error-testing. I would add some lazy-loading and toggling between ascending and descending sorting. I made some assumptions along the way due to the inconsistency of the data. For example, due to the large number of publish_dates (and different date formats), I opted to choose the first one as the entry's arbitrary date. On a real project I would determine with stakeholders the proper format and convention for the dates. I would also confer with SMEs or BAs to determine whether the data could be better normalized, such as edition_keys and isbns, for example, to decide which edition for a given entry should prevail, in order to improve the quality of the results.

  b.	If you didn't spend much time on the coding test, then use this as an opportunity to explain what you would add.
    I admit I am weaker in the area of unit tests so I would spend more time to improve their quality. I would spend more time breaking up the components in order to correspond them to unit tests, favoring a TDD approach. I started to set up the test libraries and run into issues with config so I've had to leave it in the interest of submitting the assessment on time.

2.	What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
  The introduction of Hooks in recent versions of React allows us to streamline the aspects of the component. In this case, I made use of useRef and useState. useRef is efficient in targeting DOM elements, while useState allows us to write simpler components and establish state without resorting to Classes.

  const [results, setResults] = useState(null);

  In older versions of React, I would need to establish State variables in a Class constructor(). While it essentially works out to the same thing, Classes require more boilerplate while I can use Hooks simply in functional components.

3.	How would you track down a performance issue in production? Have you ever had to do this?
  Yes, I have. The Lighthouse audit is useful but additionally using the inspector's Network tab allows us to discern load and request times for specific resources and API calls. We can also add third-party logging (such as loggly.com) to our code which would be recorded and timestamped, allowing us to view performance of whatever we are interested in, for example, user interactions, in-app events, client-side processing, to name a few.

4.	How would you improve the API that you just used?
  I would add proper title and date sorting to the end-point. The existing API by default sorts according to the (record) creation date which is not helpful to the end-user. As a result there isn't currently a way to lazy-load sorted data. Comprehensive sorting would require front-loading the entire dataset of the query and sorting it at the client-side. This is data-heavy and taxing on the back-end; the current API defaults to a maximum of 100 records per call. The API is also at the mercy of the quality of data which, in some cases, needs some cleanup or better formatting

5.	Please describe yourself using correctly formatted JSON
  {
    "name": "Victor Chan",
    "role": "Front-end and React developer",
    "location": "Toronto, Canada",
    "skills": ["html","css","javascript","react","graphql","ux/ui","integration"]
  }
