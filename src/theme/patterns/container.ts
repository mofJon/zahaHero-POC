const container = {
  transform(props: any) {
    const { ...rest } = props;

    return {
      // padding-X
      px: { base: "1rem", md: "2rem", lg: "4rem" },
      align: "center",
      width: "100%",
      ...rest,
    };
  },
};

export default container;
