# Chorus

Chorus is a full stack music streaming application. 

Website: [Locknest](https://chours.vercel.app)

### Tech Stack Used

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&**logoColor**=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Prisma](https://img.shields.io/badge/prisma-brightgreen.svg?style=for-the-badge&logo=prisma&logoColor=white) ![Meilisearch](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Setting the local enviroment

1. Clone the repo and install the dependencies

   ```bash
   git clone https://github.com/amit-ksh/chorus.git
   cd chorus
   npm install
   ```

1. Creating the .env file and set the following variables

   ```bash
   DATABASE_URL='YOUR_DB_URL'
   NEXT_PUBLIC_MEILISEARCH_HOST_URL='MEILISEARCH_URL'
   NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY='MEILISEARCH_SEARCH_API_KEY'
   MEILISEARCH_ADMIN_API_KEY='MEILISEARCH_ADMIN_API_KEY'a
   CHORUS_SECRET='YOUR_ACCESS_TOKEN'
   CLOUDINARY_NAME='CLOUDINARY_NAME'
   CLOUDINARY_API_KEY='CLOUDINARY_API_KEY'  
   CLOUDINARY_API_SECRET='CLOUDINARY_API_SECRET'
   ```

1. Run the development server:

   ```bash
   npm run dev
   ```

1. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
