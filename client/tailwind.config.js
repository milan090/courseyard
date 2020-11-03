module.exports = {
  purge: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx", "public/**/*.html"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--primary)",
        secondary: "var(--background-dark-shade)",
        accent: "var(--background-lighter-shade)",
      },
      borderColor: {
        primary: "var(--primary)",
        secondary: "var(--background-dark-shade)",
        accent: "var(--background-lighter-shade)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--text-accent)",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      fontSize: {
        "5.5xl": "3.5rem",
      },
      letterSpacing: {
        "ultra-wide": ".5rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
