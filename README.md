## Getting Started

this is object prediction platform, which detects objects from image and return
bonding box for each object or item with accuracy score of prediction

First, install the node_modules

```bash
npm install
# or
yarn install
```

then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

above command will run json-server on port `3001` and nextjs app on port `3000`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Improvements

I tried to complete funtionality, data organization in json-server might not look good to you but I tried to save predictions in a separate table with image ID so one image can have multiple predictions object and we can fetch each predictions like we do in SQL relations.

If I got more time, I could have improved the UI and make attractive but for now I just covered the main functionality of app first, also I can improve the data fetching by implementing caching to avoid fetching same data again and again from json-server.
