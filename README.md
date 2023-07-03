# Bunk tech test by Jordan James

Had some fun doing this tech test. Thanks!

## Prerequisites

-   Node (v20.2.0 used while developing)
-   Angular CLI (v16.1.1 used while developing)
-   Docker (Optional)

## Get Started (Docker)

Build docker images:

```
docker compose build
```

Pull up docker containers (detached):

```
docker compose up -d
```

You can stop the containers with:

```
docker compose down
```

## Get Started (Dockerless)

1. Run `npm run install-all`
2. Run `npm start`

You can access the webpage at `localhost:4200`

## Testing

Please build, or run the applications before testing.

1. Run `npm test` (API tests)
2. Run `npm run e2e` (Web tests)

## API endpoints

| Verb | Endpoint   |
| ---- | ---------- |
| POST | `/payouts` |

`/payouts` example body:

```
{
  expenses: [
    { traveller_name: "test", expense: 5 }
  ]
}
```
