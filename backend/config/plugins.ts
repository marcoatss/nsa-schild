export default ({ env }) => {
  let config: any = {
    "strapi-plugin-populate-deep": {
      config: {
        defaultDepth: 10,
      }
    },
    ckeditor: {
      enabled: true,
    },
    placeholder: {
      enabled: true,
      config: {
        size: 10,
      },
    },
    "strapi-regenerator": {
      enabled: true,
    },
    "export-to-excel": {
      enabled: true,
      resolve: "./src/plugins/export-to-excel",
    },
  };

  if (env("NODE_ENV") === "production") {
    config = {
      ...config,
      upload: {
        config: {
          provider: "aws-s3",
          providerOptions: {
            baseUrl: `https://media.${process.env.SUBDOMAIN}.${process.env.HOSTED_ZONE_NAME}`,
            s3Options: {
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              },
              region: process.env.AWS_REGION,
              params: {
                ACL: "private",
                signedUrlExpires: 900,
                Bucket: process.env.S3_BUCKET_NAME,
              },
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
      "vercel-deploy": {
        enabled: true,
        config: {
          deployHook: "",
          apiToken: "",
          appFilter: "",
          teamFilter: "",
          roles: ["strapi-super-admin"],
        },
      },
    };
  }

  return config;
};
