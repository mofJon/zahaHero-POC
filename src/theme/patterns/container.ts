const container = {
  transform(props: any) {
    const { ...rest } = props;

    return {
      px: { base: "1rem", md: "2rem", lg: "4rem" },
      width: "100%",
      ...rest,
    };
  },
};

export default container;
