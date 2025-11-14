module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', env('FRONTEND_URL', 'http://localhost:3000')],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: (ctx) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'https://portfolio-omega-khaki-64.vercel.app',
          env('FRONTEND_URL', 'http://localhost:3000')
        ];
        
        const requestOrigin = ctx.request.header.origin;
        
        // Allow all Vercel preview deployments
        if (requestOrigin && requestOrigin.match(/^https:\/\/.*-bemots-projects\.vercel\.app$/)) {
          return requestOrigin;
        }
        
        // Check if request origin is in allowed list
        if (allowedOrigins.includes(requestOrigin)) {
          return requestOrigin;
        }
        
        return allowedOrigins[0];
      },
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
