const nextConfig = {
  reactStrictMode: true, // Enables React's strict mode for highlighting potential issues
  swcMinify: true, // Enables the SWC compiler for faster builds and smaller bundles

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Match .svg files
      use: [
        {
          loader: "@svgr/webpack", // Use the SVGR Webpack loader
          options: {
            svgo: true, // Optimize SVGs
            titleProp: true, // Enable title as a prop
            ref: true, // Forward refs to SVG components
          },
        },
      ],
    });

    return config; // Return the modified Webpack config
  },
};

export default nextConfig;
