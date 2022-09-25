/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      transitionProperty: {
        flex: "flex",
      },
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        "nlw-gradient":
          "linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
      keyframes: {
        bottomToTop: {
          "0%": { transform: "translateY(100vh) translateX(-50%)" },
          "100%": { transform: "translateY(-50%) translateX(-50%)" },
        },
        topToBottom: {
          "100%": { transform: "translateY(100vh) translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: "translateX(100vw)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          to: { transform: "translateX(100vw)" },
        },
      },
      animation: {
        "bottom-to-top": "bottomToTop .5s",
        "top-to-bottom": "topToBottom .5s forwards",
        "fade-in": "fadeIn .5s",
        "fade-out": "fadeOut .5s forwards",
        "slide-in": "slideIn .5s",
        "slide-out": "slideOut .5s",
      },
    },
  },
  plugins: [
    plugin(function (helpers) {
      // variants that help styling Radix-UI components
      dataStateVariant("open", helpers);
      dataStateVariant("closed", helpers);
      dataStateVariant("on", helpers);
      dataStateVariant("checked", helpers);
      dataStateVariant("unchecked", helpers);
    }),
  ],
};

function dataStateVariant(
  state,
  {
    addVariant, // for registering custom variants
    e, // for manually escaping strings meant to be used in class names
  }
) {
  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(
        `data-state-${state}${separator}${className}`
      )}[data-state='${state}']`;
    });
  });

  addVariant(`group-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group[data-state='${state}'] .${e(
        `group-data-state-${state}${separator}${className}`
      )}`;
    });
  });

  addVariant(`peer-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.peer[data-state='${state}'] ~ .${e(
        `peer-data-state-${state}${separator}${className}`
      )}`;
    });
  });
}
