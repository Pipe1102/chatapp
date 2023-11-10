import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      background: "#3e4444",
      text: "#f8fafc",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
});
