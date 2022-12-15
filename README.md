# Next.js Tesla Store

To run locally, you need the database:

```
docker-compose up -d
```

- The -d, means **detached**

## Configure environment variables

Rename file **.env.template** to **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/tesladb
```

- JWT Secret and nextAuth Secret:
  Use a secure or auto-generated string to validate JWT tokens and nextAuth sessions.

```
JWT_SECRET_SEED=
NEXTAUTH_SECRET=
```

- NextAuth URL:
  Use your url from Vercel or localhost to allow users to login with different providers.

```
NEXTAUTH_URL=
```

- TAX Rate:
  You can set the custom taxRate for your store.
  Example: 0.16 for 16% tax rate.

```
NEXT_PUBLIC_TAX_RATE=
```

- Github Client ID and Secret:
  You can generate them in https://github.com/settings/developers to allow users to login with Github.

```
GITHUB_ID=
GITHUB_SECRET=
```

- Paypal Client ID and Secret:
  You can generate them in https://developer.paypal.com/home/ to allow users to pay with Paypal in your store.

```
NEXT_PUBLIC_PAYPAL_CLIENT=
PAYPAL_SECRET=
```

- Cloudinary URL:
  Use your url from Cloudinary to allow admin users upload images.

```
CLOUDINARY_URL=
```

## Run the project

- Rebuild node modules and start Next development project:

```
yarn install
yarn dev
```

## Fill the database with test information

- Using **GET** Method, call the following URL:

```
http://localhost:3000/api/seed
```

The project now is ready to be used and it will be filled with test information. Including products and users. Also you can create your own personalized users.
