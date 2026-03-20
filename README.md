# Mission 11

This project is an online bookstore built with ASP.NET Core Web API, React, TypeScript, and Bootstrap.

## Run the API

```bash
cd Mission11.Api
dotnet run
```

The API runs at `http://localhost:5132`.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite frontend runs at `http://localhost:5173` and proxies `/books` requests to the API.
