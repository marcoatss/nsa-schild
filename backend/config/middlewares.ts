let middlewares: any[] = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

if (process.env.NODE_ENV === "production") {
  middlewares = [
    ...middlewares,
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["\"self\"", "https:"],
            "img-src": [
              "\"self\"",
              "data:",
              "blob:",
              "market-assets.strapi.io",
              `media.${process.env.SUBDOMAIN}.${process.env.HOSTED_ZONE_NAME}`,
            ],
            "media-src": [
              "\"self\"",
              "data:",
              "blob:",
              "market-assets.strapi.io",
              `media.${process.env.SUBDOMAIN}.${process.env.HOSTED_ZONE_NAME}`,
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
  ];
}

export default middlewares;
